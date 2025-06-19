import React from 'react';
import './App.css';
import useFetchApi from "../../hooks/useFetchApi";
import Delete from "../Actions/Delete";
import Complete from "../Actions/Complete";
import Add from "../Actions/Add";

function App() {
    const { data: todos, setData, loading, fetched } = useFetchApi({
        url: 'https://jsonplaceholder.typicode.com/todos', limit: 5,
    });

    const handleDelete = (id) => {
        setData(prev => prev.filter(todo => todo.id !== id));
    };

    const handleComplete = (id) => {
        setData(prev =>
            prev.map(todo =>
                todo.id === id ? { ...todo, completed: true } : todo
            )
        );
    };

    const handleAdd = (title) => {
        const newTodo = {
            id: todos.length + 1,
            title,
            completed: false
        };
        setData(prev => [newTodo, ...prev]);
    };

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <ul>
                    {todos.map(todo => (
                        <li key={todo.id} style={{ marginBottom: '8px' }}>
                            <span>
                                {todo.title}
                            </span>

                            {!todo.completed && (
                                <Complete
                                    onClick={() => handleComplete(todo.id)}
                                    completed={todo.completed}
                                />
                            )}

                            <Delete onClick={() => handleDelete(todo.id)} />
                        </li>
                    ))}
                </ul>

            )}
            <Add onAdd={handleAdd} />
            {fetched && <div>Done Fetching</div>}
        </div>
    );
}

export default App;
