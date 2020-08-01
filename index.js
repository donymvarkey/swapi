
const SwapiServer = require('./src/SwapiServer');

const options ={
    port : process.env.PORT || 8000,
    mongodb: {
        uri : process.env.MONGO_URL || "mongodb+srv://admin:9rM8vZCxFDoyCX3n@cluster0.3to02.mongodb.net/react-login?retryWrites=true&w=majority"
    },
}

app = new SwapiServer(options);

app.startServer();
