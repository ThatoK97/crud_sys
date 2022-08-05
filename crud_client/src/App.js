import React, { useEffect, useReducer, useState } from "react";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./services";
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  FormHelperText,
  Box,
  Spacer,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import "./App.css";
import TodoItem from "./components/TodoItem";

// initialise todo data to update in useReducer()
const initialData = {
  userId: Math.round(Math.random() * 10),
  id: Math.round(Math.random() * 10),
  title: "",
  completed: false
};

// define reducer function
const reducer = (todo, { field, value }) => {
  return {
    ...todo,
    [field]: value
  };
};

function App() {
  // set state variables 
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [todoItems, setTodoItems] = useState([]);
  const [todo, dispatchTodo] = useReducer(reducer, initialData);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const inputHandler = e => setQuery(e.target.value);
  const updateUsers = users => setUsers(users);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await (await getTodos()).json();
        setTodoItems(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTodos();
  }, []);

  useEffect(() => {
    const fetchUserData = () => {
      fetch(`/users?q=${query}`)
        .then(res => res.json())
        .then(users => updateUsers(users))
        .catch(error => console.log(error.message))
    }
    if (query.length >= 0) fetchUserData();
  }, [query]);

  const createTodoItem = () => {
    return {
      ...todo,
      title: title,
      completed: false
    }
  };

  // handle input changes on currentTodo
  const handleInput = e => {
    dispatchTodo({ field: e.target.name, value: e.target.value })
  };

  // destructure value of todo title
  const { title } = todo;

  // handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const todoObj = createTodoItem();
      await (await addTodo(todoObj)).json();
      dispatchTodo(todoObj);
      const newTodos = todoItems.unshift(todoObj);
      setTodoItems([...newTodos]);
    } catch (error) {
      console.error(error);
    }
  };

  // handle delete todo item
  const deleteTodoItem = async (todo) => {
    const initialTodos = todoItems;
    try {
      const noDelete = initialTodos.filter(t => todo.id !== t.id);
      const toDelete = initialTodos.find(d => todo.id === d.id );
      setTodoItems([...noDelete]);
      await (await deleteTodo(toDelete)).json();
    } catch (error) {
      setTodoItems(initialTodos);
      console.log(error);
    }
  };

  // handle completed todos
  const handleCompleted = todo => {
    const tData = todoItems.find(item => item.id === todo.id);
    const newData = tData.completed === true
                    ? tData.completed === false
                    : tData.completed === true;
    dispatchTodo(newData);
  }

  // handle update
  const updateTodoItem = async (todo) => {
    try {
      const data = todoItems.find(item => item.id === todo.id);
      await (await updateTodo(data)).json();
      dispatchTodo(data);
    } catch (error) {
      console.log(error);
    };
  };

  return (
    <div className="App">
      <Box p={2}>
        <Heading size="md">CRUD_SYS App</Heading>
      </Box>
      <Spacer />
      <Input 
      placeholder="Search..."
      size="sm"
      width="50"
      onChange={inputHandler}
      display="block"
      />
    
        <TableContainer>
        <Table variant="striped" colorScheme="gray" size="md">
          <TableCaption>~ Users can view, create, edit and delete to do's. ~</TableCaption>
          <Thead>
            <Tr>
              <Th>Users</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
            {users
              .filter(user => user?.name.toLowerCase().includes(query))
              .map(item => {
                return <Td key={item.id} onClick={onOpen}>{item.name}</Td>
              })}
            </Tr>
          </Tbody>
          <Thead>
            <Tr>
              <Th>Username</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
            {users
              .filter(user => user?.username.toLowerCase().includes(query))
              .map(item => {
                return <Td key={item.id} onClick={onOpen}>@{item.username}</Td>
              })}
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    
      <Modal size="sm" isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>CONTACTS</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              {users.map(u => {
                return (<Text key={u.id}>{u.email}, {u.phone} | {u.website}</Text>)})}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      <Box maxW="lg" borderWidth="2px" borderRadius="lg" m={5} p={8} overflow="hidden">
        <FormControl p={4} m={3} >
          <FormLabel>TODO LIST</FormLabel>
          <Input
          type="text"
          placeholder="create todo"
          name="title"
          value={title}
          onChange={handleInput}
          />
                
          <Button variant="outline" size="sm" colorScheme="blue" onClick={handleSubmit}>Create TO DO</Button>
          <FormHelperText>This form allows you to add, update and delete your todo list</FormHelperText>
        </FormControl>
        
        {todoItems.slice(0, 9).map((todo, index) => {
          return (<TodoItem
          key={index}
          todo={todo}
          handleCompleted={handleCompleted}
          deleteTodoItem={deleteTodoItem}
          updateTodoItem={updateTodoItem}
          />)
          })
        } 
      </Box>
    </div>
  );
}

export default App;
