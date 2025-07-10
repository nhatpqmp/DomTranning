import React, {useState} from 'react';
import {Page, Layout, ResourceList, Card} from '@shopify/polaris';
import Notification from '@assets/components/Notification/Notification';

export default function Notifications() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');

  const resourceName = {
    singular: 'notification',
    plural: 'notifications'
  };

  const items = [
    {
      id: '1',
      image:
        'https://cdn.shopify.com/s/files/1/0811/5689/8850/files/Main_b9e0da7f-db89-4d41-83f0-7f417b02831d_40x40@3x.jpg?v=1752030498',
      location: 'New York, United States New York, United States',
      title: 'Purchased Sport Sneaker',
      timeAgo: 'a day ago',
      source: 'AVADA',
      date: 'March 8, 2021'
    },
    {
      id: '2',
      image:
        'https://cdn.shopify.com/s/files/1/0811/5689/8850/files/Main_b9e0da7f-db89-4d41-83f0-7f417b02831d_40x40@3x.jpg?v=1752030498',
      location: 'New York, United States',
      title: 'Purchased Sport Sneaker',
      timeAgo: 'a day ago',
      source: 'AVADA',
      date: 'March 8, 2021'
    },
    {
      id: '3',
      image:
        'https://cdn.shopify.com/s/files/1/0811/5689/8850/files/Main_b9e0da7f-db89-4d41-83f0-7f417b02831d_40x40@3x.jpg?v=1752030498',
      location: 'New York, United States',
      title: 'Purchased Sport Sneaker',
      timeAgo: 'a day ago',
      source: 'AVADA',
      date: 'March 8, 2021'
    }
  ];

  return (
    <Page title="Notifications" subtitle="List of sales notifications from Shopify">
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={resourceName}
              items={items}
              pagination={{
                hasNext: true,
                onNext: () => {}
              }}
              renderItem={item => <Notification {...item} />}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              selectable
              sortValue={sortValue}
              sortOptions={[
                {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
                {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'}
              ]}
              onSortChange={selected => {
                setSortValue(selected);
                console.log(`Sort option changed to ${selected}.`);
              }}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
