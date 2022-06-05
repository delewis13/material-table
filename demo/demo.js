import { MuiThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import MaterialTable from "../src";

let direction = "ltr";
// direction = 'rtl';
const theme = createMuiTheme({
  direction: direction,
  palette: {
    type: "light",
  },
});

const defaultHidden = {
  select: true,
  text: false,
  number: false,
};

const defaultHiddenWhileEditing = {
  select: false,
  text: true,
  number: true,
};

const categories = ["a", "b", "c"];

const mockData = [
  {
    select: "key1",
    text: "my text",
    number: 1,
    lookupField: categories[0],
  },
  {
    select: "key2",
    text: "other text",
    number: 2,
    lookupField: categories[1],
  },
  {
    select: "key3",
    text: "3",
    number: 3,
    lookupField: categories[1],
  },
  {
    select: "key4",
    text: "4",
    number: 4,
    lookupField: categories[1],
  },
  {
    select: "key5",
    text: "5",
    number: 5,
    lookupField: categories[1],
  },
  {
    select: "key6",
    text: "6",
    number: 6,
    lookupField: categories[1],
  },
  {
    select: "key7",
    text: "7",
    number: 7,
    lookupField: categories[1],
  },
];

const App = () => {
  const [hiddenColumns, setHiddenColumns] = useState(defaultHidden);
  const [rerender, forceReRender] = useState(false);
  const [data, setData] = useState(mockData);

  return (
    <MuiThemeProvider theme={theme}>
      <div style={{ width: "100%" }}>
        <button onClick={() => forceReRender(!rerender)}>Re-render</button>
        <button
          onClick={() =>
            setData(
              mockData
                .sort(() => (Math.random() > 0.5 ? 1 : -1))
                .slice(0, Math.floor(Math.random() * mockData.length))
            )
          }
        >
          Reset data
        </button>
        <MaterialTable
          options={{
            columnsButton: true,
            paging: false,
            filtering: true,
            enableRowDragAndDrop: true,
            fixedLayout: true,
            tableLayout: "fixed",
            maxBodyHeight: "400px",
            actionsColumnIndex: 3,
            actionsHeaderStyle: {
              width: "200px",
            },
          }}
          columns={[
            {
              title: "select",
              field: "select",
              width: "20%",
              lookup: { key1: "a", key2: "b", key3: "c" },
              hiddenByColumnsButton: hiddenColumns["select"],
              hidden: hiddenColumns["select"],
            },
            {
              title: "text",
              field: "text",
              width: "50%",
              hiddenByColumnsButton: hiddenColumns["text"],
              hidden: hiddenColumns["text"],
            },
            {
              title: "number",
              field: "number",
              width: "10%",
              hiddenByColumnsButton: hiddenColumns["number"],
              hidden: hiddenColumns["number"],
            },
            {
              title: "showOnHide",
              field: "number",
              width: "10%",
              showOnlyOnEdit: true,
              // hiddenByColumnsButton: hiddenColumns["number"],
              // hidden: hiddenColumns["number"],
            },
            {
              title: "lookup",
              width: "10%",
              field: "lookupField",
              // initialEditValue: categories[Object.keys(categories)[0]],
              lookup: categories,
              initialEditValue: categories[0],
            },
          ]}
          onChangeColumnHidden={(column, hidden) => {
            setHiddenColumns({
              ...hiddenColumns,
              [column.field]: hidden,
            });
          }}
          data={data}
          title="Demo Title"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve();
                }, 1000);
              }),
          }}
        />
      </div>
    </MuiThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

module.hot.accept();
