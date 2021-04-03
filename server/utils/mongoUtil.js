const MongoClient = require( 'mongodb' ).MongoClient;
const {MONGO_DB, MONGO_LOCAL_URI} = require("../configurations/config");

let _db, _client;

const connectToMongoServer = async ({
  url = MONGO_LOCAL_URI,
  db_name = MONGO_DB
}) => {
  try {

    const client = await MongoClient.connect(url,{
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    if (!client) return;
    _client = client;
    _db  = client.db(db_name);

    console.log("Connected to Mongo DB:", db_name);

  } catch (err) {
    console.log("Error connecting to Mongo Server", err);  
  }
};

const getDb = () => {
  return _db;
};

const getClient = () => {
  return _client;
};

module.exports = {
  getDb,
  getClient,
  connectToMongoServer
};
