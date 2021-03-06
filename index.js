var express = require('express');
var pretty = require('express-prettify');
var cors = require('cors');
var bodyParser = require('body-parser');
const router = express.Router();

var route = (rrome) => {
   router.use(bodyParser.json());
   router.use(bodyParser.urlencoded());
   router.use(pretty({query: 'pretty'}));
   router.use(cors());

   router.get('/models', (req, res) => {
      //JWT to define which models
      rrome.model.getModels(req.user.models, (err, models) => {
          res.send((err) ? {error: err} : models)
      });
   });

   router.get('/model/:model_id', (req, res) => {
      var id = req.params.model_id;
      if(id){
         rrome.model.get(id, (err, model) => {
            res.send((err) ? {error: err} : model);
         });
      }else{
         res.send({error: "No model id provided"});
      }
   });

   router.post('/model/:model_id', (req, res) => {
      var id = req.params.model_id;
      rrome.model.update(id, req.body.model, (err, data) => {
         res.send((err) ? {error: err} : data)
      });
   });

   router.post('/model', (req, res) => {
      rrome.model.add(req.body.name, req.body.model, (err, id) => {
         res.send((err) ? {error: err} : {id: id})
      });
   });

   router.get('/data/id/:id', (req, res) => {
      var id = req.params.id;
      if(id){
         rrome.data.get(id, (err, data) => {
            res.send(data);
         });
      }else{
         res.send({error: "No id provided"});
      }
   });

   router.get('/data/model/:model', (req, res) => {
      var id = req.params.model;
      if(id){
         rrome.data.getAll(id, req.user.id, (err, data) => {
            res.send((err) ? {error: err} : data);
         });
      }else{
         res.send({error: "No model id provided"});
      }
   });

   router.post('/data/model/:model', (req, res) => {
      var id = req.params.model;
      if(id){
         rrome.data.insert(id, req.body.blob, req.user.id, (err, id) => {
            res.send((err) ? {error: err} : {id: id});
         });
      }else{
         res.send({error: "No model id provided"});
      }
   });

   router.post('/data/id/:id', (req, res) => {
      var id = req.params.id;
      if(id){
         rrome.data.update(id, req.body.blob, (err, data) => {
            res.send((err) ? {error: err} : data)
         });
      }else{   
         res.send({error: "No id provided"});
      }
   });

   router.post('/data/id/:id/delete', (req, res) => {
      //Add user check first
      var id = req.params.id;
      if(id){
         rrome.data.remove(id, req.user.id, (err, data) => {
            res.send((err) ? {error: err} : data);
         });
      }else{
         res.send({error: "No id provided"});
      }
   });

   return router;
}


module.exports = route;



