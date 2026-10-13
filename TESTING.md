# Testing

This file explains how each rubric point was tested.

To run the unit tests:

npm i
npm test

To test the website by hand, serve the folder over HTTP (opening `index.html` directly does not work with modules):

npx http-server

Before each manual test, clear old data: open the browser console and run `localStorage.clear()`, then refresh.

## Rubric points

| Rubric point | How it was tested |
| --- | --- |
| The website contains a drop-down which lists exactly 5 users | Manual test: opened the page and counted the options. There is a "Select a user" prompt at the top (it is not a user), then User 1 to User 5. |
| No user is selected on page load | Manual test: refreshed the page and checked that the drop-down shows "Select a user" and the agenda area asks the person to select a user. |
| All users have no agenda when first loading, and data is persisted across page loads | Manual test: cleared local storage, refreshed, selected each of the 5 users in turn and checked that each shows "No upcoming topics to revise for this user." Then added a topic, refreshed the page, selected the same user and checked the agenda was still there. |
| Selecting a user loads the relevant user's agenda from storage | Manual test: added topics for User 1 and User 2, switched between them and checked that each shows only its own agenda. Also looked in the browser's Local Storage and checked the data is saved under a separate key for each user. |
| Selecting a user displays the agenda for that user | Manual tests from the rubric, using the year after the current year (2027). Test 1: User 1, "Functions in JS", 19 July 2027, and checked the 5 dates (26 July 2027, 19 August 2027, 19 October 2027, 19 January 2028, 19 July 2028). Test 2: User 2, "Variables in Python" on 5 November 2027 and "Functions in Python" on 5 October 2027, and checked the 10 dates are mixed together in date order. Test 3: User 3, "Codewars" on the date exactly one month ago, and checked the one-week date is hidden and today's date is shown first. Then went back to Users 1, 2 and 3 and checked each still shows the correct list. |
| If there is no agenda for the selected user, a message explains this | Manual test: with cleared local storage, selected each user and checked the message "No upcoming topics to revise for this user." is shown. |
| The website has a form with a topic name input, a date picker and a submit button | Manual test: checked the form has a text input, a built-in date picker (`type="date"`) and an "Add topic" button. |
| The date picker defaults to today's date on first page load | Manual test: refreshed the page and checked the date picker shows today's date, and that another date can still be chosen. |
| The form validates that the topic name and the date have been set | Manual test: tried to submit with an empty topic, with a topic made only of spaces, and with the date cleared. The browser blocked each one and showed a message. Also tried to submit with no user selected and checked the browser shows a message and nothing is saved. |
| Submitting the form adds a topic for the relevant user only, with revision dates one week, one month, three months, six months and one year later | Manual tests above (rubric tests 1 to 3), checking that other users are not changed. Unit tests in `dates.test.mjs` check `calculateRevisionDates` for exact dates, including a week that crosses the autumn clock change, a month end (31 January gives 28 February) and a leap day (29 February 2028 gives 28 February 2029). |
| After creating a new topic, the agenda for the current user is shown, including the new topic | Manual test: submitted the form and checked the agenda updates straight away, the form stays on the page, and the topic box is emptied so another topic can be added. |
| The form can be used with the keyboard | Manual test: used only the Tab key to reach the drop-down, the topic input, the date picker and the button, filled them in, and pressed Enter to submit. |
| 100% accessibility in Lighthouse (Desktop) for all views | Ran Lighthouse (Desktop, Snapshot, Accessibility) on three views: no user selected, a user with no agenda, and a user with an agenda. All scored 100%. |
| Unit tests for at least one non-trivial function | Unit tests in `dates.test.mjs` test `calculateRevisionDates` and `formatDate` from `dates.mjs`. |
| No dead code | Read through `script.mjs`, `dates.mjs`, `index.html` and the test files, and checked that every function is used. The placeholder code from the starter `script.mjs` was removed. |