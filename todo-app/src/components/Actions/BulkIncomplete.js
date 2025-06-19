import React from 'react';
import {Button} from "@shopify/polaris";

const BulkIncomplete = ({ onclick }) => {
    return (
        <Button
            onClick={onclick}
        >
            Incomplete
        </Button>
    );
};

export default BulkIncomplete;