import React from 'react';

function Complete({ onClick, completed }) {
    return (
        <button
            onClick={onClick}
            style={{
                marginLeft: '10px',
            }}
        >
            Complete
        </button>
    );
}

export default Complete;
