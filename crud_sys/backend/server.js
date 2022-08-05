import todos from "./routes.js";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import express from 'express';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const port = process.env.PORT ?? 3001;

// fetch users
function fetchUsers(req, res) {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(resp => resp.json())
        .then(data => res.send(search(data)))
        .catch(error => console.error(error.message))
    
    const keys = ["name"];
    const { q } = req.query;
    const search = qData => {
        return qData
                .filter(item => 
                                keys.some(key => item[key].toLowerCase().includes(q)));
    };
}

// fetch todos
function getTodos(req, res) {
    fetch("https://jsonplaceholder.typicode.com/todos")
        .then(result => result.json())
        .then(tData => res.send(tData))
        .catch(error => console.error(error.message))
}

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// server todos 
app.use("/todos/", todos);

// "GET" routes to the server
app.get("/users/", fetchUsers);
app.get("/todos/", getTodos);

// listen on port
app.listen(port);

