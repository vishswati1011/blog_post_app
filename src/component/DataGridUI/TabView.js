import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function ScrollableTabsButtonPrevent() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ maxWidth: { xs: 450, sm: 600 }, bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        aria-label="scrollable prevent tabs example"
      >
        <Tab label="Open Order" />
        <Tab label="Open Order" />
        <Tab label="Schedule Order" />
        <Tab label="Histoy" />
        <Tab label="Dispatch" />
        <Tab label="Loadout" />
        <Tab label="Report" />
      </Tabs>
    </Box>
  );
}
