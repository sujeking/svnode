'use strict';
const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const port = process.env.port || 3000;
const index = path.join(__dirname, 'index.html');
const server = express()
	.use((req,res) => res.sendFile(index))
	.listen(port,()=>console.log('Listening on ${port}'));

const wss = new SocketServer({server});
wss.on('connection', (ws) => {
	// ws.send('revice you connect');
	ws.on('message', (message) =>{
		console.log('收到消息'+message);
		ws.send(message);
	});
});