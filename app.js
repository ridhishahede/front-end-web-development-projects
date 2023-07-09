const express = require("express");
const app = express();
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function(req , res) {
  res.sendFile(__dirname + "/index.html");
})

function calculateAge(year, month, date) {
  // Check if any field is empty
  if (!year || !month || !date) {
    throw new Error("Please provide values for all fields.");
  }

  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  var currentMonth = currentDate.getMonth() + 1; // January is 0
  var currentDay = currentDate.getDate();

  // Validate day, month, and year ranges
  if (date < 1 || date > 31 || month < 1 || month > 12 || year > currentYear) {
    throw new Error("Invalid date. Please enter a valid date.");
  }

  // Validate the number of days in the given month
  var daysInMonth = new Date(year, month, 0).getDate();
  if (date > daysInMonth) {
    throw new Error("Invalid date. The selected month does not have that many days.");
  }

  var years = currentYear - year;
  var months = currentMonth - month;
  var days = currentDay - date;

  // Adjust the age if the current month and day are earlier than the birth month and day
  if (currentMonth < month || (currentMonth === month && currentDay < date)) {
    years--;
    months += 12;
  }

  // Adjust the number of days if it's negative
  if (days < 0) {
    var daysInLastMonth = new Date(currentYear, currentMonth - 1, 0).getDate();
    months--;
    days += daysInLastMonth;
  }

  return {
    years: years,
    months: months,
    days: days
  };
}

app.post('/', (req, res) => {
  const birthYear = parseInt(req.body.year);
  const birthMonth = parseInt(req.body.month);
  const birthDate = parseInt(req.body.day);

  try {
    const age = calculateAge(birthYear, birthMonth, birthDate);
    res.render('result', { birthDate, birthMonth, birthYear, age });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



app.listen(4000 , function() {
  console.log("Server is running on port 4000");
})