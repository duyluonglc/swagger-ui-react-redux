export default {
  // Functions return fixtures
  getSpec: (specUrl) => {
    const specData = require('../Fixtures/spec.json')
    return {
      ok: true,
      data: specData
    }
  }
}
