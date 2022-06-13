const express = require('express');
const cors = require('cors');
const petRouter = require('./server/routers/Pet.router');
const { connectWithMongo } = require('./server/config/mongoose.config')

const app = express();

app.use(cors());
app.use(express.json());
app.use('/pets', petRouter);

connectWithMongo();

const expressServer = app.listen(8000, () => console.log('Listening at Port 8000'));

const io = require('socket.io')(expressServer, {
    cors: {
        origin: "http://localhost:3000"
    }}
);

io.on('connection', socket => {

    console.log('New connection: ', socket.id);
    
    socket.on('addPet', data => {
        io.emit('addPetToDom', data)
    })
    
    socket.on('adoptPet', data => {
        io.emit('deletePetFromDom', data)
    })
});