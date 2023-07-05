// starter code provided from T5 slides

const express = require("express");
const app = express();

app.use(express.json());

// initialize user data array with sample users
let users = [
  { email: "donaldduck@dal.ca", firstName: "Donald", lastName: "Duck", id: "123" },
  { email: "daisyduck@dal.ca", firstName: "Daisy", lastName: "Duck", id: "456" },
];

// GET request to return all users
app.get("/users", (req, res, next) => {
  res.status(200).json({
    message: "Users successfully retrieved!",
    success: true,
    users: users,
  });
});

// PUT request to update email and first name given the ID
app.put("/update/:id", (req, res, next) => {
  const email = req.body.email;
  const firstName = req.body.firstName;

  const selectedUser = users.find((user) => user.id === req.params.id);

  if (selectedUser) {
    selectedUser.email = email;
    selectedUser.firstName = firstName;
    res.status(200).json({
      message: "User successfully updated!",
      success: true,
      user: {
        email: email,
        firstName: firstName,
      },
    });
  } else {
    res.status(404).json({
      message: "User not found!",
      success: false,
    });
  }
});

// POST request to add new user object with generated ID
app.post("/add", (req, res, next) => {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  // generate random ID of three digits (not ideal, but works for T5)
  const id = (Math.floor(Math.random() * 900) + 100).toString();

  const newUser = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    id: id,
  };

  // update user array defined above
  users.push(newUser);

  res.status(201).json({
    message: "User successfully added!",
    success: true,
  });
});

// GET request that returns user given the ID
app.get("/user/:id", (req, res, next) => {
  const selectedUser = users.find((user) => user.id === req.params.id);

  if (selectedUser) {
    res.status(200).json({
      message: "User successfully retrieved!",
      success: true,
      user: selectedUser,
    });
  } else {
    res.status(404).json({
      message: "User not found!",
      success: false,
    });
  }
});

module.exports = app;
