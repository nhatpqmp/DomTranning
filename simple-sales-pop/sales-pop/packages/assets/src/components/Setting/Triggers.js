import {FormLayout, Select, TextField} from '@shopify/polaris';

function Triggers({settings, onChangeSetting}) {
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
        value={settings.allowShow}
      />
      <FormLayout>
        <TextField
          label="Include pages"
          value={settings.includedUrls}
          onChange={value => onChangeSetting('includedUrls', value)}
          multiline={4}
          autoComplete="off"
          helpText={'Page Url two show the pop-up (separated by new lines)'}
        />
        {settings.allowShow === 'specific' && (
          <TextField
            label="Excluded pages"
            value={settings.excludedUrls}
            onChange={value => onChangeSetting('excludedUrls', value)}
            multiline={4}
            autoComplete="off"
            helpText={'Page URLs NOT to show the pop-up (separated by new lines)'}
          />
        )}
      </FormLayout>
    </FormLayout>
  );
}

Triggers.propTypes = {};

export default Triggers;
