import React from 'react';

function Delete({ onClick }) {
    return (
        <button
            onClick={onClick}
            style={{
                marginLeft: '10px',
            }}
        >
            X
        </button>
    );
}

export default Delete;
