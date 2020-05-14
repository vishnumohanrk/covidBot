const utils = require('./utils/APIresponse');

const usage = `Usage:
StateName or StateCode => To Get That State's Stats
Example: TN or TamilNadu

StateName or StateCode followed By hyphen(-) => To See 20 District Stats of that state
Example: MH- or Maharashtra-

District Name and StateName/Code separated by comma(,) => To get that particular District Stats
Example: Bengaluru Urban, KA

All/Ind/Total => To See Full Country Stats`;

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
