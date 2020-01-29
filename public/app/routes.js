"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = _express["default"].Router();

routes.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Título de mi template home',
    description: 'Descripción de mi template home'
  });
}).get('/about', function (req, res, next) {
  res.render('index', {
    title: 'Título de mi template about',
    description: 'Descripción de mi template about'
  });
});
var _default = routes; //module.exports = routes

exports["default"] = _default;