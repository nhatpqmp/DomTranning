import React from 'react';
import {Button} from "@shopify/polaris";

const BulkIncomplete = ({ onClick }) => {
    return (
        <Button
            onClick={onClick}
        >
            Incomplete
        </Button>
    );
};

export default BulkIncomplete;