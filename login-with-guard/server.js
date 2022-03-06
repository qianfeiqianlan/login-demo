process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const express = require("express");
const { getUserDetail } = require("./user");
const app = express();
const port = 3001;

app.use(express.static("../guard-demo/build"));

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  getUserDetail(id)
    .then((u) => {
      res.json(u);
    })
    .catch((e) => {
      res.json(e);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
