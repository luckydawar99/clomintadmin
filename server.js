// import to modules
const http =require('http');
const app = require('./app');
const server = http.createServer(app);
const mongoose =require('mongoose');
mongoose.set('strictQuery', false);



//connect mongodb with localhost
mongoose.connect('mongodb://localhost:27017/Clomint',{
   useNewUrlParser: true,
   useUnifiedTopology: true,
});
mongoose.connection.on('error',err =>{ 
	console.log('connection fail');
})
mongoose.connection.on('connected',connected =>{
	console.log('mongodb connected');
})

// connect mongodb to live atlas
/*const url ="mongodb+srv://vranjanj:JxB0NOgFbjBW738g@cluster0.vapomna.mongodb.net/Rentifi?retryWrites=true&w=majority";

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })*/

// connect to browser 
const port = process.env.port ||3024;
server.listen(port, function(error){
	if(error){
		console.log(error)
	}else{
		console.log("The server is running at port"+port);
	}
});