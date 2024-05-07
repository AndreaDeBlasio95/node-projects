const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  // Specify the path to the large text file
  // __dirname is a global variable in Node.js that represents the directory of the current file
  const filePath = path.join(__dirname, "largefile.txt");

  // Create a readable stream to read the large text file
  const readStream = fs.createReadStream(filePath);

  // Set the Content-Type for the response
  // Content-Type: text/plain indicates that the response body is plain text
  // Keyword "Content-Type" is case-insensitive, so you can also use "content-type" and is used to indicate the media type of the resource.
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });

  // Pipe the readable stream directly to the response
  // This sends the file contents to the client chunk by chunk
  readStream.pipe(res);

  readStream.on("error", (error) => {
    console.error("Error reading the file:", error);
    res.writeHead(500);
    res.end("Error occurred while reading the file.");
  });

  // Close the response stream after the file has been read and sent
  readStream.on("end", () => {
    res.end();
    console.log("Finished sending the file.");
  });
});

const port = 3000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
