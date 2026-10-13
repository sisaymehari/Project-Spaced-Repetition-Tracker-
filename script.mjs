import { getUserIds } from "./common.mjs";
import { getData } from "./storage.mjs";

const dropdown = document.querySelector("#user-select");
const agenda = document.querySelector("#agenda");
const dateInput = document.querySelector("#topic-date");

dateInput.value = new Date().toLocaleDateString("en-CA");

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

  const data = getData(userId);

  if (data === null) {
    agenda.textContent = "No agenda for this user yet.";
  } else {
    agenda.textContent = "This user has an agenda.";
  }
}

dropdown.addEventListener("change", showAgenda);
showAgenda();