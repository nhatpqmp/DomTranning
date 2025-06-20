import React, { useState, useEffect } from 'react';
import {
    AppProvider,
    Page,
    Card,
    Text
} from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import useFetchApi from "../../hooks/useFetchApi";
import BulkDelete from "../Actions/BulkDelete";
import BulkComplete from "../Actions/BulkComplete";
import BulkIncomplete from "../Actions/BulkIncomplete";
import Todos from "../Todos/Todos";
import Add from "../Actions/Add";
import TopBarExample from "../TopBarExample/TopBarExample";

function App() {
    const { data: todos, setData: setTodos, loading, fetched } = useFetchApi({
        url: 'https://jsonplaceholder.typicode.com/todos',
        limit: 5,
    });

    const [selected, setSelected] = useState([]);
    const [activeModal, setActiveModal] = useState(false);

    const handleSelect = (id, checked) => {
        setSelected(prev =>
            checked ? [...prev, id] : prev.filter(i => i !== id)
        );
    };

    const handleBulkAction = (action) => {
        console.log(selected);
        if (action === 'delete') {
            setTodos(prev => prev.filter(todo => !selected.includes(todo.id)));
        } else {
            const completedValue = action === 'complete';
            setTodos(prev =>
                prev.map(todo =>
                    selected.includes(todo.id)
                        ? { ...todo, completed: completedValue }
                        : todo
                )
            );
        }
        setSelected([]);
    };

    const handleAddTodo = (title) => {
        if (title) {
            const newTodo = {
                id: todos.length + 1,
                title,
                completed: false,
            };
            setTodos(prev => [newTodo, ...prev]);
            setActiveModal(false);
        }
    };

    const handlerModalChange = () => {
        setActiveModal(prev => !prev);
    }

    return (
        <AppProvider i18n={{}}>
            <TopBarExample/>
            <Page
                title="Todoes"
                primaryAction={{
                    content: 'Create',
                    onAction: handlerModalChange,
                }}
            >
                <Add activeModal={activeModal} handlerModalChange={handlerModalChange} handleAddTodo={handleAddTodo}/>

                {selected.length > 0 && (
                    <Card sectioned>
                        <Text variant="bodyMd">{selected.length} selected</Text>
                    </Card>
                )}

                <Card>
                    {loading ? (
                        <div style={{ padding: '1rem' }}>Loading...</div>
                    ) : (
                        <Todos
                            todos={todos}
                            selected={selected}
                            handleSelect={handleSelect}
                            setTodos={setTodos}
                        />
                    )}
                </Card>

                {selected.length > 0 && (
                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                        <Card sectioned style={{ maxWidth: 400, width: '100%' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    flexWrap: 'wrap',
                                    gap: '0.5rem',
                                }}
                            >
                                <BulkComplete onClick={() => handleBulkAction('complete')}/>
                                <BulkIncomplete onClick={() => handleBulkAction('incomplete')}/>
                                <BulkDelete onClick={() => handleBulkAction('delete')}/>
                            </div>
                        </Card>
                    </div>
                )}

                {fetched && <div style={{ marginTop: '1rem' }}>Done Fetching</div>}
            </Page>
        </AppProvider>
    );
}

export default App;
