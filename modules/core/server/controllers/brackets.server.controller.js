'use strict';
var mongoose = require('mongoose');
var Bracket = require('../modules/core/server/controllers/brackets.server.controller.js');



exports.create = function(req, res) {
  var bracket = new Bracket(req.body);

  bracket.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(bracket);
    }

  });
};

exports.read = function(req,res) {
  res.json(req.bracket);
};

exports.update = function(req,res){
  var bracket = req.bracket;
};
