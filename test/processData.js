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

//Confidential & Critical Data are here!
const USER_PASSWORD = "EECS1012";
const PASSWORD_HINT = "PASSWORD HINT: MY FIRST CS COURSE NAME WAS E_C_####";
let wrongPasswordCount = 0;
let USER_SAVED_NOTE = [
  { number: 0, content: "PLEASE SELECT A NOTE TO GET STARTED!" },
  {
    number: 1,
    content:
      'HI, WE ARE THE GROUP "DIARY DESIGNERS", WE ARE A GROUP OF 4 PEOPLE: AISHWARYA, ALISHBA, JAE AND SANTUSHT',
  },
  {
    number: 2,
    content:
      "HI, I AM AISHWARYA NARU. I AM A STUDENT AT YORK UNIVERSITY WORKING ON THIS PROJECT",
  },
  {
    number: 3,
    content:
      "HI, I AM ALISHBA SIDDIQUI. I AM A STUDENT AT YORK UNIVERSITY WORKING ON THIS PROJECT",
  },
  {
    number: 4,
    content:
      "HI, I AM JAEHOON SUNG. I AM A STUDENT AT YORK UNIVERSITY WORKING ON THIS PROJECT",
  },
  {
    number: 5,
    content:
      "HI, I AM SANTUSHT ARORA. I AM A STUDENT AT YORK UNIVERSITY WORKING ON THIS PROJECT",
  },
];

//Corresponding data to the data above
let passwordBoolean = false;
wrongPasswordCount = 0;
let passwordHint = "";
let userSavedNote = null;

/**
 * Post functions to process the requests from frontend.js.
 */
function responseFunction(reqObject) {
  let data = reqObject;

  if (data["action"] == "unlock") {
    if (data["password"] == USER_PASSWORD) {
      passwordBoolean = true;
      userSavedNote = USER_SAVED_NOTE;
    } else {
      wrongPasswordCount++;
      if (wrongPasswordCount >= 3) {
        passwordHint = PASSWORD_HINT;
      }
    }
  } else if (data["action"] == "lock") {
    // Initialize all data with default values
    // Will send them to overwrite confidential information on frontend before locking the diary
    passwordBoolean = false;
    wrongPasswordCount = 0;
    passwordHint = "";
    userSavedNote = null;
    // Update a note object
    USER_SAVED_NOTE = data["userUpdatedNote"];
  }
  let resObject = {
    passwordBoolean: passwordBoolean,
    wrongPasswordCount: wrongPasswordCount,
    passwordHint: passwordHint,
    userSavedNote: userSavedNote,
  };

  return resObject;
}
