// Part2: Simple CRUD Operations Using HTTP
const fs = require("fs");
const http = require("http");

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

const server = http.createServer((req, res) => {
    const { url, method } = req;

    //1. Create an API that adds a new user to your users stored in a JSON file. (ensure that the email of the new user doesn’t exist before)
    if (url === "/add-user" && method === "POST") {
        let data = "";
        req.on("data", (chunk) => {
            data = JSON.parse(chunk);
        });
        req.on("end", () => {
            const users = readUsers();
            const existEmail = users.find((user) => user.email === data.email);
            if (existEmail) {
                res.end(JSON.stringify({
                    message: "user already exists"
                }));
                return;
            } else {
                const userId = users.length + 1;
                data.id = userId;
                addUsers(data);
                res.end(JSON.stringify({
                    message: "user added successfully",
                    user: data
                }));
            }
        });
    }

    //2. Create an API that updates an existing user's name, age, or email by their ID. The user ID should be retrieved from the URL.
    if (url.startsWith("/update-user/") && method === "PATCH") {
        let data = "";
        req.on("data", (chunk) => {
            data = JSON.parse(chunk);
        });
        req.on("end", () => {
            const users = readUsers();
            const user = users.find((user) => user.id === parseInt(url.split("/")[2]));
            if (user) {
                user.name = data.name || user.name;
                user.age = data.age || user.age;
                user.email = data.email || user.email;
                UpdateUsers(users);
                res.end(JSON.stringify({
                    message: "user updated successfully",
                    user: user
                }));
            } else {
                res.end(JSON.stringify({
                    message: "user not found"
                }));
                return;
            }
        });
    }

    //3. Create an API that deletes a User by ID. The user id should be retrieved from the URL.
    if (url.startsWith("/delete-user/") && method === "DELETE") {
        const users = readUsers();
        const user = users.findIndex((user) => user.id === parseInt(url.split("/")[2]));
        if (user) {
            users.splice(user, 1);
            UpdateUsers(users);
            res.end(JSON.stringify({
                message: "user deleted successfully",
                user: users
            }));
        } else {
            res.end(JSON.stringify({
                message: "user not found"
            }));
            return;
        }
    }

    //4. Create an API that gets all users from the JSON file.
    if (url === "/get-users" && method === "GET") {
        const users = readUsers();
        res.end(JSON.stringify({
            message: "users fetched successfully",
            users: users
        }));
    }

    //5. Create an API that gets User by ID.
    if (url.startsWith("/get-user/") && method === "GET") {
        const users = readUsers();
        const user = users.find((user) => user.id === parseInt(url.split("/")[2]));
        if (user) {
            res.end(JSON.stringify({
                message: "user fetched successfully",
                user: user
            }));
        } else {
            res.end(JSON.stringify({
                message: "user not found"
            }));
            return;
        }
    }
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});