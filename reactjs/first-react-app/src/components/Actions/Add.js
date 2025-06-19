import React, { useState } from 'react';

function Add({ onAdd }) {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = value.trim();
        if (trimmed) {
            onAdd(trimmed);
            setValue('');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '16px' }}>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter new todo"
                style={{
                    margin: '30px 40px',
                }}
            />
            <button
                type="submit"
            >
                Add
            </button>
        </form>
    );
}

export default Add;
