const request = require('request-promise')
const stateCodes = require('./stateCodes')

const getStateStats = (stateVal) => {
    const state = stateVal.trim()
    return new Promise((resolve,reject) => {
        const req = state.length == 2 ? state.toUpperCase() : stateCodes[state.replace(/\s+/g, '').toLowerCase()]
        request.get({
            uri: 'https://api.covid19india.org/data.json',
            json: true,
        })
        .then(res => resolve(res.statewise.filter(i => i.statecode == req)))
        .catch(e => reject(e))
    })
}

const getDistrictStats = (districtVal, stateVal) => {
    const district = districtVal.trim()
    const state = stateVal.trim()
    return new Promise((resolve, reject) => {
        const code = state.length == 2 ? state.toUpperCase() : stateCodes[state.replace(/\s+/g, '').toLowerCase()]
        const dist = district.replace(/\b\w/g, l => l.toUpperCase()) // https://stackoverflow.com/a/38530325
        console.log(code, dist)
        request.get({
            uri: 'https://api.covid19india.org/v2/state_district_wise.json',
            json: true,
        })
        .then(res => resolve(!res.filter(i => i.statecode == code)[0] ? [] : res.filter(i => i.statecode == code)[0].districtData.filter(i => i.district == dist)))
        .catch(e => reject(e))
    })
}

// getDistrictStats('coimbatore', 'tn').then(res => console.log(res)).catch(e => console.log(e))
// getStateStats('India').then(res => console.log(res)).catch(E => console.log(E))

module.exports = {getStateStats, getDistrictStats}