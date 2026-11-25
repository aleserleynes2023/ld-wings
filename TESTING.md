# Testing Checklist: L&D Wings

Mark each check ✅ pass or ❌ fail, and write what you fixed.

**Tested on:** (browser and version) · (phone model or emulated size) · (date)

## Links and navigation
| Check | Result | Notes |
|---|---|---|
| Every navbar link opens the right page, on all 6 pages | | |
| The current page is highlighted in the navbar | | |
| Mobile menu (☰) opens and closes | | |
| "See the Menu" → menu.html; "See all 10 flavors" → menu.html#flavors | | |
| "Reserve a Table" → contact.html#reserve | | |
| "See map and hours" → about.html#map-title | | |
| Footer "Credits & Attributions" link works | | |
| "Open in Google Maps" opens in a new tab | | |
| Skip link appears when you press Tab on page load and jumps to the content | | |

## Media
| Check | Result | Notes |
|---|---|---|
| All photos load, none broken | | |
| Promo video plays, pauses and changes volume | | |
| Captions (CC) show at the right times (0:00, 0:05, 0:10, 0:16, 0:22) | | |
| Video transcript opens | | |
| Google Map loads and can be zoomed or dragged | | |
| Spice meter bars animate when scrolled into view | | |

## Interactive features
| Check | Result | Notes |
|---|---|---|
| Menu search "garlic" shows 4 items (Garlic Parmesan, Soy Garlic, Spicy Adobo Glaze, Onion Rings) | | |
| Category "Drinks" + heat "Any" shows 4 items | | |
| Search with no match shows the "No items match" message | | |
| Gallery filter "The Place" shows 3 photos | | |
| Clicking a photo opens the lightbox; ← → and Esc work; focus returns to the photo | | |
| Submitting an empty form shows an error under each required field | | |
| Bad email (e.g. "juan@") and bad mobile (e.g. "12345") are rejected | | |
| Choosing "Table reservation" shows Date and Guests; a past date is rejected | | |
| A correctly filled form shows the confirmation message and clears | | |
| Opening hours highlight today and show Open / Closed correctly | | |

## Layout and responsiveness
| Width | Check | Result | Notes |
|---|---|---|---|
| Desktop (1280px+) | Layout looks right, no overlap | | |
| Tablet (768px) | Cards stack neatly | | |
| Phone (375px) | No sideways scrolling, text readable, buttons easy to tap | | |

## Accessibility
| Check | Result | Notes |
|---|---|---|
| Every image has meaningful alt text | | |
| All features work with the keyboard only (Tab, Enter, Space, Esc) | | |
| Text contrast is readable (check with a tool such as WebAIM Contrast Checker) | | |
| Form errors are announced and linked to their fields | | |
