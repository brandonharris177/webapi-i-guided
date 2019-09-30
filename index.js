const express =  require('express');

hubsModel = require('./data/hubs-model.js');

const server = express();

server.use(express.json());

server.get('/', (req,res) => {
    res.send('hello node 22')
})

server.get('/hubs', (req, res) => {
    hubsModel.find().then(hubs => {
        res.send(hubs)
    }).catch(error => {
        res.send(error)
    });
})

server.post('/hubs', (req, res) => {
    const hubData = req.body
    hubsModel.add(hubData).then(hub => {
        res.json(hub)
    }).catch(error => {
        res.json({message: `error saving the hub`})
    });
})

server.delete('/hubs/:id', (req, res) => {
    const id = req.params.id
    hubsModel.remove(id).then(hub => {
        res.json(hub)
    }).catch(error => {
        res.json({message: `error deleting the hub`})
    });
})

server.put('/hubs/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body
    hubsModel.update(id, changes).then(hub => {
        res.json(hub)
    }).catch(error => {
        res.json({message: `error updating the hub`})
    });
})

const port = 8000;
server.listen(port, () => console.log(`API on port ${port}`))