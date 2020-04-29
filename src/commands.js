const utils = require('./utils/req')

const commands = 'State Name or State Code,\nlike this:MH or Maharashtra.\nDistrict Name and state name separated by comma,\nlike this: Chennai, Tamil Nadu\nTop -followed by a number'

const returnRes = async(q) => {
    if(q.toLowerCase() === 'commands'){
        return commands
    } else if (q.includes(',')){
        const splitted = q.split(',')
        const data = await utils.getDistrictStats(splitted[0], splitted[1])
        if(data[0]){
            return `State: ${splitted[1]}\nDistrict: ${data[0].district}\nRECOVERED: ${data[0].recovered}\nACTIVE: ${data[0].active}\nCONFIRMED: ${data[0].confirmed}`
        }
        return commands
    } else if(q.toLowerCase().includes('top')){
        const n = q.match(/\d+/g)
        if(n){
            const data = await utils.topN(Number(n[0]))
            const arr = []
            data.forEach(i => arr.push(`State: ${i.state}\nAS OF ${i.lastupdatedtime}\nRECOVERED: ${i.recovered}\nACTIVE: ${i.active}\nCONFIRMED: ${i.confirmed}\n\n`))
            return arr.toString()
        }
        return commands
    } else if(q){
        const data = await utils.getStateStats(q)
        if(data[0]){
            return `State: ${data[0].state}\nAS OF ${data[0].lastupdatedtime}\nRECOVERED: ${data[0].recovered}\nACTIVE: ${data[0].active}\nCONFIRMED: ${data[0].confirmed}`
        }
        return commands
    }
}

module.exports = {returnRes}