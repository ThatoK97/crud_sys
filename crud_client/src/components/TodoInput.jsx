import React, { useState } from "react";

const TodoInput = ({createTodoItem}) => {
    const [value, setValue] = useState("");
    
    const handleSubmit = e => {
        e.preventDefault();

        if (value === "") console.log("Please add something to-do");
        createTodoItem(value);
        setValue("");
        }

    return (
    <form onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="create todo"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleSubmit}>Create</button>
    </form>
)};

export default TodoInput