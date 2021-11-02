const { MongoClient } = require('mongodb');

const origin = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
 
const DB_NAME = 'ToDoDB';
const MONGO_DB_URL = `mongodb://localhost:27017/${DB_NAME}`;

module.exports = () => MongoClient.connect(MONGO_DB_URL, origin)
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });