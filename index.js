// Import
const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Static Files
app.use(express.static("public"));

app.use("/styles", express.static(__dirname + "public/styles"));

// app.use('/js', express.static(__dirname + 'public/js'))
app.use("/images", express.static(__dirname + "public/images"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get("/grooming", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/grooming.html"));
});
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.get("/groom.html", (req, res) => {
//   res.send("Hello World!");
// });

// Listen on port 3000
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
