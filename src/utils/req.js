const request = require('request-promise')
const stateCodes = require('./stateCodes')

const getStateStats = (state) => {
    return new Promise((resolve,reject) => {
        const req = state.length == 2 ? state : stateCodes[state.replace(/\s+/g, '').toLowerCase()]
        request.get({
            uri: 'https://api.covid19india.org/data.json',
            json: true,
        })
        .then(res => resolve(res.statewise.filter(i => i.statecode == req)))
        .catch(e => reject(e))
    })
}

// getStateStats('India').then(res => console.log(res)).catch(E => console.log(E))

module.exports = {getStateStats}