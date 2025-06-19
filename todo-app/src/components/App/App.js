import React, { useState, useEffect } from 'react';
import {
    AppProvider,
    Page,
    Card,
    Button,
    Badge,
    Text,
    ResourceList,
    Checkbox,
    Modal,
    TextField,
} from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import useFetchApi from "../../hooks/useFetchApi";
import Delete from "../Actions/Delete";
import Complete from "../Actions/Complete";
import BulkDelete from "../Actions/BulkDelete";
import BulkComplete from "../Actions/BulkComplete";
import BulkIncomplete from "../Actions/BulkIncomplete";

function App() {
    const { data: todos, setData: setTodos, loading, fetched } = useFetchApi({
        url: 'https://jsonplaceholder.typicode.com/todos',
        limit: 5,
    });

    const [selected, setSelected] = useState([]);
    const [activeModal, setActiveModal] = useState(false);
    const [newTitle, setNewTitle] = useState('');

    const handleSelect = (id, checked) => {
        setSelected(prev =>
            checked ? [...prev, id] : prev.filter(i => i !== id)
        );
    };

    const handleBulkAction = (action) => {
        if (action === 'delete') {
            setTodos(prev => prev.filter(todo => !selected.includes(todo.id)));
        } else {
            const completedValue = action === 'complete';
            setTodos(prev =>
                prev.map(todo =>
                    selected.includes(todo.id)
                        ? { ...todo, completed: false }
                        : todo
                )
            );
        }
        setSelected([]);
    };

    const handleAddTodo = () => {
        const title = newTitle.trim();
        if (title) {
            const newTodo = {
                id: todos.length + 1,
                title,
                completed: false,
            };
            setTodos(prev => [newTodo, ...prev]);
            setNewTitle('');
            setActiveModal(false);
        }
    };

    return (
        <AppProvider i18n={{}}>
            <Page
                title="Todoes"
                primaryAction={{
                    content: 'Create',
                    onAction: () => setActiveModal(true),
                }}
            >
                <Modal
                    open={activeModal}
                    onClose={() => setActiveModal(false)}
                    title="Create todo"
                    primaryAction={{
                        content: 'Add',
                        onAction: handleAddTodo,
                    }}
                    secondaryActions={[
                        {
                            content: 'Cancel',
                            onAction: () => setActiveModal(false),
                        },
                    ]}
                >
                    <Modal.Section>
                        <TextField
                            label="Title"
                            value={newTitle}
                            onChange={setNewTitle}
                            autoComplete="off"
                        />
                    </Modal.Section>
                </Modal>

                {selected.length > 0 && (
                    <Card sectioned>
                        <Text variant="bodyMd">{selected.length} selected</Text>
                    </Card>
                )}

                <Card>
                    {loading ? (
                        <div style={{ padding: '1rem' }}>Loading...</div>
                    ) : (
                        <ResourceList
                            resourceName={{ singular: 'todo', plural: 'todoes' }}
                            items={todos}
                            renderItem={(todo) => {
                                const { id, title, completed } = todo;
                                const checked = selected.includes(id);

                                return (
                                    <ResourceList.Item id={id}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                flexWrap: 'wrap',
                                                gap: '1rem',
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <Checkbox
                                                    checked={checked}
                                                    onChange={(val) => handleSelect(id, val)}
                                                />
                                                <Text
                                                    variant="bodyMd"
                                                    fontWeight="semibold"
                                                    style={{ textDecoration: completed ? 'line-through' : 'none' }}
                                                >
                                                    {title}
                                                </Text>
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <Badge tone={completed ? 'success' : 'warning'}>
                                                    {completed ? 'Complete' : 'Incomplete'}
                                                </Badge>
                                                <Complete
                                                    onClick={() =>
                                                        setTodos(prev =>
                                                            prev.map(t =>
                                                                t.id === id ? { ...t, completed: true } : t
                                                            )
                                                        )
                                                    }
                                                    completed={completed}
                                                />
                                                <Delete
                                                    onClick={() =>
                                                        setTodos(prev => prev.filter(t => t.id !== id))
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </ResourceList.Item>
                                );
                            }}
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
