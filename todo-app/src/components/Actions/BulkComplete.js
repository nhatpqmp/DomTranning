import React from 'react';
import {Button} from "@shopify/polaris";

const BulkComplete = ({ onclick }) => {
    return (
        <Button
            onClick={onclick}
        >
            Complete
        </Button>
    );
};

export default BulkComplete;