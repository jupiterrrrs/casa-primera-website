/**
 * CASA PRIMERA — Booking ↔ Google Calendar Sync (v2)
 * ------------------------------------------------
 * Matches the resort's ACTUAL calendar setup: one dedicated Google
 * Calendar per villa ("Casa Primera Villa 1" ... "Villa 5"), plus a
 * separate "Cancelled Bookings" calendar. Villa is identified by WHICH
 * calendar an event lives on — not by parsing the event title.
 *
 *   GET  request  -> reads events from each villa's calendar, returns
 *                    blocked date ranges per villa as JSON.
 *   POST request  -> creates a new event on the correct villa's
 *                    calendar for a submitted booking.
 *
 * The JSON shape matches exactly what BookingCTA.tsx already expects,
 * so the website needs ZERO code changes — only this backend changes.
 */

// ======= 1. CONFIGURE THIS =======
// For EACH villa calendar: open Google Calendar -> hover the calendar
// name in "My calendars" -> 3-dot menu -> "Settings and sharing" ->
// scroll to "Integrate calendar" -> copy "Calendar ID".
// It will look like: xxxxxxxxxxxx@group.calendar.google.com

const VILLA_CALENDARS = {
  "Casa Primera Villa 1": "c_n36m3mt2do1kbg83n0f6gsnnr4@group.calendar.google.com",
  "Casa Primera Villa 2": "c_95fmltbf5mvguolosegbo72qcg@group.calendar.google.com",
  "Casa Primera Villa 3": "c_3n1h8ea4bqua7t1k436j3khceg@group.calendar.google.com",
  "Casa Primera Villa 4": "c_fkl54ifcgvvhp2p9l4klc822a8@group.calendar.google.com",
  "Casa Primera Villa 5": "c_599da1415d442a198dd7aa1a2053f88b6288b890bc0b8d986b4b74c23425c861@group.calendar.google.com"
};

// Optional: get this ID the same way (hover "Cancelled Bookings" in the
// sidebar -> Settings and sharing -> Integrate calendar). Any event you
// drag/copy into this calendar will be excluded from "blocked" dates —
// lets you void a booking without deleting the original event. Left
// unset for now: the script simply skips this exclusion until you add it.
const CANCELLED_BOOKINGS_CALENDAR_ID = "PUT_CANCELLED_BOOKINGS_CALENDAR_ID_HERE";

// Default title used for events this script creates, matching your
// existing convention seen on the calendar. Feel free to edit the wording.
function bookingTitle(nights) {
  return nights > 1
    ? `Fully Booked | 3pm to 12nn on the last day`
    : `Fully Booked | 3pm to 12nn the next day`;
}

// ======= 2. AVAILABILITY (GET) =======
function doGet(e) {
  try {
    const now = new Date();
    const rangeStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const rangeEnd = new Date(now.getFullYear(), now.getMonth() + 18, 1);

    const cancelledIds = getCancelledEventKeys(rangeStart, rangeEnd);

    const villaRanges = {};

    Object.keys(VILLA_CALENDARS).forEach(villaName => {
      const calId = VILLA_CALENDARS[villaName];
      villaRanges[villaName] = [];

      if (!calId || calId.indexOf("PUT_") === 0) return; // not configured yet

      const calendar = CalendarApp.getCalendarById(calId);
      if (!calendar) return;

      const events = calendar.getEvents(rangeStart, rangeEnd);
      events.forEach(ev => {
        const key = eventKey(ev);
        if (cancelledIds.has(key)) return; // matches something in Cancelled Bookings

        villaRanges[villaName].push({
          from: formatDate(ev.getStartTime()),
          to: formatDate(ev.getEndTime())
        });
      });
    });

    return jsonResponse({ status: "success", villas: villaRanges });
  } catch (err) {
    return jsonResponse({ status: "error", message: err.message });
  }
}

// Builds a lookup of "date range signatures" found in the Cancelled
// Bookings calendar, so matching events on villa calendars can be
// excluded. Uses start+end date as the matching key.
function getCancelledEventKeys(rangeStart, rangeEnd) {
  const keys = new Set();
  if (!CANCELLED_BOOKINGS_CALENDAR_ID || CANCELLED_BOOKINGS_CALENDAR_ID.indexOf("PUT_") === 0) {
    return keys;
  }
  const cal = CalendarApp.getCalendarById(CANCELLED_BOOKINGS_CALENDAR_ID);
  if (!cal) return keys;
  cal.getEvents(rangeStart, rangeEnd).forEach(ev => keys.add(eventKey(ev)));
  return keys;
}

function eventKey(ev) {
  return formatDate(ev.getStartTime()) + "_" + formatDate(ev.getEndTime());
}

// ======= 3. NEW BOOKING (POST) =======
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const calId = VILLA_CALENDARS[data.villa];
    if (!calId || calId.indexOf("PUT_") === 0) {
      throw new Error("No calendar configured for villa: " + data.villa);
    }
    const calendar = CalendarApp.getCalendarById(calId);
    if (!calendar) throw new Error("Calendar not found for villa: " + data.villa);

    const checkIn = new Date(data.checkIn);
    const checkOut = new Date(data.checkOut);
    const nights = Number(data.nights) || 1;

    const description = [
      `Guest: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Guests: ${data.guests}`,
      `Nights: ${nights}`,
      `Booked via website on: ${new Date().toLocaleString()}`
    ].join("\n");

    calendar.createEvent(bookingTitle(nights), checkIn, checkOut, {
      description: description,
      location: "Casa Primera Hot Spring Resorts, Nayong Maharlika Village, Pansol, Calamba, Laguna"
    });

    // Optional: notify staff by email for every new booking.
    // MailApp.sendEmail("sales@casaprimeravilla.com", "New Booking: " + data.villa, description);

    return jsonResponse({ status: "success" });
  } catch (err) {
    return jsonResponse({ status: "error", message: err.message });
  }
}

// ======= Helpers =======
function formatDate(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), "yyyy-MM-dd");
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
