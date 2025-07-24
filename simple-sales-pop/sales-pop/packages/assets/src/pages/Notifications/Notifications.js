import React, {useState} from 'react';
import {
  Page,
  Layout,
  ResourceList,
  Card,
  SkeletonPage,
  SkeletonDisplayText,
  SkeletonBodyText,
  SkeletonTabs
} from '@shopify/polaris';
import Notification from '@assets/components/Notification/Notification';
import {api} from '@assets/helpers';
import usePaginate from '@assets/hooks/api/usePaginate';

export default function Notifications() {
  const [selectedItems, setSelectedItems] = useState([]);
  const {data: items, loading, pageInfo, nextPage, prevPage, onQueryChange, queries} = usePaginate({
    url: '/notifications',
    defaultData: [],
    initLoad: true,
    defaultSort: 'desc',
    defaultLimit: 10
  });

  const handleSortChange = value => {
    onQueryChange('sort', value, true);
    setSelectedItems([]);
  };

  const resourceName = {
    singular: 'notification',
    plural: 'notifications'
  };

  if (loading) {
    return (
      <SkeletonPage title="Notifications" primaryAction>
        <Layout>
          <Layout.Section>
            <Card>
              <SkeletonTabs count={2} />
              <Card>
                <SkeletonDisplayText size="small" />
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
      title="Notifications"
      subtitle="List of sales notifications from Shopify"
      primaryAction={{
        content: 'Test Install',
        onAction: async () => {
          try {
            const res = await api(
              '/notifications/sync?shopifyDomain=sales-pop-store-final.myshopify.com',
              {method: 'POST'}
            );

            if (res.success) {
              console.log('Success');
            }
            if (res.error) {
              console.error('Error');
            }
          } catch (err) {
            console.error('API call failed:', err);
          }
        }
      }}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              loading={loading}
              resourceName={resourceName}
              items={items}
              renderItem={item => <Notification item={item} />}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              selectable
              pagination={{
                hasNext: pageInfo?.hasNext ?? false,
                onNext: nextPage,
                hasPrevious: pageInfo?.hasPre ?? false,
                onPrevious: prevPage
              }}
              sortValue={queries.sort ? queries.sort : 'desc'}
              sortOptions={[
                {label: 'Newest update', value: 'desc'},
                {label: 'Oldest update', value: 'asc'}
              ]}
              onSortChange={handleSortChange}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
