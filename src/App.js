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
      loadingData: false,
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

    if (response.ok && response.data.entry) {
      const { resource: patient } = response.data.entry[0]

      this.setState({
        patient: reshapePatient(patient)
      });

      this.handleGetConditions();
    } else {
      const errorMessage = (!response.ok ? response.data : 'Patient Not Found')

      this.setState({
        error: true,
        errorMessage,
        loadingData: false
      });
    };
  };

  handleGetConditions = async() => {
    const { api, patientId } = this.state
    const response = await api.getConditions(patientId)

    if (response.ok) {
      const { entry: conditions } = response.data

      this.setState({
        conditions: conditions.map(reshapeCondition),
        loadingData: false
      });
    };
  };

  handleOnClick = () => {
    this.setState({
      error: false,
      loadingData: true,
      patient: null,
      conditions: {}
    });

    this.handleGetPatient();
  };

  render() {
    const { conditions, error, errorMessage, loadingData, patient, patientId } = this.state

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
          loading={loadingData}
          patientId={patientId}
          type='number'
        />

        { !loadingData && patient ? <PatientData patient={patient}/> : ''}

        { !loadingData && (conditions.length > 0) ? <PatientConditions conditions={conditions}/> : '' }
      </div>
    );
  }
}

export default App;
