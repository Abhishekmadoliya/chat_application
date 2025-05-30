

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import dotenv from 'dotenv'
import { fileURLToPath } from 'url';



dotenv.config()
import { Server } from "socket.io";
import { createServer } from "http";
const app = express();
const server = createServer(app);
import path from 'path';


const io = new Server(server);
// app.use(express.static(path.join(__dirname, 'public')));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'public', 'index.html'));
}   
)


io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });
});

io.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
});

app.use(cors());
app.use(express.json());



server.listen(3000, () => {
    console.log('listening on port:3000');
})




