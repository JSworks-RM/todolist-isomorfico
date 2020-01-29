(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Task = function Task(name) {
  _classCallCheck(this, Task);

  this.id = new Date().getTime();
  this.name = name;
  this.isComplete = false;
  return this; // Para retornar a modo de objeto para poder guardarlo en el local storage
};

exports["default"] = Task;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _helpers = require("./helpers");

var _Task = _interopRequireDefault(require("./Task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ToDoList =
/*#__PURE__*/
function () {
  function ToDoList(key) {
    _classCallCheck(this, ToDoList);

    // SOnstructor de la llave que vamos a trabajar en el storage
    // Asignamos a la prop. key de la clase el nombre de la lista
    this.key = key; // localStorage tiene dos métodos: Uno para estableser valores  y otro para obtener valores

    if (!_helpers.ls.getItem(key)) _helpers.ls.setItem(key, _helpers.j.stringify([])); // Método de JSON "stringify" convierte un objeto en cadena de texto. Le pasaremos un arreglo donde guardaremos un arreglo

    this.addTask = this.addTask.bind(this);
  } // Métodos
  // Creamos método manejador de eventos que va a ser manipulado por el input que va a desencadenar éste método


  _createClass(ToDoList, [{
    key: "addTask",
    value: function addTask(e) {
      if (!e.target.value) alert('No puedes agregar una tarea vacía');

      if (e.keyCode === _helpers.ENTER_KEY) {
        var newTask = new _Task["default"](e.target.value),
            // Capturamos nueva tarea
        tasks = _helpers.j.parse(_helpers.ls.getItem(this.key)); // Primero obtenemos las tareas que estan en el local storage porque sino, reemplazaríamos las que esten guardada
        // Ahora que las obtenemos en formato objeto, añadimos la nueva tarea con método push


        tasks.push(newTask); // Y nuevamente, para guardar la nueva tarea ejecutamos el setItem de localStorage

        _helpers.ls.setItem(this.key, _helpers.j.stringify(tasks)); // Despues de guardar en el local storage la tarea, vamos a crear un método render para guardar, renderizar la nueva tarea y asi no estar recargandolas en el navegador para ver esa nueva tarea. Aqui ya estamos aplicando el concepto de la programación reactiva


        this.renderTask(newTask);
        e.target.value = null; // Limpiamos valor del input. Reiniciamos valor a null 
        //c(`Tareas: ${tasks}, Nuevas tareas: ${newTask}, LocalStorage: ${ls}`)
      }
    } // render se va a encargar de pintar lo necesario para generar nuesta app

  }, {
    key: "render",
    value: function render() {
      task.addEventListener('keyup', this.addTask);
    }
  }]);

  return ToDoList;
}();

exports["default"] = ToDoList;

},{"./Task":1,"./helpers":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ls = exports.j = exports.d = exports.c = exports.ENTER_KEY = void 0;
var ENTER_KEY = 13,
    // El key code del enter es 13. Lo guardamos en la constante preferiblemente. Más semántico se vuelve el código
c = console.log,
    d = document,
    j = JSON,
    ls = localStorage; // Vamos a hacer uso del API storage para guardar las tareas pendientes del usuario en su navegador.

exports.ls = ls;
exports.j = j;
exports.d = d;
exports.c = c;
exports.ENTER_KEY = ENTER_KEY;

},{}],4:[function(require,module,exports){
"use strict";

var _helpers = require("./helpers");

var _ToDoList = _interopRequireDefault(require("./ToDoList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var task = _helpers.d.querySelector('#task'),
    list = _helpers.d.querySelector('#list'),
    todo = new _ToDoList["default"]('rmList');

todo.render();

},{"./ToDoList":2,"./helpers":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvVGFzay5qcyIsInNyYy9qcy9Ub0RvTGlzdC5qcyIsInNyYy9qcy9oZWxwZXJzLmpzIiwic3JjL2pzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0lDQXFCLEksR0FDakIsY0FBYSxJQUFiLEVBQW1CO0FBQUE7O0FBQ2YsT0FBSyxFQUFMLEdBQVUsSUFBSSxJQUFKLEdBQVcsT0FBWCxFQUFWO0FBQ0EsT0FBSyxJQUFMLEdBQVksSUFBWjtBQUNBLE9BQUssVUFBTCxHQUFrQixLQUFsQjtBQUVBLFNBQU8sSUFBUCxDQUxlLENBS0g7QUFDZixDOzs7Ozs7Ozs7Ozs7QUNQTDs7QUFDQTs7Ozs7Ozs7OztJQUVxQixROzs7QUFDakIsb0JBQWEsR0FBYixFQUFrQjtBQUFBOztBQUFFO0FBQ2hCO0FBQ0EsU0FBSyxHQUFMLEdBQVcsR0FBWCxDQUZjLENBSWQ7O0FBQ0EsUUFBSyxDQUFDLFlBQUcsT0FBSCxDQUFXLEdBQVgsQ0FBTixFQUNJLFlBQUcsT0FBSCxDQUFZLEdBQVosRUFBaUIsV0FBRSxTQUFGLENBQVksRUFBWixDQUFqQixFQU5VLENBTXlCOztBQUN2QyxTQUFLLE9BQUwsR0FBZSxLQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLElBQWxCLENBQWY7QUFDSCxHLENBRUQ7QUFDQTs7Ozs7NEJBQ1MsQyxFQUFHO0FBQ1IsVUFBSyxDQUFDLENBQUMsQ0FBQyxNQUFGLENBQVMsS0FBZixFQUNJLEtBQUssQ0FBQyxtQ0FBRCxDQUFMOztBQUVKLFVBQUssQ0FBQyxDQUFDLE9BQUYsS0FBYyxrQkFBbkIsRUFBK0I7QUFDM0IsWUFBSSxPQUFPLEdBQUcsSUFBSSxnQkFBSixDQUFVLENBQUMsQ0FBQyxNQUFGLENBQVMsS0FBbkIsQ0FBZDtBQUFBLFlBQTBDO0FBQ3RDLFFBQUEsS0FBSyxHQUFHLFdBQUUsS0FBRixDQUFTLFlBQUcsT0FBSCxDQUFZLEtBQUssR0FBakIsQ0FBVCxDQURaLENBRDJCLENBRW1CO0FBQzFDOzs7QUFDQSxRQUFBLEtBQUssQ0FBQyxJQUFOLENBQVcsT0FBWCxFQUp1QixDQUt2Qjs7QUFDQSxvQkFBRyxPQUFILENBQVksS0FBSyxHQUFqQixFQUFzQixXQUFFLFNBQUYsQ0FBYSxLQUFiLENBQXRCLEVBTnVCLENBT3ZCOzs7QUFDQSxhQUFLLFVBQUwsQ0FBaUIsT0FBakI7QUFDQSxRQUFBLENBQUMsQ0FBQyxNQUFGLENBQVMsS0FBVCxHQUFpQixJQUFqQixDQVR1QixDQVNEO0FBRXRCO0FBQ1A7QUFDSixLLENBRUQ7Ozs7NkJBQ1U7QUFDTixNQUFBLElBQUksQ0FBQyxnQkFBTCxDQUFzQixPQUF0QixFQUErQixLQUFLLE9BQXBDO0FBQ0g7Ozs7Ozs7Ozs7Ozs7OztBQ3RDTCxJQUFNLFNBQVMsR0FBRyxFQUFsQjtBQUFBLElBQXNCO0FBQ2xCLENBQUMsR0FBRyxPQUFPLENBQUMsR0FEaEI7QUFBQSxJQUVJLENBQUMsR0FBRyxRQUZSO0FBQUEsSUFHSSxDQUFDLEdBQUcsSUFIUjtBQUFBLElBSUksRUFBRSxHQUFHLFlBSlQsQyxDQUlzQjs7Ozs7Ozs7Ozs7QUNKdEI7O0FBQ0E7Ozs7QUFFQSxJQUFNLElBQUksR0FBRyxXQUFFLGFBQUYsQ0FBZ0IsT0FBaEIsQ0FBYjtBQUFBLElBQ0ksSUFBSSxHQUFHLFdBQUUsYUFBRixDQUFnQixPQUFoQixDQURYO0FBQUEsSUFFSSxJQUFJLEdBQUcsSUFBSSxvQkFBSixDQUFhLFFBQWIsQ0FGWDs7QUFJSSxJQUFJLENBQUMsTUFBTCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sge1xuICAgIGNvbnN0cnVjdG9yIChuYW1lKSB7XG4gICAgICAgIHRoaXMuaWQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgICAgIHRoaXMuaXNDb21wbGV0ZSA9IGZhbHNlXG5cbiAgICAgICAgcmV0dXJuIHRoaXMgLy8gUGFyYSByZXRvcm5hciBhIG1vZG8gZGUgb2JqZXRvIHBhcmEgcG9kZXIgZ3VhcmRhcmxvIGVuIGVsIGxvY2FsIHN0b3JhZ2VcbiAgICB9XG59IiwiaW1wb3J0IHsgRU5URVJfS0VZLCBjLCBkLCBqLCBscyB9IGZyb20gJy4vaGVscGVycydcbmltcG9ydCBUYXNrIGZyb20gJy4vVGFzaydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9Eb0xpc3QgIHtcbiAgICBjb25zdHJ1Y3RvciAoa2V5KSB7IC8vIFNPbnN0cnVjdG9yIGRlIGxhIGxsYXZlIHF1ZSB2YW1vcyBhIHRyYWJhamFyIGVuIGVsIHN0b3JhZ2VcbiAgICAgICAgLy8gQXNpZ25hbW9zIGEgbGEgcHJvcC4ga2V5IGRlIGxhIGNsYXNlIGVsIG5vbWJyZSBkZSBsYSBsaXN0YVxuICAgICAgICB0aGlzLmtleSA9IGtleVxuXG4gICAgICAgIC8vIGxvY2FsU3RvcmFnZSB0aWVuZSBkb3MgbcOpdG9kb3M6IFVubyBwYXJhIGVzdGFibGVzZXIgdmFsb3JlcyAgeSBvdHJvIHBhcmEgb2J0ZW5lciB2YWxvcmVzXG4gICAgICAgIGlmICggIWxzLmdldEl0ZW0oa2V5KSApXG4gICAgICAgICAgICBscy5zZXRJdGVtKCBrZXksIGouc3RyaW5naWZ5KFtdKSApIC8vIE3DqXRvZG8gZGUgSlNPTiBcInN0cmluZ2lmeVwiIGNvbnZpZXJ0ZSB1biBvYmpldG8gZW4gY2FkZW5hIGRlIHRleHRvLiBMZSBwYXNhcmVtb3MgdW4gYXJyZWdsbyBkb25kZSBndWFyZGFyZW1vcyB1biBhcnJlZ2xvXG4gICAgICAgIHRoaXMuYWRkVGFzayA9IHRoaXMuYWRkVGFzay5iaW5kKHRoaXMpXG4gICAgfVxuXG4gICAgLy8gTcOpdG9kb3NcbiAgICAvLyBDcmVhbW9zIG3DqXRvZG8gbWFuZWphZG9yIGRlIGV2ZW50b3MgcXVlIHZhIGEgc2VyIG1hbmlwdWxhZG8gcG9yIGVsIGlucHV0IHF1ZSB2YSBhIGRlc2VuY2FkZW5hciDDqXN0ZSBtw6l0b2RvXG4gICAgYWRkVGFzayAoZSkge1xuICAgICAgICBpZiAoICFlLnRhcmdldC52YWx1ZSApXG4gICAgICAgICAgICBhbGVydCgnTm8gcHVlZGVzIGFncmVnYXIgdW5hIHRhcmVhIHZhY8OtYScpXG4gICAgICAgIFxuICAgICAgICBpZiAoIGUua2V5Q29kZSA9PT0gRU5URVJfS0VZICkge1xuICAgICAgICAgICAgbGV0IG5ld1Rhc2sgPSBuZXcgVGFzayggZS50YXJnZXQudmFsdWUgKSwgLy8gQ2FwdHVyYW1vcyBudWV2YSB0YXJlYVxuICAgICAgICAgICAgICAgIHRhc2tzID0gai5wYXJzZSggbHMuZ2V0SXRlbSggdGhpcy5rZXkgKSApIC8vIFByaW1lcm8gb2J0ZW5lbW9zIGxhcyB0YXJlYXMgcXVlIGVzdGFuIGVuIGVsIGxvY2FsIHN0b3JhZ2UgcG9ycXVlIHNpbm8sIHJlZW1wbGF6YXLDrWFtb3MgbGFzIHF1ZSBlc3RlbiBndWFyZGFkYVxuICAgICAgICAgICAgICAgIC8vIEFob3JhIHF1ZSBsYXMgb2J0ZW5lbW9zIGVuIGZvcm1hdG8gb2JqZXRvLCBhw7FhZGltb3MgbGEgbnVldmEgdGFyZWEgY29uIG3DqXRvZG8gcHVzaFxuICAgICAgICAgICAgICAgIHRhc2tzLnB1c2gobmV3VGFzaylcbiAgICAgICAgICAgICAgICAvLyBZIG51ZXZhbWVudGUsIHBhcmEgZ3VhcmRhciBsYSBudWV2YSB0YXJlYSBlamVjdXRhbW9zIGVsIHNldEl0ZW0gZGUgbG9jYWxTdG9yYWdlXG4gICAgICAgICAgICAgICAgbHMuc2V0SXRlbSggdGhpcy5rZXksIGouc3RyaW5naWZ5KCB0YXNrcyApIClcbiAgICAgICAgICAgICAgICAvLyBEZXNwdWVzIGRlIGd1YXJkYXIgZW4gZWwgbG9jYWwgc3RvcmFnZSBsYSB0YXJlYSwgdmFtb3MgYSBjcmVhciB1biBtw6l0b2RvIHJlbmRlciBwYXJhIGd1YXJkYXIsIHJlbmRlcml6YXIgbGEgbnVldmEgdGFyZWEgeSBhc2kgbm8gZXN0YXIgcmVjYXJnYW5kb2xhcyBlbiBlbCBuYXZlZ2Fkb3IgcGFyYSB2ZXIgZXNhIG51ZXZhIHRhcmVhLiBBcXVpIHlhIGVzdGFtb3MgYXBsaWNhbmRvIGVsIGNvbmNlcHRvIGRlIGxhIHByb2dyYW1hY2nDs24gcmVhY3RpdmFcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclRhc2soIG5ld1Rhc2sgKVxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LnZhbHVlID0gbnVsbCAvLyBMaW1waWFtb3MgdmFsb3IgZGVsIGlucHV0LiBSZWluaWNpYW1vcyB2YWxvciBhIG51bGwgXG5cbiAgICAgICAgICAgICAgICAvL2MoYFRhcmVhczogJHt0YXNrc30sIE51ZXZhcyB0YXJlYXM6ICR7bmV3VGFza30sIExvY2FsU3RvcmFnZTogJHtsc31gKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmVuZGVyIHNlIHZhIGEgZW5jYXJnYXIgZGUgcGludGFyIGxvIG5lY2VzYXJpbyBwYXJhIGdlbmVyYXIgbnVlc3RhIGFwcFxuICAgIHJlbmRlciAoKSB7XG4gICAgICAgIHRhc2suYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmFkZFRhc2spXG4gICAgfSBcblxufSIsImNvbnN0IEVOVEVSX0tFWSA9IDEzLCAvLyBFbCBrZXkgY29kZSBkZWwgZW50ZXIgZXMgMTMuIExvIGd1YXJkYW1vcyBlbiBsYSBjb25zdGFudGUgcHJlZmVyaWJsZW1lbnRlLiBNw6FzIHNlbcOhbnRpY28gc2UgdnVlbHZlIGVsIGPDs2RpZ29cbiAgICBjID0gY29uc29sZS5sb2csXG4gICAgZCA9IGRvY3VtZW50LFxuICAgIGogPSBKU09OLFxuICAgIGxzID0gbG9jYWxTdG9yYWdlIC8vIFZhbW9zIGEgaGFjZXIgdXNvIGRlbCBBUEkgc3RvcmFnZSBwYXJhIGd1YXJkYXIgbGFzIHRhcmVhcyBwZW5kaWVudGVzIGRlbCB1c3VhcmlvIGVuIHN1IG5hdmVnYWRvci5cblxuZXhwb3J0IHtcbiAgICBFTlRFUl9LRVksXG4gICAgYyxcbiAgICBkLFxuICAgIGosXG4gICAgbHNcbn0iLCJpbXBvcnQgeyBkIH0gZnJvbSAnLi9oZWxwZXJzJ1xuaW1wb3J0IFRvRG9MaXN0IGZyb20gJy4vVG9Eb0xpc3QnXG5cbmNvbnN0IHRhc2sgPSBkLnF1ZXJ5U2VsZWN0b3IoJyN0YXNrJyksXG4gICAgbGlzdCA9IGQucXVlcnlTZWxlY3RvcignI2xpc3QnKSxcbiAgICB0b2RvID0gbmV3IFRvRG9MaXN0KCdybUxpc3QnKVxuXG4gICAgdG9kby5yZW5kZXIoKSJdfQ==
