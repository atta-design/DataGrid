import React,{useState} from 'react';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './App.css';
import  DataGrid ,{ Column,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,} from 'devextreme-react/data-grid';
import DiscountCell from './components/discountCell';
import ODataStore from 'devextreme/data/odata/store';
const dataSourceOptions = {
  store: new ODataStore({
    url: 'https://js.devexpress.com/Demos/SalesViewer/odata/DaySaleDtoes',
    key: 'Id',
    beforeSend(request) {
      request.params.startDate = '2020-05-10';
      request.params.endDate = '2020-05-15';
    },
  }),
};
const pageSizes = [10, 25, 50, 100];

function App() {
  const [collapsed,setCollapsed]=useState(false)
 const onContentReady=(e)=>{
    if (!collapsed) {
      e.component.expandRow(['EnviroCare']);
      setCollapsed({
        collapsed: true,
      });
    }
  }
  return (
    <div className='App'>
    <DataGrid
        dataSource={dataSourceOptions}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        showBorders={true}
        onContentReady={onContentReady}
      >
        <GroupPanel visible={true} />
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <Grouping autoExpandAll={false} />

        <Column dataField="Product" groupIndex={0} />
        <Column
          dataField="Amount"
          caption="Sale Amount"
          dataType="number"
          format="currency"
          alignment="right"
        />
        <Column
          dataField="Discount"
          caption="Discount %"
          dataType="number"
          format="percent"
          alignment="right"
          allowGrouping={false}
          cssClass="bullet"
          cellRender={DiscountCell}
        />
        <Column dataField="SaleDate" dataType="date" />
        <Column dataField="Region" dataType="string" />
        <Column dataField="Sector" dataType="string" />
        <Column dataField="Channel" dataType="string" />
        <Column dataField="Customer" dataType="string" width={150} />

        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
        <Paging defaultPageSize={10} />
      </DataGrid>
      </div>
  );
 
}

export default App;