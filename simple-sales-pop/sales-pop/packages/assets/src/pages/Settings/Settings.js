import React, {useCallback, useState} from 'react';
import {
  BlockStack,
  Box,
  Button,
  Card,
  InlineGrid,
  InlineStack,
  Layout,
  Page,
  LegacyCard,
  LegacyTabs,
  Text,
  Thumbnail
} from '@shopify/polaris';
import {XSmallIcon} from '@shopify/polaris-icons';

import Display from '@assets/components/Setting/Display';
import Triggers from '@assets/components/Setting/Triggers';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import Loading from '@assets/components/Loading';
import DefaultSetting from '@assets/pages/Settings/defaultSetting';
import {api} from '@assets/helpers';

/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const item = {
    id: '1',
    image:
      'https://cdn.shopify.com/s/files/1/0811/5689/8850/files/Main_b9e0da7f-db89-4d41-83f0-7f417b02831d_40x40@3x.jpg?v=1752030498',
    location: 'New York, United States New York, United States',
    title: 'Purchased Sport Sneaker',
    timeAgo: 'a day ago',
    source: 'AVADA',
    date: 'March 8, 2021'
  };
  const {data: setting, setData: setSetting, loading, setLoading} = useFetchApi({
    url: '/settings',
    defaultData: DefaultSetting
  });

  const handleSettingChange = (key, value) => {
    try {
      setSetting(prevInput => ({
        ...prevInput,
        [key]: value
      }));
    } catch (e) {
      console.log('False to change setting:', e);
    }
  };

  const handleSaveSetting = async () => {
    try {
      setLoading(true);
      await api('/settings', {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({setting})
      });

      console.log('Setting saved successfully:');
    } catch (e) {
      console.error('Failed to save setting:', e);
    } finally {
      setLoading(false);
    }
  };

  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(selectedTabIndex => setSelected(selectedTabIndex), []);

  const tabs = [
    {
      id: 'setting-display',
      content: 'Display',
      title: 'APPEARANCE',
      panelID: 'setting-display-content',
      body: (
        <Display
          setting={setting}
          onChangeSetting={(key, value) => handleSettingChange(key, value)}
        />
      )
    },
    {
      id: 'setting-triggers',
      content: 'Triggers',
      title: 'PAGES RESTRICTIONS',
      panelID: 'setting-triggers-content',
      body: (
        <Triggers
          setting={setting}
          onChangeSetting={(key, value) => handleSettingChange(key, value)}
        />
      )
    }
  ];
  return (
    <Page
      title="Settings"
      primaryAction={{
        loading: loading,
        content: 'Save',
        tone: 'success',
        onAction: async () => {
          await handleSaveSetting();
          setSelected(1);
          console.log('Save clicked');
        }
      }}
    >
      {loading ? (
        <Card>
          <Loading />
        </Card>
      ) : (
        <Layout>
          <Layout.Section variant="oneThird">
            <Card>
              <InlineStack wrap={false} gap="200" align="start">
                <Thumbnail source={item.image} alt={item.title} size="medium" />

                <InlineGrid>
                  <Box maxWidth="180px">
                    <BlockStack gap="100">
                      <Text variant="bodySm" tone="subdued" truncate>
                        Someone in {item.location}
                      </Text>

                      <Text as="h3" variant="bodyMd" fontWeight="bold">
                        {item.title}
                      </Text>

                      <InlineStack gap="200" align="space-between">
                        <Text tone="subdued" variant="bodySm">
                          {item.timeAgo}
                        </Text>
                        <Text tone="subdued" variant="bodySm">
                          ✓ by {item.source}
                        </Text>
                      </InlineStack>
                    </BlockStack>
                  </Box>
                </InlineGrid>

                <Box paddingBlockStart="0">
                  <Button
                    variant="plain"
                    icon={XSmallIcon}
                    onClick={() => console.log('Dismiss notification')}
                    accessibilityLabel="Dismiss"
                  />
                </Box>
              </InlineStack>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <LegacyCard>
              <LegacyTabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                <LegacyCard.Section title={tabs[selected].title}>
                  {tabs[selected].body}
                </LegacyCard.Section>
              </LegacyTabs>
            </LegacyCard>
          </Layout.Section>
        </Layout>
      )}
    </Page>
  );
}

Settings.propTypes = {};
