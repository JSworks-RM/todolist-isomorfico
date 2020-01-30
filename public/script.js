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
      task.addEventListener('keyup', this.addTask); // DElegando a método editTask el click de la lista

      list.addEventListener('click', this.editTask);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvVGFzay5qcyIsInNyYy9qcy9Ub0RvTGlzdC5qcyIsInNyYy9qcy9oZWxwZXJzLmpzIiwic3JjL2pzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0lDQXFCLEksR0FDakIsY0FBYSxJQUFiLEVBQW1CO0FBQUE7O0FBQ2YsT0FBSyxFQUFMLEdBQVUsSUFBSSxJQUFKLEdBQVcsT0FBWCxFQUFWO0FBQ0EsT0FBSyxJQUFMLEdBQVksSUFBWjtBQUNBLE9BQUssVUFBTCxHQUFrQixLQUFsQjtBQUVBLFNBQU8sSUFBUCxDQUxlLENBS0g7QUFDZixDOzs7Ozs7Ozs7Ozs7QUNQTDs7QUFDQTs7Ozs7Ozs7OztJQUVxQixROzs7QUFDakIsb0JBQWEsR0FBYixFQUFrQjtBQUFBOztBQUFFO0FBQ2hCO0FBQ0EsU0FBSyxHQUFMLEdBQVcsR0FBWCxDQUZjLENBSWQ7O0FBQ0EsUUFBSyxDQUFDLFlBQUcsT0FBSCxDQUFXLEdBQVgsQ0FBTixFQUNJLFlBQUcsT0FBSCxDQUFZLEdBQVosRUFBaUIsV0FBRSxTQUFGLENBQVksRUFBWixDQUFqQixFQU5VLENBTXlCOztBQUN2QyxTQUFLLE9BQUwsR0FBZSxLQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLElBQWxCLENBQWY7QUFDQSxTQUFLLFFBQUwsR0FBZ0IsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixJQUFuQixDQUFoQjtBQUNILEcsQ0FFRDtBQUNBOzs7Ozs0QkFDUyxDLEVBQUc7QUFDUixVQUFLLENBQUMsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxLQUFmLEVBQ0ksS0FBSyxDQUFDLG1DQUFELENBQUw7O0FBRUosVUFBSyxDQUFDLENBQUMsT0FBRixLQUFjLGtCQUFuQixFQUErQjtBQUMzQixZQUFJLE9BQU8sR0FBRyxJQUFJLGdCQUFKLENBQVUsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxLQUFuQixDQUFkO0FB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SSxDQUFDLFVBQUwsQ0FBZ0IsSUFBaEIsQ0FBSjtBQUFBLE9BQW5CO0FBRUEsTUFBQSxJQUFJLENBQUMsZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsS0FBSyxPQUFwQyxFQUxNLENBT047O0FBQ0EsTUFBQSxJQUFJLENBQUMsZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsS0FBSyxRQUFwQztBQUNIOzs7Ozs7Ozs7Ozs7Ozs7QUNyRkwsSUFBTSxTQUFTLEdBQUcsRUFBbEI7QUFBQSxJQUFzQjtBQUNsQixDQUFDLEdBQUcsT0FBTyxDQUFDLEdBRGhCO0FBQUEsSUFFSSxDQUFDLEdBQUcsUUFGUjtBQUFBLElBR0ksQ0FBQyxHQUFHLElBSFI7QUFBQSxJQUlJLEVBQUUsR0FBRyxZQUpULEMsQ0FJc0I7Ozs7Ozs7Ozs7O0FDSnRCOztBQUNBOzs7O0FBRUEsSUFBTSxJQUFJLEdBQUcsV0FBRSxhQUFGLENBQWdCLE9BQWhCLENBQWI7QUFBQSxJQUNJLElBQUksR0FBRyxXQUFFLGFBQUYsQ0FBZ0IsT0FBaEIsQ0FEWDtBQUFBLElBRUksSUFBSSxHQUFHLElBQUksb0JBQUosQ0FBYSxRQUFiLENBRlg7O0FBSUksSUFBSSxDQUFDLE1BQUwiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIHtcbiAgICBjb25zdHJ1Y3RvciAobmFtZSkge1xuICAgICAgICB0aGlzLmlkID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxuICAgICAgICB0aGlzLmlzQ29tcGxldGUgPSBmYWxzZVxuXG4gICAgICAgIHJldHVybiB0aGlzIC8vIFBhcmEgcmV0b3JuYXIgYSBtb2RvIGRlIG9iamV0byBwYXJhIHBvZGVyIGd1YXJkYXJsbyBlbiBlbCBsb2NhbCBzdG9yYWdlXG4gICAgfVxufSIsImltcG9ydCB7IEVOVEVSX0tFWSwgYywgZCwgaiwgbHMgfSBmcm9tICcuL2hlbHBlcnMnXG5pbXBvcnQgVGFzayBmcm9tICcuL1Rhc2snXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvRG9MaXN0ICB7XG4gICAgY29uc3RydWN0b3IgKGtleSkgeyAvLyBTT25zdHJ1Y3RvciBkZSBsYSBsbGF2ZSBxdWUgdmFtb3MgYSB0cmFiYWphciBlbiBlbCBzdG9yYWdlXG4gICAgICAgIC8vIEFzaWduYW1vcyBhIGxhIHByb3AuIGtleSBkZSBsYSBjbGFzZSBlbCBub21icmUgZGUgbGEgbGlzdGFcbiAgICAgICAgdGhpcy5rZXkgPSBrZXlcblxuICAgICAgICAvLyBsb2NhbFN0b3JhZ2UgdGllbmUgZG9zIG3DqXRvZG9zOiBVbm8gcGFyYSBlc3RhYmxlc2VyIHZhbG9yZXMgIHkgb3RybyBwYXJhIG9idGVuZXIgdmFsb3Jlc1xuICAgICAgICBpZiAoICFscy5nZXRJdGVtKGtleSkgKVxuICAgICAgICAgICAgbHMuc2V0SXRlbSgga2V5LCBqLnN0cmluZ2lmeShbXSkgKSAvLyBNw6l0b2RvIGRlIEpTT04gXCJzdHJpbmdpZnlcIiBjb252aWVydGUgdW4gb2JqZXRvIGVuIGNhZGVuYSBkZSB0ZXh0by4gTGUgcGFzYXJlbW9zIHVuIGFycmVnbG8gZG9uZGUgZ3VhcmRhcmVtb3MgdW4gYXJyZWdsb1xuICAgICAgICB0aGlzLmFkZFRhc2sgPSB0aGlzLmFkZFRhc2suYmluZCh0aGlzKVxuICAgICAgICB0aGlzLmVkaXRUYXNrID0gdGhpcy5lZGl0VGFzay5iaW5kKHRoaXMpXG4gICAgfVxuXG4gICAgLy8gTcOpdG9kb3NcbiAgICAvLyBDcmVhbW9zIG3DqXRvZG8gbWFuZWphZG9yIGRlIGV2ZW50b3MgcXVlIHZhIGEgc2VyIG1hbmlwdWxhZG8gcG9yIGVsIGlucHV0IHF1ZSB2YSBhIGRlc2VuY2FkZW5hciDDqXN0ZSBtw6l0b2RvXG4gICAgYWRkVGFzayAoZSkge1xuICAgICAgICBpZiAoICFlLnRhcmdldC52YWx1ZSApXG4gICAgICAgICAgICBhbGVydCgnTm8gcHVlZGVzIGFncmVnYXIgdW5hIHRhcmVhIHZhY8OtYScpXG4gICAgICAgIFxuICAgICAgICBpZiAoIGUua2V5Q29kZSA9PT0gRU5URVJfS0VZICkge1xuICAgICAgICAgICAgbGV0IG5ld1Rhc2sgPSBuZXcgVGFzayggZS50YXJnZXQudmFsdWUgKSwgLy8gQ2FwdHVyYW1vcyBudWV2YSB0YXJlYVxuICAgICAgICAgICAgICAgIHRhc2tzID0gai5wYXJzZSggbHMuZ2V0SXRlbSggdGhpcy5rZXkgKSApIC8vIFByaW1lcm8gb2J0ZW5lbW9zIGxhcyB0YXJlYXMgcXVlIGVzdGFuIGVuIGVsIGxvY2FsIHN0b3JhZ2UgcG9ycXVlIHNpbm8sIHJlZW1wbGF6YXLDrWFtb3MgbGFzIHF1ZSBlc3RlbiBndWFyZGFkYVxuICAgICAgICAgICAgICAgIC8vIEFob3JhIHF1ZSBsYXMgb2J0ZW5lbW9zIGVuIGZvcm1hdG8gb2JqZXRvLCBhw7FhZGltb3MgbGEgbnVldmEgdGFyZWEgY29uIG3DqXRvZG8gcHVzaFxuICAgICAgICAgICAgICAgIHRhc2tzLnB1c2gobmV3VGFzaylcbiAgICAgICAgICAgICAgICAvLyBZIG51ZXZhbWVudGUsIHBhcmEgZ3VhcmRhciBsYSBudWV2YSB0YXJlYSBlamVjdXRhbW9zIGVsIHNldEl0ZW0gZGUgbG9jYWxTdG9yYWdlXG4gICAgICAgICAgICAgICAgbHMuc2V0SXRlbSggdGhpcy5rZXksIGouc3RyaW5naWZ5KCB0YXNrcyApIClcbiAgICAgICAgICAgICAgICAvLyBEZXNwdWVzIGRlIGd1YXJkYXIgZW4gZWwgbG9jYWwgc3RvcmFnZSBsYSB0YXJlYSwgdmFtb3MgYSBjcmVhciB1biBtw6l0b2RvIHJlbmRlciBwYXJhIGd1YXJkYXIsIHJlbmRlcml6YXIgbGEgbnVldmEgdGFyZWEgeSBhc2kgbm8gZXN0YXIgcmVjYXJnYW5kb2xhcyBlbiBlbCBuYXZlZ2Fkb3IgcGFyYSB2ZXIgZXNhIG51ZXZhIHRhcmVhLiBBcXVpIHlhIGVzdGFtb3MgYXBsaWNhbmRvIGVsIGNvbmNlcHRvIGRlIGxhIHByb2dyYW1hY2nDs24gcmVhY3RpdmFcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclRhc2soIG5ld1Rhc2sgKVxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LnZhbHVlID0gbnVsbCAvLyBMaW1waWFtb3MgdmFsb3IgZGVsIGlucHV0LiBSZWluaWNpYW1vcyB2YWxvciBhIG51bGwgXG5cbiAgICAgICAgICAgICAgICAvL2MoYFRhcmVhczogJHt0YXNrc30sIE51ZXZhcyB0YXJlYXM6ICR7bmV3VGFza30sIExvY2FsU3RvcmFnZTogJHtsc31gKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZWRpdFRhc2sgKGUpIHtcbiAgICAgICAgLy8gYyhlLnRhcmdldC5sb2NhbE5hbWUpIC8vIExhIHByb3BpZWRhZCBsb2NhbE5hbWUgbm9zIGRhIGVsIG5vbWJyZSBkZSBsYSBldGlxdWV0YSBodG1sIHF1ZSBlc3RhIGVqZWN1dGFuZG8gZWwgZXZlbnRvXG4gICAgICAgIGlmICggZS50YXJnZXQubG9jYWxOYW1lID09PSAnbGFiZWwnICkge1xuICAgICAgICAgICAgbGV0IHRhc2tzID0gai5wYXJzZSggbHMuZ2V0SXRlbSh0aGlzLmtleSkgKSwgLy8gVHJhZSB0b2RhcyBsYXMgdGFyZWFzIHF1ZSBlc3RhbiBlbiBlbCBhcnJlZ2xvIGRlICdybUxpc3QgXG4gICAgICAgICAgICAvLyBHdWFyZGFuZG8gbGEgdGFyZWEgcXVlIHNlIHZhIGEgZWRpdGFyLiBBIGRpZmVyZW5jaWEgZGUgZmlsdGVyIHF1ZSBhbG1hY2VuYSBlbiB1biBvYmpldG8sIGVsIG3DqXRvZG8gZmluZEluZGV4KCkgdmEgYSBlbmNvbnRyYXIgZWwgaW5kaWNlIGRlIGxhIHRhcmVhIHF1ZSBjb21wbGEgY29uIGxhIGNvbmRpY2nDs24uXG4gICAgICAgICAgICAvLyB0b0VkaXQgPSB0YXNrcy5maWx0ZXIoIHRhc2sgPT4gdGFzay5uYW1lID09PSBlLnRhcmdldC50ZXh0Q29udGVudCApLFxuICAgICAgICAgICAgdG9FZGl0ID0gdGFza3MuZmluZEluZGV4KCB0YXNrID0+IHRhc2submFtZSA9PT0gZS50YXJnZXQudGV4dENvbnRlbnQgKSwgLy8gdG9FZGl0IHZhIGEgc2VyIGlndWFsIGFsIGluZGljZSBkZSBsYSB0YXJlYSBzZWxlY2Npb25hZGFcbiAgICAgICAgLy8gT3RybyBkZXRhbGxlIGVzIHF1ZSBsYSB0YXJlYSBzZSB0aWVuZSBxdWUgYWN0dWFsaXphciBjdWFuZG8gc2UgZGUgbWFudWFsbWVudGUgdW4gZW50ZXIgcGVybyBlbiBlbCBjb250ZW50ZWRpdGFiZWwgYXRyaWJ1dGUgZGVsIGxhYmVsIGFsIHB1bHNhciB1biBlbnRlciB0ZSBnZW5lcmEgdW4gc2FsdG8gZGUgbMOtbmVhOyBFbnRvbmNlcyB0ZW5lbW9zIHF1ZSBkZXNhY3RpdmFyIGVsIGNvbXBvcnRhbWllbnRvIHBvciBkZWZhdWx0IGRlbCBlbnRlciB5IHRhbWJpZW4gc2UgcG9kcsOtYSBhY3R1YWxpemFyIHRhcmVhIGN1YW5kbyBzZSBwaWVyZGEgZWwgZm9jdXMsIGN1YW5kbyB2YXlhbW9zIGRlIHVuIGVsZW1lbnRvIGEgb3Ryby5cbiAgICAgICAgLy8gRW50b25jZXMgYXNpZ25hbW9zIGEgbGEgZXRpcXVldGEgbGFiZWwgZG9zIG1hbmVqYWRvcmVzIGRlIGV2ZW50b3MuIFVubyBlbiBlbCBibHVyIHkgb3RybyBlbiBlbCBrZXl1cCB5IGxhIGV0aXF1ZXRhIGxhYmVsIHZhIGEgc2VyIGVsIHNlbGVjdG9yIHF1ZSBjdW1wbGEgbGEgY29uZGljacOzbiBkZWwgZGF0YS1pZCBxdWUgc2VhIGlndWFsIGFsIGRlIGVzYSB0YXJlYS4gdGFzay5uYW1lID09PSBlLnRhcmdldC50ZXh0Q29udGVudFxuICAgICAgICBsYWJlbCA9IGQucXVlcnlTZWxlY3RvcihgW2RhdGEtaWQ9XCIke3Rhc2tzW3RvRWRpdF0uaWR9XCJdYClcblxuICAgICAgICBjKHRhc2tzLCB0b0VkaXQsIGxhYmVsKVxuXG4gICAgICAgIGNvbnN0IHNhdmVUYXNrID0gZSA9PiB7XG4gICAgICAgICAgICBlLnRhcmdldC50ZXh0Q29udGVudCA9IGUudGFyZ2V0LnRleHRDb250ZW50ICAvLyBDb250ZW5pZG8gdGV4dHVhbCBkZWwgZWxlbWVudG9cbiAgICAgICAgICAgIHRhc2tzW3RvRWRpdF0ubmFtZSA9IGUudGFyZ2V0LnRleHRDb250ZW50XG4gICAgICAgICAgICBscy5zZXRJdGVtKCB0aGlzLmtleSwgai5zdHJpbmdpZnkodGFza3MpICkgIC8vIENhZGEgY2FtYmlvIGFsIGxvY2FsU3RvcmFnZSB0ZW5lbW9zIHF1ZSBzYWx2YXJsbyB5IGxvIHBhc2Ftb3MgcG9yIHRyYW5zZm9ybWFjacOzbiBjYWRlbmEgZGUgdGV4dG8gbGEgdGFyZWEuXG4gICAgICAgICAgICBlLnRhcmdldC5ibHVyKCkgLy8gQ3VhbmRvIHRlcm1pbmUgZGUgc2FsdmFyIHF1aXRhbW9zIGRlbCBlbGVtZW50byBlbCBmb2N1cyBjb24gZWwgbWV0b2RvIGJsdXJcbiAgICAgICAgfVxuXG4gICAgICAgIGxhYmVsLmFkZEV2ZW50TGlzdGVuZXIoICdibHVyJywgZSA9PiBzYXZlVGFzayhlKSApIC8vIEN1YW5kbyBwaWVyZGEgZWwgZm9jbyBwYXNhIGVsIG3DqXRvZG8gZGVsIGV2ZW50b1xuICAgICAgICBsYWJlbC5hZGRFdmVudExpc3RlbmVyKCAna2V5dXAnLCBlID0+ICggZS5rZXlDb2RlID09PSBFTlRFUl9LRVkgKSAmJiBzYXZlVGFzayhlKSApIC8vIEN1YW5kbyBzZWEgaWd1YWwgYWwgRU5URVJfS0VZIHBhc2EgZWwgbcOpdG9kbyBkZWwgZXZlbnRvXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8vIFJlbmRpcml6YW5kbyBsaXN0YSBkZSB0YXJlYXMgZW4gZWwgSFRNTFxuICAgIHJlbmRlclRhc2sodGFzaykge1xuICAgICAgICBsZXQgdGVtcGxhdGVUYXNrID0gYFxuICAgICAgICAgICAgPGxpIGNsYXNzPVwiTGlzdC1pdGVtICR7IHRhc2suaXNDb21wbGV0ZSA/ICdjb21wbGV0ZScgOiAnJyB9XCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiJHt0YXNrLmlkfVwiIGNsYXNzPVwiTGlzdC1jaGVja2JveCAkeyB0YXNrLmlzQ29tcGxldGUgPyAnY29tcGxldGUnIDogJycgfVwiIC8+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGRhdGEtaWQ9XCIke3Rhc2suaWR9XCIgY2xhc3M9XCJMaXN0LWxhYmVsXCIgY29udGVudGVkaXRhYmxlIHNwZWxsY2hlY2s+JHt0YXNrLm5hbWV9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIGRhdGEtaWQ9XCIke3Rhc2suaWR9XCIgY2xhc3M9XCJMaXN0LXJlbW92ZUxpbmtcIj4geCA8L2E+XG5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgIGBcbiAgICAgICAgbGlzdC5pbnNlcnRBZGphY2VudEhUTUwoICdiZWZvcmVlbmQnLCB0ZW1wbGF0ZVRhc2sgKVxuICAgIH1cblxuICAgIC8vIFJlbmRlciBzZSB2YSBhIGVuY2FyZ2FyIGRlIHBpbnRhciBsbyBuZWNlc2FyaW8gcGFyYSBnZW5lcmFyIG51ZXN0YSBhcHBcbiAgICByZW5kZXIgKCkge1xuICAgICAgICAvLyBDcmVhbW9zIHZhcmlhYmxlIGxvY2FsIHkgY29udmVydGltb3MgbG8gcXVlIHRyYWlnYSBlbCBsb2NhbFN0b3JhZ2UgZW4gc3UgcHJvcGllZGFkIHRoaXMua2V5XG4gICAgICAgIGxldCB0YXNrcyA9IGoucGFyc2UoIGxzLmdldEl0ZW0odGhpcy5rZXkpIClcbiAgICAgICAgdGFza3MuZm9yRWFjaCggdGFzayA9PiB0aGlzLnJlbmRlclRhc2sodGFzaykgKVxuXG4gICAgICAgIHRhc2suYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmFkZFRhc2spXG5cbiAgICAgICAgLy8gREVsZWdhbmRvIGEgbcOpdG9kbyBlZGl0VGFzayBlbCBjbGljayBkZSBsYSBsaXN0YVxuICAgICAgICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5lZGl0VGFzaylcbiAgICB9IFxuXG59IiwiY29uc3QgRU5URVJfS0VZID0gMTMsIC8vIEVsIGtleSBjb2RlIGRlbCBlbnRlciBlcyAxMy4gTG8gZ3VhcmRhbW9zIGVuIGxhIGNvbnN0YW50ZSBwcmVmZXJpYmxlbWVudGUuIE3DoXMgc2Vtw6FudGljbyBzZSB2dWVsdmUgZWwgY8OzZGlnb1xuICAgIGMgPSBjb25zb2xlLmxvZyxcbiAgICBkID0gZG9jdW1lbnQsXG4gICAgaiA9IEpTT04sXG4gICAgbHMgPSBsb2NhbFN0b3JhZ2UgLy8gVmFtb3MgYSBoYWNlciB1c28gZGVsIEFQSSBzdG9yYWdlIHBhcmEgZ3VhcmRhciBsYXMgdGFyZWFzIHBlbmRpZW50ZXMgZGVsIHVzdWFyaW8gZW4gc3UgbmF2ZWdhZG9yLlxuXG5leHBvcnQge1xuICAgIEVOVEVSX0tFWSxcbiAgICBjLFxuICAgIGQsXG4gICAgaixcbiAgICBsc1xufSIsImltcG9ydCB7IGQgfSBmcm9tICcuL2hlbHBlcnMnXG5pbXBvcnQgVG9Eb0xpc3QgZnJvbSAnLi9Ub0RvTGlzdCdcblxuY29uc3QgdGFzayA9IGQucXVlcnlTZWxlY3RvcignI3Rhc2snKSxcbiAgICBsaXN0ID0gZC5xdWVyeVNlbGVjdG9yKCcjbGlzdCcpLFxuICAgIHRvZG8gPSBuZXcgVG9Eb0xpc3QoJ3JtTGlzdCcpXG5cbiAgICB0b2RvLnJlbmRlcigpIl19
