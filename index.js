var express = require('express');
var bodyParser = require('body-parser');
const router = express.Router();

var route = (rrome) => {
   router.use(bodyParser.json());
   router.use(bodyParser.urlencoded());

   router.get('/models', (req, res) => {
      //JWT to define which models
   });

   router.get('/model/:model_id', (req, res) => {
      var id = req.params.model_id;
      if(id){
         rrome.getModel(id, (err, model) => {
            res.send((err) ? {error: err} : model);
         });
      }else{
         res.send({error: "No model id provided"});
      }
   });

   router.get('/data/id/:id', (req, res) => {
      var id = req.params.id;
      if(id){
         rrome.getData(id, (err, data) => {
            res.send(data);
         });
      }else{
         res.send({error: "No id provided"});
      }
   });

   router.get('/data/model/:model', (req, res) => {
      var id = req.params.model;
      if(id){
         //121 temp var
         rrome.getDatas(id, 121, (err, data) => {
            res.send((err) ? {error: err} : data);
         });
      }else{
         res.send({error: "No model id provided"});
      }
   });

   router.post('/data/model/:model', (req, res) => {
      var id = req.params.model;
      if(id){
         rrome.insertData(id, req.body.blob, 121, (err, id) => {
            res.send((err) ? {error: err} : {id: id});
         });
      }else{
         res.send({error: "No model id provided"});
      }
   });

   router.post('/data/id/:id', (req, res) => {
      var id = req.params.id;
      if(id){
         rrome.updateData(id, req.body.blob, (err, data) => {
            res.send((err) ? {error: err} : data)
         });
      }else{   
         res.send({error: "No id provided"});
      }
   });

   router.post('/data/id/:id/delete', (req, res) => {
      //Add user check first
   });

   return router;
}


module.exports = route;



