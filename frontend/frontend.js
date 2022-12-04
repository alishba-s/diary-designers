/**
 * This is how we make a request to our backend.
 *
 * The route we are pointing to is `/`. We can figure this out by finding the characters after the domain name is complete.
 * In this example, the domain name is `localhost:8000`.
 *
 */

/**
 * req Object Format :
 * {
 *    action : "lock" OR "unlock",
 *    password : "",
 *    userUpdatedNote : {1: "note contents", ...}
 * }
 *
 * res Object Format :
 * {
 *    passwordBoolean : true / false,
 *    wrongPasswordCount : integer,
 *    passwordHint : "",
 *    userSavedNote : {1: "note contents", ...}
 * }
 *
 */

const url = "http://localhost:8000/post"; // "http://localhost:3000/post";

//Unlock Diary, when password submission button is clicked
function unlockDiary() {
  var password = document.getElementsByTagName("input")[0].value;
  $.post(
    url +
      "?data=" +
      JSON.stringify({
        action: "unlock",
        password: password,
        userUpdatedNote: {},
      }),
    passwordResponse,
  );
  document.getElementsByTagName("input")[0].value = "";
}

function removeNotes() {
  document.getElementById("noteslist").innerHTML = "";
}

//Lock Diary, when lock button is clicked
function lockDiary() {
  removeNotes();
  var password = document.getElementsByTagName("input")[0].value;
  $.post(
    url +
      "?data=" +
      JSON.stringify({
        action: "lock",
        password: password,
        userUpdatedNote: notes,
      }),
    lockResponse,
  );
}

let currentnote = 0;
let notes = [];

//response function for Unlock Diary
function passwordResponse(data, status) {
  var receivedData = JSON.parse(data);
  console.log(receivedData);
  if (receivedData["passwordBoolean"] == true) {
    notes = receivedData["userSavedNote"];
    MakeNotes();
    document.getElementById("unlocked").style.display = "block";
    document.getElementById("locked").style.display = "none";
  } else {
    if (receivedData["wrongPasswordCount"] >= 3) {
      document.getElementById("passwordHint").innerHTML =
        receivedData["passwordHint"];
      document.getElementById("passwordHint").style.display = "block";
    }
    alert("You entered an incorrect password!!!");
  }
  return receivedData;
}

//response function for Lock Diary
function lockResponse(data, status) {
  var receivedData = JSON.parse(data);
  console.log(receivedData);
  notes = receivedData["userSavedNote"];
  document.getElementById("passwordHint").innerHTML =
    receivedData["passwordHint"];
  document.getElementById("passwordHint").style.display = "none";
  document.getElementById("unlocked").style.display = "none";
  document.getElementById("locked").style.display = "block";
  return receivedData;
}

//Generating saved notes
function MakeNotes() {
  const noteList = document.getElementById("noteslist");
  notes.forEach(
    (e) =>
      (noteList.innerHTML += `<button onclick="DisplayNote(${e.number})">note ${e.number}</button><br>`),
  );
  DisplayNote(0);
}

//Displaying each note
function DisplayNote(n) {
  currentnote = n;
  console.log(currentnote + ":" + notes[n].content);
  const textBox = document.getElementsByTagName("input")[1];
  textBox.value = notes[n].content;
}

//Adding new notes
function AddNote() {
  const noteList = document.getElementById("noteslist");
  const noteNum = notes.length;
  const newNote = { number: noteNum, content: "" };
  notes.push(newNote);
  noteList.innerHTML += `<button onclick="DisplayNote(${noteNum})">note ${noteNum}</button><br>`;
  DisplayNote(noteNum); // Added just to show a new note right away JH
}

//Updating notes
function UpdateNote() {
  notes[currentnote].content = document.getElementsByTagName("input")[1].value;
}

//function to change CSS
function ChangeTheme() {
  //change the theme here
  const colors = {
    light: {
      background: "white",
      tdBorder: "black",
      inputBg: "rgb(220, 220, 220)",
      inputColor: "black",
      inputBorder: "black",
      h5Color: "black",
    },
    dark: {
      background: "rgb(15, 15, 15)",
      tdBorder: "white",
      inputBg: "rgb(37, 37, 37)",
      inputColor: "white",
      inputBorder: "white",
      h5Color: "white",
    },
  };
  var theme = document.getElementById("theme");
  document.getElementsByTagName("body")[0].style.backgroundColor =
    colors[theme.value].background;
  document
    .querySelectorAll("td")
    .forEach((e) => (e.style.borderColor = colors[theme.value].tdBorder));
  document.querySelectorAll("input").forEach((e) => {
    e.style.backgroundColor = colors[theme.value].inputBg;
    e.style.color = colors[theme.value].inputColor;
    e.style.borderColor = colors[theme.value].inputBorder;
  });
  document.getElementsByTagName("h5")[0].style.color =
    colors[theme.value].h5Color;
}

//Changing Font
function ChangeFont() {
  const chosenFont = document.getElementById("font").value;
  document.getElementsByTagName("input")[1].style.fontFamily = chosenFont;
}

//Change Style
let bold = 0;
let italic = 0;
let underlined = 0;

function ChangeStyles(style) {
  const bstyles = ["normal", "bold"];
  const istyles = ["normal", "italic"];
  const ustyles = ["none", "underline"];
  if (style == "b") {
    bold = 1 - bold;
    document.getElementsByTagName("input")[1].style.fontWeight = bstyles[bold];
  } else if (style == "i") {
    italic = 1 - italic;
    document.getElementsByTagName("input")[1].style.fontStyle = istyles[italic];
  } else if (style == "u") {
    underlined = 1 - underlined;
    document.getElementsByTagName("input")[1].style.textDecoration =
      ustyles[underlined];
  } else {
    bold = 0;
    italic = 0;
    underlined = 0;
    document.getElementsByTagName("input")[1].style.fontWeight = bstyles[bold];
    document.getElementsByTagName("input")[1].style.textDecoration =
      ustyles[underlined];
    document.getElementsByTagName("input")[1].style.fontStyle = istyles[italic];
  }
}
