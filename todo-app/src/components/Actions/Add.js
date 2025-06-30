import React, { useState } from 'react';
import {Modal, TextField} from '@shopify/polaris';

function Add({ activeModal, handlerModalChange, handleAddTodo }) {
    const [title, setTitle] = useState('');

    const addTodo = () => {
        handleAddTodo(title);
        setTitle('');
    };

    const handlerSetTitle =  (newTitle) => {
        setTitle(newTitle);
    }

    return (
        <>
            <Modal
                open={activeModal}
                onClose={() => handlerModalChange}
                title="Create todo"
                primaryAction={{
                    content: 'Add',
                    onAction: addTodo,
                }}
                secondaryActions={[
                    {
                        content: 'Cancel',
                        onAction: () => handlerModalChange,
                    },
                ]}
            >
                <Modal.Section>
                    <TextField
                        label="Title"
                        value={title}
                        onChange={handlerSetTitle}
                        autoComplete="off"
                    />
                </Modal.Section>
            </Modal>
        </>
    );
}

export default Add;
