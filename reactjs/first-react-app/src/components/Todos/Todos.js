import React from 'react';
import Complete from "../Actions/Complete";
import Delete from "../Actions/Delete";

const Todos = ({todos, setData}) => {

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
    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id} style={{ marginBottom: '8px' }}>
                            <span style={todo.completed ? { textDecoration: 'line-through' } : { textDecoration: 'none' }}>
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
    );
};

export default Todos;