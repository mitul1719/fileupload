const express = require("express");
const cors = require("cors");
const os = require("os");
const fs = require("fs/promises");
const app = express();

app.use(cors());
app.use(express.json());

const multer = require("multer");
const save = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("hi fro  save");
    cb(null, "./public");
  },
  filename: (req, file, cb) => {
    cb(null, `something.pdf`);
  },
});
const upload = multer({ storage: save });

console.log(os.tmpdir());

app.post("/file", upload.single("file"), async (req, res) => {
  try {
    const files = await fs.readFile("./public/something.pdf", "utf-8");
    console.log(files);
    res.status(200).json({ file: "upload successfull" });
  } catch (error) {
    handleError(error);
  }
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
