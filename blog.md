# Purdue Poopers

## About Me
Hello to whoever is reading this! My name is Jalynn Chang, but a lot of my friends call me Max, my middle name. I'm a rising sophomore at Purdue majoring in Computer Science and Applied Statistics! Outside of school, I like eating and cooking food (more of the eating though), playing cs:go with friends, and listening to classical music. 

## The Premise
My first ever college visit started with me scouring campus looking for the nearest restroom since I had to poop so badly after the 3 hour drive. I had no idea where any bathrooms were but luckily there was one in the first building I went into. My project, Purdue Poopers, is based off this real world issue! 

I created a interactable map that is draggable, and zoomable map of Purdue University's campus with pinpoints of restrooms mainly on the academic side of campus. Now anyone can find the nearest restroom on (academc) campus!
## Tools used
### Azure Functions
I used a HTTP trigger to calculate the nearest bathroom from the user's location.  
### Cosmos DB
Cosmos DB held all of the GeoSpatial data, the name, and the id. Cosmos DB was specifically chosen since it was alreeady in the Azure Suite and it provided a JavaScript SDK to manage SQL API data. 
### Node
Node.js was used to communicate the information from the client side to the Azure function and to communicate to the database. 
### Azure Maps API
The Azure Maps API was used to create the map and the HTML markers. 
### Bootstrap
Bootstrap was used to style and simplify the css aspect of the website. 


## Step by step (with code snippets)
0.1: Download VSCode, the latest version of npm, and node.js

0.2: Create an azure account

1. First, create a function app in azure. Then in vscode create a http trigger in the function app you created in azure. 

2. Create a cosmos db account for your bathroom locations. Make sure you select the "Core (SQL)" API for your account. 

3. Navigate to Data Explorer in your Cosmos DB account and create a new database and a new container. For the items in your container add your bathroom information in this format. For every bathroom increment the id number. Add all your bathrooms and their respective information.
```
{
    "id": "1",
    "name": "Krannert Floor 1 & 2",
    "location": {
        "type": "Point",
        "coordinates": [
            -86.91109387532603,
            40.42358610987309
        ]
    }
}
```
4. Create your http trigger in vscode and deploy it to your azure function. 

5. In your project folder terminal create and intialize a package.json file and instlal the azure cosmos module using npm.

```
npm init -y
```
```
npm install @azure/cosmos --save
```

6. Create a html and css file. Mine were named index.html and cover.css.

7. I first used a bootstrap template to get me started. Paste this in to get started.
```
<!doctype html>
<html lang="en" class="h-100">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="">
  <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
  <meta name="generator" content="Hugo 0.98.0">
  <meta charset="UTF-8">
  <title>Cover Template · Bootstrap v5.2</title>

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
    integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

  <link rel="stylesheet" href="bootstrap.min.css">
  <link rel="stylesheet" href="https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.css" type="text/css" />
  <script src="https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.js"></script>
  <script src="https://atlas.microsoft.com/sdk/javascript/service/2/atlas-service.min.js"></script>


  <style>
    .bd-placeholder-img {
      font-size: 1.125rem;
      text-anchor: middle;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
    }

    @media (min-width: 768px) {
      .bd-placeholder-img-lg {
        font-size: 3.5rem;
      }
    }

    .b-example-divider {
      height: 3rem;
      background-color: rgba(0, 0, 0, .1);
      border: solid rgba(0, 0, 0, .15);
      border-width: 1px 0;
      box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
    }

    .b-example-vr {
      flex-shrink: 0;
      width: 1.5rem;
      height: 100vh;
    }

    .bi {
      vertical-align: -.125em;
      fill: currentColor;
    }

    .nav-scroller {
      position: relative;
      z-index: 2;
      height: 2.75rem;
      overflow-y: hidden;
    }

    .nav-scroller .nav {
      display: flex;
      flex-wrap: nowrap;
      padding-bottom: 1rem;
      margin-top: -1px;
      overflow-x: auto;
      text-align: center;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
    }
  </style>
<script type = "text/javascript" src="index.js">

</script>

  <!-- Custom styles for this template -->
  <link rel="stylesheet" href="cover.css">
</head>

<body class="d-flex h-100 text-center text-white bg-dark">
    
  <div class="cover-container d-flex w-100 h-75 p-1 mx-auto flex-column">
    <header class="mb-auto">
      <div>
        <h1 class="float-md-start mb-0">Purdue Poopers</h1>
        <nav class="nav nav-masthead justify-content-center float-md-end">
          <a class="nav-link fw-bold py-1 px-0 active" aria-current="page" href="#">Home</a>
          <a class="nav-link fw-bold py-1 px-0" href="#">About</a>

        </nav>
      </div>
    </header>

    <main class="px-3">

      <h2>Got Poop?&#x1F4A9;</h2>
      <p class="lead">Click on the button below to find the nearest catalogued bathroom near you!</p>
      <div id="result">


      </div>
      <button class="btn btn-lg btn-secondary fw-bold border-white bg-white" role="button" onclick="showPosition();">Submit Location</button>



    </main>
    <body onload="GetMap()"></body>
    <div> 
      <h2></h2>
    </div>
    <div id="myMap"></div>

    <footer class="mt-auto text-white-50">
      <p>Jalynn Chang</p>
    </footer>
  </div>

</body>

</html>
```

8. Paste this into your css file to get started. 
```
/*
 * Globals
 */


/* Custom default button */
.btn-secondary,
.btn-secondary:hover,
.btn-secondary:focus {
  color: #333;
  text-shadow: none; /* Prevent inheritance from `body` */
}


/*
 * Base structure
 */

body {
  text-shadow: 0 .05rem .1rem rgba(0, 0, 0, 0.5);
  box-shadow: inset 0 0 5rem rgba(0, 0, 0, 0.5);
}

.cover-container {
  max-width: 42em;
}


/*
 * Header
 * about only 
 */

.nav-masthead .nav-link {
  color: rgba(255, 255, 255, .5);
  border-bottom: .25rem solid transparent;
}

.nav-masthead .nav-link:hover,
.nav-masthead .nav-link:focus {
  border-bottom-color: rgba(255, 255, 255, .25);
}

.nav-masthead .nav-link + .nav-link {
  margin-left: 1rem;
}

/*
* home
*/

.nav-masthead .active {
  color: #fff;
  border-bottom-color: #fff;
}


.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #232323;
  text-align: center;
}

```
9. Paste this script and style in. The style is for the map in the page. The script has all the locations of the html markets (pin points of bathroom locations). 
```
<script>
    function GetMap() {
    //Initialize a map instance.
    var map = new atlas.Map('myMap', {
      center: [-86.9143, 40.4278],
      zoom: 15,
      //Only allow one copy of the world be rendered when zoomed out.
      maxBounds: [-86.97, 40.4, -86.89, 40.45],
      renderWorldCopies: false,
      view: "Auto",

      authType: 'subscriptionKey',
      subscriptionKey: 'VteYjHHbshc8n5HXHpEoLxHzK9etQidWJCarNQatkE8'
    });

    //Wait until the map resources are ready.
    map.events.add('ready', function () {
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '1',
        position: [-86.91109387532603, 40.42358610987309]
      }));
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '2',
        position: [-86.91098134969975, 40.42366871299652]
      }));
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '3',
        position: [-86.91264324978683, 40.42454338174356]
      }))
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '4',
        position: [-86.91317852499915, 40.42503070651467]
      }))
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '5',
        position: [-86.9126528120674, 40.42504295758552]
      }))
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '6',
        position: [-86.91524785313916, 40.4259102564502]
      }))
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '7',
        position: [-86.91515397583126, 40.4257979563373]
      }))
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '8',
        position: [-86.91574827034786, 40.42604677129886]
      }))
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '9',
        position: [-86.91622433937094, 40.425602439059894]
      }))
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '10',
        position: [-86.91630204889344, 40.426905086364506]
      }))
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '11',
        position: [-86.91936073896893, 40.42574064183067]
      }))
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '12',
        position: [-86.92011848167401, 40.42757347754326]
      }))
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '13',
        position: [-86.92126005772678, 40.42754920276449]
      }))
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '14',
        position: [-86.91689594046665, 40.427577414809434]
      }))
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '15',
        position: [-86.91698489738918, 40.42748569983453]
      }))
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '16',
        position: [-86.91695619007311, 40.428104859487924]
      }))
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '17',
        position: [-86.91691112579568, 40.42753829335514]
      }))
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '18',
        position: [-86.91699398155788, 40.42807977216396]
      }))
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '19',
        position: [-86.91946064865458, 40.42695354620375]
      }))
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '20',
        position: [-86.91985084320027, 40.42652602896]
      }))
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '21',
        position: [-86.91490559394036, 40.428098555299215]
      }))
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '22',
        position: [-86.9145945980163, 40.42783996575997]
      }))
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '23',
        position: [-86.91578998548091, 40.430953322131245]
      }))
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '24',
        position: [-86.91494087291038, 40.43044403860751]
      }))
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '25',
        position: [-86.91378470798224, 40.428652877954505]
      }))
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '26',
        position: [-86.9139258987948, 40.42614905756668]
      }))
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '27',
        position: [-86.91583272379886, 40.42500951678481]
      }))
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '28',
        position: [-86.91407707661502, 40.427266532852094]
      }))
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '29',
        position: [-86.91317274990044, 40.42719107745637]
      }))
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '30',
        position: [-86.91522848578906, 40.4263222079154]
      }))
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '31',
        position: [-86.92515794165494, 40.42564359884224]
      }))
      map.markers.add(new atlas.HtmlMarker({
        color: '#CEB888',
        text: '32',
        position: [-86.92664729713637, 40.426751153460806]
      }))

    });
  }
  </script>
    <style>
    html,
    body {
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
    }

    #myMap {
      width: 100%;
      height: 100%;
      
      
    }
  </style>
  ```
10. Next we will add functionality for the button. 

Add these functions in your http trigger but outside your module.exports
```
// for the button to grab user location

function showPosition() {
  // Store the element where the page displays the result
  result = document.getElementById("result");

  // If geolocation is available, try to get the visitor's position
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    result.innerHTML = "Getting the position information...";
  } else {
    alert("Sorry, your browser does not support HTML5 geolocation.");
  }
};

// Define callback function for successful attempt
async function successCallback(position) {
  var lon = position.coords.longitude;
  var lat = position.coords.latitude;
  const response = await fetch("http://localhost:7071/api/finaproj?" + lat + "&lon=" + lon);
  var text = await response.text();
  result.innerHTML = text + ". Happy pooping!";
}

// Define callback function for failed attempt
function errorCallback(error) {
  if (error.code == 1) {
    result.innerHTML = "You've decided not to share your position. Refresh to try again";
  } else if (error.code == 2) {
    result.innerHTML = "The network is down or the positioning service can't be reached.";
  } else if (error.code == 3) {
    result.innerHTML = "The attempt timed out before it could get the location data.";
  } else {
    result.innerHTML = "Geolocation failed due to unknown error.";
  }
}
```
11. Add these imports above your module.exports
```
const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("./config");

```
12. Add this code in your module.exports. This part will calculate the closest restroom. 
```
module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  var lon = req.query.lot;
  var lat = req.query.lat;
  // const name = (req.query.name || (req.body && req.body.name));
  // const responseessage = name
  //   ? "Hello, " + name + ". This HTTP triggered function executed successfully."
  //   : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    
  // <CreateClientObjectDatabaseContainer>
  const { endpoint, key, databaseId, containerId } = config;

  const client = new CosmosClient({ endpoint, key });

  const database = client.database(databaseId);
  const container = database.container(containerId);


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

  var responseMessage = "Your nearest restroom is #" + id + " " + name;
  } catch (err) {
    console.log(err.message);
  }
  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage
  };
}
```
13. Lastly, create a config.js file. With this structure fill in the necessary information. 

```
const config = {
    endpoint: "Your endpoint name",
    key: "your cosmos db primatry key",
    databaseId: "bathroomsdatabaseid",
    containerId: "bathroomscontainerid",
    partitionKey: { kind: "Hash", paths: ["/id"] }
  };
  
  module.exports = config;
```

14. To run deploy and run the azure function, and deploy a live server to view it in your browser. Make sure it is running from local host and then test it out!

## Challenges + lessons learned
One of the biggest challenge I had was learning sql to access and sort through my geospatial data in cosmos db. Having no experience with sql nor implementing it through a javascript azure function, I had no idea what I was doing but I learned to slowly chip at problems. Paitience is what is needed during those moments where nothing is working. That experience really put into perspective how important patience was since I needed to just keep going and try new things. 
## Thanks and Acknowledgements
 BIG thanks to Daron Yondem. He was the mentor I was connected to through this program and he has been a great mentor and teacher. I still remember when I was asked if I had any preferences for my mentor I said I wanted someone cool and I can say that was defnitely satisfied 😎.