const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb://nodejsraw:everson13@cluster0-shard-00-00.wu6no.mongodb.net:27017,cluster0-shard-00-01.wu6no.mongodb.net:27017,cluster0-shard-00-02.wu6no.mongodb.net:27017/nodejs?ssl=true&replicaSet=atlas-n1unka-shard-0&authSource=admin&retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
    }
  )
    .then((client) => {
      console.log("Connected!");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "Database not found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;