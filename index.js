const express = require("express");
const { getQuestion, isCorrectAnswer } = require("./utils/mathUtilities");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.static("public")); // To serve static files (e.g., CSS)

// Initialize variables to various states
let currentQuestion = getQuestion();
let currentStreak = 0;
let highestStreak = 0;
let leaderboardEntries = [];
let streakState = false;

//Some routes required for full functionality are missing here. Only get routes should be required
app.get("/", (req, res) => {
  res.render("index", { currentStreak, highestStreak, streakState });
});

app.get("/quiz", (req, res) => {
  res.render("quiz", { currentQuestion, currentStreak, highestStreak });
});

app.get("/quizComplete", (req, res) => {
  res.render("quizComplete", { currentStreak, highestStreak });
  currentStreak = 0;
});

app.get("/leaderboards", (req, res) => {
  res.render("leaderboards", { leaderboardEntries });
});

//Handles quiz submissions.
app.post("/quiz", (req, res) => {
  const { answer } = req.body;
  console.log(`Answer: ${answer}`);

  //answer will contain the value the user entered on the quiz page
  //Logic must be added here to check if the answer is correct, then track the streak and redirect properly
  //By default we'll just redirect to the homepage again.
  if (isCorrectAnswer(currentQuestion, answer)) {
    currentStreak++;
    streakState = true;
    currentQuestion = getQuestion();
    if (currentStreak > highestStreak) {
      highestStreak = currentStreak;
    }
    res.redirect("/quiz");
  } else {
    // Add the current streak to the leaderboard
    leaderboardEntries.push({
      streak: currentStreak,
      date: new Date().toLocaleString(),
    });

    // Sort the leaderboard entries by streak in descending order
    leaderboardEntries.sort((a, b) => b.streak - a.streak);

    // Keep only the top 5 leaderboard entries
    leaderboardEntries = leaderboardEntries.slice(0, 10);

    // Reset the current streak and redirect to the quiz complete page
    res.redirect("/quizComplete");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
