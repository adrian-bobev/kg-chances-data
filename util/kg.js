const path = require('path');
const { promises: fs } = require('fs');

const dir = path.join(path.dirname(__filename), '../', 'docs');

async function getAllKgs() {
    console.log(`Fetching - all kgs...`);
    const data = await fetch(`https://kg.sofia.bg/api/public/kg/type/kinderGarden/all?filterType=by_region&kgType=0&regionId=0`)
        .then(res => { 
            console.log(`Data recieved - all kgs`);
            return res.json();
        })
        .catch(err => {
            console.error(`Failed to fetch - all kgs`);
            console.error(err);
            return null;
        });

    const kgs = data.items.kinderGardens.map(kg => {
        return {
            id: kg.id,
            name: kg.nameStr
        };
    });
    
    const result = { date: new Date().toISOString(), kgs};
    await fs.writeFile(path.join(dir, `/kgs.json`), JSON.stringify(result), 'utf8');

    return result;
};

module.exports = getAllKgs;