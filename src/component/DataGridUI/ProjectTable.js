import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef ,GridToolbar} from '@mui/x-data-grid';
import { makeStyles } from '@material-ui/core';
import { useDemoData } from '@mui/x-data-grid-generator';
import TabView from './TabView'
const rows: GridRowsProp = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' },
  { id: 4, col1: 'Hello', col2: 'World' },
  { id: 5, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 6, col1: 'MUI', col2: 'is Amazing' },
  { id: 7, col1: 'Hello', col2: 'World' },
  { id: 8, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 9, col1: 'MUI', col2: 'is Amazing' },
  { id: 10, col1: 'MUI', col2: 'is Amazing' },
  { id: 11, col1: 'Hello', col2: 'World' },
  { id: 12, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 13, col1: 'MUI', col2: 'is Amazing' },
  { id: 14, col1: 'Hello', col2: 'World' },
  { id: 15, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 16, col1: 'MUI', col2: 'is Amazing' },
];

const columns: GridColDef[] = [
  { field: 'col1', headerName: 'Column 1', width: 150 },
  { field: 'col2', headerName: 'Column 2', width: 150 },
];
const useStyles = makeStyles({
  grid: {
    display: "flex",
    flexDirection: "column-reverse"
  }
});
export default function App() {
  const [pageSize, setPageSize] = React.useState(25);
  const classes = useStyles();
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 4
  });

  return (
    <>
    <TabView className="mb-3"/>
    <div style={{ height: 300, width: '100%' ,marginTop:"10px"}}>
      {/* <DataGrid rows={rows} columns={columns} 
       className={classes.grid}
       
        autoHeight
        // autoPageSize pagination

        pageSize={pageSize}
        onPageSizeChange={(newPage) => setPageSize(newPage)}
        pagination
      /> */}
      <DataGrid
       components={{
          Toolbar: GridToolbar,
        }}
        className={classes.grid}
        autoHeight
        pageSize={20}
        autoHeight
        rowsPerPageOptions={[5, 10, 20]}
        {...data}
      />
    </div>
    </>
  );
}
