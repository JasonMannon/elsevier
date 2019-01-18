import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import API from './services/api'
import PatientSearch from './components/PatientSearch'
import Typography from '@material-ui/core/Typography';

class App extends Component {
  constructor (props) {
    super()

    this.state = {
      api: API.create(),
      error: false,
      errorMessage: '',
      loading: false,
      patientId: ''
    }
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  handleOnClick = async() => {
    this.setState({ error: false, loading: true })

    const { api, patientId } = this.state
    const response = await api.getPatient(patientId)

    if (response.ok) {
      this.setState({
        loading: false
      })
    } else {
      const { data: errorMessage } = response

      this.setState({
        error: true,
        errorMessage,
        loading: false
      })
    }
  }

  render() {
    const { error, errorMessage, loading, patientId } = this.state

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
          loading={loading}
          patientId={patientId}
          type='number'
        />
      </div>
    );
  }
}

export default App;
