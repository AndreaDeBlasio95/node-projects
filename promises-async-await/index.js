const fs = require("fs");
const superagent = require("superagent"); // Importing the superagent module

// --- CALLBACK HELL ---
// Reading the file dog.txt
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);
  // Fetching the image of the dog
  // .get method is used to make a GET request to the API
  // .end method is used to end the request and get the response
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      // If there is an error, log the error message, and the function stops
      if (err) return console.log(err.message);

      console.log(res.body.message);

      fs.writeFile("dog-img.txt", res.body.message, (err) => {
        console.log("Random dog image saved to file!");
      });
    });
});
// --- END CALLBACK HELL ---
