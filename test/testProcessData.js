//test cases for frontend and backend
assert = chai.assert;

describe("Locally testing a function which will be integrated as a post function in index.js (backend.js)", function () {
  it("Test 1: A correct response object is returned, if the password is entered incorrectly.", () => {
    //First call with a wrong password
    var testOneResult = responseFunction({
      action: "unlock",
      password: "wrongPassword",
      userUpdatedNote: {},
    });

    assert.equal(testOneResult["passwordBoolean"], false);
    assert.equal(testOneResult["wrongPasswordCount"], 1);
    assert.equal(testOneResult["passwordHint"], "");
    assert.equal(testOneResult["userSavedNote"], null);
  });

  it("Test 2: A password hint is returned and NO confidential information is returned, if the password is entered incorrectly more than three times.", () => {
    //Second call with a wrong password
    var testTwoResult = responseFunction({
      action: "unlock",
      password: "wrongPassword",
      userUpdatedNote: {},
    });
    //Third call with a wrong password
    testTwoResult = responseFunction({
      action: "unlock",
      password: "wrongPassword",
      userUpdatedNote: {},
    });

    assert.equal(testTwoResult["passwordBoolean"], false);
    assert.equal(testTwoResult["wrongPasswordCount"], 3);
    assert.equal(
      testTwoResult["passwordHint"],
      "PASSWORD HINT: MY FIRST CS COURSE NAME WAS E_C_####",
    );
    assert.equal(testTwoResult["userSavedNote"], null);
  });

  it("Test 3: All confidential information is returned, if the password is entered correctly.", () => {
    //Default note contents which will be saved in the server
    var answerArray = [
      "PLEASE SELECT A NOTE TO GET STARTED!",
      'HI, WE ARE THE GROUP "DIARY DESIGNERS", WE ARE A GROUP OF 4 PEOPLE: AISHWARYA, ALISHBA, JAE AND SANTUSHT',
      "HI, I AM AISHWARYA NARU. I AM A STUDENT AT YORK UNIVERSITY WORKING ON THIS PROJECT",
      "HI, I AM ALISHBA SIDDIQUI. I AM A STUDENT AT YORK UNIVERSITY WORKING ON THIS PROJECT",
      "HI, I AM JAEHOON SUNG. I AM A STUDENT AT YORK UNIVERSITY WORKING ON THIS PROJECT",
      "HI, I AM SANTUSHT ARORA. I AM A STUDENT AT YORK UNIVERSITY WORKING ON THIS PROJECT",
    ];

    //Call with a correct password
    var testThreeResult = responseFunction({
      action: "unlock",
      password: "EECS1012",
      userUpdatedNote: {},
    });

    assert.equal(testThreeResult["passwordBoolean"], true);
    assert.equal(testThreeResult["wrongPasswordCount"], 3);
    assert.equal(
      testThreeResult["passwordHint"],
      "PASSWORD HINT: MY FIRST CS COURSE NAME WAS E_C_####",
    );
    for (i = 0; i < 6; i++) {
      assert.equal(testThreeResult["userSavedNote"][i].number, i);
    }
    for (i = 0; i < 6; i++) {
      assert.equal(testThreeResult["userSavedNote"][i].content, answerArray[i]);
    }
  });

  it("Test 4-1 : NO confidential information including a password hint is returned, if the request to lock the diary is inputted, regardless of other values stored in the request object.", () => {
    //action is "lock"
    var testFourOneResult = responseFunction({
      action: "lock",
      password: "wrongPassword", //Wrong Password
      userUpdatedNote: {}, //Random Update for Notes Data
    });

    assert.equal(testFourOneResult["passwordBoolean"], false);
    assert.equal(testFourOneResult["wrongPasswordCount"], 0);
    assert.equal(testFourOneResult["passwordHint"], "");
    assert.equal(testFourOneResult["userSavedNote"], null);
  });

  it("Test 4-2 : NO confidential information including a password hint is returned, if the request to lock the diary is inputted, regardless of other values stored in the request object.", () => {
    //action is "lock"
    var testFourTwoResult = responseFunction({
      action: "lock",
      password: "EECS1012", //Correct Password
      userUpdatedNote: [
        { number: 7, content: "Only Note 7 should be stored now..." }, // This data will be used for Test 5
      ],
    });

    assert.equal(testFourTwoResult["passwordBoolean"], false);
    assert.equal(testFourTwoResult["wrongPasswordCount"], 0);
    assert.equal(testFourTwoResult["passwordHint"], "");
    assert.equal(testFourTwoResult["userSavedNote"], null);
  });

  it("Test 5 : Updated note data are received, if the user unlocks the diary again. For this test case, the updated note data must be equal to the userUpdatedNote in Test 4-2", () => {
    //Call with a correct password again!
    var testFiveResult = responseFunction({
      action: "unlock",
      password: "EECS1012",
      userUpdatedNote: {},
    });
    assert.equal(testFiveResult["passwordBoolean"], true);
    assert.equal(testFiveResult["wrongPasswordCount"], 0);
    assert.equal(testFiveResult["passwordHint"], "");
    //userSavedNote must be equal to the userUpdatedNote which was sent in Test 4-2.
    assert.equal(testFiveResult["userSavedNote"][0].number, 7);
    assert.equal(
      testFiveResult["userSavedNote"][0].content,
      "Only Note 7 should be stored now...",
    );
  });
});
