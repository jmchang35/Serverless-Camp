// @ts-check

const config = {
    endpoint: "https://bathroom-locations.documents.azure.com:443/",
    key: "6yq39gKGD799SDPDtSu916e1JYx9FtARfFvOqQVvRWVvz1T7RIuT3iGbP1JahCinEcenhCKhos5x0qFxyBcgvA==",
    databaseId: "Tasks",
    containerId: "Items",
    partitionKey: { kind: "Hash", paths: ["/category"] }
  };
  
  module.exports = config;