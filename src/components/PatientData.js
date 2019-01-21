import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    marginTop: '3%'
  }
});

class PatientData extends Component {
  render() {
    const { classes, patient } = this.props

    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="h5" component="h3">
            {patient.fullName}
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
};

export default withStyles(styles)(PatientData);
