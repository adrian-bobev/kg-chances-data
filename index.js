const getGroupsByDraft = require('./util/groups');
const getAllKgs = require('./util/kg');
const { getAllRegions } = require('./util/regions');

async function run() {
    const endYear = new Date().getFullYear() - 1;
    const startYear = endYear - 5

    await getAllRegions();
    await getAllKgs();

    for (let currentYear = startYear; currentYear <= endYear; currentYear++) {
        await getGroupsByDraft(currentYear);
    }
}

run();