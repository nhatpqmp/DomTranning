import React, {useState} from 'react';
import {BlockStack, Text, InlineGrid, Box} from '@shopify/polaris';

const positions = [
  {value: 'bottom-left', label: 'Bottom Left'},
  {value: 'bottom-right', label: 'Bottom Right'},
  {value: 'top-left', label: 'Top Left'},
  {value: 'top-right', label: 'Top Right'}
];

function getPopupPositionStyle(value, isSelected) {
  const base = {
    position: 'absolute',
    background: isSelected ? '#2138dda1' : '#e3e3e3',
    width: '50%',
    height: '50%'
  };

  switch (value) {
    case 'top-left':
      return {...base, top: '4px', left: '4px'};
    case 'top-right':
      return {...base, top: '4px', right: '4px'};
    case 'bottom-left':
      return {...base, bottom: '4px', left: '4px'};
    case 'bottom-right':
      return {...base, bottom: '4px', right: '4px'};
    default:
      return base;
  }
}

function PositionSelector() {
  const [selected, setSelected] = useState('bottom-left');

  const handleSelect = value => {
    console.log('Selected position:', value);
    setSelected(value);
  };

  return (
    <BlockStack gap="200">
      <Text variant="bodySm" tone="subdued">
        Desktop Position
      </Text>

      <InlineGrid columns={4} gap="200">
        {positions.map(pos => {
          const isSelected = selected === pos.value;

          return (
            <Box
              key={pos.value}
              onClick={() => handleSelect(pos.value)}
              cursor="pointer"
              borderWidth="050"
              borderRadius="200"
              padding="200"
              borderColor={isSelected ? 'border-selected' : 'border'}
              background="transparent"
              position="relative"
              minHeight="80px"
              width="100%"
            >
              <Box style={getPopupPositionStyle(pos.value, isSelected)} />
            </Box>
          );
        })}
      </InlineGrid>

      <Text variant="bodySm" tone="subdued">
        The display position of the pop on your website.
      </Text>
    </BlockStack>
  );
}

export default PositionSelector;
