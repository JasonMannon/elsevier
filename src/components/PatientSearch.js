import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class PatientSearch extends Component {
  handlePatientIdChange = (event) => {
    const { value } = event.target

    this.props.handleChange('patientId', value);
  };

  handleOnClick = () => {
    this.props.handleOnClick();
  };

  render() {
    const { error, errorMessage, loading, patientId } = this.props

    return (
      <div>
        { error ? <Typography color='error'>{errorMessage}</Typography> : '' }
        <div>
          <TextField
            error={error}
            id="outlined-name"
            label="Patient"
            margin="normal"
            onChange={this.handlePatientIdChange}
            value={patientId}
            variant="outlined"
          />
        </div>
        <div>
          <Button
            color="primary"
            disabled={loading}
            onClick={this.handleOnClick}
            variant="contained"
          >
            Search
          </Button>
        </div>
      </div>
    );
  };
};

export default PatientSearch
