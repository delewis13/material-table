import { Grid, MuiThemeProvider, Button } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import MaterialTable from "../src";
import Typography from "@material-ui/core/Typography";

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

const App = () => {
  const [hiddenColumns, setHiddenColumns] = useState(defaultHidden);
  const [state, setState] = useState(false);

  return (
    <MuiThemeProvider theme={theme}>
      <div style={{ width: "100%" }}>
        <button onClick={() => setState(!state)}>Hello</button>
        <MaterialTable
          options={{
            columnsButton: true,
            filtering: true,
            fixedLayout: true,
            actionsHeaderStyle: {
              width: "200px",
            },
          }}
          columns={[
            {
              title: "select",
              field: "select",
              lookup: { key1: "a", key2: "b", key3: "c" },
              hiddenByColumnsButton: hiddenColumns["select"],
              hidden: hiddenColumns["select"],
            },
            {
              title: "text",
              field: "text",
              width: "1%",
              hiddenByColumnsButton: hiddenColumns["text"],
              hidden: hiddenColumns["text"],
            },
            {
              title: "number",
              field: "number",
              hiddenByColumnsButton: hiddenColumns["number"],
              hidden: hiddenColumns["number"],
            },
          ]}
          onChangeColumnHidden={(column, hidden) => {
            setHiddenColumns({
              ...hiddenColumns,
              [column.field]: hidden,
            });
          }}
          data={[
            {
              select: "key1",
              text: "my text",
              number: 1,
            },
            {
              select: "key2",
              text: "other text",
              number: 2,
            },
          ]}
          editable={true}
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
