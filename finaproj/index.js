




const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("./config");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}



async function main(lon, lat) {
  
  // <CreateClientObjectDatabaseContainer>
  const { endpoint, key, databaseId, containerId } = config;

  const client = new CosmosClient({ endpoint, key });

  const database = client.database(databaseId);
  const container = database.container(containerId);


  
  try {
    // <QueryItems>
    console.log(`Querying container: Items`);

    // query to return all items
    const querySpec = {
      query: "SELECT b, ST_DISTANCE(b.location, {'type': 'Point', 'coordinates':[-86.91127264673787, 40.423789700013344]}) myDistance FROM bathroomscontainerid b WHERE ST_DISTANCE(b.location, {'type': 'Point', 'coordinates':[-86.91127264673787, 40.423789700013344]}) < 100"
    };
    
    // read all items in the Items container
    const { resources: items } = await container.items
      .query(querySpec)
      .fetchAll();
      
    items.forEach(item => {
      console.log(`${item.b.id} - ${item.b.name} - ${item.myDistance}`);
    });
    // </QueryItems>
    
    
  } catch (err) {
    console.log(err.message);
  }
}



// for the button to grab user location
  
 function showPosition() {
     // Store the element where the page displays the result
     result = document.getElementById("result");
     
     // If geolocation is available, try to get the visitor's position
     if(navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
         result.innerHTML = "Getting the position information...";
     } else {
         alert("Sorry, your browser does not support HTML5 geolocation.");
     }
 };
 
 // Define callback function for successful attempt
 function successCallback(position) {
     result.innerHTML = "Your current position is (" + "Latitude: " + position.coords.latitude 
     + ", " + "Longitude: " + position.coords.longitude + ")";
     var lon = position.coords.longitude;
     var lat = position.coords.latitude;
     main(lon, lat);
     // make user coords local 
     
 }
 
 // Define callback function for failed attempt
 function errorCallback(error) {
     if(error.code == 1) {
         result.innerHTML = "You've decided not to share your position. Refresh to try again";
     } else if(error.code == 2) {
         result.innerHTML = "The network is down or the positioning service can't be reached.";
     } else if(error.code == 3) {
         result.innerHTML = "The attempt timed out before it could get the location data.";
     } else {
         result.innerHTML = "Geolocation failed due to unknown error.";
     }
 }

