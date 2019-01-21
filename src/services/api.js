import apisauce from 'apisauce'

const defaultHost = 'https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/'

const create = (dispatch, host = defaultHost) => {
  const api = apisauce.create({
    baseURL: `${host}`
  })

  const getConditions = (patientId) =>
    api.get(`Condition?patient=${patientId}&clinicalstatus=active`)

  const getPatient = (patientId) =>
    api.get(`Patient?_id=${patientId}&status=active`)

  return {
    getConditions,
    getPatient
  }
}

export default { create }
