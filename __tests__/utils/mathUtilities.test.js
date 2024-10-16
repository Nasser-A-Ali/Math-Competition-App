const { isCorrectAnswer, getQuestion } = require("../../utils/mathUtilities");

describe("Tests for getQuestion", () => {
  test("Checks if question follows the [number] [operator] [number] format", () => {
    expect(getQuestion()).toMatch(/\d\s[+\-*/]\s\d/);
  });
});

describe("Tests for isCorrectAnswer", () => {
  test("Checks if the answer is correct", () => {
    expect(isCorrectAnswer("2 + 2", "4")).toBe(true);
  });
  test("Checks if the answer is incorrect", () => {
    expect(isCorrectAnswer("2 + 2", "10")).toBe(false);
  });
});
