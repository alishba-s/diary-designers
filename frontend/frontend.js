/**
 * This is how we make a request to our backend.
 *
 * The route we are pointing to is `/`. We can figure this out by finding the characters after the domain name is complete.
 * In this example, the domain name is `localhost:8000`.
 *
 * If I were to make a request to http://ericmarcantonio.com/api/, the route would be `/api/`.
 */
$.getJSON("http://localhost:8000/", function (data) {
  document.getElementById("raw").innerHTML = JSON.stringify(data); //this takes the raw json object and converts it into a string
  document.getElementById("key").innerHTML = JSON.stringify(
    Object.keys(data)[0],
  );
  // Don't worry too much about this, I just wanted to show you how to access the key of the object
  document.getElementById("value").innerHTML = JSON.stringify(data.ping); //this shows you how to access a value of an object by using its key (in this case `ping`)
});
