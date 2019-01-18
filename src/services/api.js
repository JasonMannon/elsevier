import apisauce from 'apisauce'

const defaultHost = 'https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/Patient'

const create = (dispatch, host = defaultHost) => {
  const api = apisauce.create({
    baseURL: `${host}`
  })

  api.addMonitor(response => {
    if (!response.ok && response.status === 401) {
      const { url } = response.config
      console.log('here someway ')
    }
  })

  const getPatient = (patientId) =>
    api.get(`?_id=${patientId}`)

  return {
    getPatient
  }
}

export default { create }
