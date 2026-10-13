import assert from "node:assert";
import test from "node:test";
import { calculateRevisionDates } from "./dates.mjs";

test("calculates the five revision dates", () => {
  assert.deepEqual(calculateRevisionDates("2027-07-19"), [
    "2027-07-26",
    "2027-08-19",
    "2027-10-19",
    "2028-01-19",
    "2028-07-19",
  ]);
});

test("is not affected when the clocks change", () => {
  assert.equal(calculateRevisionDates("2027-10-25")[0], "2027-11-01");
});

test("keeps the day inside a shorter month", () => {
  assert.equal(calculateRevisionDates("2027-01-31")[1], "2027-02-28");
});

test("handles a leap day", () => {
  assert.equal(calculateRevisionDates("2028-02-29")[4], "2029-02-28");
});