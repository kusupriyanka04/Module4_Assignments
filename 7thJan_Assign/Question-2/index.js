import boxen from "boxen";

const message = "I am using my first external module!";
const title = "Hurray!!!";

// Classic (default) style
const classicBox = boxen(message, {
  title,
  padding: 1,
  titleAlignment: "center"
});
console.log(classicBox + "\n");

// singleDouble (mixed border)

const singleDoubleBox = boxen(message, {
  title,
  borderStyle: "singleDouble",
  padding: 1,
  titleAlignment: "center"
});
console.log(singleDoubleBox + "\n");

// Round style

const roundBox = boxen(message, {
  title,
  borderStyle: "round",
  padding: 1,
  titleAlignment: "center",
  backgroundColor: "magenta"
});
console.log(roundBox);
