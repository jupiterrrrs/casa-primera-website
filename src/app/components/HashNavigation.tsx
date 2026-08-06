import { useEffect } from "react";

/**
 * Scrolls to the section matching the given hash (e.g. "#villas").
 * Falls back to scrolling to the very top ("home") when the hash
 * is empty or points at the home section.
 */
function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, "");
  if (!id || id === "home") {
    document.getElementById("home")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
    return;
  }
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

/**
 * Site-wide click + history manager for internal "#section" links.
 *
 * Behavior:
 * - Clicking ANY internal anchor (nav links, footer links, buttons,
 *   villa cards, etc.) scrolls to that section instead of relying on
 *   the browser's default jump.
 * - The FIRST internal navigation away from the landing page creates
 *   one browser history entry pointing back at the landing page.
 * - Every navigation after that REPLACES the current history entry
 *   instead of adding a new one — so no matter how many sections the
 *   visitor clicks through, there is only ever one "step" of history.
 * - Pressing the browser Back button therefore always returns to the
 *   landing page in a single press, rather than walking backward
 *   through each section that was visited.
 */
export function HashNavigation() {
  useEffect(() => {
    const isAtHome = () => {
      const h = window.location.hash;
      return !h || h === "#" || h === "#home";
    };

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest(
        "a[href^='#']"
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const hash = anchor.getAttribute("href") || "";
      if (!hash || hash === "#") return;

      e.preventDefault();

      if (isAtHome()) {
        // Leaving the landing page for the first time: create a
        // single history entry so Back has somewhere to return to.
        window.history.pushState({ hash }, "", hash);
      } else {
        // Already away from the landing page: don't stack more
        // history entries, just update where we are.
        window.history.replaceState({ hash }, "", hash);
      }

      // pushState/replaceState never fire "hashchange" on their own,
      // so dispatch one manually for any other listeners (e.g. the
      // villa-card auto-open effect) that react to hash changes.
      window.dispatchEvent(new Event("hashchange"));

      scrollToHash(hash);
    };

    const handlePopState = () => {
      scrollToHash(window.location.hash);
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("popstate", handlePopState);

    // Support direct/shared links that already include a hash on load.
    if (window.location.hash) {
      requestAnimationFrame(() => scrollToHash(window.location.hash));
    }

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return null;
}
