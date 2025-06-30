import React from 'react';
import {
    Button
} from '@shopify/polaris';

function BulkDelete({ onClick }) {
    return (
        <Button
            onClick={onClick}
        >
            Delete
        </Button>
    );
}

export default BulkDelete;
