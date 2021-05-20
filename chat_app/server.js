var express = require('express');
var mongoose = require('mongoose');
var app = express();
var dbUrl = 'mongodb+srv://florianne:fanny@cluster0.ahd7t.mongodb.net/myFirstDatabase'
var Message = mongoose.model('Message',{ name : String, message : String})
var bodyParser = require('body-parser')

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

mongoose.connect(dbUrl , (err) => { 
    console.log('mongodb connected',err);
})


app.get('/messages', (req, res) => {
    Message.find({},(err, messages)=> {
      res.send(messages);
    })
})

app.post('/messages', (req, res) => {
    var message = new Message(req.body);
    message.save((err) =>{
      if(err)
        sendStatus(500);
      res.sendStatus(200);
    })
})

var app = express();
var server = app.listen(3000, () => {
    console.log('server is running on port', server.address().port);
});