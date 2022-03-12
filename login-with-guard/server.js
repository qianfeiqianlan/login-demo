process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const express = require("express");
const { getUserDetail, convertCorrectUserInfo } = require("./user");
const app = express();
const port = 3001;

app.use(express.static("../guard-demo/build"));

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const identityId = req.query.identityId;
  getUserDetail(id)
    .then((u) => {
      // const s = u.identities?.find((i) => i.id == identityId);
      const user = convertCorrectUserInfo(u, identityId);
      res.json(user);
    })
    .catch((e) => {
      res.json(e);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
