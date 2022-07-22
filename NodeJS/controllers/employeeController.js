const express = require('express');
var ObjectId = require('mongoose').Types.ObjectId;
var router = express.Router();

var { Employee } = require('../models/employee')


// localhost:3000/employees 
router.get('/', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            console.log('error in showing all data: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

//get details of specific employee
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(404).send(`No record with given id found : ${req.params.id}`);
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log('error in showing asked data: ' + JSON.stringify(err, undefined, 2));
        }
    })
});

//insert a data localhost:3000/employees
router.post('/', (req, res) => {
    var emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    });
    emp.save((err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log('error in saving data: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(404).send(`No record with given id found : ${req.params.id}`);

    var emp ={
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    };
    Employee.findByIdAndUpdate(req.params.id,{$set:emp},{new:true},(err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log('error in updating data: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.delete('/:id',(req,res)=>{
    if (!ObjectId.isValid(req.params.id))
        return res.status(404).send(`No record with given id found : ${req.params.id}`);
    
        Employee.findByIdAndRemove(req.params.id, (err, doc) => {
            if (!err) {
                res.send(doc);
            }
            else {
                console.log('error in deleting data: ' + JSON.stringify(err, undefined, 2));
            }
        });
});

module.exports = router;