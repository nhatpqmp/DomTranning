import React, {useState, useCallback} from 'react';
import {Page, Layout, ResourceList, Card, Spinner, Text} from '@shopify/polaris';
import Notification from '@assets/components/Notification/Notification';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import Loading from "@assets/components/Loading";

export default function Notifications() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');

  const {data: items, fetchApi, loading, pageInfo} = useFetchApi({
    url: '/notifications',
    defaultData: [],
    initQueries: {sort: sortValue}
  });

  const handleSortChange = useCallback(value => {
    setSortValue(value);
    fetchApi('/notifications', {sort: value});
  }, []);

  const resourceName = {
    singular: 'notification',
    plural: 'notifications'
  };

  return (
    <Page title="Notifications" subtitle="List of sales notifications from Shopify">
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
                hasNext: !!pageInfo?.hasNextPage,
                onNext: () => {
                  if (pageInfo?.endCursor) {
                    fetchApi(
                      '/api/notifications',
                      {
                        after: pageInfo.endCursor,
                        sort: sortValue
                      },
                      true
                    );
                  }
                }
              }}
              sortValue={sortValue}
              sortOptions={[
                {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
                {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'}
              ]}
              onSortChange={handleSortChange}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
