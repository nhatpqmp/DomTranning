import React from 'react';
import {Text, FormLayout, Checkbox, RangeSlider, TextField} from '@shopify/polaris';
import PositionSelector from '@assets/components/PositionSelector/PositionSelector';

export default function Display({setting, onChangeSetting}) {
  return (
    <FormLayout>
      <PositionSelector
        position={setting.position}
        onChange={value => onChangeSetting('position', value)}
      />

      <Checkbox
        label="Hide time ago"
        checked={setting.hideTimeAgo}
        onChange={checked => onChangeSetting('hideTimeAgo', checked)}
      />

      <Checkbox
        label="Truncate content text"
        checked={setting.truncateProductName}
        onChange={value => onChangeSetting('truncateProductName', value)}
        helpText={
          <Text variant="bodySm" tone="subdued">
            If your product name is too long, it will be truncated to &#39;Product na...&#39;
          </Text>
        }
      />

      <Text as="h3" variant="headingSm">
        TIMING
      </Text>

      <FormLayout.Group>
        <RangeSlider
          label="Display duration"
          min={0}
          max={60}
          value={setting.displayDuration}
          onChange={value => onChangeSetting('displayDuration', value)}
          suffix={
            <TextField
              label=""
              value={setting.displayDuration}
              type="number"
              autoComplete="off"
              min={0}
              max={60}
              suffix="second(s)"
              onChange={value => onChangeSetting('displayDuration', parseInt(value))}
            />
          }
          helpText={
            <Text variant="bodySm" tone="subdued">
              How long each pop will display on your page.
            </Text>
          }
          output
        />

        <RangeSlider
          label="Delay time"
          min={0}
          max={60}
          value={setting.firstDelay}
          onChange={value => onChangeSetting('firstDelay', value)}
          suffix={
            <TextField
              label=""
              value={setting.firstDelay}
              type="number"
              autoComplete="off"
              min={0}
              max={60}
              suffix="second(s)"
              onChange={value => onChangeSetting('firstDelay', parseInt(value))}
            />
          }
          helpText={
            <Text variant="bodySm" tone="subdued">
              The delay time before the first notification.
            </Text>
          }
          output
        />
      </FormLayout.Group>

      <FormLayout.Group>
        <RangeSlider
          label="Gap time between two pops"
          min={0}
          max={60}
          value={setting.popsInterval}
          onChange={value => onChangeSetting('popsInterval', value)}
          suffix={
            <TextField
              label=""
              value={setting.popsInterval}
              type="number"
              autoComplete="off"
              min={0}
              max={60}
              suffix="second(s)"
              onChange={value => onChangeSetting('popsInterval', parseInt(value))}
            />
          }
          helpText={
            <Text variant="bodySm" tone="subdued">
              The time interval between two popup notifications.
            </Text>
          }
          output
        />

        <RangeSlider
          label="Maximum of popups"
          min={0}
          max={80}
          value={setting.maxPopsDisplay}
          onChange={value => onChangeSetting('maxPopsDisplay', value)}
          suffix={
            <TextField
              label=""
              value={setting.maxPopsDisplay}
              type="number"
              autoComplete="off"
              min={0}
              max={80}
              suffix="popup(s)"
              onChange={value => onChangeSetting('maxPopsDisplay', parseInt(value))}
            />
          }
          helpText={
            <Text variant="bodySm" tone="subdued">
              The maximum number of popups allowed to show after page loading (max: 80).
            </Text>
          }
          output
        />
      </FormLayout.Group>
    </FormLayout>
  );
}
