export default (patient) => {
  return {
    ...patient,
    fullName: patient.name[0].text
  };
};
