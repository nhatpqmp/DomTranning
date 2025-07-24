import React, {useCallback, useState} from 'react';
import {
  Card,
  Layout,
  Page,
  LegacyCard,
  LegacyTabs,
  SkeletonPage,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonTabs
} from '@shopify/polaris';
import Display from '@assets/components/Setting/Display';
import Triggers from '@assets/components/Setting/Triggers';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import DefaultSetting from '@assets/pages/Settings/defaultSetting';
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup';
import useEditApi from '@assets/hooks/api/useEditApi';

/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const {data: settings, loading, handleSettingChange} = useFetchApi({
    url: '/settings',
    defaultData: DefaultSetting
  });

  const {editing, handleEdit} = useEditApi({url: '/settings'});

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
          settings={settings}
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
          settings={settings}
          onChangeSetting={(key, value) => handleSettingChange(key, value)}
        />
      )
    }
  ];

  if (loading) {
    return (
      <SkeletonPage primaryAction>
        <Layout>
          <Layout.Section variant="oneThird">
            <Card sectioned>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={4} />
            </Card>
          </Layout.Section>

          <Layout.Section>
            <Card>
              <SkeletonTabs count={2} />
              <Card>
                <SkeletonBodyText lines={6} />
              </Card>
            </Card>
          </Layout.Section>
        </Layout>
      </SkeletonPage>
    );
  }

  return (
    <Page
      title="Settings"
      primaryAction={{
        loading: editing,
        content: 'Save',
        tone: 'success',
        onAction: async () => {
          await handleEdit(settings);
          console.log('Save clicked');
        }
      }}
    >
      <Layout>
        <Layout.Section variant="oneThird">
          <NotificationPopup></NotificationPopup>
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
    </Page>
  );
}

Settings.propTypes = {};
