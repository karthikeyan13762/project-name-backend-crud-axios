const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const UserModel = require("./models/User");
app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("mongo db connected successfully");
});
// ---------------------------------------
app.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
// ---------------------------------------
app.get("/users", (req, res) => {
  UserModel.find({})
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
// ---------------------------------------
app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
// ---------------------------------------
app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  UserModel.findByIdAndUpdate({ _id: id }, updatedData)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
// ---------------------------------------
app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  UserModel.deleteMany({ _id: id })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
app.listen(process.env.PORT || 3001, () => {
  console.log(`server is running at http://${"127.0.0.1"}:${3001}`);
});
