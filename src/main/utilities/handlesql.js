const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const handlefiles = require('./handleFiles');

async function runsql(oSqlDetails) {
  const { sSqlPath, sSqlQuery } = oSqlDetails;
  try {
    sqlite3.verbose();
    const oDbObject = await createDbConnection(sSqlPath);
    const result = await oDbObject.all(sSqlQuery)
    return result;
  } catch (error) {
    console.error(error);
  }
  return null

}

function createDbConnection(filename) {
  const sHomePath = handlefiles.getUserHome();
  filename = filename.replace('%USERPROFILE%', sHomePath);
  return open({
    filename,
    driver: sqlite3.Database
  });
}


const handlesql = { runsql }
module.exports = handlesql;