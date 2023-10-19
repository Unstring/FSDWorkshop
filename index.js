const express = require("express");
const morgan = require("morgan");

dotenv.config();

const app = express();


app.use(morgan("dev"));
app.use(cors());


app.get("/", (req, res) => {
  fs.readFile("docs/apiDocs.json", (err, data) => {
    if (err) {
      res.status(400).json({ error: err });
    }
    const docs = JSON.parse(data);
    res.json(docs);
  });
});

app.use((err, req, res) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Unauthorized " });
  }
});

const port =  3000;
app.listen(port, () => {
  console.log(`the  server is running on port ${port}`);
});
