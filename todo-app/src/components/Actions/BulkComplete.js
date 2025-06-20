import React from 'react';
import {Button} from "@shopify/polaris";

const BulkComplete = ({ onClick }) => {
    return (
        <Button
            onClick={onClick}
        >
            Complete
        </Button>
    );
};

export default BulkComplete;