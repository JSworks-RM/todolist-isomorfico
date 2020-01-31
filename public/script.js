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

    // Constructor de la llave que vamos a trabajar en el storage
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
      var tasks = _helpers.j.parse(_helpers.ls.getItem(this.key)),
          listTasks = list.children; // Hijos de elemento li
      //c(tasks) // Array de onjeto de la this.key


      tasks.forEach(function (task) {
        return _this2.renderTask(task);
      }); // A cada elemento "li" le buscamos su input de type "checkbox" y le asignamos un evento que cambie cuando cambie el valor de ese input
      // Ese event queremos que ejecute una acción pero para que no se aplique a todos los elementos, tareas, hay que aplicarle un filtro para cuando el id de la tarea sea igual al id del elemento
      // forEach no es una function de listTasks. Todos los elementos que vienen de selectores como querySelector, getElementByTagName, etc... Cuando los imprimimos en consola tienen el aspecto, apariencia de arreglos, pero en realidad es un html colection,es decir, son nodos, nodos de listas, nodos de elementos de html. Entonces no son arreglos.
      // A estos nodos para convertirlos en arreglo, entre una de las opciones sería aplicarle un casting indicando.
      // Array.from(nodo) A este nodo de lista queremos que le herede todas las características que tiene un arreglo y asi podemos usar todos estos métodos funcionales: filter, forEach, map, reduce, findIndex etc...

      Array.from(listTasks).forEach(function (li) {
        li.querySelector('input[type="checkbox"]').addEventListener('change', function (e) {
          var task = tasks.filter(function (task) {
            return task.id.toString() === e.target.id;
          }); // El checkbox es el único elemento que tiene id, el label y enlace tienen atributo data-id

          (0, _helpers.c)(task);

          if (e.target.checked) {
            e.target.parentElement.classList.add('complete');
            task[0].isComplete = true;
          } else {
            e.target.parentElement.classList.remove('complete');
            task[0].isComplete = false;
          } // Actualizamos storage


          _helpers.ls.setItem(_this2.key, _helpers.j.stringify(tasks));
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvVGFzay5qcyIsInNyYy9qcy9Ub0RvTGlzdC5qcyIsInNyYy9qcy9oZWxwZXJzLmpzIiwic3JjL2pzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0lDQXFCLEksR0FDakIsY0FBYSxJQUFiLEVBQW1CO0FBQUE7O0FBQ2YsT0FBSyxFQUFMLEdBQVUsSUFBSSxJQUFKLEdBQVcsT0FBWCxFQUFWO0FBQ0EsT0FBSyxJQUFMLEdBQVksSUFBWjtBQUNBLE9BQUssVUFBTCxHQUFrQixLQUFsQjtBQUVBLFNBQU8sSUFBUCxDQUxlLENBS0g7QUFDZixDOzs7Ozs7Ozs7Ozs7QUNQTDs7QUFDQTs7Ozs7Ozs7OztJQUVxQixROzs7QUFDakIsb0JBQWEsR0FBYixFQUFrQjtBQUFBOztBQUFFO0FBQ2hCO0FBQ0EsU0FBSyxHQUFMLEdBQVcsR0FBWCxDQUZjLENBSWQ7O0FBQ0EsUUFBSyxDQUFDLFlBQUcsT0FBSCxDQUFXLEdBQVgsQ0FBTixFQUNJLFlBQUcsT0FBSCxDQUFZLEdBQVosRUFBaUIsV0FBRSxTQUFGLENBQVksRUFBWixDQUFqQixFQU5VLENBTXlCOztBQUN2QyxTQUFLLE9BQUwsR0FBZSxLQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLElBQWxCLENBQWY7QUFDQSxTQUFLLFFBQUwsR0FBZ0IsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixJQUFuQixDQUFoQjtBQUNBLFNBQUssVUFBTCxHQUFrQixLQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsQ0FBcUIsSUFBckIsQ0FBbEI7QUFDSCxHLENBRUQ7QUFDQTs7Ozs7NEJBQ1MsQyxFQUFHO0FBQ1IsVUFBSyxDQUFDLENBQUMsQ0FBQyxNQUFGLENBQVMsS0FBZixFQUNJLEtBQUssQ0FBQyxtQ0FBRCxDQUFMOztBQUVKLFVBQUssQ0FBQyxDQUFDLE9BQUYsS0FBYyxrQkFBbkIsRUFBK0I7QUFDM0IsWUFB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QUcsV0FBRSxhQUFGLENBQWdCLE9BQWhCLENBQWI7QUFBQSxJQUNJLElBQUksR0FBRyxXQUFFLGFBQUYsQ0FBZ0IsT0FBaEIsQ0FEWDtBQUFBLElBRUksSUFBSSxHQUFHLElBQUksb0JBQUosQ0FBYSxRQUFiLENBRlg7O0FBSUksSUFBSSxDQUFDLE1BQUwiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIHtcbiAgICBjb25zdHJ1Y3RvciAobmFtZSkge1xuICAgICAgICB0aGlzLmlkID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxuICAgICAgICB0aGlzLmlzQ29tcGxldGUgPSBmYWxzZVxuXG4gICAgICAgIHJldHVybiB0aGlzIC8vIFBhcmEgcmV0b3JuYXIgYSBtb2RvIGRlIG9iamV0byBwYXJhIHBvZGVyIGd1YXJkYXJsbyBlbiBlbCBsb2NhbCBzdG9yYWdlXG4gICAgfVxufSIsImltcG9ydCB7IEVOVEVSX0tFWSwgYywgZCwgaiwgbHMgfSBmcm9tICcuL2hlbHBlcnMnXG5pbXBvcnQgVGFzayBmcm9tICcuL1Rhc2snXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvRG9MaXN0ICB7XG4gICAgY29uc3RydWN0b3IgKGtleSkgeyAvLyBDb25zdHJ1Y3RvciBkZSBsYSBsbGF2ZSBxdWUgdmFtb3MgYSB0cmFiYWphciBlbiBlbCBzdG9yYWdlXG4gICAgICAgIC8vIEFzaWduYW1vcyBhIGxhIHByb3AuIGtleSBkZSBsYSBjbGFzZSBlbCBub21icmUgZGUgbGEgbGlzdGFcbiAgICAgICAgdGhpcy5rZXkgPSBrZXlcblxuICAgICAgICAvLyBsb2NhbFN0b3JhZ2UgdGllbmUgZG9zIG3DqXRvZG9zOiBVbm8gcGFyYSBlc3RhYmxlc2VyIHZhbG9yZXMgIHkgb3RybyBwYXJhIG9idGVuZXIgdmFsb3Jlc1xuICAgICAgICBpZiAoICFscy5nZXRJdGVtKGtleSkgKVxuICAgICAgICAgICAgbHMuc2V0SXRlbSgga2V5LCBqLnN0cmluZ2lmeShbXSkgKSAvLyBNw6l0b2RvIGRlIEpTT04gXCJzdHJpbmdpZnlcIiBjb252aWVydGUgdW4gb2JqZXRvIGVuIGNhZGVuYSBkZSB0ZXh0by4gTGUgcGFzYXJlbW9zIHVuIGFycmVnbG8gZG9uZGUgZ3VhcmRhcmVtb3MgdW4gYXJyZWdsb1xuICAgICAgICB0aGlzLmFkZFRhc2sgPSB0aGlzLmFkZFRhc2suYmluZCh0aGlzKVxuICAgICAgICB0aGlzLmVkaXRUYXNrID0gdGhpcy5lZGl0VGFzay5iaW5kKHRoaXMpXG4gICAgICAgIHRoaXMucmVtb3ZlVGFzayA9IHRoaXMucmVtb3ZlVGFzay5iaW5kKHRoaXMpXG4gICAgfVxuXG4gICAgLy8gTcOpdG9kb3NcbiAgICAvLyBDcmVhbW9zIG3DqXRvZG8gbWFuZWphZG9yIGRlIGV2ZW50b3MgcXVlIHZhIGEgc2VyIG1hbmlwdWxhZG8gcG9yIGVsIGlucHV0IHF1ZSB2YSBhIGRlc2VuY2FkZW5hciDDqXN0ZSBtw6l0b2RvXG4gICAgYWRkVGFzayAoZSkge1xuICAgICAgICBpZiAoICFlLnRhcmdldC52YWx1ZSApXG4gICAgICAgICAgICBhbGVydCgnTm8gcHVlZGVzIGFncmVnYXIgdW5hIHRhcmVhIHZhY8OtYScpXG4gICAgICAgIFxuICAgICAgICBpZiAoIGUua2V5Q29kZSA9PT0gRU5URVJfS0VZICkge1xuICAgICAgICAgICAgbGV0IG5ld1Rhc2sgPSBuZXcgVGFzayggZS50YXJnZXQudmFsdWUgKSwgLy8gQ2FwdHVyYW1vcyBudWV2YSB0YXJlYVxuICAgICAgICAgICAgICAgIHRhc2tzID0gai5wYXJzZSggbHMuZ2V0SXRlbSggdGhpcy5rZXkgKSApIC8vIFByaW1lcm8gb2J0ZW5lbW9zIGxhcyB0YXJlYXMgcXVlIGVzdGFuIGVuIGVsIGxvY2FsIHN0b3JhZ2UgcG9ycXVlIHNpbm8sIHJlZW1wbGF6YXLDrWFtb3MgbGFzIHF1ZSBlc3RlbiBndWFyZGFkYVxuICAgICAgICAgICAgICAgIC8vIEFob3JhIHF1ZSBsYXMgb2J0ZW5lbW9zIGVuIGZvcm1hdG8gb2JqZXRvLCBhw7FhZGltb3MgbGEgbnVldmEgdGFyZWEgY29uIG3DqXRvZG8gcHVzaFxuICAgICAgICAgICAgICAgIHRhc2tzLnB1c2gobmV3VGFzaylcbiAgICAgICAgICAgICAgICAvLyBZIG51ZXZhbWVudGUsIHBhcmEgZ3VhcmRhciBsYSBudWV2YSB0YXJlYSBlamVjdXRhbW9zIGVsIHNldEl0ZW0gZGUgbG9jYWxTdG9yYWdlXG4gICAgICAgICAgICAgICAgbHMuc2V0SXRlbSggdGhpcy5rZXksIGouc3RyaW5naWZ5KCB0YXNrcyApIClcbiAgICAgICAgICAgICAgICAvLyBEZXNwdWVzIGRlIGd1YXJkYXIgZW4gZWwgbG9jYWwgc3RvcmFnZSBsYSB0YXJlYSwgdmFtb3MgYSBjcmVhciB1biBtw6l0b2RvIHJlbmRlciBwYXJhIGd1YXJkYXIsIHJlbmRlcml6YXIgbGEgbnVldmEgdGFyZWEgeSBhc2kgbm8gZXN0YXIgcmVjYXJnYW5kb2xhcyBlbiBlbCBuYXZlZ2Fkb3IgcGFyYSB2ZXIgZXNhIG51ZXZhIHRhcmVhLiBBcXVpIHlhIGVzdGFtb3MgYXBsaWNhbmRvIGVsIGNvbmNlcHRvIGRlIGxhIHByb2dyYW1hY2nDs24gcmVhY3RpdmFcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclRhc2soIG5ld1Rhc2sgKVxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LnZhbHVlID0gbnVsbCAvLyBMaW1waWFtb3MgdmFsb3IgZGVsIGlucHV0LiBSZWluaWNpYW1vcyB2YWxvciBhIG51bGwgXG5cbiAgICAgICAgICAgICAgICAvL2MoYFRhcmVhczogJHt0YXNrc30sIE51ZXZhcyB0YXJlYXM6ICR7bmV3VGFza30sIExvY2FsU3RvcmFnZTogJHtsc31gKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZWRpdFRhc2sgKGUpIHtcbiAgICAgICAgLy8gYyhlLnRhcmdldC5sb2NhbE5hbWUpIC8vIExhIHByb3BpZWRhZCBsb2NhbE5hbWUgbm9zIGRhIGVsIG5vbWJyZSBkZSBsYSBldGlxdWV0YSBodG1sIHF1ZSBlc3RhIGVqZWN1dGFuZG8gZWwgZXZlbnRvXG4gICAgICAgIGlmICggZS50YXJnZXQubG9jYWxOYW1lID09PSAnbGFiZWwnICkge1xuICAgICAgICAgICAgbGV0IHRhc2tzID0gai5wYXJzZSggbHMuZ2V0SXRlbSh0aGlzLmtleSkgKSwgLy8gVHJhZSB0b2RhcyBsYXMgdGFyZWFzIHF1ZSBlc3RhbiBlbiBlbCBhcnJlZ2xvIGRlICdybUxpc3QgXG4gICAgICAgICAgICAvLyBHdWFyZGFuZG8gbGEgdGFyZWEgcXVlIHNlIHZhIGEgZWRpdGFyLiBBIGRpZmVyZW5jaWEgZGUgZmlsdGVyIHF1ZSBhbG1hY2VuYSBlbiB1biBvYmpldG8sIGVsIG3DqXRvZG8gZmluZEluZGV4KCkgdmEgYSBlbmNvbnRyYXIgZWwgaW5kaWNlIGRlIGxhIHRhcmVhIHF1ZSBjb21wbGEgY29uIGxhIGNvbmRpY2nDs24uXG4gICAgICAgICAgICAvLyB0b0VkaXQgPSB0YXNrcy5maWx0ZXIoIHRhc2sgPT4gdGFzay5uYW1lID09PSBlLnRhcmdldC50ZXh0Q29udGVudCApLFxuICAgICAgICAgICAgdG9FZGl0ID0gdGFza3MuZmluZEluZGV4KCB0YXNrID0+IHRhc2submFtZSA9PT0gZS50YXJnZXQudGV4dENvbnRlbnQgKSwgLy8gdG9FZGl0IHZhIGEgc2VyIGlndWFsIGFsIGluZGljZSBkZSBsYSB0YXJlYSBzZWxlY2Npb25hZGFcbiAgICAgICAgLy8gT3RybyBkZXRhbGxlIGVzIHF1ZSBsYSB0YXJlYSBzZSB0aWVuZSBxdWUgYWN0dWFsaXphciBjdWFuZG8gc2UgZGUgbWFudWFsbWVudGUgdW4gZW50ZXIgcGVybyBlbiBlbCBjb250ZW50ZWRpdGFiZWwgYXRyaWJ1dGUgZGVsIGxhYmVsIGFsIHB1bHNhciB1biBlbnRlciB0ZSBnZW5lcmEgdW4gc2FsdG8gZGUgbMOtbmVhOyBFbnRvbmNlcyB0ZW5lbW9zIHF1ZSBkZXNhY3RpdmFyIGVsIGNvbXBvcnRhbWllbnRvIHBvciBkZWZhdWx0IGRlbCBlbnRlciB5IHRhbWJpZW4gc2UgcG9kcsOtYSBhY3R1YWxpemFyIHRhcmVhIGN1YW5kbyBzZSBwaWVyZGEgZWwgZm9jdXMsIGN1YW5kbyB2YXlhbW9zIGRlIHVuIGVsZW1lbnRvIGEgb3Ryby5cbiAgICAgICAgLy8gRW50b25jZXMgYXNpZ25hbW9zIGEgbGEgZXRpcXVldGEgbGFiZWwgZG9zIG1hbmVqYWRvcmVzIGRlIGV2ZW50b3MuIFVubyBlbiBlbCBibHVyIHkgb3RybyBlbiBlbCBrZXl1cCB5IGxhIGV0aXF1ZXRhIGxhYmVsIHZhIGEgc2VyIGVsIHNlbGVjdG9yIHF1ZSBjdW1wbGEgbGEgY29uZGljacOzbiBkZWwgZGF0YS1pZCBxdWUgc2VhIGlndWFsIGFsIGRlIGVzYSB0YXJlYS4gdGFzay5uYW1lID09PSBlLnRhcmdldC50ZXh0Q29udGVudFxuICAgICAgICBsYWJlbCA9IGQucXVlcnlTZWxlY3RvcihgW2RhdGEtaWQ9XCIke3Rhc2tzW3RvRWRpdF0uaWR9XCJdYClcblxuICAgICAgICBjKHRhc2tzLCB0b0VkaXQsIGxhYmVsKVxuXG4gICAgICAgIGNvbnN0IHNhdmVUYXNrID0gZSA9PiB7XG4gICAgICAgICAgICBlLnRhcmdldC50ZXh0Q29udGVudCA9IGUudGFyZ2V0LnRleHRDb250ZW50ICAvLyBDb250ZW5pZG8gdGV4dHVhbCBkZWwgZWxlbWVudG9cbiAgICAgICAgICAgIHRhc2tzW3RvRWRpdF0ubmFtZSA9IGUudGFyZ2V0LnRleHRDb250ZW50XG4gICAgICAgICAgICBscy5zZXRJdGVtKCB0aGlzLmtleSwgai5zdHJpbmdpZnkodGFza3MpICkgIC8vIENhZGEgY2FtYmlvIGFsIGxvY2FsU3RvcmFnZSB0ZW5lbW9zIHF1ZSBzYWx2YXJsbyB5IGxvIHBhc2Ftb3MgcG9yIHRyYW5zZm9ybWFjacOzbiBjYWRlbmEgZGUgdGV4dG8gbGEgdGFyZWEuXG4gICAgICAgICAgICBlLnRhcmdldC5ibHVyKCkgLy8gQ3VhbmRvIHRlcm1pbmUgZGUgc2FsdmFyIHF1aXRhbW9zIGRlbCBlbGVtZW50byBlbCBmb2N1cyBjb24gZWwgbWV0b2RvIGJsdXJcbiAgICAgICAgfVxuXG4gICAgICAgIGxhYmVsLmFkZEV2ZW50TGlzdGVuZXIoICdibHVyJywgZSA9PiBzYXZlVGFzayhlKSApIC8vIEN1YW5kbyBwaWVyZGEgZWwgZm9jbyBwYXNhIGVsIG3DqXRvZG8gZGVsIGV2ZW50b1xuICAgICAgICBsYWJlbC5hZGRFdmVudExpc3RlbmVyKCAna2V5dXAnLCBlID0+ICggZS5rZXlDb2RlID09PSBFTlRFUl9LRVkgKSAmJiBzYXZlVGFzayhlKSApIC8vIEN1YW5kbyBzZWEgaWd1YWwgYWwgRU5URVJfS0VZIHBhc2EgZWwgbcOpdG9kbyBkZWwgZXZlbnRvXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8vIFJlbW92ZVxuICAgIHJlbW92ZVRhc2sgKGUpIHtcbiAgICAgICAgaWYgKCBlLnRhcmdldC5sb2NhbE5hbWUgPT09ICdhJyApIHtcbiAgICAgICAgICAgIGxldCB0YXNrcyA9IGoucGFyc2UoIGxzLmdldEl0ZW0oIHRoaXMua2V5ICkpLFxuICAgICAgICAgICAgdG9SZW1vdmUgPSB0YXNrcy5maW5kSW5kZXgoIHRhc2sgPT4gdGFzay5pZC50b1N0cmluZygpID09PSBlLnRhcmdldC5kYXRhc2V0LmlkIClcbiAgICAgICAgICAgIC8vIGModGFza3MsIHRvUmVtb3ZlKVxuICAgICAgICAgICAgdGFza3Muc3BsaWNlKHRvUmVtb3ZlLCAxKVxuICAgICAgICAgICAgbHMuc2V0SXRlbSh0aGlzLmtleSwgai5zdHJpbmdpZnkodGFza3MpKVxuICAgICAgICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5yZW1vdmUoKVxuICAgICAgICB9XG4gICAgfVxuXG5cblxuICAgIC8vIFJlbmRpcml6YW5kbyBsaXN0YSBkZSB0YXJlYXMgZW4gZWwgSFRNTFxuICAgIHJlbmRlclRhc2sodGFzaykge1xuICAgICAgICBsZXQgdGVtcGxhdGVUYXNrID0gYFxuICAgICAgICAgICAgPGxpIGNsYXNzPVwiTGlzdC1pdGVtICR7IHRhc2suaXNDb21wbGV0ZSA/ICdjb21wbGV0ZScgOiAnJyB9XCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiJHt0YXNrLmlkfVwiIGNsYXNzPVwiTGlzdC1jaGVja2JveCAkeyB0YXNrLmlzQ29tcGxldGUgPyAnY29tcGxldGUnIDogJycgfVwiIC8+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGRhdGEtaWQ9XCIke3Rhc2suaWR9XCIgY2xhc3M9XCJMaXN0LWxhYmVsXCIgY29udGVudGVkaXRhYmxlIHNwZWxsY2hlY2s+JHt0YXNrLm5hbWV9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIGRhdGEtaWQ9XCIke3Rhc2suaWR9XCIgY2xhc3M9XCJMaXN0LXJlbW92ZUxpbmtcIj4geCA8L2E+XG5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgIGBcbiAgICAgICAgbGlzdC5pbnNlcnRBZGphY2VudEhUTUwoICdiZWZvcmVlbmQnLCB0ZW1wbGF0ZVRhc2sgKVxuICAgIH1cblxuICAgIC8vIFJlbmRlciBzZSB2YSBhIGVuY2FyZ2FyIGRlIHBpbnRhciBsbyBuZWNlc2FyaW8gcGFyYSBnZW5lcmFyIG51ZXN0YSBhcHBcbiAgICByZW5kZXIgKCkge1xuICAgICAgICAvLyBDcmVhbW9zIHZhcmlhYmxlIGxvY2FsIHkgY29udmVydGltb3MgbG8gcXVlIHRyYWlnYSBlbCBsb2NhbFN0b3JhZ2UgZW4gc3UgcHJvcGllZGFkIHRoaXMua2V5XG4gICAgICAgIGxldCB0YXNrcyA9IGoucGFyc2UoIGxzLmdldEl0ZW0odGhpcy5rZXkpICksXG4gICAgICAgICAgICBsaXN0VGFza3MgPSBsaXN0LmNoaWxkcmVuICAvLyBIaWpvcyBkZSBlbGVtZW50byBsaVxuICAgICAgICAgICAgLy9jKHRhc2tzKSAvLyBBcnJheSBkZSBvbmpldG8gZGUgbGEgdGhpcy5rZXlcblxuICAgICAgICB0YXNrcy5mb3JFYWNoKCB0YXNrID0+IHRoaXMucmVuZGVyVGFzayh0YXNrKSApXG5cbiAgICAgICAgLy8gQSBjYWRhIGVsZW1lbnRvIFwibGlcIiBsZSBidXNjYW1vcyBzdSBpbnB1dCBkZSB0eXBlIFwiY2hlY2tib3hcIiB5IGxlIGFzaWduYW1vcyB1biBldmVudG8gcXVlIGNhbWJpZSBjdWFuZG8gY2FtYmllIGVsIHZhbG9yIGRlIGVzZSBpbnB1dFxuICAgICAgICAvLyBFc2UgZXZlbnQgcXVlcmVtb3MgcXVlIGVqZWN1dGUgdW5hIGFjY2nDs24gcGVybyBwYXJhIHF1ZSBubyBzZSBhcGxpcXVlIGEgdG9kb3MgbG9zIGVsZW1lbnRvcywgdGFyZWFzLCBoYXkgcXVlIGFwbGljYXJsZSB1biBmaWx0cm8gcGFyYSBjdWFuZG8gZWwgaWQgZGUgbGEgdGFyZWEgc2VhIGlndWFsIGFsIGlkIGRlbCBlbGVtZW50b1xuICAgICAgICAvLyBmb3JFYWNoIG5vIGVzIHVuYSBmdW5jdGlvbiBkZSBsaXN0VGFza3MuIFRvZG9zIGxvcyBlbGVtZW50b3MgcXVlIHZpZW5lbiBkZSBzZWxlY3RvcmVzIGNvbW8gcXVlcnlTZWxlY3RvciwgZ2V0RWxlbWVudEJ5VGFnTmFtZSwgZXRjLi4uIEN1YW5kbyBsb3MgaW1wcmltaW1vcyBlbiBjb25zb2xhIHRpZW5lbiBlbCBhc3BlY3RvLCBhcGFyaWVuY2lhIGRlIGFycmVnbG9zLCBwZXJvIGVuIHJlYWxpZGFkIGVzIHVuIGh0bWwgY29sZWN0aW9uLGVzIGRlY2lyLCBzb24gbm9kb3MsIG5vZG9zIGRlIGxpc3Rhcywgbm9kb3MgZGUgZWxlbWVudG9zIGRlIGh0bWwuIEVudG9uY2VzIG5vIHNvbiBhcnJlZ2xvcy5cbiAgICAgICAgLy8gQSBlc3RvcyBub2RvcyBwYXJhIGNvbnZlcnRpcmxvcyBlbiBhcnJlZ2xvLCBlbnRyZSB1bmEgZGUgbGFzIG9wY2lvbmVzIHNlcsOtYSBhcGxpY2FybGUgdW4gY2FzdGluZyBpbmRpY2FuZG8uXG4gICAgICAgIC8vIEFycmF5LmZyb20obm9kbykgQSBlc3RlIG5vZG8gZGUgbGlzdGEgcXVlcmVtb3MgcXVlIGxlIGhlcmVkZSB0b2RhcyBsYXMgY2FyYWN0ZXLDrXN0aWNhcyBxdWUgdGllbmUgdW4gYXJyZWdsbyB5IGFzaSBwb2RlbW9zIHVzYXIgdG9kb3MgZXN0b3MgbcOpdG9kb3MgZnVuY2lvbmFsZXM6IGZpbHRlciwgZm9yRWFjaCwgbWFwLCByZWR1Y2UsIGZpbmRJbmRleCBldGMuLi5cbiAgICAgICAgQXJyYXkuZnJvbShsaXN0VGFza3MpLmZvckVhY2gobGkgPT4ge1xuICAgICAgICAgICAgbGkucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHRhc2sgID0gdGFza3MuZmlsdGVyKHRhc2sgPT4gdGFzay5pZC50b1N0cmluZygpID09PSBlLnRhcmdldC5pZCkgLy8gRWwgY2hlY2tib3ggZXMgZWwgw7puaWNvIGVsZW1lbnRvIHF1ZSB0aWVuZSBpZCwgZWwgbGFiZWwgeSBlbmxhY2UgdGllbmVuIGF0cmlidXRvIGRhdGEtaWRcbiAgICAgICAgICAgICAgICBjKHRhc2spXG5cbiAgICAgICAgICAgICAgICBpZiAoIGUudGFyZ2V0LmNoZWNrZWQgKSB7XG4gICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnY29tcGxldGUnKVxuICAgICAgICAgICAgICAgICAgICB0YXNrWzBdLmlzQ29tcGxldGUgPSB0cnVlXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGV0ZScpXG4gICAgICAgICAgICAgICAgICAgIHRhc2tbMF0uaXNDb21wbGV0ZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gQWN0dWFsaXphbW9zIHN0b3JhZ2VcbiAgICAgICAgICAgICAgICBscy5zZXRJdGVtKHRoaXMua2V5LCBqLnN0cmluZ2lmeSh0YXNrcykpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgICAgIHRhc2suYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmFkZFRhc2spXG5cbiAgICAgICAgLy8gRGVsZWdhbmRvIGEgbcOpdG9kbyBlZGl0VGFzayBlbCBjbGljayBkZSBsYSBsaXN0YVxuICAgICAgICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5lZGl0VGFzaylcblxuICAgICAgICAvLyBFdmVudG8gcmVtb3ZlXG4gICAgICAgIGxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnJlbW92ZVRhc2spXG4gICAgfSBcblxufSIsImNvbnN0IEVOVEVSX0tFWSA9IDEzLCAvLyBFbCBrZXkgY29kZSBkZWwgZW50ZXIgZXMgMTMuIExvIGd1YXJkYW1vcyBlbiBsYSBjb25zdGFudGUgcHJlZmVyaWJsZW1lbnRlLiBNw6FzIHNlbcOhbnRpY28gc2UgdnVlbHZlIGVsIGPDs2RpZ29cbiAgICBjID0gY29uc29sZS5sb2csXG4gICAgZCA9IGRvY3VtZW50LFxuICAgIGogPSBKU09OLFxuICAgIGxzID0gbG9jYWxTdG9yYWdlIC8vIFZhbW9zIGEgaGFjZXIgdXNvIGRlbCBBUEkgc3RvcmFnZSBwYXJhIGd1YXJkYXIgbGFzIHRhcmVhcyBwZW5kaWVudGVzIGRlbCB1c3VhcmlvIGVuIHN1IG5hdmVnYWRvci5cblxuZXhwb3J0IHtcbiAgICBFTlRFUl9LRVksXG4gICAgYyxcbiAgICBkLFxuICAgIGosXG4gICAgbHNcbn0iLCJpbXBvcnQgeyBkIH0gZnJvbSAnLi9oZWxwZXJzJ1xuaW1wb3J0IFRvRG9MaXN0IGZyb20gJy4vVG9Eb0xpc3QnXG5cbmNvbnN0IHRhc2sgPSBkLnF1ZXJ5U2VsZWN0b3IoJyN0YXNrJyksXG4gICAgbGlzdCA9IGQucXVlcnlTZWxlY3RvcignI2xpc3QnKSxcbiAgICB0b2RvID0gbmV3IFRvRG9MaXN0KCdteWxpc3QnKVxuXG4gICAgdG9kby5yZW5kZXIoKSJdfQ==
