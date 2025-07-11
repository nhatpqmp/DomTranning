import {
  BlockStack,
  Box,
  Button,
  Card,
  InlineGrid,
  InlineStack,
  ResourceItem,
  Text,
  Thumbnail
} from '@shopify/polaris';
import {XSmallIcon} from '@shopify/polaris-icons';
import React from 'react';

export default function Notification({item}) {
  return (
    <ResourceItem>
      <InlineStack wrap={false} align="space-between">
        <Card>
          <InlineStack wrap={false} gap="400">
            <InlineStack wrap={false} gap="400" align="center">
              <Thumbnail source={item.productImage} alt={item.productName} size="medium" />
              <InlineGrid alignItems="">
                <Box maxWidth="200px">
                  <BlockStack gap="">
                    <Text variant="bodySm" tone="subdued" truncate>
                      {item.city}
                    </Text>

                    <Text as="h3" variant="bodyMd" fontWeight="bold">
                      {item.productName}
                    </Text>

                    <InlineStack gap="200" align="space-between">
                      <Text tone="subdued" variant="bodySm">
                        {item.dayAgo}
                      </Text>
                      <Text tone="subdued" variant="bodySm">
                        ✓ by Avada
                      </Text>
                    </InlineStack>
                  </BlockStack>
                </Box>
              </InlineGrid>
            </InlineStack>
            <Button
              variant="plain"
              icon={XSmallIcon}
              onClick={() => console.log('Dismiss notification')}
              accessibilityLabel="Dismiss"
            />
          </InlineStack>
        </Card>
        <Text variant="bodySm" tone="subdued">
          {item.date}
        </Text>
      </InlineStack>
    </ResourceItem>
  );
}
