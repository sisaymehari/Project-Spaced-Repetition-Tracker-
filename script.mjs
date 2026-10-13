import { getUserIds } from "./common.mjs";
import { addData, getData } from "./storage.mjs";
import { calculateRevisionDates, formatDate } from "./dates.mjs";

const dropdown = document.querySelector("#user-select");
const agenda = document.querySelector("#agenda");
const form = document.querySelector("#topic-form");
const topicInput = document.querySelector("#topic-name");
const dateInput = document.querySelector("#topic-date");

function getToday() {
  return new Date().toLocaleDateString("en-CA");
}

dateInput.value = getToday();

getUserIds().forEach(function (userId) {
  const option = document.createElement("option");
  option.value = userId;
  option.textContent = `User ${userId}`;
  dropdown.appendChild(option);
});

function showAgenda() {
  const userId = dropdown.value;

  if (userId === "") {
    agenda.textContent = "Select a user to see their agenda.";
    return;
  }

  const today = getToday();
  const upcoming = (getData(userId) || []).filter(function (item) {
    return item.date >= today;
  });

  if (upcoming.length === 0) {
    agenda.textContent = "No upcoming topics to revise for this user.";
    return;
  }

  upcoming.sort(function (a, b) {
    return a.date.localeCompare(b.date);
  });

  const list = document.createElement("ul");

  upcoming.forEach(function (item) {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.topic}, ${formatDate(item.date)}`;
    list.appendChild(listItem);
  });

  agenda.textContent = "";
  agenda.appendChild(list);
}

dropdown.addEventListener("change", showAgenda);
showAgenda();

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!dropdown.reportValidity()) {
    return;
  }

  const items = calculateRevisionDates(dateInput.value).map(function (date) {
    return { topic: topicInput.value.trim(), date: date };
  });

  addData(dropdown.value, items);
  topicInput.value = "";
  showAgenda();
});