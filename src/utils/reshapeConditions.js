export default (condition) => {

  return {
    ...condition.resource,
    conditionName: condition.resource.code.text
  }
}
