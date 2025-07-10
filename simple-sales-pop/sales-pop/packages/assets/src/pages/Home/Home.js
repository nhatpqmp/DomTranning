import React, {useState} from 'react';
import {BlockStack, Button, Card, InlineStack, Layout, Page, Text} from '@shopify/polaris';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Home() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Page title="Home">
      <Layout>
        <Layout.Section>
          <BlockStack gap="400">
            <Card>
              <InlineStack blockAlign="center">
                <Text as="span">
                  App status is{' '}
                  <Text as="span" fontWeight="bold">
                    {enabled ? 'enabled' : 'disabled'}
                  </Text>
                </Text>
                <div style={{flex: 1}} />
                <Button
                  variant={enabled ? 'secondary' : 'primary'}
                  tone={enabled ? 'critical' : 'success'}
                  onClick={() => setEnabled(prev => !prev)}
                >
                  {enabled ? 'Disable' : 'Enable'}
                </Button>
              </InlineStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
