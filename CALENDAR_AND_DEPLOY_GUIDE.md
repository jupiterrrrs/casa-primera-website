# Casa Primera — Connect Google Calendar & Deploy to Hostinger

Your Google account already has the right structure for this: a separate
calendar per villa ("Casa Primera Villa 1" through "Villa 5"), plus a
"Cancelled Bookings" calendar. The backend script is `Code_v2.gs`,
deployed separately on script.google.com (not built/bundled with the site).

This covers three stages: wiring the booking form to your existing
per-villa calendars, verifying the sync works end-to-end, then building and
uploading the site to Hostinger.

---

## Stage 1 — Calendar IDs ✅ done for the 5 villas

All 5 villa calendar IDs are already filled in to `Code_v2.gs`. One thing
still optional:

**Cancelled Bookings calendar ID** (optional but recommended): hover
"Cancelled Bookings" in the sidebar → 3-dot menu → **Settings and sharing**
→ scroll to **Integrate calendar** → copy the **Calendar ID** → paste it
over `PUT_CANCELLED_BOOKINGS_CALENDAR_ID_HERE` in `Code_v2.gs`. Until you
add it, the script simply skips that exclusion check — everything else
works fine without it.

> The "Availability" and "Rebookings" calendars aren't used by the script.
> If you want either folded in (e.g. treat "Rebookings" as also blocking
> dates), let me know and I'll adjust the script — it's a small change.

## Stage 2 — Deploy the Apps Script

1. Go to [script.google.com](https://script.google.com) while signed in to
   the **same resort Google account**.
2. **New project** → delete the placeholder code → paste in the contents of
   `Code_v2.gs` (included alongside this guide, calendar IDs already filled
   in).
3. Confirm the villa names in `VILLA_CALENDARS` match exactly what's in
   `src/app/components/BookingCTA.tsx` (`VILLA_META`) — they already do.
4. Click **Deploy → New deployment**.
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Authorize the script when prompted (it needs Calendar access).
7. Copy the **Web app URL** you're given — this is your new webhook URL.

## Stage 3 — Point the site at the new webhook

Open `src/app/components/BookingCTA.tsx` and update this line near the top:

```ts
const BOOKING_WEBHOOK_URL = "https://script.google.com/macros/s/PASTE_NEW_URL_HERE/exec";
```

That's the only code change needed — the GET (availability) and POST (new
booking) calls are already wired correctly on the front end.

> If you'd rather keep the exact same URL the site already has, you can
> instead go to the **existing** Apps Script project tied to that URL,
> replace its code with `Code_v2.gs`, and create a new deployment
> **version** under the same deployment ID. That avoids touching the React
> code at all.

## Stage 4 — Test the sync

1. Open the live site (or `npm run dev` locally) and submit a test booking
   for Villa 2, for a date range you don't mind blocking temporarily.
2. Check the **Casa Primera Villa 2** calendar specifically — an event
   titled `Fully Booked | 3pm to 12nn...` should appear, with the guest's
   contact details in the description.
3. Reload the booking form and confirm those same dates now show as
   unavailable for Villa 2 only (not the other four villas).
4. To free up the dates again: either delete the event from that villa's
   calendar, or copy/move it into the **Cancelled Bookings** calendar —
   both work, but moving it to Cancelled Bookings keeps a record instead of
   erasing it.

**Day-to-day going forward:** any event manually added directly to a
villa's calendar (e.g. a maintenance hold) will also block those dates on
the site — you don't need to go through the website to close out dates.

---

## Stage 5 — Build and upload to Hostinger

1. Install dependencies and build a production bundle:
   ```
   npm install
   npm run build
   ```
   This produces a `dist/` folder (or `build/`, depending on the Vite config)
   containing static HTML/CSS/JS.
2. Log in to **hPanel** (Hostinger's control panel) → **Files → File Manager**
   (or connect via FTP using the credentials under **Files → FTP Accounts**).
3. Navigate to `public_html` (or your domain's document root if it's an
   add-on domain).
4. **Delete or back up** any existing site files there first if this is a
   redeploy.
5. Upload the **entire contents of `dist/`** (not the folder itself — its
   contents) directly into `public_html`.
6. Visit your domain to confirm the site loads and the booking form still
   reaches the new Apps Script webhook (browser dev tools → Network tab,
   confirm the request to `script.google.com` returns `status: success`).

### If you prefer FTP instead of File Manager
Use any FTP client (FileZilla, Cyberduck) with the host/username/password
from hPanel → **Files → FTP Accounts**, connect, and drag the contents of
`dist/` into `public_html`.

---

## Quick checklist
- [ ] Calendar ID pasted into `Code.gs`
- [ ] Apps Script deployed as Web App, "Anyone" access
- [ ] `BOOKING_WEBHOOK_URL` in `BookingCTA.tsx` updated (if URL changed)
- [ ] Test booking creates a Calendar event
- [ ] Calendar event correctly blocks those dates on the site
- [ ] `npm run build` run and `dist/` uploaded to Hostinger `public_html`
- [ ] Live site tested end-to-end
