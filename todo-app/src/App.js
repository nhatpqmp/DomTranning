import React, { useEffect, useState } from 'react';
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

const initialTodos = [
    { id: '1', title: 'Todo 1', completed: false },
    { id: '2', title: 'Todo 2', completed: true },
];

function App() {
    const [todos, setTodos] = useState(initialTodos);
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
            setTodos(prev =>
                prev.map(todo =>
                    selected.includes(todo.id)
                        ? { ...todo, completed: action === 'complete' }
                        : todo
                )
            );
        }
        setSelected([]);
    };

    const handleAction = (id, action) => {
        if (action === 'delete') {
            setTodos(prev => prev.filter(todo => todo.id !== id));
        } else {
            setTodos(prev =>
                prev.map(todo => (todo.id === id ? { ...todo, completed: true } : todo))
            );
        }
    };

    const handleAddTodo = () => {
        const title = newTitle.trim();
        if (title) {
            const newTodo = {
                id: Date.now().toString(),
                title,
                completed: false,
            };
            setTodos(prev => [...prev, newTodo]);
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
                {/* Modal */}
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

                {/* Card hiện selected count */}
                {selected.length > 0 && (
                    <Card sectioned>
                        <Text variant="bodyMd">{selected.length} selected</Text>
                    </Card>
                )}

                {/* Danh sách todos */}
                <Card>
                    <ResourceList
                        resourceName={{ singular: 'todo', plural: 'todoes' }}
                        items={todos}
                        renderItem={(todo) => {
                            const { id, title, completed } = todo;
                            const checked = selected.includes(id);

                            return (
                                <ResourceList.Item id={id}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        flexWrap: 'wrap',
                                        gap: '1rem',
                                    }}>
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
                                            <Badge status={completed ? 'success' : 'warning'}>
                                                {completed ? 'Complete' : 'Incomplete'}
                                            </Badge>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            {!completed && (
                                                <Button size="slim" onClick={() => handleAction(id, 'complete')}>
                                                    Complete
                                                </Button>
                                            )}
                                            <Button size="slim" tone="critical" destructive onClick={() => handleAction(id, 'delete')}>
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </ResourceList.Item>
                            );
                        }}
                    />
                </Card>

                {selected.length > 0 && (
                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                        <Card sectioned style={{ maxWidth: 400, width: '100%' }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                flexWrap: 'wrap',
                                gap: '0.5rem',
                            }}>
                                <Button onClick={() => handleBulkAction('complete')}>Complete</Button>
                                <Button onClick={() => handleBulkAction('incomplete')}>Incomplete</Button>
                                <Button destructive onClick={() => handleBulkAction('delete')}>Delete</Button>
                            </div>
                        </Card>
                    </div>
                )}
            </Page>
        </AppProvider>
    );
}

export default App;
