const mongodb = require('mongodb')
const pojo = require("./pojo");

class dbConnectionData {
    constructor(url, DB, Collection) {
      this.url = url;
      this.DB = DB;
      this.Collection = Collection;
    }
  }

    function printFromDb () {
        var url = "mongodb://localhost:27017/";
        var MongoClient =  new mongodb.MongoClient(url, {useUnifiedTopology: true});
        MongoClient.connect(function(err, db) {
            var dbo = db.db("nodetest1");
            var cursor = dbo.collection('usercollection').find();
            cursor.each(function(err, doc) {
                console.log(doc);
            });
        }); 
    }

    function writeToDB (productRatingDatas, dbconnectiondata) {
        var url = dbconnectiondata.url;
        var MongoClient =  new mongodb.MongoClient(url, {useUnifiedTopology: true});
        MongoClient.connect(function(err, db) {
            var dbo = db.db(dbconnectiondata.DB);
            // var myobjs = [{ name: productRatingData.name, description: productRatingData.description, noOfReviews: productRatingData.noOfReviews, averageRating: productRatingData.averageRating}];
            dbo.collection(dbconnectiondata.Collection).insertMany(productRatingDatas, function(err, res) {
              if (err) throw err;
              console.log("1 document inserted");
              db.close(); 
            });
        }); 
    }

    function createCollection (dbconnectiondata)
    {
        var url = dbconnectiondata.url;
        var MongoClient =  new mongodb.MongoClient(url, {useUnifiedTopology: true});
        MongoClient.connect(function(err, db) {
            var dbo = db.db(dbconnectiondata.DB);
            dbo.createCollection(dbconnectiondata.Collection, function(err, res) {  
            if (err) throw err;  
            console.log("Collection is created!");  
            db.close();  
            });  
        });
    }

    function createDB (dbconnectiondata)
    {
        var MongoClient = require('mongodb').MongoClient;
        var url = dbconnectiondata.url+dbconnectiondata.DB;
        MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        console.log("Database created!");
        db.close();
        });
    }

    module.exports = {
        dbConnectionData: dbConnectionData,
        writeToDB : writeToDB,
        printFromDb : printFromDb,
        createCollection : createCollection,
        createDB : createDB
    }