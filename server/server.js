const app = require("./app");
const http = require('http');
const {connectToMongoServer} = require("./utils/mongoUtil");

const port = process.env.PORT || 1111;
let server = http.createServer(app);

// Connect with MongoDB
connectToMongoServer({});

// Connect to server
server.listen(port,()=>{
   console.log(`Server is up on port ${port}`); 
});
