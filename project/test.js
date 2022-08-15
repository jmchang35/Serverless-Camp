const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("./config");

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  var lon = req.query.lot;
  var lat = req.query.lat;
  // const name = (req.query.name || (req.body && req.body.name));
  // const responseMessage = name
  //   ? "Hello, " + name + ". This HTTP triggered function executed successfully."
  //   : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    
  // <CreateClientObjectDatabaseContainer>
  const { endpoint, key, databaseId, containerId } = config;

  const client = new CosmosClient({ endpoint, key });

  const database = client.database(databaseId);
  const container = database.container(containerId);

  lon = "-86.91127264673787";
  lat = "40.423789700013344";
  var distance = 0;
  var id = "";
  var name = "";
  let first = true;
  try {
    // <QueryItems>
    console.log(`Querying container: Items`);

    // query to return all items
    const querySpec = {
      query: "SELECT b, ST_DISTANCE(b.location, {'type': 'Point', 'coordinates':[" + lon + "," + lat + "]}) myDistance FROM bathroomscontainerid b WHERE ST_DISTANCE(b.location, {'type': 'Point', 'coordinates':[" + lon + "," + lat + "]}) < 100"
    };

    // read all items in the Items container
    const { resources: items } = await container.items
      .query(querySpec)
      .fetchAll();

    items.forEach(item => {
        if (first) {
          id = item.b.id;
          name = item.b.name;
          distance = item.myDistance;
          first = false;
        } else {
          if (item.myDistance < distance) {
            id = item.b.id;
            name = item.b.name;
            distance = item.myDistance;
          }
        }
        
      console.log(`${item.b.id} - ${item.b.name} - ${item.myDistance}`);
      console.log("id:" + id + "name:" + name + "distance:" + distance);
    });
    // </QueryItems>

  let responseMessage = "Your nearest restroom is #" + id + " " + name;
  } catch (err) {
    console.log(err.message);
  }
  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage
  };
}