import React from 'react';
import {Text, FormLayout, Checkbox, RangeSlider, TextField} from '@shopify/polaris';
import PositionSelector from '@assets/components/PositionSelector/PositionSelector';

export default function Display({settings, onChangeSetting}) {
  return (
    <FormLayout>
      <PositionSelector
        position={settings.position}
        onChange={value => onChangeSetting('position', value)}
      />

      <Checkbox
        label="Hide time ago"
        checked={settings.hideTimeAgo}
        onChange={checked => onChangeSetting('hideTimeAgo', checked)}
      />

      <Checkbox
        label="Truncate content text"
        checked={settings.truncateProductName}
        onChange={value => onChangeSetting('truncateProductName', value)}
        helpText={"If your product name is too long, it will be truncated to 'Product na...'"}
      />

      <Text as="h3" variant="headingSm">
        TIMING
      </Text>

      <FormLayout.Group>
        <RangeSlider
          label="Display duration"
          min={0}
          max={60}
          value={settings.displayDuration}
          onChange={value => onChangeSetting('displayDuration', value)}
          suffix={
            <TextField
              label=""
              value={settings.displayDuration}
              type="number"
              autoComplete="off"
              min={0}
              max={60}
              suffix="second(s)"
              onChange={value => onChangeSetting('displayDuration', parseInt(value))}
            />
          }
          helpText={'How long each pop will display on your page.'}
          output
        />

        <RangeSlider
          label="Delay time"
          min={0}
          max={60}
          value={settings.firstDelay}
          onChange={value => onChangeSetting('firstDelay', value)}
          suffix={
            <TextField
              label=""
              value={settings.firstDelay}
              type="number"
              autoComplete="off"
              min={0}
              max={60}
              suffix="second(s)"
              onChange={value => onChangeSetting('firstDelay', parseInt(value))}
            />
          }
          helpText={'The delay time before the first notification.'}
          output
        />
      </FormLayout.Group>

      <FormLayout.Group>
        <RangeSlider
          label="Gap time between two pops"
          min={0}
          max={60}
          value={settings.popsInterval}
          onChange={value => onChangeSetting('popsInterval', value)}
          suffix={
            <TextField
              label=""
              value={settings.popsInterval}
              type="number"
              autoComplete="off"
              min={0}
              max={60}
              suffix="second(s)"
              onChange={value => onChangeSetting('popsInterval', parseInt(value))}
            />
          }
          helpText={'The time interval between two popup notifications.'}
          output
        />

        <RangeSlider
          label="Maximum of popups"
          min={0}
          max={80}
          value={settings.maxPopsDisplay}
          onChange={value => onChangeSetting('maxPopsDisplay', value)}
          suffix={
            <TextField
              label=""
              value={settings.maxPopsDisplay}
              type="number"
              autoComplete="off"
              min={0}
              max={80}
              suffix="popup(s)"
              onChange={value => onChangeSetting('maxPopsDisplay', parseInt(value))}
            />
          }
          helpText={'The maximum number of popups allowed to show after page loading (max: 80).'}
          output
        />
      </FormLayout.Group>
    </FormLayout>
  );
}
