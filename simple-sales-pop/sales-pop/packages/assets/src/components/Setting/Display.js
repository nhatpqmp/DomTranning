import React, {useCallback, useState} from 'react';
import {Text, FormLayout, Checkbox, RangeSlider, TextField} from '@shopify/polaris';
import PositionSelector from '@assets/components/PositionSelector/PositionSelector';

/**
 * @return {JSX.Element}
 */
export default function Display() {
  const [hideTime, setHideTime] = useState(false);

  const handleHideTimeChange = useCallback(value => setHideTime(value), []);

  const [truncateContentText, setTruncateContentText] = useState(false);

  const handleTruncateContentText = useCallback(value => setTruncateContentText(value), []);

  const [displayDuration, setDisplayDuration] = useState(10);

  const handleDisplayDurationChange = useCallback(value => setDisplayDuration(value), []);

  const [delayTime, setDelayTime] = useState(10);

  const handleDelayTimeChange = useCallback(value => setDelayTime(value), []);

  const [gapyTime, setGappyTime] = useState(2);

  const handleGappyTimeChange = useCallback(value => setGappyTime(value), []);

  const [maximumPops, setMaximumPops] = useState(20);

  const handleMaximumPopsChange = useCallback(value => setMaximumPops(value), []);

  return (
    <FormLayout>
      <PositionSelector />
      <FormLayout>
        <Checkbox label="Hide time ago" checked={hideTime} onChange={handleHideTimeChange} />
      </FormLayout>

      <FormLayout>
        <Checkbox
          label="Truncate content text"
          checked={truncateContentText}
          onChange={handleTruncateContentText}
          helpText={
            <Text variant="bodySm" tone="subdued">
              If your product name is long for one line, it will be truncated to &#39;Product
              na...&#39;
            </Text>
          }
        />
      </FormLayout>

      <FormLayout>
        <Text as="h3" variant="headingSm">
          TIMING
        </Text>
        <FormLayout.Group>
          <RangeSlider
            label="Display duration"
            min={0}
            max={60}
            value={displayDuration}
            onChange={handleDisplayDurationChange}
            suffix={
              <TextField
                label=""
                value={displayDuration}
                autoComplete="off"
                suffix="second(s)"
                type="number"
                min={0}
                max={80}
                onChange={handleDisplayDurationChange}
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
            value={delayTime}
            onChange={handleDelayTimeChange}
            suffix={
              <TextField
                label=""
                value={delayTime}
                autoComplete="off"
                suffix="second(s)"
                type="number"
                min={0}
                max={80}
                onChange={handleDelayTimeChange}
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
            value={gapyTime}
            onChange={handleGappyTimeChange}
            suffix={
              <TextField
                label=""
                value={gapyTime}
                autoComplete="off"
                suffix="second(s)"
                type="number"
                min={0}
                max={80}
                onChange={handleGappyTimeChange}
              />
            }
            helpText={
              <Text variant="bodySm" tone="subdued">
                The time interval between to popup notifications.
              </Text>
            }
            output
          />

          <RangeSlider
            label="Maximum of popups"
            min={0}
            max={80}
            value={maximumPops}
            onChange={handleMaximumPopsChange}
            suffix={
              <TextField
                label=""
                value={maximumPops}
                autoComplete="off"
                suffix="second(s)"
                type="number"
                min={0}
                max={80}
                onChange={handleMaximumPopsChange}
              />
            }
            helpText={
              <Text variant="bodySm" tone="subdued">
                The maximum number of popups are allowed to show after page loading. Maximun number
                is 80.
              </Text>
            }
            output
          />
        </FormLayout.Group>
      </FormLayout>
    </FormLayout>
  );
}

Display.propTypes = {};
