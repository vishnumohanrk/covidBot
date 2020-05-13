const utils = require('./utils/APIresponse');

const usage = 'Try Again'; // spelling invlaid request

const returnResponse = async q => {
    const query = q.trim().toLowerCase();

    if (query.includes(',')) {
        const querySplit = query.split(',');

        try {
            const response = await utils.getDistrictStats(querySplit[0], querySplit[1]);
            return utils.distStatsString(response);
        } catch (e) {
            return usage;
        }
    }

    if (query.includes('-')) {
        const param = query.slice(0, q.indexOf('-'));

        try {
            const districts = await utils.getAllDist(param);
            const data = districts.map(i => utils.distStatsString(i));
            return data;
        } catch (e) {
            return usage;
        }
    }

    if (query.includes('top')) {
        try {
            const n = Number(query.match(/\d+/g)[0]);
            const response = await utils.getTop();
            const data = response.map(i => utils.stateStatsString(i));
            return data.slice(1, n + 1);
        } catch (e) {
            return usage;
        }
    }

    try {
        const response = await utils.getStateStats(query);
        return utils.stateStatsString(response);
    } catch (e) {
        return usage;
    }
};

module.exports = { returnResponse };
