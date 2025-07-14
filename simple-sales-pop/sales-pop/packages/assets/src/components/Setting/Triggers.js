import {FormLayout, Select, TextField, Text} from '@shopify/polaris';
import {value} from 'firebase-tools/lib/deploymentTool';

function Triggers({setting, onChangeSetting}) {
  const options = [
    {label: 'All pages', value: 'all'},
    {label: 'Specific pages', value: 'specific'}
  ];

  return (
    <FormLayout>
      <Select
        label="Date range"
        options={options}
        onChange={value => onChangeSetting('allowShow', value)}
        value={setting.allowShow}
      />
      <FormLayout>
        <TextField
          label="Include pages"
          value={setting.includedUrls}
          onChange={value => onChangeSetting('includedUrls', value)}
          multiline={4}
          autoComplete="off"
          helpText={
            <Text variant="bodySm" tone="subdued">
              Page Url two show the pop-up (separated by new lines)
            </Text>
          }
        />
        {setting.allowShow === 'specific' && (
          <TextField
            label="Excluded pages"
            value={setting.excludedUrls}
            onChange={value => onChangeSetting('excludedUrls', value)}
            multiline={4}
            autoComplete="off"
            helpText={
              <Text variant="bodySm" tone="subdued">
                Page URLs NOT to show the pop-up (separated by new lines)
              </Text>
            }
          />
        )}
      </FormLayout>
    </FormLayout>
  );
}

Triggers.propTypes = {};

export default Triggers;
