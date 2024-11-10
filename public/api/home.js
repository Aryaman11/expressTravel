const { MongoClient, ServerApiVersion } = require('mongodb');

module.exports = async function(req,res) {

  const uri = "mongodb+srv://aryamanyash11:Aryaman11@cluster0.pwvo6oj.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

  try{
      
      let dataAustralia = client.db("sample_airbnb").collection("listingsAndReviews")
      .aggregate([
        {
         "$match": {"address.country": "Australia"}
        },
        {
        $project : {
          _id : 1,
        }
        }
        ]).toArray();

        // console.log(">>>>>> length",dataAustralia.count)

      let dataPortugal = client.db("sample_airbnb").collection("listingsAndReviews").aggregate([
        {
         $match : {"address.country": "Portugal"}
        },
        {
        $project : {
          _id : 1,
        }
        }
        
        ]).toArray();

      let dataUS = client.db("sample_airbnb").collection("listingsAndReviews").aggregate([
        {
         $match : {"address.country": "United States"}
        },
         {
        $project : {
          _id: 1,
        }
        }
        ]).toArray();
        let dataTurkey = client.db("sample_airbnb").collection("listingsAndReviews").aggregate([
        {
         $match : {"address.country": "Turkey"}
        },
         {
        $project : {
          _id : 1,
        }
        }
        ]).toArray();

        let houseCount = client.db("sample_airbnb").collection("listingsAndReviews").aggregate([
        {
         $match : {property_type: "House"}
        },
        {
          $project : {
            _id : 1,
          }
        }
        ]).toArray();

        let ApartmentCount = client.db("sample_airbnb").collection("listingsAndReviews").aggregate([
        {
         $match : {property_type: "Apartment"}
        },
        {
          $project:{
           _id:1,
          }
        }
        ]).toArray();
        let HotelCount = client.db("sample_airbnb").collection("listingsAndReviews").aggregate([
        {
         $match : {property_type: "Hotel"}
        },
        {
          $project:{
            _id:1,
        }
      }
        ]).toArray();
        let HostelCount = client.db("sample_airbnb").collection("listingsAndReviews").aggregate([
        {
         $match : {property_type: "Hostel"}
        },
        {
          $project:{
            _id:1,
          }
        }
        ]).toArray();


        let promise  =await Promise.all([dataAustralia,dataPortugal,dataUS,dataTurkey,houseCount,ApartmentCount,HotelCount,HostelCount]).then((data) => {
          let response = {
       "hotels_by_places" :  [{"name" : "Australia", "count" : dataAustralia.length},{"name" : "Portugal", "count" : dataPortugal.length},{"name" : "United States", "count" : dataUS.length},{"name" : "Turkey", "count" : dataTurkey.length}],
       "hotels_by_type":[{"name":"House" , "count" : houseCount.length },{"name":"Apartment" , "count" : ApartmentCount.length },{"name":"Hotel" , "count" : HotelCount.length },{"name":"Hostel" , "count" : HostelCount.length }]
          }
        }).catch((err) => {
          if(response.length === 0)
            console.log("err--->")
            return {
              status: "500",
              message: "data not found",
              response: {},
            };

        });
      
      
      return{
        status: "200",
        message: "success",
        response: response,
      };
    }
    catch(err){
      console.log(">>>>>",err);
    }


      
  
}
