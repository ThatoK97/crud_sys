import express from "express";
const router = express.Router();

router.post("/todos", async (req, res) => {
    try {
        const { todos } = req.body;
        const { userId, id, title, completed } = todos;
        if (title === "") res.status(400).send("Todo requires title string");
        res.send({ 
            userId: userId,
            id: id,
            title: title,
            completed: completed
         });
    } catch (error) {
        res.send(error);
    }
});

router.get("/todos", async (req, res) => {
    try {
        const { todos } = req.query;
        res.send(todos);
    } catch (error) {
        res.send(error);
    }
});

router.put("/todos/:id", async (req, res) => {
    try {
        const {todo} = req.params.id;
        res.send(todo);
    } catch (error) {
        res.send(error);
    }
});

router.delete("/todos/:id", async (req, res) => {
    try {
        const { todo } = req.params.id;
        res.send(todo);
    } catch (error) {
        res.send(error);
    }
});

export default router;