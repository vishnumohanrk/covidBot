const request = require('request-promise');
const stateCodes = require('./stateCodes');

const getStateCode = state =>
    state.length == 2
        ? state.toUpperCase()
        : stateCodes[state.replace(/\s+/g, '').toLowerCase()];

const getStateStats = async state => {
    const code = getStateCode(state.trim());

    const response = await request.get({
        uri: 'https://api.covid19india.org/data.json',
        json: true,
    });

    return response.statewise.filter(i => i.statecode === code)[0];
};

const getAllDist = async state => {
    const code = getStateCode(state.trim());

    const response = await request.get({
        uri: 'https://api.covid19india.org/v2/state_district_wise.json',
        json: true,
    });

    return response.filter(i => i.statecode === code)[0].districtData;
};

const getDistrictStats = async (district, state) => {
    const code = getStateCode(state.trim());
    const dist = district.trim().replace(/\b\w/g, l => l.toUpperCase()); // https://stackoverflow.com/a/38530325

    const response = await request.get({
        uri: 'https://api.covid19india.org/v2/state_district_wise.json',
        json: true,
    });

    return response
        .filter(i => i.statecode === code)[0]
        .districtData.filter(i => i.district === dist.trim())[0];
};

const getTop = async () => {
    const response = await request.get({
        uri: 'https://api.covid19india.org/data.json',
        json: true,
    });

    return response.statewise;
};

const distStatsString = ({ district, active, confirmed, recovered, deceased }) =>
    `District: ${district}\n` +
    `Recovered: ${recovered}\n` +
    `active: ${active}\n` +
    `Confirmed: ${confirmed}\n` +
    `Deceased: ${deceased}\n\n`;

const stateStatsString = ({
    state,
    active,
    confirmed,
    recovered,
    deaths,
    lastupdatedtime,
}) =>
    `As Of ${lastupdatedtime}\n` +
    `State: ${state}\n` +
    `Recovered: ${recovered}\n` +
    `Active: ${active}\n` +
    `Confirmed: ${confirmed}\n` +
    `Deceased: ${deaths}\n\n`;

module.exports = {
    getStateStats,
    getAllDist,
    getDistrictStats,
    getTop,
    distStatsString,
    stateStatsString,
};
