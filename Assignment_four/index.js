const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());

function readUsers() {
    const users = fs.readFileSync("./users.json", "utf-8");
    return JSON.parse(users);
}

function addUsers(user) {
    const users = readUsers();
    users.push(user);
    fs.writeFileSync("./users.json", JSON.stringify(users));
}

function UpdateUsers(user) {
    fs.writeFileSync("./users.json", JSON.stringify(user));
}

// 1. Create an API that adds a new user to your users stored in a JSON file. (ensure that the email of the new user doesn’t exist before)(1
// Grades)
app.post('/add-user', (req, res) => {
    const { name, age, email } = req.body;
    const users = readUsers();
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
    }
    const newUser = { id: users.length + 1, name, age, email };
    addUsers(newUser);
    res.status(201).json({ message: "User added successfully", user: newUser });
});

//2. Create an API that updates an existing user's name, age, or email by their ID. The user ID should be retrieved from the params.
app.patch('/update-user/:id', (req, res) => {
    const { id } = req.params;
    const { name, age, email } = req.body;
    const users = readUsers();
    const userIndex = users.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
    }
    const updatedUser = { ...users[userIndex], name, age, email };
    users[userIndex] = updatedUser;
    UpdateUsers(users);
    res.json({ message: "User updated successfully", user: updatedUser });
});

//3. Create an API that deletes a User by ID. The user id should be retrieved from either the request body or optional params.
app.delete('/delete-user/:id', (req, res) => {
    const { id } = req.params;
    const users = readUsers();
    const userIndex = users.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
    }
    users.splice(userIndex, 1);
    UpdateUsers(users);
    res.json({ message: "User deleted successfully" , users: users });
});

//4.Create an API that gets a user by their name. The name will be provided as a query parameter.
app.get('/user/getByName', (req, res) => {
    const { name } = req.query;
    const users = readUsers();
    const user = users.find(user => user.name.toLowerCase() === name.toLowerCase());
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
});

//5.Create an API that gets all users from the JSON file.
app.get('/get-users', (req, res) => {
  res.json(readUsers());
});

//6.Create an API that filters users by minimum age.
app.get('/users/filter', (req, res) => {
    const { minAge } = req.query;
    const users = readUsers();
    const filteredUsers = users.filter(user => user.age >= parseInt(minAge));
    res.json(filteredUsers);
});

//7.Create an API that gets User by ID.
app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    const users = readUsers();
    const user = users.find(user => user.id === parseInt(id));
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});