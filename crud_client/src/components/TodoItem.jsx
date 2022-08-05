import { Button, Flex, List, ListItem, ListIcon, HStack, Text } from "@chakra-ui/react";
import { MdSettings } from "react-icons/md";

const TodoItem = ({todo, deleteTodoItem, completeTodoItem, updateTodoItem}) => {
    return (
        <Flex wrap="wrap">
            <List>
                <ListItem>
                    <ListIcon as={MdSettings} color='green.500' /> 
                    {todo.completed === true 
                    ? <Text as="s">{ todo.title }</Text> 
                    : <Text>{ todo.title }</Text>}
                </ListItem>
            </List>
            <HStack spacing={3}>
                <Button variant="outline" colorScheme="teal" size="sm" onClick={() => completeTodoItem(todo)}>Complete</Button>
                <Button variant="outline" colorScheme="teal" size="sm" onClick={() => updateTodoItem(todo)}>Update</Button>
                <Button variant="outline" colorScheme="teal" size="sm" onClick={() => deleteTodoItem(todo)}>Delete</Button>
            </HStack>
        </Flex>
    )
    };

export default TodoItem;