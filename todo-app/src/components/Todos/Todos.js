import React from 'react';
import { Badge, Checkbox, ResourceList, Text } from "@shopify/polaris";
import Complete from "../Actions/Complete";
import Delete from "../Actions/Delete";

const Todos = ({ todos, selected, handleSelect, setTodos }) => {
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
    );
};

export default Todos;
