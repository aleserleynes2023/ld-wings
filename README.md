# L&D Wings: Promotional Website

A promotional website for **L&D Wings**, a fictional unli chicken-wings restaurant in Quezon City. It uses the **Blue Flame** theme: royal blue and midnight navy, with buffalo orange and honey gold accents.

## Live website
**https://aleserleynes2023.github.io/ld-wings/** (hosted free on GitHub Pages from the `main` branch)

## How to open it
Open `index.html` in a web browser. You need an internet connection because the photos, fonts, Bootstrap script and map load online.

## Pages
| Page | File | What's on it |
|---|---|---|
| Home | `index.html` | Hero, featured wings, promo video with captions, animated spice meter, Barkada Night promo |
| Menu | `menu.html` | Unli packages, searchable and filterable full menu |
| Gallery | `gallery.html` | Filterable photo grid with a full-screen lightbox |
| About & Location | `about.html` | Story, business hours with open-now status, Google Map |
| Contact | `contact.html` | Contact details, validated reservation/inquiry form, FAQ accordion |
| Credits | `credits.html` | Template, photo, font and library attributions |

## Template source
- **Template:** Start Bootstrap **Business Casual** v7.0.9
- **Source:** https://github.com/StartBootstrap/startbootstrap-business-casual (page: https://startbootstrap.com/theme/business-casual)
- **License:** MIT (see `LICENSE-template.txt`)
- **Original files:** the unchanged download is in `template-original/`, so you can compare it with the customized site.

### What was customized
| Template (original) | L&D Wings (customized) |
|---|---|
| Coffee-shop theme, brown/gold colors, coffee photo background | Blue Flame theme in `css/ldwings.css`: navy gradient background, blue/cyan/orange palette |
| Raleway + Lora fonts | Bebas Neue + Poppins |
| 4 pages: Home, About, Products, Store | 6 pages: Home, Menu, Gallery, About & Location, Contact, Credits |
| Hours list that highlights today | Kept, plus a live "Open now / Closed" status that handles past-midnight hours |
| No interactive features besides the hours highlight | Menu search and filter, gallery lightbox, validated form, animated infographic, video fallback (`js/main.js`) |
| Placeholder `alt="..."` on images | Descriptive alt text on every image, skip link, visible focus outlines, captions and a transcript for the video |

The template's compiled `css/styles.css` (which includes Bootstrap) is used unchanged. All design changes are in `css/ldwings.css`, which loads after it.

## Rubric checklist
| Requirement | Where it's met |
|---|---|
| Template customized and source named | This README, `credits.html`, `template-original/` |
| 4+ pages | 6 pages (see table above) |
| 3+ multimedia types | Photos (all pages), promo video with captions and a transcript (Home), map (About), animated infographic (Home spice meter), SVG logo |
| Navigation | Shared navbar with the current page highlighted, collapsible mobile menu, internal links (for example, Home → Menu → `#flavors`, Contact → `about.html#map-title`) |
| 2+ interactive features | 1. Menu search and filters 2. Gallery filter and lightbox 3. Validated form 4. FAQ accordion |
| Responsive | Bootstrap grid plus custom breakpoints in `css/ldwings.css` |
| Accessibility | Alt text, skip link, `aria-current` on nav, keyboard-usable lightbox, labeled form errors, video captions and transcript, reduced-motion support |
| Content and ethics | Unsplash License photos and a Pexels License video, credited in `credits.html` |
| Testing | `TESTING.md` |
| Individual evidence | `WORKLOG.md` (to be filled in by the student) |

## Still to do
- [x] Promo video added: `assets/video/ld-wings-promo.mp4`, a 27-second silent stock clip from Pexels (Pexels License, credited). The promo message is in the captions (`assets/video/ld-wings-promo.vtt`), and the transcript in `index.html` describes the video. You can replace it with your own video later: keep the same file name and update the captions and transcript to match.
- [ ] Fill in `WORKLOG.md` in your own words.
- [ ] Run the checks in `TESTING.md` and record the results.

## Folder structure
```
index.html, menu.html, gallery.html, about.html, contact.html, credits.html
css/styles.css         template CSS (unchanged, includes Bootstrap)
css/ldwings.css        Blue Flame customization
js/main.js             site features
assets/img/flame.svg   logo / favicon
assets/video/          promo video + captions (.vtt)
template-original/     original downloaded template
```
