import React, { useState } from 'react';
import {
    AppProvider,
    Page,
    Card,
    Text
} from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import useFetchApi from "../../hooks/useFetchApi";
import BulkDelete from "../../components/Actions/BulkDelete";
import BulkComplete from "../../components/Actions/BulkComplete";
import BulkIncomplete from "../../components/Actions/BulkIncomplete";
import Todos from "../../components/Todos/Todos";
import Add from "../../components/Actions/Add";
import TopBarExample from "../../layouts/TopBarExample/TopBarExample";

function App() {
    const { data: todos, setData: setTodos, loading, fetched } = useFetchApi({
        url: 'http://localhost:5000/api/todos',
        limit: 5,
    });

    const [selected, setSelected] = useState([]);
    const [activeModal, setActiveModal] = useState(false);

    const handleSelect = (id, checked) => {
        setSelected(prev =>
            checked ? [...prev, id] : prev.filter(i => i !== id)
        );
    };

    const handleBulkAction = async (action) => {
        try {
            if (selected.length === 0) return;

            if (action === 'delete') {
                await Promise.all(
                    selected.map(id =>
                        fetch(`http://localhost:5000/api/todos/${id}`, {
                            method: 'DELETE',
                        })
                    )
                );
            }

            if (action === 'complete' || action === 'incomplete')
            {
                const completedValue = action === 'complete';
                await Promise.all(
                    selected.map(id =>
                        fetch(`http://localhost:5000/api/todos/${id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ completed: completedValue }),
                        })
                    )
                );
            }
            const res = await fetch('http://localhost:5000/api/todos');
            const json = await res.json();
            setTodos(json.data || []);
        } catch (error) {
            console.error("Bulk action failed:", error);
        } finally {
            setSelected([]);
        }
    };


    const handleAddTodo = async (title) => {
        try {
            if (!title) return;

            const newTodo = {
                title,
                completed: false,
            };

            const res = await fetch('http://localhost:5000/api/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTodo)
            });

            if (res.ok) {
                const updated = await fetch('http://localhost:5000/api/todos');
                const json = await updated.json();
                setTodos(json.data || []);
                setActiveModal(false);
            } else {
                console.error("Add failed:", await res.text());
            }
        } catch (error) {
            console.error("Adding failed:", error);
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
