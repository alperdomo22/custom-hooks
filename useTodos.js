import { useEffect, useReducer } from 'react';
import { todoReducer } from '../08-useReducer/todoReducer';

export const useTodos = (initialState = []) => {

    const init = () => {
        return JSON.parse(localStorage.getItem('todos')) || [];
    };

    const [todos, dispatch] = useReducer(todoReducer, initialState, init);

    const allTodos = todos.length;

    const pendingTodos = todos.filter(todo => !todo.done).length;

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleNewTodo = (todo) => {
        const actionNew = {
            type: 'Add Todo',
            payload: todo
        };

        dispatch(actionNew);
    };

    const handleDeleteTodo = (id) => {
        const actionDelete = {
            type: 'Remove Todo',
            payload: id
        };
        dispatch(actionDelete);
    };

    const handleToggleTodo = (id) => {
        const actionToggle = {
            type: 'Toggle Todo',
            payload: id
        }
        dispatch(actionToggle);
    };

    return {
        todos,
        allTodos,
        pendingTodos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo
    }
}