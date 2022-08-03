const apiUrl = "http://localhost:3001/todos/";

// get and list all todos
export function getTodos() {
    return fetch(apiUrl);
}

// get specific todo
// export function getTodo(todo) {
//     return fetch(`apiUrl/${todo.id}`)
// }

// add todo 
export function addTodo(todo) {
    return fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }})
}

// update todos
export function updateTodo(todo) {
    return fetch(`apiUrl/${todo.id}`, {
        method: 'PUT',
        body: JSON.stringify(todo),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }})
}

// remove or delete todo
export function deleteTodo(todo) {
    return fetch(`apiUrl/${todo.id}`, {
        method: 'DELETE'
    });
}