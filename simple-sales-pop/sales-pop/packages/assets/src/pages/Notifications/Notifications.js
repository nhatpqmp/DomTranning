import React, {useState, useCallback, useEffect} from 'react';
import {Page, Layout, ResourceList, Card} from '@shopify/polaris';
import Notification from '@assets/components/Notification/Notification';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import {api} from '@assets/helpers';

export default function Notifications() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortValue, setSortValue] = useState('desc');
  const [cursor, setCursor] = useState({after: null, before: null});
  const [hasNext, setHasNext] = useState(true);

  const {data: items, fetchApi, loading, pageInfo} = useFetchApi({
    url: '/notifications',
    defaultData: [],
    initLoad: false
  });

  useEffect(() => {
    const params = {sort: sortValue};
    if (cursor.after) params.after = cursor.after;
    if (cursor.before) params.before = cursor.before;
    fetchApi('/notifications', params);
  }, [sortValue, cursor]);

  useEffect(() => {
    setHasNext(pageInfo?.hasNext ?? false);
  }, [pageInfo]);

  const handleSortChange = useCallback(value => {
    setSortValue(value);
    setCursor({after: null, before: null});
    setSelectedItems([]);
  }, []);

  const handlePagination = useCallback(() => {
    if (!pageInfo?.endCursor) return;
    setCursor(pageInfo.endCursor);
    setSelectedItems([]);
    fetchApi('/notifications', {
      sort: sortValue,
      after: pageInfo.endCursor
    });
  }, [fetchApi, pageInfo?.endCursor, sortValue]);

  const handlePreviousPagination = useCallback(() => {
    if (!pageInfo?.startCursor) return;
    setCursor(pageInfo.startCursor);
    setSelectedItems([]);
    fetchApi('/notifications', {
      sort: sortValue,
      before: pageInfo.startCursor
    });
  }, [fetchApi, pageInfo?.startCursor, sortValue]);

  const resourceName = {
    singular: 'notification',
    plural: 'notifications'
  };

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
              {
                method: 'POST'
              }
            );

            if (res.success) {
              console.log('res:', res);
              //console.log('Success register webhook:', res.data);
            } else {
              console.error('Error:', res.error);
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
                hasNext,
                onNext: handlePagination,
                hasPrevious: pageInfo?.hasPre,
                onPrevious: handlePreviousPagination
              }}
              sortValue={sortValue}
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
