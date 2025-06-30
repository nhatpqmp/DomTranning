import React from 'react';
import { Badge, Checkbox, ResourceList, Text } from "@shopify/polaris";
import Complete from "../Actions/Complete";
import Delete from "../Actions/Delete";

const Todos = ({ todos, selected, handleSelect, setTodos }) => {
    const handleComplete = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/todos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: true })
            });

            setTodos(prev =>
                prev.map(t =>
                    t.id === id ? { ...t, completed: true } : t
                )
            );
        } catch (err) {
            console.error('Failed to complete todo', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/todos/${id}`, {
                method: 'DELETE'
            });

            setTodos(prev => prev.filter(t => t.id !== id));
        } catch (err) {
            console.error('Failed to delete todo', err);
        }
    };

    return (
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
                                <Complete onClick={() => handleComplete(id)} completed={completed} />
                                <Delete onClick={() => handleDelete(id)} />
                            </div>
                        </div>
                    </ResourceList.Item>
                );
            }}
        />
    );
};

export default Todos;