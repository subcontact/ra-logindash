import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "./autocomplete";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

const currencies = [
  {
    value: "USD",
    label: "Male"
  },
  {
    value: "EUR",
    label: "Female"
  }
];
const MaritalStatus = [
  {
    value: "Divorced",
    label: "Divorced"
  },
  {
    value: "Single",
    label: "Single"
  },
  {
    value: "Married",
    label: "Married"
  },
  {
    value: "Widow",
    label: "Widow"
  }
];

class TextFields extends React.Component {
  state = {
    name: "Enter detail",
    age: "",
    multiline: "Controlled",
    currency: "EUR",
    MaritalStatus: "Single"
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="standard-read-only-input"
          label="Party ID"
          defaultValue="G51981"
          className={classes.textField}
          margin="normal"
          InputProps={{
            readOnly: true
          }}
        />
        <TextField
          required
          id="standard-required"
          label="Party Name"
          defaultValue="Nancy"
          className={classes.textField}
          margin="normal"
        />

        <TextField
          required
          id="standard-required"
          label="Surname"
          defaultValue="Mayers"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="standard-uncontrolled"
          label="Nickname"
          defaultValue="Nan"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="standard-select-currency"
          select
          label="Gender"
          className={classes.textField}
          value={this.state.currency}
          onChange={this.handleChange("currency")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="Please select your Gender"
          margin="normal"
        >
          {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="date"
          label="Birthday"
          type="date"
          defaultValue="2017-05-24"
          className={classes.textField}
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />

        <TextField
          id="date"
          label="Death Date"
          type="date"
          defaultValue=""
          className={classes.textField}
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />

        <TextField
          id="standard-uncontrolled"
          label="Nationality"
          defaultValue="American"
          className={classes.textField}
          margin="normal"
        />
        <Autocomplete />
        <TextField
          id="standard-select-MaritalStatus"
          select
          label="Marital status"
          className={classes.textField}
          value={this.state.MaritalStatus}
          onChange={this.handleChange("MaritalStatus")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          margin="normal"
        >
          {MaritalStatus.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="standard-uncontrolled"
          label="Roles"
          defaultValue="Customer"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="standard-uncontrolled"
          label="Segment"
          defaultValue="Retail"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="standard-uncontrolled"
          label="Status"
          defaultValue="Active"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="standard-uncontrolled"
          label="Company"
          defaultValue="Fresh Co."
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="standard-uncontrolled"
          label="Sales Rep"
          defaultValue="Miranda Kerr"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="standard-uncontrolled"
          label="Partner"
          defaultValue="N/A"
          className={classes.textField}
          margin="normal"
        />
      </form>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TextFields);
