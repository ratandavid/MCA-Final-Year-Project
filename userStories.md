# User Stories — Meditation Mobile App

A user story is a short, plain-language description of a feature written from the perspective of the end user. Format: **As a [user], I want [feature], so that [benefit].**

---

## 1. Authentication

**US-01 — Sign Up**
As a new user, I want to register by entering my username, email, and password on the Sign Up screen, so that I can create a personal account and be taken directly to the Home screen without needing to log in again.

**US-02 — Duplicate Email Check on Sign Up**
As a new user, I want to see an inline error under the email field if I try to register with an email that is already registered, so that I am told the account exists and prompted to log in instead.

**US-03 — Field Validation on Sign Up**
As a new user, I want to see specific inline error messages beneath each empty or invalid field when I tap Sign Up, so that I know exactly which field to fix — username, email format, or password.

**US-04 — Show / Hide Password on Sign Up**
As a new user, I want to tap an eye icon next to the password field to toggle its visibility, so that I can verify what I am typing without mistyping my password.

**US-05 — Login with Email**
As a returning user, I want to enter my registered email and password and be taken to the Home screen when the email matches my account, so that I can access my content quickly.

**US-06 — Field Validation on Login**
As a returning user, I want to see inline error messages under each empty or invalid field when I tap Login — including a red-bordered input and descriptive text — so that the errors are visible on both mobile and web without a pop-up dialog.

**US-07 — Show / Hide Password on Login**
As a returning user, I want to toggle password visibility on the Login screen using an eye icon, so that I can confirm my password before submitting.

**US-08 — Log Out**
As a logged-in user, I want to tap the red pill-shaped Log Out button fixed at the bottom of the sidebar, so that my session ends, my username is cleared, and I am returned to the Login screen.

---

## 2. Home Screen

**US-09 — Personalised Greeting**
As a logged-in user, I want to see my registered username displayed in the greeting on the Home screen (e.g. "Hello, Ratan"), so that the app feels personal and welcoming every time I open it.

**US-10 — Daily Quote Card**
As a user, I want to see a randomly selected motivational meditation quote each time I navigate to the Home screen, so that I feel freshly inspired before starting a session. The quote is picked from a curated local list and changes automatically on every visit.

**US-11 — Daily Reminder Banner**
As a user, I want to see a prominent purple banner on the Home screen with a bell icon and "Daily Reminder" label, so that I can tap it to go directly to the Daily Reminders screen without opening the sidebar.

**US-12 — Popular Meditations Section**
As a user, I want to browse a vertical list of three meditation sessions — Calm Mind (10 min), Sleep Sounds (20 min), and Stress Relief (15 min) — displayed as attractive cards with a photo, gradient overlay, duration badge, and description, so that I can quickly pick a session that suits my current mood.

**US-13 — Dark Mode on Home**
As a user, I want the Home screen background, greeting text, and section headings to switch to a dark colour scheme when Dark Mode is enabled, so that the screen is easier on my eyes at night.

---

## 3. Meditation Detail (Card View)

**US-14 — Session Detail Page**
As a user, I want to tap a meditation card and be taken to a full-screen detail page showing the session image, title, and duration, so that I can read more about it before I begin.

**US-15 — About Tab**
As a user, I want an "About" tab pill on the detail page that shows the session description and its benefits when selected, so that I understand what the meditation offers and how it helps me.

**US-16 — Instructions Tab**
As a user, I want an "Instructions" tab pill that shows five numbered steps for performing the meditation when selected, so that I have clear guidance on how to follow the session correctly.

**US-17 — Share Session**
As a user, I want to tap a share icon in the header of the detail page, so that the native share sheet opens and I can send the meditation title and description to friends or family.

**US-18 — Add to Favourites Button**
As a user, I want a fixed "Add to Fav" button at the bottom of the detail page that toggles to "Added to Fav" once tapped, so that I can save sessions I enjoy and see immediately that the action worked.

**US-19 — Back Navigation via Logo**
As a user, I want to tap the app logo in the header on the detail page to go back to wherever I came from — either Home or My Favourites — so that navigation feels intuitive.

---

## 4. Favourites

**US-20 — View Favourites**
As a user, I want a dedicated My Favourites screen accessible from the sidebar that lists all my saved meditation cards, so that I can quickly revisit sessions I have enjoyed.

**US-21 — Empty Favourites State**
As a user, I want to see a heart icon and a helpful message when I have no favourites saved yet, so that I am guided to explore and add sessions from the Home screen.

**US-22 — Remove from Favourites**
As a user, I want to tap a saved meditation card in My Favourites and be taken to a Remove screen that shows the session details with a red "Remove from Fav" button at the bottom, so that I can cleanly delete it from my list and return to My Favourites.

---

## 5. Sidebar Navigation

**US-23 — Open Sidebar**
As a user, I want to tap the settings icon in the top-right header to open a slide-in sidebar panel, so that I can navigate to different sections of the app from any screen.

**US-24 — Sidebar Menu Items**
As a user, I want the sidebar to show three menu items — Settings, Favourite, and Daily Reminders — each with a matching icon, so that I can access every key feature from one place.

**US-25 — Display Username in Sidebar**
As a user, I want to see my username and a subtitle at the top of the sidebar, so that I can confirm at a glance that I am logged into my own account.

**US-26 — Animated Sidebar**
As a user, I want the sidebar to slide in smoothly from the left with a dimmed backdrop behind it, so that the transition feels polished and I can close it by tapping the backdrop.

---

## 6. Settings — Dark Theme

**US-27 — Toggle Dark Theme**
As a user, I want a Settings screen with a moon icon, a "Dark Theme" label, an "Enabled / Disabled" status text, and a purple toggle switch, so that I can turn dark mode on or off to suit my environment.

**US-28 — Dark Theme Across Screens**
As a user, I want the dark theme to apply consistently across the Home screen, the Settings screen, and the Daily Reminders screen — changing backgrounds, text, cards, calendar, and modal inputs — so that the entire app respects my preference.

---

## 7. Daily Reminders

**US-29 — View Calendar**
As a user, I want to see a full-month calendar with a purple accent on the Daily Reminders screen, so that I can tap any date to view or manage reminders for that day.

**US-30 — Add a Reminder**
As a user, I want to tap a purple + button to open an Add Reminder modal where I enter a time and an activity name, so that I can schedule a meditation session on a specific date.

**US-31 — Pre-filled Time in Modal**
As a user, I want the time field in the Add Reminder modal to be pre-filled with the next rounded 30-minute time slot based on the current time, so that I can save a reminder quickly without having to type the time from scratch.

**US-32 — Reminder Cards**
As a user, I want each saved reminder to appear as a styled card with a purple left accent bar, a bell icon, the activity name in bold, and the time shown with a clock icon, so that my reminders are easy to read at a glance.

**US-33 — Delete a Reminder**
As a user, I want to tap a red trash icon on a reminder card to delete it, so that I can remove activities I no longer need and the calendar dot disappears automatically when the day has no remaining reminders.

**US-34 — Persist Reminders**
As a user, I want my reminders to be saved to local device storage using AsyncStorage, so that they are still available the next time I open the app even after closing it.

**US-35 — Calendar Dot Indicators**
As a user, I want dates that have at least one reminder to show a purple dot below the date number on the calendar, so that I can see at a glance which days already have scheduled activities.

**US-36 — Dark Mode on Daily Reminders**
As a user, I want the Daily Reminders screen — including the calendar background, reminder cards, section headings, and the Add Reminder modal — to switch to the dark colour scheme when Dark Mode is enabled.

---

## 8. Reusable Components

**US-37 — App Header Component**
As a user, I want every screen to display a consistent header with the app logo on the left and a contextual icon on the right (settings icon on most screens, share icon on the detail page), so that the app feels cohesive and every screen has clear navigation.

**US-38 — Meditation Card Component**
As a user, I want each meditation session to be displayed using the same card design — a full-width photo with a gradient overlay, a duration badge, a play button, and a description below — whether I am on the Home screen or in My Favourites.

**US-39 — Daily Quotes Component**
As a user, I want the quote card on the Home screen to display a decorative large quotation mark, the quote text in italics, a divider, and the author's name with a person icon, so that it looks visually distinct and professional.

---

## 9. Cross-Platform (Web)

**US-40 — Web Support**
As a user accessing the app in a browser, I want the layout to be centred with a maximum width so that it resembles a mobile screen and remains readable on a desktop.

**US-41 — Web-Compatible Validation Errors**
As a user on the web, I want all Sign Up and Login validation errors to appear as inline red text below each field with a red input border, rather than native Alert pop-ups, so that errors are visible and styled correctly in every environment including web browsers.

**US-42 — Safe Area Handling**
As a user on a device with a notch or system bars, I want the app layout to respect safe area insets using `react-native-safe-area-context`, so that no content is hidden behind the status bar or home indicator.
