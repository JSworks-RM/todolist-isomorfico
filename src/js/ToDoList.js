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

    // Rendirizando lista de tareas en el HTML
    renderTask(task) {
        let templateTask = `
            <li class="List-item ${ task.isComplete ? 'complete' : '' }">
                <input type="checkbox" id="${task.id}" class="List-checkbox ${ task.isComplete ? 'complete' : '' }" />
                <label data-id="${task.id}" class="List-label" contenteditable spellcheck>${task.name}</label>
                <a href="#" data-id="${task.id}" class="List-removeLink">x</a>

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
    } 

}