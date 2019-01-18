import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class Patientdata extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { patient } = this.props

    return (
      <div>
        <Paper elevation={1}>
          <Typography variant="h5" component="h3">
            {patient.name[0].text}
          </Typography>
          <Typography component="p">
            DOB: {patient.birthDate}
          </Typography>
          <Typography component="p">
            {patient.gender}
          </Typography>
        </Paper>
      </div>
    );
  };
}

export default Patientdata;
