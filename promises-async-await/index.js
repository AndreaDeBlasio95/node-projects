const fs = require("fs");
const { get } = require("http");
const { resolve } = require("path");
const superagent = require("superagent"); // Importing the superagent module

/*          LESSON 1: CALLBACK HELL
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
*/

//          LESSON 2: PROMISES
// --- PROMISES TO SOLVE CALLBACK HELL ---
/*
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      // .then method is used to handle the resolved promise (consuming the promise)
      if (err) return console.log(err.message);
      console.log(res.body.message);

      fs.writeFile("dog-img.txt", res.body.message, (err) => {
        console.log("Random dog image saved to file!");
      });
    })
    .catch((err) => {
      // .catch method is used to handle the rejected promise
      console.log(err.message);
    });
});
*/

//          LESSON 3: PROMISES
// read file using promises with async code (fs.readFile)
// this function is used in lesson 3 and 4
const readFileProm = (file) => {
  return new Promise((resolve, reject) => {
    // async code
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file"); // if there is an error, reject the promise
      resolve(data); // mark the promise as resolved
    });
  });
};

// this function is used in lesson 3 and 4
const writeFileProm = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write the file 😢");
      resolve("Success");
    });
  });
};

/* // PART OF LESSON 3
readFileProm(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`); // return the promise
  })
  .then((res) => {
    return writeFileProm("dog-img.txt", res.body.message); // return the promise
  })
  .then(() => {
    console.log("Random dog image saved to file!");
  })
  .catch((err) => {
    // .catch method is used to handle the rejected promise
    console.log(err.message);
  });
*/

//          LESSON 4: ASYNC/AWAIT
// async function to read the file
const getDogPicture = async () => {
  try {
    const data = await readFileProm(`${__dirname}/dog.txt`); // await the promise
    console.log(`Breed: ${data}`);

    const res1Prom = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Prom = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Prom = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    // run multiple promises at the same time
    const all = await Promise.all([res1Prom, res2Prom, res3Prom]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    await writeFileProm("dog-img.txt", imgs.join("\n")); // await the promise
    console.log("Random dog image saved to file!");
  } catch (err) {
    console.log(err.message);
    throw err; // this will throw the error to the next catch block (if there is one
  }
  return "2: READY 🐶";
};

//const picDog = getDogPicture();
//console.log(picDog); // this will return: Promise { <pending> }

/*
// using then and catch
// we use then each time we call an async function that returns a promise
getDogPicture()
  .then(() => {
    console.log("Finished getting dog picture");
  })
  .catch((err) => {
    console.log("ERROR 💥");
  });
*/

(async () => {
  try {
    console.log("1: Will get dog pics!");
    const dogPic = await getDogPicture();
    console.log(dogPic);
    console.log("3: Done getting dog pics!");
  } catch (err) {
    console.log("ERROR 💥");
  }
})();
