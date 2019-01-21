import React, { Component } from 'react';
import './App.css';
import API from './services/api';
import reshapeCondition from './utils/reshapeConditions'
import reshapePatient from './utils/reshapePatient'
import PatientConditions from './components/PatientConditions'
import PatientSearch from './components/PatientSearch';
import PatientData from './components/PatientData';
import Typography from '@material-ui/core/Typography';

class App extends Component {
  constructor (props) {
    super()

    this.state = {
      api: API.create(),
      conditions: {},
      error: false,
      errorMessage: '',
      loadingPatient: false,
      patient: null,
      patientId: ''
    };
  };

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  handleGetPatient = async() => {
    const { api, patientId } = this.state
    const response = await api.getPatient(patientId)

    if (response.ok) {
      const { resource: patient } = response.data.entry[0]

      this.setState({
        patient: reshapePatient(patient),
        loadingPatient: false
      });
    } else {
      const { data: errorMessage } = response

      this.setState({
        error: true,
        errorMessage,
        loadingPatient: false
      });
    };
  };

  handleGetConditions = async() => {
    const { api, patientId } = this.state
    const response = await api.getConditions(patientId)

    if (response.ok) {
      const { entry: conditions } = response.data

      this.setState({
        conditions: conditions.map(reshapeCondition)
      });
    };
  };

  handleOnClick = () => {
    this.setState({ error: false, loadingPatient: true });
    this.handleGetPatient();
    this.handleGetConditions();
  };

  render() {
    const { conditions, error, errorMessage, loadingPatient, patient, patientId } = this.state

    return (
      <div className="App">
        <Typography component="h2" variant="h2" gutterBottom>
          Elsevier Coding Challenge
        </Typography>

        <PatientSearch
          error={error}
          errorMessage={errorMessage}
          handleChange={this.handleChange}
          handleOnClick={this.handleOnClick}
          loading={loadingPatient}
          patientId={patientId}
          type='number'
        />

        { patient ? <PatientData patient={patient}/> : ''}

        { (conditions.length > 0) ? <PatientConditions conditions={conditions}/> : '' }
      </div>
    );
  }
}

export default App;
