const express = require('express');
const bodyParser = require('body-parser');
const Datastore = require('nedb');

const app = express();
app.use(bodyParser.json());
const port = 3000
const baseURL = '/api/v1';

const db = new Datastore();

app.get(baseURL + '/contacts', (req, res) => {
    console.log('-------> GET /contacts');
    db.find({}, function (err, data) {
        res.send(data);
    });
});

app.post(baseURL + '/contacts', (req, res) => {
    console.log('-------> POST /contacts');
    db.insert(req.body);
    res.sendStatus(201);
});

app.get(baseURL + '/contact', (req, res) => {
    console.log('-------> GET /contact');
    var phone = parseInt(req.query.phone);
    db.find({ phone: phone }, (err, data) => {
        if (data.length == 0) {
            res.sendStatus(404);
        } else {
            res.send(data);
        }
    })
});

app.put(baseURL + '/contact', (req, res) => {
    console.log('-------> PUT /contact');
    var contact = req.body;
    db.update({ phone: contact.phone }, contact, (err, nModified) => {
        if (nModified == 1) {
            res.send(contact);
        } else {
            res.sendStatus(404);
        }
    });
});

app.delete(baseURL + '/contact', (req, res) => {
    console.log('-------> DELETE /contact');
    var phone = parseInt(req.query.phone);
    db.remove({ phone: phone }, (err, nRemoved) => {
        if (nRemoved == 1) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    });
});

app.listen(port)