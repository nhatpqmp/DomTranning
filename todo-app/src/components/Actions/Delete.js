import React from 'react';
import {
    Button
} from '@shopify/polaris';

function Delete({ onClick }) {
    return (
        <Button
            size="micro"
            tone="critical"
            onClick={onClick}
            style={{
                marginLeft: '10px',
            }}
        >
            Delete
        </Button>
    );
}

export default Delete;
