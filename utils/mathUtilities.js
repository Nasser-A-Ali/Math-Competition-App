/**
 * Gets a random multiplication, division, subtraction or addition question
 *
 * @returns {string} The randomly generated math question
 */
function getQuestion() {
  const operators_list = ["+", "-", "*", "/"];
  const operator =
    operators_list[Math.floor(Math.random() * operators_list.length)];

  let first_number = Math.floor(Math.random() * 10);
  let second_number = Math.floor(Math.random() * 10);

  if (operator === "+") {
    return `${first_number} + ${second_number}`;
  } else if (operator === "-") {
    return `${first_number} - ${second_number}`;
  } else if (operator === "*") {
    return `${first_number} * ${second_number}`;
  } else if (operator === "/") {
    while (first_number % second_number !== 0) {
      first_number = Math.floor(Math.random() * 10);
      second_number = Math.floor(Math.random() * 10);
    }
    return `${first_number} / ${second_number}`;
  }
}

/**
 * Parses the provided question and gets whether or not the provided answer is correct
 *
 * @param {string} question The question being answered
 * @param {string} answer The potential answer
 * @returns {boolean} True if the answer was correct, false otherwise.
 */
function isCorrectAnswer(question, answer) {
  const [first_number, operator, second_number] = question.split(" ");

  let first_number_int = parseInt(first_number);
  let second_number_int = parseInt(second_number);
  let answer_int;

  if (operator === "+") {
    answer_int = first_number_int + second_number_int;
  } else if (operator === "-") {
    answer_int = first_number_int - second_number_int;
  } else if (operator === "*") {
    answer_int = first_number_int * second_number_int;
  } else if (operator === "/") {
    answer_int = first_number_int / second_number_int;
  } else {
    return false;
  }

  console.log(answer_int === parseInt(answer));
  return answer_int === parseInt(answer);
}

module.exports = {
  getQuestion,
  isCorrectAnswer,
};
