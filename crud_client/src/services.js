// get and list all todos
export function getTodos() {
    return fetch("/todos")
}

// add todo 
export function addTodo(todo) {
    return fetch("/todos", {
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(todo),
    })
}

// update todo
export function updateTodo(todo) {
    return fetch(`/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(todo),
    })
}

// remove or delete todo
export function deleteTodo(todo) {
    return fetch(`/todos/${todo.id}`, {
        method: 'DELETE'
    });
}