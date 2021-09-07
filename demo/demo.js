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
};

const defaultHiddenWhileEditing = {
  select: false,
  text: true,
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
          }}
          columns={[
            {
              title: "select",
              field: "select",
              lookup: { key1: "a", key2: "b", key3: "c" },
              hideOnEdit: true,
            },
            {
              title: "text",
              field: "text",
              showOnlyOnEdit: true,
            },
          ]}
          data={[
            {
              select: "key1",
              text: "my text",
            },
            {
              select: "key2",
              text: "other text",
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
