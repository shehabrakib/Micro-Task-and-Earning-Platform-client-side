# Design System & UI Specification
## Micro-Task & Earning Platform — Indigo Pro Theme

---

## 1. Core Color Palette

| Role | Name | Hex | Where it's used |
|---|---|---|---|
| Primary | Indigo 600 | `#4F46E5` | Buttons, active nav, links, accents |
| Primary hover | Indigo 700 | `#4338CA` | Button hover, focused states |
| Primary light | Indigo 50 | `#EEF2FF` | Stat card backgrounds, badges, hover bg |
| Primary mid | Indigo 200 | `#C7D2FE` | Borders on indigo surfaces, dividers |
| Dark base | Indigo 950 | `#1E1B4B` | Sidebar background |
| Sidebar text dim | — | `rgba(255,255,255,0.45)` | Secondary sidebar text, muted labels |
| Page background | — | `#F8F9FF` | Main content area background |
| Card surface | White | `#FFFFFF` | All cards, table rows, modals |
| Coin / Earning | Amber 500 | `#F59E0B` | Coin dot, earning numbers |
| Coin light | Amber 50 | `#FFFBEB` | Coin stat card background |
| Coin text | Amber 800 | `#92400E` | Coin amount text on light bg |
| Success | Emerald 600 | `#059669` | Approved badge, success states |
| Success light | Emerald 50 | `#ECFDF5` | Approved badge background |
| Success text | Emerald 900 | `#065F46` | Approved badge text |
| Warning | Amber 600 | `#D97706` | Pending badge |
| Warning light | Amber 50 | `#FFFBEB` | Pending badge background |
| Danger | Red 600 | `#DC2626` | Rejected badge, delete buttons |
| Danger light | Red 50 | `#FEF2F2` | Rejected badge background |
| Border default | — | `rgba(0,0,0,0.08)` | All card and table borders (0.5px) |
| Text primary | — | `#111827` | Headings, body text |
| Text secondary | — | `#6B7280` | Labels, subtitles, metadata |
| Text hint | — | `#9CA3AF` | Placeholder text, timestamps |

---

## 2. Typography

| Element | Size | Weight | Color | Usage |
|---|---|---|---|---|
| Page title | 20px | 500 | Text primary | Top of each page |
| Section heading | 15px | 500 | Text primary | Card titles, section labels |
| Body / table text | 13px | 400 | Text primary | Table rows, descriptions |
| Label / metadata | 12px | 400 | Text secondary | Dates, buyer names, subtitles |
| Small / hint | 11px | 400 | Text hint | Timestamps, helper text |
| Stat number | 22–24px | 500 | Role color (indigo/amber/green) | Dashboard stat cards |
| Sidebar nav | 13px | 400 | `rgba(255,255,255,0.6)` | Inactive nav items |
| Sidebar nav active | 13px | 500 | `#FFFFFF` | Active nav item |
| Sidebar logo | 16px | 500 | `#FFFFFF` | Site name in sidebar |
| Badge text | 10–11px | 500 | Color-matched dark | Status badges |
| Button text | 13px | 500 | `#FFFFFF` or `#3730A3` | Primary and ghost buttons |

Font family: system-ui or Inter (Google Fonts free). Fallback: sans-serif.

---

## 3. Spacing & Borders

- Border radius on cards: `12px`
- Border radius on buttons and badges: `6px`
- Border radius on pills (coin pill, nav badges): `20px`
- All borders: `0.5px solid` — never 1px or 2px except for featured card accent (2px indigo)
- Card padding: `16px 20px`
- Section gap between cards: `12px`
- Page padding: `24px` on all sides
- Gap between stat cards: `12px`
- Sidebar width: `220px`
- Topbar height: `56px`

---

## 4. Navbar (Public — not logged in)

Background: `#FFFFFF` with a `0.5px` bottom border.

Left side:
- Site logo/icon (indigo square or custom SVG) + "TaskEarn" in `#1E1B4B` at 17px weight 500.

Right side (not logged in):
- "Login" — ghost button, indigo border and text.
- "Register" — filled indigo button `#4F46E5`.
- "Join as Developer" — small text link in text-secondary.

Right side (logged in):
- "Dashboard" text link.
- Coin pill — small amber dot + coin count in amber text on amber-50 background, `border-radius: 20px`.
- User avatar — circle with user's initials, indigo background.
- Clicking avatar shows a small dropdown with "Profile" and "Logout".

---

## 5. Footer

Background: `#1E1B4B` (same dark indigo as sidebar).

Three columns:
- Left: site logo + one-line tagline in `rgba(255,255,255,0.5)`.
- Middle: quick links (Home, Register, Login) in `rgba(255,255,255,0.6)`.
- Right: social icons (GitHub, LinkedIn, Facebook) as outline SVG icons in `rgba(255,255,255,0.5)`, hover turns white.

Bottom bar: thin `rgba(255,255,255,0.1)` divider + copyright text in `rgba(255,255,255,0.3)`.

---

## 6. Home Page

### Hero section
Full-width slider. Each slide:
- Background: deep indigo gradient from `#1E1B4B` to `#312E81`.
- Large white heading (36–48px, weight 500).
- Subtitle in `rgba(255,255,255,0.7)`.
- Two CTA buttons: one filled white (`color: #4F46E5`), one ghost white border.
- Slide dots indicator in indigo-200 (inactive) and white (active).

### Best Workers section
Section heading centered, indigo accent underline.
- Grid of 6 cards, `3 × 2` on desktop, `2 × 3` on tablet, `1 column` on mobile.
- Each card: white background, 0.5px border, 12px radius.
- Circular avatar (60px) centered at top of card.
- Worker name in text-primary 14px weight 500.
- Coin count with amber dot + number in amber-800.
- Rank badge (`#1`, `#2`, `#3`) in top-left corner — indigo background, white text for top 3.

### Testimonials section
Light indigo-50 background section.
- Swiper slider, one card centered on screen.
- Card: white background, 12px radius, 24px padding.
- Large opening quote mark in indigo-200 (decorative).
- Quote text in text-primary 15px.
- User avatar (40px circle) + name in text-primary + role in text-secondary below.
- Swiper pagination dots in indigo.

### Extra sections ideas (3 required)
Pick any three. Suggested:
- "How it works" — 3-step process with numbered indigo circles and short descriptions.
- "Platform stats" — 4 big numbers (Tasks completed, Workers, Buyers, Coins distributed) on indigo-950 background with white text.
- "Why TaskEarn" — feature cards with small indigo icon + heading + description.

---

## 7. Authentication Pages (Register & Login)

Two-column layout on desktop: left = decorative panel, right = form.

Left panel:
- Background: `#1E1B4B`.
- Large heading in white: "Start earning today" or "Welcome back".
- Bullet list of 3 platform benefits in `rgba(255,255,255,0.7)`.
- Decorative abstract indigo shapes or illustration.

Right panel (form area):
- White background, centered form with `max-width: 400px`.
- Input fields: `border: 0.5px solid #D1D5DB`, `border-radius: 8px`, focus ring `#4F46E5`.
- Role dropdown styled the same as inputs.
- Primary submit button: full-width, `background: #4F46E5`, white text, 40px height.
- Google sign-in: full-width ghost button, `border: 0.5px solid #D1D5DB`, Google colors logo on left.
- Error messages: small red text `#DC2626` below the relevant field.
- Link to the other page (Login / Register) in indigo at the bottom.

On mobile: the left panel hides, only the form shows.

---

## 8. Dashboard Sidebar

Width: `220px`. Background: `#1E1B4B`. Fixed on desktop, drawer on mobile.

From top to bottom:
1. Logo area — "TaskEarn" logo + tagline, padded 18px, bottom divider `rgba(255,255,255,0.08)`.
2. User info — circular avatar (32px, indigo bg), name in white 13px, role in dim white 11px.
3. Coin pill — amber dot + coin number in amber-50 text + "coins" label, on `rgba(245,158,11,0.12)` bg, `border-radius: 20px`.
4. Nav section label — "MAIN MENU" in 10px uppercase `rgba(255,255,255,0.3)`.
5. Nav items — icon + label. Inactive: `rgba(255,255,255,0.6)`. Active: white text + left `2px` indigo-400 border + `rgba(79,70,229,0.2)` background.
6. Logout at the very bottom — red-tinted on hover.

---

## 9. Dashboard Topbar

Height: `56px`. Background: `#FFFFFF`. Bottom border `0.5px`.

Left: current page title in text-primary 15px weight 500.

Right:
- Notification bell icon button — `32×32px`, border, secondary bg. Red badge dot if there are unread notifications.
- User avatar circle (32px, indigo bg, initials) — clicking opens a small dropdown.

---

## 10. Dashboard — Stat Cards

Three or four cards in a row. Each card:
- Background: `#FFFFFF`.
- Border: `0.5px solid rgba(0,0,0,0.08)`.
- Border radius: `12px`.
- Padding: `14px 16px`.
- Label: 12px, text-secondary, above the number.
- Number: 22px, weight 500, colored (indigo for counts, amber for coins, emerald for earnings, violet for admin totals).
- Sub-label: 11px, color-matched lighter tone (e.g. indigo for count cards), showing trend or unit.

---

## 11. Task Cards (Worker — Task List)

Card per task in a 2-column grid on desktop, 1 column on mobile.

Each card:
- White background, 0.5px border, 12px radius, 14px 16px padding.
- Task image (if provided) — full width top, 120px height, `object-fit: cover`, `border-radius: 12px 12px 0 0`.
- Task title: 13px weight 500, text-primary.
- Buyer name + due date: 11px text-secondary.
- Bottom row: coin amount (amber dot + number) on the left, "View details" indigo button on the right.
- Open slot badge top-right: indigo-50 bg + indigo-800 text.

---

## 12. Status Badges

Used everywhere a submission or task has a status.

| Status | Background | Text color | Border |
|---|---|---|---|
| Open / Available | `#EEF2FF` | `#3730A3` | none |
| Pending | `#FFFBEB` | `#92400E` | none |
| Approved | `#ECFDF5` | `#065F46` | none |
| Rejected | `#FEF2F2` | `#991B1B` | none |

All badges: `border-radius: 20px`, `padding: 3px 10px`, `font-size: 11px`, `font-weight: 500`.

---

## 13. Tables (Submissions, Manage Users, Payment History)

- Container: white background, 0.5px border, 12px radius, overflow hidden.
- Header row: `#F8F9FF` background, 11px uppercase text-secondary, `font-weight: 500`.
- Body rows: white background, 13px text-primary. Row hover: `#F8F9FF`.
- All dividers: `0.5px solid rgba(0,0,0,0.06)`.
- Action buttons inline in rows — small, 10–11px, pill-shaped:
  - Approve: emerald-50 bg, emerald-800 text, emerald border.
  - Reject: red-50 bg, red-800 text, red border.
  - Delete: same as reject.
  - View: indigo-50 bg, indigo-800 text.
- On mobile: allow horizontal scroll on the table container.

---

## 14. Buttons

| Type | Background | Text | Border | Use |
|---|---|---|---|---|
| Primary | `#4F46E5` | `#FFFFFF` | none | Main CTA, submit, confirm |
| Primary hover | `#4338CA` | `#FFFFFF` | none | On hover |
| Ghost | `#EEF2FF` | `#3730A3` | none | Secondary actions |
| Danger | `#FEF2F2` | `#991B1B` | `0.5px #FECACA` | Delete, reject |
| Success | `#ECFDF5` | `#065F46` | `0.5px #A7F3D0` | Approve, confirm payment |
| Outline | transparent | `#4F46E5` | `0.5px #4F46E5` | Login, less critical CTA |

All buttons: `border-radius: 8px`, `padding: 8px 16px`, `font-size: 13px`, `font-weight: 500`, `cursor: pointer`.
Full-width buttons on forms: same styles, `width: 100%`, `height: 40px`.

---

## 15. Notification Popup

Triggered by clicking the bell in the topbar.
- Floats below the bell, `width: 320px`, white bg, 0.5px border, 12px radius.
- Header row: "Notifications" label (14px weight 500) + "Mark all read" link in indigo.
- Each notification item: 12px 16px padding, bottom border.
  - Icon: small colored circle (indigo for approval, amber for pending, emerald for withdrawal).
  - Message text: 13px text-primary.
  - Timestamp: 11px text-hint, right aligned.
  - Unread items: left `3px` indigo border, very light indigo-50 bg.
- Clicking anywhere outside closes the popup.
- Empty state: "No notifications" centered, text-secondary, 48px height.

---

## 16. Responsive Behaviour

| Breakpoint | Layout changes |
|---|---|
| Desktop `> 1024px` | Sidebar visible, 2-3 column grids, full table columns |
| Tablet `768–1024px` | Sidebar collapses to icon-only or hamburger, 2-column grids |
| Mobile `< 768px` | Sidebar becomes a slide-in drawer, single column, tables scroll horizontally, navbar hamburger menu |

The sidebar on mobile slides in from the left as a drawer on top of the content when the hamburger is clicked. A dark overlay covers the rest of the page. Closing it taps outside or a close button.

---

## 17. Forms (Add Task, Withdrawal, Register, Login)

- Input height: `40px`, `border-radius: 8px`, `border: 0.5px solid #D1D5DB`.
- Focus state: `border-color: #4F46E5`, `box-shadow: 0 0 0 3px rgba(79,70,229,0.1)`.
- Label: 13px, weight 500, text-primary, `margin-bottom: 6px`.
- Error state: `border-color: #DC2626`, small error message below in red 12px.
- Textarea: same as input but `min-height: 100px`, `resize: vertical`.
- Select/dropdown: same visual as input, custom arrow icon in text-secondary.
- Form sections have `24px` gap between fields.
- Form card container: white bg, 0.5px border, 12px radius, 24px padding.

---

## 18. Coin Purchase Cards (Buyer)

4 cards in a row on desktop, 2×2 on tablet, 1 column on mobile.

Each card:
- White background, 0.5px border, 12px radius.
- Large coin count centered: `32px`, weight 500, `#F59E0B` (amber).
- Small "coins" label below in text-secondary.
- Divider line.
- Price: `20px`, weight 500, text-primary (`$1`, `$10`, `$20`, `$35`).
- "Buy now" button — full-width, indigo primary.

Best-value card (500 coins / $20):
- 2px indigo border instead of 0.5px.
- Small "Best value" badge at the top in indigo.

---

*End of design spec — Micro-Task & Earning Platform, Indigo Pro theme v1.0*
