import { ENTER_KEY, c, d, j, ls } from './helpers'
import Task from './Task'

export default class ToDoList  {
    constructor (key) { // SOnstructor de la llave que vamos a trabajar en el storage
        // Asignamos a la prop. key de la clase el nombre de la lista
        this.key = key

        // localStorage tiene dos métodos: Uno para estableser valores  y otro para obtener valores
        if ( !ls.getItem(key) )
            ls.setItem( key, j.stringify([]) ) // Método de JSON "stringify" convierte un objeto en cadena de texto. Le pasaremos un arreglo donde guardaremos un arreglo
        this.addTask = this.addTask.bind(this)
        this.editTask = this.editTask.bind(this)
        this.removeTask = this.removeTask.bind(this)
    }

    // Métodos
    // Creamos método manejador de eventos que va a ser manipulado por el input que va a desencadenar éste método
    addTask (e) {
        if ( !e.target.value )
            alert('No puedes agregar una tarea vacía')
        
        if ( e.keyCode === ENTER_KEY ) {
            let newTask = new Task( e.target.value ), // Capturamos nueva tarea
                tasks = j.parse( ls.getItem( this.key ) ) // Primero obtenemos las tareas que estan en el local storage porque sino, reemplazaríamos las que esten guardada
                // Ahora que las obtenemos en formato objeto, añadimos la nueva tarea con método push
                tasks.push(newTask)
                // Y nuevamente, para guardar la nueva tarea ejecutamos el setItem de localStorage
                ls.setItem( this.key, j.stringify( tasks ) )
                // Despues de guardar en el local storage la tarea, vamos a crear un método render para guardar, renderizar la nueva tarea y asi no estar recargandolas en el navegador para ver esa nueva tarea. Aqui ya estamos aplicando el concepto de la programación reactiva
                this.renderTask( newTask )
                e.target.value = null // Limpiamos valor del input. Reiniciamos valor a null 

                //c(`Tareas: ${tasks}, Nuevas tareas: ${newTask}, LocalStorage: ${ls}`)
        }
    }

    editTask (e) {
        // c(e.target.localName) // La propiedad localName nos da el nombre de la etiqueta html que esta ejecutando el evento
        if ( e.target.localName === 'label' ) {
            let tasks = j.parse( ls.getItem(this.key) ), // Trae todas las tareas que estan en el arreglo de 'rmList 
            // Guardando la tarea que se va a editar. A diferencia de filter que almacena en un objeto, el método findIndex() va a encontrar el indice de la tarea que compla con la condición.
            // toEdit = tasks.filter( task => task.name === e.target.textContent ),
            toEdit = tasks.findIndex( task => task.name === e.target.textContent ), // toEdit va a ser igual al indice de la tarea seleccionada
        // Otro detalle es que la tarea se tiene que actualizar cuando se de manualmente un enter pero en el contenteditabel atribute del label al pulsar un enter te genera un salto de línea; Entonces tenemos que desactivar el comportamiento por default del enter y tambien se podría actualizar tarea cuando se pierda el focus, cuando vayamos de un elemento a otro.
        // Entonces asignamos a la etiqueta label dos manejadores de eventos. Uno en el blur y otro en el keyup y la etiqueta label va a ser el selector que cumpla la condición del data-id que sea igual al de esa tarea. task.name === e.target.textContent
        label = d.querySelector(`[data-id="${tasks[toEdit].id}"]`)

        c(tasks, toEdit, label)

        const saveTask = e => {
            e.target.textContent = e.target.textContent  // Contenido textual del elemento
            tasks[toEdit].name = e.target.textContent
            ls.setItem( this.key, j.stringify(tasks) )  // Cada cambio al localStorage tenemos que salvarlo y lo pasamos por transformación cadena de texto la tarea.
            e.target.blur() // Cuando termine de salvar quitamos del elemento el focus con el metodo blur
        }

        label.addEventListener( 'blur', e => saveTask(e) ) // Cuando pierda el foco pasa el método del evento
        label.addEventListener( 'keyup', e => ( e.keyCode === ENTER_KEY ) && saveTask(e) ) // Cuando sea igual al ENTER_KEY pasa el método del evento
        }

    }

    // Remove
    removeTask (e) {
        if ( e.target.localName === 'a' ) {
            let tasks = j.parse( ls.getItem( this.key )),
            toRemove = tasks.findIndex( task => task.id.toString() === e.target.dataset.id )
            // c(tasks, toRemove)
            tasks.splice(toRemove, 1)
            ls.setItem(this.key, j.stringify(tasks))
            e.target.parentElement.remove()
        }
    }



    // Rendirizando lista de tareas en el HTML
    renderTask(task) {
        let templateTask = `
            <li class="List-item ${ task.isComplete ? 'complete' : '' }">
                <input type="checkbox" id="${task.id}" class="List-checkbox ${ task.isComplete ? 'complete' : '' }" />
                <label data-id="${task.id}" class="List-label" contenteditable spellcheck>${task.name}</label>
                <a href="#" data-id="${task.id}" class="List-removeLink"> x </a>

            </li>
        `
        list.insertAdjacentHTML( 'beforeend', templateTask )
    }

    // Render se va a encargar de pintar lo necesario para generar nuesta app
    render () {
        // Creamos variable local y convertimos lo que traiga el localStorage en su propiedad this.key
        let tasks = j.parse( ls.getItem(this.key) )
        tasks.forEach( task => this.renderTask(task) )

        task.addEventListener('keyup', this.addTask)

        // Delegando a método editTask el click de la lista
        list.addEventListener('click', this.editTask)

        // Evento remove
        list.addEventListener('click', this.removeTask)
    } 

}