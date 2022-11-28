import * as React from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import DateFnsUtils from "@date-io/date-fns";
import { TimePicker, DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Autocomplete from "@mui/material/Autocomplete";
import PropTypes from "prop-types";

class MTableEditField extends React.Component {
  getProps() {
    const {
      columnDef,
      rowData,
      onRowDataChange,
      errorState,
      onBulkEditRowChanged,
      scrollWidth,
      ...props
    } = this.props;
    return props;
  }

  renderLookupField() {
    const isArray = Array.isArray(this.props.columnDef.lookup);
    const options = isArray
      ? this.props.columnDef.lookup
      : Object.keys(this.props.columnDef.lookup);

    return (
      <Autocomplete
        autoComplete
        value={this.props.value}
        onChange={(event, value) => {
          this.props.onChange(value);
        }}
        options={options}
        defaultValue={this.props.columnDef.initialEditValue}
        getOptionLabel={(option) =>
          isArray ? option : this.props.columnDef.lookup[option]
        }
        fullWidth
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              defaultValue={this.props.columnDef.initialEditValue}
              placeholder={this.props.columnDef.editPlaceholder}
            />
          );
        }}
      />
    );
  }

  renderBooleanField() {
    const { helperText, error, ...props } = this.getProps();

    return (
      <FormControl error={Boolean(error)} component="fieldset">
        <FormGroup>
          <FormControlLabel
            label=""
            control={
              <Checkbox
                {...props}
                value={String(this.props.value)}
                checked={Boolean(this.props.value)}
                onChange={(event) => this.props.onChange(event.target.checked)}
                style={{
                  padding: 0,
                  width: 24,
                  marginLeft: 9,
                }}
                inputProps={{
                  "aria-label": this.props.columnDef.title,
                }}
              />
            }
          />
        </FormGroup>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    );
  }

  renderDateField() {
    const dateFormat =
      this.props.columnDef.dateSetting &&
      this.props.columnDef.dateSetting.format
        ? this.props.columnDef.dateSetting.format
        : "dd.MM.yyyy";
    return (
      <LocalizationProvider utils={DateFnsUtils} locale={this.props.locale}>
        <DatePicker
          {...this.getProps()}
          format={dateFormat}
          value={this.props.value || null}
          onChange={this.props.onChange}
          clearable
          InputProps={{
            style: {
              fontSize: 13,
            },
          }}
          inputProps={{
            "aria-label": `${this.props.columnDef.title}: press space to edit`,
          }}
        />
      </LocalizationProvider>
    );
  }
  renderTimeField() {
    return (
      <LocalizationProvider utils={DateFnsUtils} locale={this.props.locale}>
        <TimePicker
          {...this.getProps()}
          format="HH:mm:ss"
          value={this.props.value || null}
          onChange={this.props.onChange}
          clearable
          InputProps={{
            style: {
              fontSize: 13,
            },
          }}
          inputProps={{
            "aria-label": `${this.props.columnDef.title}: press space to edit`,
          }}
        />
      </LocalizationProvider>
    );
  }

  renderDateTimeField() {
    return (
      <LocalizationProvider utils={DateFnsUtils} locale={this.props.locale}>
        <DateTimePicker
          {...this.getProps()}
          format="dd.MM.yyyy HH:mm:ss"
          value={this.props.value || null}
          onChange={this.props.onChange}
          clearable
          InputProps={{
            style: {
              fontSize: 13,
            },
          }}
          inputProps={{
            "aria-label": `${this.props.columnDef.title}: press space to edit`,
          }}
        />
      </LocalizationProvider>
    );
  }

  getEditPlaceholder() {
    if (this.props.columnDef.editPlaceholder) {
      return this.props.columnDef.editPlaceholder;
    } else if (typeof this.props.columnDef.title === "string") {
      return this.props.columnDef.title;
    }
  }

  renderTextField() {
    return (
      <TextField
        {...this.getProps()}
        fullWidth
        style={
          this.props.columnDef.type === "numeric" ? { float: "right" } : {}
        }
        type={this.props.columnDef.type === "numeric" ? "number" : "text"}
        placeholder={this.getEditPlaceholder()}
        value={this.props.value === undefined ? "" : this.props.value}
        onChange={(event) =>
          this.props.onChange(
            this.props.columnDef.type === "numeric"
              ? event.target.valueAsNumber
              : event.target.value
          )
        }
        // InputProps={{
        //   style: {
        //     fontSize: 13,
        //   },
        // }}
        inputProps={{
          "aria-label": this.props.columnDef.title,
        }}
      />
    );
  }

  renderCurrencyField() {
    return (
      <TextField
        {...this.getProps()}
        placeholder={
          this.props.columnDef.editPlaceholder || this.props.columnDef.title
        }
        style={{ float: "right" }}
        type="number"
        value={this.props.value === undefined ? "" : this.props.value}
        onChange={(event) => {
          let value = event.target.valueAsNumber;
          if (!value && value !== 0) {
            value = undefined;
          }
          return this.props.onChange(value);
        }}
        InputProps={{
          style: {
            // fontSize: 13,
            textAlign: "right",
          },
        }}
        inputProps={{
          "aria-label": this.props.columnDef.title,
        }}
        onKeyDown={this.props.onKeyDown}
        autoFocus={this.props.autoFocus}
      />
    );
  }

  render() {
    let component = "ok";

    if (this.props.columnDef.lookup) {
      component = this.renderLookupField();
    } else if (this.props.columnDef.type === "boolean") {
      component = this.renderBooleanField();
    } else if (this.props.columnDef.type === "date") {
      component = this.renderDateField();
    } else if (this.props.columnDef.type === "time") {
      component = this.renderTimeField();
    } else if (this.props.columnDef.type === "datetime") {
      component = this.renderDateTimeField();
    } else if (this.props.columnDef.type === "currency") {
      component = this.renderCurrencyField();
    } else {
      component = this.renderTextField();
    }

    return component;
  }
}

MTableEditField.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  columnDef: PropTypes.object.isRequired,
  locale: PropTypes.object,
};

export default MTableEditField;
