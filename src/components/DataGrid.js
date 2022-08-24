import React, { useState, useEffect } from "react";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import "../App.css";
import DataGrid, { Column, Pager, Paging } from "devextreme-react/data-grid";
import { Editing } from "devextreme-react/data-grid";
import { Sorting } from "devextreme-react/data-grid";
const pageSizes = [10, 20];
function Grid() {
  const [Link, setLink] = useState();

  const felan = async () => {
    const resp = await fetch("https://api-portal.saeedsafaee.ir/Country/List");
    const data = await resp.json();
    const itemArray = data.content.items;
    setLink(itemArray);
    console.log(itemArray);
  };
  useEffect(() => {
    felan();
  }, []);
  return (
    <div className="App">
      <DataGrid
        showColumnLines={false}
        dataSource={Link}
        showRowLines={true}
        allowColumnReordering={true}
        rowAlternationEnabled={false}
        showBorders={false}
      >
        <Editing
          mode="row"
          allowUpdating={true}
          allowDeleting={true}
          allowAdding={true}
        />
        <Sorting mode="multiple" />

        <Column dataField="title"  dataType="string" />

        <Column dataField="status" dataType="string" />
        <Column dataField="language"  dataType="string" />

        <Column dataField="modifyDate" dataType="date" />
        <Column dataField="createDate" dataType="date" />

        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
        <Paging defaultPageSize={10} />
      </DataGrid>
    </div>
  );
}

export default Grid;
