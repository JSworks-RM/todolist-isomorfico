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
    this.editTask = this.editTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
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
    }
  }, {
    key: "editTask",
    value: function editTask(e) {
      var _this = this;

      // c(e.target.localName) // La propiedad localName nos da el nombre de la etiqueta html que esta ejecutando el evento
      if (e.target.localName === 'label') {
        var tasks = _helpers.j.parse(_helpers.ls.getItem(this.key)),
            // Trae todas las tareas que estan en el arreglo de 'rmList 
        // Guardando la tarea que se va a editar. A diferencia de filter que almacena en un objeto, el método findIndex() va a encontrar el indice de la tarea que compla con la condición.
        // toEdit = tasks.filter( task => task.name === e.target.textContent ),
        toEdit = tasks.findIndex(function (task) {
          return task.name === e.target.textContent;
        }),
            // toEdit va a ser igual al indice de la tarea seleccionada
        // Otro detalle es que la tarea se tiene que actualizar cuando se de manualmente un enter pero en el contenteditabel atribute del label al pulsar un enter te genera un salto de línea; Entonces tenemos que desactivar el comportamiento por default del enter y tambien se podría actualizar tarea cuando se pierda el focus, cuando vayamos de un elemento a otro.
        // Entonces asignamos a la etiqueta label dos manejadores de eventos. Uno en el blur y otro en el keyup y la etiqueta label va a ser el selector que cumpla la condición del data-id que sea igual al de esa tarea. task.name === e.target.textContent
        label = _helpers.d.querySelector("[data-id=\"".concat(tasks[toEdit].id, "\"]"));

        (0, _helpers.c)(tasks, toEdit, label);

        var saveTask = function saveTask(e) {
          e.target.textContent = e.target.textContent; // Contenido textual del elemento

          tasks[toEdit].name = e.target.textContent;

          _helpers.ls.setItem(_this.key, _helpers.j.stringify(tasks)); // Cada cambio al localStorage tenemos que salvarlo y lo pasamos por transformación cadena de texto la tarea.


          e.target.blur(); // Cuando termine de salvar quitamos del elemento el focus con el metodo blur
        };

        label.addEventListener('blur', function (e) {
          return saveTask(e);
        }); // Cuando pierda el foco pasa el método del evento

        label.addEventListener('keyup', function (e) {
          return e.keyCode === _helpers.ENTER_KEY && saveTask(e);
        }); // Cuando sea igual al ENTER_KEY pasa el método del evento
      }
    } // Remove

  }, {
    key: "removeTask",
    value: function removeTask(e) {
      if (e.target.localName === 'a') {
        var tasks = _helpers.j.parse(_helpers.ls.getItem(this.key)),
            toRemove = tasks.findIndex(function (task) {
          return task.id.toString() === e.target.dataset.id;
        }); // c(tasks, toRemove)


        tasks.splice(toRemove, 1);

        _helpers.ls.setItem(this.key, _helpers.j.stringify(tasks));

        e.target.parentElement.remove();
      }
    } // Rendirizando lista de tareas en el HTML

  }, {
    key: "renderTask",
    value: function renderTask(task) {
      var templateTask = "\n            <li class=\"List-item ".concat(task.isComplete ? 'complete' : '', "\">\n                <input type=\"checkbox\" id=\"").concat(task.id, "\" class=\"List-checkbox ").concat(task.isComplete ? 'complete' : '', "\" />\n                <label data-id=\"").concat(task.id, "\" class=\"List-label\" contenteditable spellcheck>").concat(task.name, "</label>\n                <a href=\"#\" data-id=\"").concat(task.id, "\" class=\"List-removeLink\"> x </a>\n\n            </li>\n        ");
      list.insertAdjacentHTML('beforeend', templateTask);
    } // Render se va a encargar de pintar lo necesario para generar nuesta app

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // Creamos variable local y convertimos lo que traiga el localStorage en su propiedad this.key
      var tasks = _helpers.j.parse(_helpers.ls.getItem(this.key));

      tasks.forEach(function (task) {
        return _this2.renderTask(task);
      });
      task.addEventListener('keyup', this.addTask); // Delegando a método editTask el click de la lista

      list.addEventListener('click', this.editTask); // Evento remove

      list.addEventListener('click', this.removeTask);
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
    todo = new _ToDoList["default"]('mylist');

todo.render();

},{"./ToDoList":2,"./helpers":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvVGFzay5qcyIsInNyYy9qcy9Ub0RvTGlzdC5qcyIsInNyYy9qcy9oZWxwZXJzLmpzIiwic3JjL2pzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0lDQXFCLEksR0FDakIsY0FBYSxJQUFiLEVBQW1CO0FBQUE7O0FBQ2YsT0FBSyxFQUFMLEdBQVUsSUFBSSxJQUFKLEdBQVcsT0FBWCxFQUFWO0FBQ0EsT0FBSyxJQUFMLEdBQVksSUFBWjtBQUNBLE9BQUssVUFBTCxHQUFrQixLQUFsQjtBQUVBLFNBQU8sSUFBUCxDQUxlLENBS0g7QUFDZixDOzs7Ozs7Ozs7Ozs7QUNQTDs7QUFDQTs7Ozs7Ozs7OztJQUVxQixROzs7QUFDakIsb0JBQWEsR0FBYixFQUFrQjtBQUFBOztBQUFFO0FBQ2hCO0FBQ0EsU0FBSyxHQUFMLEdBQVcsR0FBWCxDQUZjLENBSWQ7O0FBQ0EsUUFBSyxDQUFDLFlBQUcsT0FBSCxDQUFXLEdBQVgsQ0FBTixFQUNJLFlBQUcsT0FBSCxDQUFZLEdBQVosRUFBaUIsV0FBRSxTQUFGLENBQVksRUFBWixDQUFqQixFQU5VLENBTXlCOztBQUN2QyxTQUFLLE9BQUwsR0FBZSxLQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLElBQWxCLENBQWY7QUFDQSxTQUFLLFFBQUwsR0FBZ0IsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixJQUFuQixDQUFoQjtBQUNBLFNBQUssVUFBTCxHQUFrQixLQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsQ0FBcUIsSUFBckIsQ0FBbEI7QUFDSCxHLENBRUQ7QUFDQTs7Ozs7NEJBQ1MsQyxFQUFHO0FBQ1IsVUFBSyxDQUFDLENBQUMsQ0FBQyxNQUFGLENBQVMsS0FBZixFQUNJLEtBQUssQ0FBQyxtQ0FBRCxDQUFMOztBQUVKLFVBQUssQ0FBQyxDQUFDLE9BQUYsS0FBYyxrQkFBbkIsRUFBK0I7QUFDM0IsWUFB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SUFIUjtBQUFBLElBSUksRUFBRSxHQUFHLFlBSlQsQyxDQUlzQjs7Ozs7Ozs7Ozs7QUNKdEI7O0FBQ0E7Ozs7QUFFQSxJQUFNLElBQUksR0FBRyxXQUFFLGFBQUYsQ0FBZ0IsT0FBaEIsQ0FBYjtBQUFBLElBQ0ksSUFBSSxHQUFHLFdBQUUsYUFBRixDQUFnQixPQUFoQixDQURYO0FBQUEsSUFFSSxJQUFJLEdBQUcsSUFBSSxvQkFBSixDQUFhLFFBQWIsQ0FGWDs7QUFJSSxJQUFJLENBQUMsTUFBTCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sge1xuICAgIGNvbnN0cnVjdG9yIChuYW1lKSB7XG4gICAgICAgIHRoaXMuaWQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgICAgIHRoaXMuaXNDb21wbGV0ZSA9IGZhbHNlXG5cbiAgICAgICAgcmV0dXJuIHRoaXMgLy8gUGFyYSByZXRvcm5hciBhIG1vZG8gZGUgb2JqZXRvIHBhcmEgcG9kZXIgZ3VhcmRhcmxvIGVuIGVsIGxvY2FsIHN0b3JhZ2VcbiAgICB9XG59IiwiaW1wb3J0IHsgRU5URVJfS0VZLCBjLCBkLCBqLCBscyB9IGZyb20gJy4vaGVscGVycydcbmltcG9ydCBUYXNrIGZyb20gJy4vVGFzaydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9Eb0xpc3QgIHtcbiAgICBjb25zdHJ1Y3RvciAoa2V5KSB7IC8vIFNPbnN0cnVjdG9yIGRlIGxhIGxsYXZlIHF1ZSB2YW1vcyBhIHRyYWJhamFyIGVuIGVsIHN0b3JhZ2VcbiAgICAgICAgLy8gQXNpZ25hbW9zIGEgbGEgcHJvcC4ga2V5IGRlIGxhIGNsYXNlIGVsIG5vbWJyZSBkZSBsYSBsaXN0YVxuICAgICAgICB0aGlzLmtleSA9IGtleVxuXG4gICAgICAgIC8vIGxvY2FsU3RvcmFnZSB0aWVuZSBkb3MgbcOpdG9kb3M6IFVubyBwYXJhIGVzdGFibGVzZXIgdmFsb3JlcyAgeSBvdHJvIHBhcmEgb2J0ZW5lciB2YWxvcmVzXG4gICAgICAgIGlmICggIWxzLmdldEl0ZW0oa2V5KSApXG4gICAgICAgICAgICBscy5zZXRJdGVtKCBrZXksIGouc3RyaW5naWZ5KFtdKSApIC8vIE3DqXRvZG8gZGUgSlNPTiBcInN0cmluZ2lmeVwiIGNvbnZpZXJ0ZSB1biBvYmpldG8gZW4gY2FkZW5hIGRlIHRleHRvLiBMZSBwYXNhcmVtb3MgdW4gYXJyZWdsbyBkb25kZSBndWFyZGFyZW1vcyB1biBhcnJlZ2xvXG4gICAgICAgIHRoaXMuYWRkVGFzayA9IHRoaXMuYWRkVGFzay5iaW5kKHRoaXMpXG4gICAgICAgIHRoaXMuZWRpdFRhc2sgPSB0aGlzLmVkaXRUYXNrLmJpbmQodGhpcylcbiAgICAgICAgdGhpcy5yZW1vdmVUYXNrID0gdGhpcy5yZW1vdmVUYXNrLmJpbmQodGhpcylcbiAgICB9XG5cbiAgICAvLyBNw6l0b2Rvc1xuICAgIC8vIENyZWFtb3MgbcOpdG9kbyBtYW5lamFkb3IgZGUgZXZlbnRvcyBxdWUgdmEgYSBzZXIgbWFuaXB1bGFkbyBwb3IgZWwgaW5wdXQgcXVlIHZhIGEgZGVzZW5jYWRlbmFyIMOpc3RlIG3DqXRvZG9cbiAgICBhZGRUYXNrIChlKSB7XG4gICAgICAgIGlmICggIWUudGFyZ2V0LnZhbHVlIClcbiAgICAgICAgICAgIGFsZXJ0KCdObyBwdWVkZXMgYWdyZWdhciB1bmEgdGFyZWEgdmFjw61hJylcbiAgICAgICAgXG4gICAgICAgIGlmICggZS5rZXlDb2RlID09PSBFTlRFUl9LRVkgKSB7XG4gICAgICAgICAgICBsZXQgbmV3VGFzayA9IG5ldyBUYXNrKCBlLnRhcmdldC52YWx1ZSApLCAvLyBDYXB0dXJhbW9zIG51ZXZhIHRhcmVhXG4gICAgICAgICAgICAgICAgdGFza3MgPSBqLnBhcnNlKCBscy5nZXRJdGVtKCB0aGlzLmtleSApICkgLy8gUHJpbWVybyBvYnRlbmVtb3MgbGFzIHRhcmVhcyBxdWUgZXN0YW4gZW4gZWwgbG9jYWwgc3RvcmFnZSBwb3JxdWUgc2lubywgcmVlbXBsYXphcsOtYW1vcyBsYXMgcXVlIGVzdGVuIGd1YXJkYWRhXG4gICAgICAgICAgICAgICAgLy8gQWhvcmEgcXVlIGxhcyBvYnRlbmVtb3MgZW4gZm9ybWF0byBvYmpldG8sIGHDsWFkaW1vcyBsYSBudWV2YSB0YXJlYSBjb24gbcOpdG9kbyBwdXNoXG4gICAgICAgICAgICAgICAgdGFza3MucHVzaChuZXdUYXNrKVxuICAgICAgICAgICAgICAgIC8vIFkgbnVldmFtZW50ZSwgcGFyYSBndWFyZGFyIGxhIG51ZXZhIHRhcmVhIGVqZWN1dGFtb3MgZWwgc2V0SXRlbSBkZSBsb2NhbFN0b3JhZ2VcbiAgICAgICAgICAgICAgICBscy5zZXRJdGVtKCB0aGlzLmtleSwgai5zdHJpbmdpZnkoIHRhc2tzICkgKVxuICAgICAgICAgICAgICAgIC8vIERlc3B1ZXMgZGUgZ3VhcmRhciBlbiBlbCBsb2NhbCBzdG9yYWdlIGxhIHRhcmVhLCB2YW1vcyBhIGNyZWFyIHVuIG3DqXRvZG8gcmVuZGVyIHBhcmEgZ3VhcmRhciwgcmVuZGVyaXphciBsYSBudWV2YSB0YXJlYSB5IGFzaSBubyBlc3RhciByZWNhcmdhbmRvbGFzIGVuIGVsIG5hdmVnYWRvciBwYXJhIHZlciBlc2EgbnVldmEgdGFyZWEuIEFxdWkgeWEgZXN0YW1vcyBhcGxpY2FuZG8gZWwgY29uY2VwdG8gZGUgbGEgcHJvZ3JhbWFjacOzbiByZWFjdGl2YVxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyVGFzayggbmV3VGFzayApXG4gICAgICAgICAgICAgICAgZS50YXJnZXQudmFsdWUgPSBudWxsIC8vIExpbXBpYW1vcyB2YWxvciBkZWwgaW5wdXQuIFJlaW5pY2lhbW9zIHZhbG9yIGEgbnVsbCBcblxuICAgICAgICAgICAgICAgIC8vYyhgVGFyZWFzOiAke3Rhc2tzfSwgTnVldmFzIHRhcmVhczogJHtuZXdUYXNrfSwgTG9jYWxTdG9yYWdlOiAke2xzfWApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlZGl0VGFzayAoZSkge1xuICAgICAgICAvLyBjKGUudGFyZ2V0LmxvY2FsTmFtZSkgLy8gTGEgcHJvcGllZGFkIGxvY2FsTmFtZSBub3MgZGEgZWwgbm9tYnJlIGRlIGxhIGV0aXF1ZXRhIGh0bWwgcXVlIGVzdGEgZWplY3V0YW5kbyBlbCBldmVudG9cbiAgICAgICAgaWYgKCBlLnRhcmdldC5sb2NhbE5hbWUgPT09ICdsYWJlbCcgKSB7XG4gICAgICAgICAgICBsZXQgdGFza3MgPSBqLnBhcnNlKCBscy5nZXRJdGVtKHRoaXMua2V5KSApLCAvLyBUcmFlIHRvZGFzIGxhcyB0YXJlYXMgcXVlIGVzdGFuIGVuIGVsIGFycmVnbG8gZGUgJ3JtTGlzdCBcbiAgICAgICAgICAgIC8vIEd1YXJkYW5kbyBsYSB0YXJlYSBxdWUgc2UgdmEgYSBlZGl0YXIuIEEgZGlmZXJlbmNpYSBkZSBmaWx0ZXIgcXVlIGFsbWFjZW5hIGVuIHVuIG9iamV0bywgZWwgbcOpdG9kbyBmaW5kSW5kZXgoKSB2YSBhIGVuY29udHJhciBlbCBpbmRpY2UgZGUgbGEgdGFyZWEgcXVlIGNvbXBsYSBjb24gbGEgY29uZGljacOzbi5cbiAgICAgICAgICAgIC8vIHRvRWRpdCA9IHRhc2tzLmZpbHRlciggdGFzayA9PiB0YXNrLm5hbWUgPT09IGUudGFyZ2V0LnRleHRDb250ZW50ICksXG4gICAgICAgICAgICB0b0VkaXQgPSB0YXNrcy5maW5kSW5kZXgoIHRhc2sgPT4gdGFzay5uYW1lID09PSBlLnRhcmdldC50ZXh0Q29udGVudCApLCAvLyB0b0VkaXQgdmEgYSBzZXIgaWd1YWwgYWwgaW5kaWNlIGRlIGxhIHRhcmVhIHNlbGVjY2lvbmFkYVxuICAgICAgICAvLyBPdHJvIGRldGFsbGUgZXMgcXVlIGxhIHRhcmVhIHNlIHRpZW5lIHF1ZSBhY3R1YWxpemFyIGN1YW5kbyBzZSBkZSBtYW51YWxtZW50ZSB1biBlbnRlciBwZXJvIGVuIGVsIGNvbnRlbnRlZGl0YWJlbCBhdHJpYnV0ZSBkZWwgbGFiZWwgYWwgcHVsc2FyIHVuIGVudGVyIHRlIGdlbmVyYSB1biBzYWx0byBkZSBsw61uZWE7IEVudG9uY2VzIHRlbmVtb3MgcXVlIGRlc2FjdGl2YXIgZWwgY29tcG9ydGFtaWVudG8gcG9yIGRlZmF1bHQgZGVsIGVudGVyIHkgdGFtYmllbiBzZSBwb2Ryw61hIGFjdHVhbGl6YXIgdGFyZWEgY3VhbmRvIHNlIHBpZXJkYSBlbCBmb2N1cywgY3VhbmRvIHZheWFtb3MgZGUgdW4gZWxlbWVudG8gYSBvdHJvLlxuICAgICAgICAvLyBFbnRvbmNlcyBhc2lnbmFtb3MgYSBsYSBldGlxdWV0YSBsYWJlbCBkb3MgbWFuZWphZG9yZXMgZGUgZXZlbnRvcy4gVW5vIGVuIGVsIGJsdXIgeSBvdHJvIGVuIGVsIGtleXVwIHkgbGEgZXRpcXVldGEgbGFiZWwgdmEgYSBzZXIgZWwgc2VsZWN0b3IgcXVlIGN1bXBsYSBsYSBjb25kaWNpw7NuIGRlbCBkYXRhLWlkIHF1ZSBzZWEgaWd1YWwgYWwgZGUgZXNhIHRhcmVhLiB0YXNrLm5hbWUgPT09IGUudGFyZ2V0LnRleHRDb250ZW50XG4gICAgICAgIGxhYmVsID0gZC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pZD1cIiR7dGFza3NbdG9FZGl0XS5pZH1cIl1gKVxuXG4gICAgICAgIGModGFza3MsIHRvRWRpdCwgbGFiZWwpXG5cbiAgICAgICAgY29uc3Qgc2F2ZVRhc2sgPSBlID0+IHtcbiAgICAgICAgICAgIGUudGFyZ2V0LnRleHRDb250ZW50ID0gZS50YXJnZXQudGV4dENvbnRlbnQgIC8vIENvbnRlbmlkbyB0ZXh0dWFsIGRlbCBlbGVtZW50b1xuICAgICAgICAgICAgdGFza3NbdG9FZGl0XS5uYW1lID0gZS50YXJnZXQudGV4dENvbnRlbnRcbiAgICAgICAgICAgIGxzLnNldEl0ZW0oIHRoaXMua2V5LCBqLnN0cmluZ2lmeSh0YXNrcykgKSAgLy8gQ2FkYSBjYW1iaW8gYWwgbG9jYWxTdG9yYWdlIHRlbmVtb3MgcXVlIHNhbHZhcmxvIHkgbG8gcGFzYW1vcyBwb3IgdHJhbnNmb3JtYWNpw7NuIGNhZGVuYSBkZSB0ZXh0byBsYSB0YXJlYS5cbiAgICAgICAgICAgIGUudGFyZ2V0LmJsdXIoKSAvLyBDdWFuZG8gdGVybWluZSBkZSBzYWx2YXIgcXVpdGFtb3MgZGVsIGVsZW1lbnRvIGVsIGZvY3VzIGNvbiBlbCBtZXRvZG8gYmx1clxuICAgICAgICB9XG5cbiAgICAgICAgbGFiZWwuYWRkRXZlbnRMaXN0ZW5lciggJ2JsdXInLCBlID0+IHNhdmVUYXNrKGUpICkgLy8gQ3VhbmRvIHBpZXJkYSBlbCBmb2NvIHBhc2EgZWwgbcOpdG9kbyBkZWwgZXZlbnRvXG4gICAgICAgIGxhYmVsLmFkZEV2ZW50TGlzdGVuZXIoICdrZXl1cCcsIGUgPT4gKCBlLmtleUNvZGUgPT09IEVOVEVSX0tFWSApICYmIHNhdmVUYXNrKGUpICkgLy8gQ3VhbmRvIHNlYSBpZ3VhbCBhbCBFTlRFUl9LRVkgcGFzYSBlbCBtw6l0b2RvIGRlbCBldmVudG9cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlXG4gICAgcmVtb3ZlVGFzayAoZSkge1xuICAgICAgICBpZiAoIGUudGFyZ2V0LmxvY2FsTmFtZSA9PT0gJ2EnICkge1xuICAgICAgICAgICAgbGV0IHRhc2tzID0gai5wYXJzZSggbHMuZ2V0SXRlbSggdGhpcy5rZXkgKSksXG4gICAgICAgICAgICB0b1JlbW92ZSA9IHRhc2tzLmZpbmRJbmRleCggdGFzayA9PiB0YXNrLmlkLnRvU3RyaW5nKCkgPT09IGUudGFyZ2V0LmRhdGFzZXQuaWQgKVxuICAgICAgICAgICAgLy8gYyh0YXNrcywgdG9SZW1vdmUpXG4gICAgICAgICAgICB0YXNrcy5zcGxpY2UodG9SZW1vdmUsIDEpXG4gICAgICAgICAgICBscy5zZXRJdGVtKHRoaXMua2V5LCBqLnN0cmluZ2lmeSh0YXNrcykpXG4gICAgICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpXG4gICAgICAgIH1cbiAgICB9XG5cblxuXG4gICAgLy8gUmVuZGlyaXphbmRvIGxpc3RhIGRlIHRhcmVhcyBlbiBlbCBIVE1MXG4gICAgcmVuZGVyVGFzayh0YXNrKSB7XG4gICAgICAgIGxldCB0ZW1wbGF0ZVRhc2sgPSBgXG4gICAgICAgICAgICA8bGkgY2xhc3M9XCJMaXN0LWl0ZW0gJHsgdGFzay5pc0NvbXBsZXRlID8gJ2NvbXBsZXRlJyA6ICcnIH1cIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCIke3Rhc2suaWR9XCIgY2xhc3M9XCJMaXN0LWNoZWNrYm94ICR7IHRhc2suaXNDb21wbGV0ZSA/ICdjb21wbGV0ZScgOiAnJyB9XCIgLz5cbiAgICAgICAgICAgICAgICA8bGFiZWwgZGF0YS1pZD1cIiR7dGFzay5pZH1cIiBjbGFzcz1cIkxpc3QtbGFiZWxcIiBjb250ZW50ZWRpdGFibGUgc3BlbGxjaGVjaz4ke3Rhc2submFtZX08L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgZGF0YS1pZD1cIiR7dGFzay5pZH1cIiBjbGFzcz1cIkxpc3QtcmVtb3ZlTGlua1wiPiB4IDwvYT5cblxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgYFxuICAgICAgICBsaXN0Lmluc2VydEFkamFjZW50SFRNTCggJ2JlZm9yZWVuZCcsIHRlbXBsYXRlVGFzayApXG4gICAgfVxuXG4gICAgLy8gUmVuZGVyIHNlIHZhIGEgZW5jYXJnYXIgZGUgcGludGFyIGxvIG5lY2VzYXJpbyBwYXJhIGdlbmVyYXIgbnVlc3RhIGFwcFxuICAgIHJlbmRlciAoKSB7XG4gICAgICAgIC8vIENyZWFtb3MgdmFyaWFibGUgbG9jYWwgeSBjb252ZXJ0aW1vcyBsbyBxdWUgdHJhaWdhIGVsIGxvY2FsU3RvcmFnZSBlbiBzdSBwcm9waWVkYWQgdGhpcy5rZXlcbiAgICAgICAgbGV0IHRhc2tzID0gai5wYXJzZSggbHMuZ2V0SXRlbSh0aGlzLmtleSkgKVxuICAgICAgICB0YXNrcy5mb3JFYWNoKCB0YXNrID0+IHRoaXMucmVuZGVyVGFzayh0YXNrKSApXG5cbiAgICAgICAgdGFzay5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuYWRkVGFzaylcblxuICAgICAgICAvLyBEZWxlZ2FuZG8gYSBtw6l0b2RvIGVkaXRUYXNrIGVsIGNsaWNrIGRlIGxhIGxpc3RhXG4gICAgICAgIGxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmVkaXRUYXNrKVxuXG4gICAgICAgIC8vIEV2ZW50byByZW1vdmVcbiAgICAgICAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucmVtb3ZlVGFzaylcbiAgICB9IFxuXG59IiwiY29uc3QgRU5URVJfS0VZID0gMTMsIC8vIEVsIGtleSBjb2RlIGRlbCBlbnRlciBlcyAxMy4gTG8gZ3VhcmRhbW9zIGVuIGxhIGNvbnN0YW50ZSBwcmVmZXJpYmxlbWVudGUuIE3DoXMgc2Vtw6FudGljbyBzZSB2dWVsdmUgZWwgY8OzZGlnb1xuICAgIGMgPSBjb25zb2xlLmxvZyxcbiAgICBkID0gZG9jdW1lbnQsXG4gICAgaiA9IEpTT04sXG4gICAgbHMgPSBsb2NhbFN0b3JhZ2UgLy8gVmFtb3MgYSBoYWNlciB1c28gZGVsIEFQSSBzdG9yYWdlIHBhcmEgZ3VhcmRhciBsYXMgdGFyZWFzIHBlbmRpZW50ZXMgZGVsIHVzdWFyaW8gZW4gc3UgbmF2ZWdhZG9yLlxuXG5leHBvcnQge1xuICAgIEVOVEVSX0tFWSxcbiAgICBjLFxuICAgIGQsXG4gICAgaixcbiAgICBsc1xufSIsImltcG9ydCB7IGQgfSBmcm9tICcuL2hlbHBlcnMnXG5pbXBvcnQgVG9Eb0xpc3QgZnJvbSAnLi9Ub0RvTGlzdCdcblxuY29uc3QgdGFzayA9IGQucXVlcnlTZWxlY3RvcignI3Rhc2snKSxcbiAgICBsaXN0ID0gZC5xdWVyeVNlbGVjdG9yKCcjbGlzdCcpLFxuICAgIHRvZG8gPSBuZXcgVG9Eb0xpc3QoJ215bGlzdCcpXG5cbiAgICB0b2RvLnJlbmRlcigpIl19
