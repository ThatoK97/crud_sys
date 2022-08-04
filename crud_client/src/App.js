import React, { useEffect, useState } from "react";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./services";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Container,
  Checkbox,
  Box,
  Flex,
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
  Button,
  Image,
  useDisclosure,
  HStack
} from "@chakra-ui/react";
import "./App.css";
import TodoInput from "./components/TodoInput";
import TodoItem from "./components/TodoItem";


function App() {
  const [todoItems, setTodoItems] = useState(
    [{todo: 'Mow the lawn',
    complete: false},
    {todo: 'Do Laundry',
    complete: false},
    {todo: 'Make Dinner',
    complete: false}]
    );

  const createTodoItem = (todo) => {
    const newTodoItems = [...todoItems, { todo, complete: false }];
    setTodoItems(newTodoItems);
  };

  const deleteTodoItem = (index) => {
    const newTodoItems = [...todoItems];
    newTodoItems.splice(index, 1);
    setTodoItems(newTodoItems);
  };

  const completeTodoItem = (index) => {
    const newTodoItems = [...todoItems];

    newTodoItems[index].complete === false 
    ? (newTodoItems[index].complete = true)
    : (newTodoItems[index].complete = false);

    setTodoItems(newTodoItems)
  };

  const updateTodoItem = (index) => {
    const newTodoItems = [...todoItems];
    const item = newTodoItems[index];
    let newItem = prompt(`Update ${item.todo}?`, item.todo);
    let todoObj = { todo: newItem, complete: false };
    newTodoItems.splice(index, 1, todoObj);
    if (newItem === null || newItem === "") {
    return;
    } else {
    item.todo = newItem;
    }
    setTodoItems(newTodoItems);
  };







  // const [todos, setTodos] = useState([]);
  // const [todo, setTodo] = useState({});

  // const [users, setUsers] = useState([]);
  // const [photos, setPhotos] = useState([]);
  // const [query, setQuery] = useState("");
  // const { isOpen, onOpen, onClose } = useDisclosure()
  
  // const inputHandler = e => setQuery(e.target.value);
  
  // useEffect(() => {
  //   const fetchUserData = () => {
  //     fetch(`http://localhost:3001?q=${query}`)
  //       .then(res => res.json())
  //       .then(users => updateUsers(users))
  //       .catch(error => console.log(error.message))
  //     }
  //     if (query.length >= 0) fetchUserData();
  //   }, [query]);

  //   useEffect(() => {
  //     const fetchTodos = () => {
  //       fetch("http://localhost:3001/todos")
  //         .then(resp => resp.json())
  //         .then(todos => updateTodos(todos))
  //     }
  //     fetchTodos();
  //   }, []);

  //   useEffect(() => {
  //     const fetchPhotos = () => {
  //       fetch("http://localhost:3001/photos/")
  //         .then(resp => resp.json())
  //         .then(photos => updatePhotos(photos))
  //     }
  //     fetchPhotos();
  //   }, []);

  // const updateUsers = users => setUsers(users);
  // const updatePhotos = photos => setPhotos(photos);

  // const updateTodos = todos => setTodos(todos);

  // handle input changes on currentTodo
  // const handleChange = e => setTodo({
  //   ...todo,
  //   [e.currentTarget.value]: e.currentTarget.value
  // });
  // // handle submit
  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await addTodo(todo);
  //     const items = todos.push(data);
  //     setTodos(...items);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // // handle todo update
  // const handleUpdate = async todo => {
  //   try {
  //     const data = todos.find(item => item.id === todo.id);
  //     const items = data.completed === true ? data : await updateTodo(data, {
  //       ...data,
  //       completed: !data.completed
  //     });
  //     setTodos(items);
  //   } catch (error) {
  //     console.log(error);

  //   }
  // }
  // // handle todo deletions
  // const handleDelete = async todo => {
  //   try {
  //     const itemToDelete = todos.filter(item => todo.id === item.id);
  //     setTodos(...todos);
  //     await deleteTodo(itemToDelete);
  //   } catch (error) {
  //     setTodos(...todos);
  //     console.error(error);
  //   }
  // } 

  // useEffect(() => {
  //   const fetchTodos = async () => {
  //     try {
  //       const { data } = await getTodos();
  //       setTodos(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   fetchTodos();
  // }, []);

  return (
    <div className="App">
        {/* <Box>
        <Flex
          minWidth="max-content"
          alignItems="center"
          gap={2}
          >
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
          </Flex>
        </Box>
    
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
              <Th>Surname</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
            {users
              .filter(user => user?.username.toLowerCase().includes(query))
              .map(item => {
                return <Td key={item.id} onClick={onOpen}>{item.username}</Td>
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
              {users.map(u => (<Text>{u.email}, {u.phone} | {u.website}</Text>))}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Edit</Button>
            <Button variant='ghost'>Undo</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {''} */}
    
      <Container maxW='md' bg='gray' centerContent>
        <TodoInput createTodoItem={createTodoItem} />
        {todoItems.map((item, index) => (
          <TodoItem
          key={index}
          index={index} 
          item={item} 
          deleteTodoItem={deleteTodoItem}
          completeTodo={completeTodoItem}
          updateTodo={updateTodoItem}
          />
        ))}
      </Container>
</div>
  );
}

export default App;
