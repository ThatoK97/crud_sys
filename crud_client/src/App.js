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
  Stack,
  Button,
  Image,
  useDisclosure
} from "@chakra-ui/react";
import "./App.css";


function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({});

  const [users, setUsers] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const inputHandler = e => setQuery(e.target.value);
  
  useEffect(() => {
    const fetchUserData = () => {
      fetch(`http://localhost:3001?q=${query}`)
        .then(res => res.json())
        .then(users => updateUsers(users))
        .catch(error => console.log(error.message))
      }
      if (query.length >= 0) fetchUserData();
    }, [query]);
  
  const updateUsers = users => setUsers(users);
  const updatePhotos = photos => setPhotos(photos);
  useEffect(() => {
    const fetchPhotos = () => {
      fetch("http://localhost:3001/photos/")
        .then(resp => resp.json())
        .then(photos => updatePhotos(photos))
    }
    fetchPhotos();
  }, []);

  useEffect(() => {
    const fetchTodos = () => {
      fetch("http://localhost:3001/todos/")
        .then(resp => resp.json())
        .then(todos => updateTodos(todos))
    }
    fetchTodos();
  }, []);

  const updateTodos = todos => setTodos(todos);

  // handle input changes on currentTodo
  const handleChange = e => setTodo({
    ...todo,
    [e.currentTarget.value]: e.currentTarget.value
  })
  // handle submit
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const { data } = await addTodo(todo);
      const items = todos.push(data);
      setTodos(...items);
    } catch (error) {
      console.log(error);
    }
  }
  // handle todo update
  const handleUpdate = async todo => {
    try {
      const data = todos.find(item => item.id === todo.id);
      const items = data.completed === true ? data : await updateTodo(data, {
        ...data,
        completed: !data.completed
      });
      setTodos(items);
    } catch (error) {
      console.log(error);

    }
  }
  // handle todo deletions
  const handleDelete = async todo => {
    try {
      const itemToDelete = todos.filter(item => todo.id === item.id);
      setTodos(...todos);
      await deleteTodo(itemToDelete);
    } catch (error) {
      setTodos(...todos);
      console.error(error);
    }
  } 

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await getTodos();
        setTodos(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchTodos();
  }, []);

  return (
    <div className="App">
        <Box>
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
                return <Td key={item.id}>{item.name}</Td>
              })}
            </Tr>
          </Tbody>
          <Thead>
            <Tr>
              <Th>Photos</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
            {users
              .map(u => (<Td onClick={onOpen} key={u.id}>Open {u.username} photo</Td>))}
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>PHOTOS</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Stack spacing={6}>
              {photos.map(photo => (
                <Box boxSize='sm'>
                <Image key={photo.id} src={photo.url} boxSize="100px" alt={photo.thumbnail} borderRadius="full" />
              </Box>
              )).slice(0, 5)}
              </Stack>
            </Box>
          </ModalBody>
    
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Delete
            </Button>
            <Button variant='ghost'>Edit</Button>
            <Button variant='ghost'>Undo</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {''}
    
      <Container maxW='md' bg='gray' centerContent>
          <FormControl onSubmit={handleSubmit}>
            <FormLabel>TO DO</FormLabel>
            <Input
            variant="outlined"
            size="sm"
            value={todo.title}
            required={true}
            onChange={handleChange}
            placeholder="Add New TODO"
            />
            <Button
            color="teal"
            variant="outlined"
            type="submit"
            >
              Add Todo
            </Button>
            <FormHelperText>Type your to do here...</FormHelperText>
          </FormControl>

              {todos.map((todo) => (
                  <Container
                      key={todo.id}
                      className="flex task_container"
                  >
                      <Checkbox
                          checked={todo.completed}
                          onClick={() => handleUpdate(todo)}
                          color="primary"
                      />
                      <Box
                          className={
                              todo.completed
                                  ? "todo line_through"
                                  : "todo"
                          }
                      >
                          {todo.title}
                      </Box>
                      <Button
                          onClick={() => handleDelete(todo)}
                          color="gray.400"
                        >
                          delete
                      </Button>
                  </Container>
              ))}
      </Container>
</div>
  );
}

export default App;
