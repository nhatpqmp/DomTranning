import React from 'react';
import {
    Button
} from '@shopify/polaris';

function Complete({ onClick, completed }) {
    return (
        <Button
            size="micro"
            onClick={onClick}
            style={{
                marginLeft: '10px',
            }}
        >
            Complete
        </Button>
    );
}

export default Complete;
