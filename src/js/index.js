import { d } from './helpers'
import ToDoList from './ToDoList'

const task = d.querySelector('#task'),
    list = d.querySelector('#list'),
    todo = new ToDoList('rmList')

    todo.render()