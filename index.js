
const SwapiServer = require('./src/SwapiServer');

const options ={
    port : process.env.PORT || 8000,
    mongodb: {
        uri : process.env.MONGO_URL || "mongodb://localhost/swapi"
    },
}

app = new SwapiServer(options);

app.startServer();
