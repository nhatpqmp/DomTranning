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

export default function Notification(item) {
  const {id, image, location, title, timeAgo, source, date} = item;

  return (
    <ResourceItem id={id}>
      <InlineStack wrap={false} align="space-between">
        <Card>
          <InlineStack wrap={false} gap="400">
            <InlineStack wrap={false} gap="400" align="center">
              <Thumbnail source={image} alt={title} size="medium" />
              <InlineGrid alignItems="">
                <Box maxWidth="200px">
                  <BlockStack gap="">
                    <Text variant="bodySm" tone="subdued" truncate>
                      Someone in {location}
                    </Text>

                    <Text as="h3" variant="bodyMd" fontWeight="bold">
                      {title}
                    </Text>

                    <InlineStack gap="200" align="space-between">
                      <Text tone="subdued" variant="bodySm">
                        {timeAgo}
                      </Text>
                      <Text tone="subdued" variant="bodySm">
                        ✓ by {source}
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
          {date}
        </Text>
      </InlineStack>
    </ResourceItem>
  );
}
