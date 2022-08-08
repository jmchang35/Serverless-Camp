

const config = {
    endpoint: "https://bathroom-locations.documents.azure.com:443/",
    key: "iUd3QaFBGS2ekxVjY33YwbBybJdvD9NIi3Evi8QKTEKZtlKxxj8pwjdeH7MsEBZOxzvSxrzAdYilc8uPXwBkTg==",
    databaseId: "bathroomsdatabaseid",
    containerId: "bathroomscontainerid",
    partitionKey: { kind: "Hash", paths: ["/id"] }
  };
  
  module.exports = config;