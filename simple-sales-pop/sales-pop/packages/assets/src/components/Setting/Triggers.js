import {FormLayout, Select, TextField, Text} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function Triggers() {
  const [selected, setSelected] = useState('allPages');

  const handleSelectChange = useCallback(value => setSelected(value), []);

  const [includePages, setIncludePages] = useState('');

  const handleIncludePagesChange = useCallback(value => setIncludePages(value), []);

  const [excludedPages, setExcludedPages] = useState('');

  const handleExcludedPagesChange = useCallback(value => setExcludedPages(value), []);

  const options = [
    {label: 'All pages', value: 'allPages'},
    {label: 'Specific pages', value: 'specificPages'}
  ];

  return (
    <FormLayout>
      <Select label="Date range" options={options} onChange={handleSelectChange} value={selected} />
      <FormLayout>
        <TextField
          label="Include pages"
          value={includePages}
          onChange={handleIncludePagesChange}
          multiline={4}
          autoComplete="off"
          helpText={
            <Text variant="bodySm" tone="subdued">
              Page Url two show the pop-up (separated by new lines)
            </Text>
          }
        />
        {selected === 'specificPages' && (
          <TextField
            label="Excluded pages"
            value={excludedPages}
            onChange={handleExcludedPagesChange}
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
