let currentdate = new Date();
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let datetime = `${
  monthNames[currentdate.getMonth()]
} ${currentdate.getDate()} ${currentdate.getFullYear()} - ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
module.exports = { datetime };

