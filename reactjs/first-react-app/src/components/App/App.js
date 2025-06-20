import React from 'react';
import './App.css';
import useFetchApi from "../../hooks/useFetchApi";
import Delete from "../Actions/Delete";
import Complete from "../Actions/Complete";
import Add from "../Actions/Add";
import Todos from "../Todos/Todos";

function App() {
    const { data: todos, setData, loading, fetched } = useFetchApi({
        url: 'https://jsonplaceholder.typicode.com/todos', limit: 5,
    });

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
                <Todos todos={todos} setData={setData}/>
            )}
            <Add onAdd={handleAdd} />
            {fetched && <div>Done Fetching</div>}
        </div>
    );
}

export default App;
