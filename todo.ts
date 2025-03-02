import { writeFileSync, readFileSync } from "fs"

interface Todo {
    id: number
    task: string
    completed: boolean
    dueDate?: Date
}

const log = (...value: any[]): void => console.log(...value)

class TodoList {
    username:string
    _todoList: Todo[]
    _nextId: number

    constructor(username: string) {
        this.username = username
        this._todoList = [] 
        this._nextId = 1
    }

    _writeTodo():void {
        writeFileSync(`todo/${this.username}.json`, JSON.stringify(this._todoList))
    }

    _readTodo(): Todo[] {
        try {
            const todo: Todo[] = JSON.parse(readFileSync(`todo/${this.username}.json`, 'utf-8'))
            return todo
        } catch (err) {
            return []
        }
    }

    viewTodoList():void {
        const todo = this._readTodo()
        if (todo.length > 0) {
            todo.forEach(todo => {
                log(`
    ID: ${todo.id} 
    Task: ${todo.task} 
    Completed: ${todo.completed ? 'completed' : 'pending'} 
    Due Date: ${todo.dueDate ? todo.dueDate : 'No due date'}
            `)
            })
        } else {
             log('Todo list empty...')
        }
    }
    
    addTodo(task:string , dueDate?: Date): void{
        if (dueDate && dueDate < new Date()) {
            if (task.trim() !== '') {
                const newTodo: Todo = {
                    id: this._nextId++,
                    task: task,
                    completed: false,
                    dueDate: dueDate
                }
                this._todoList.push(newTodo)
                this._writeTodo()
            } else {
                log('Task cannot be empty')
            }
        } 
        else {
            if (task.trim() !== '') {
                const newTodo: Todo = {
                    id: this._nextId++,
                    task: task,
                    completed: false
                }
                this._todoList.push(newTodo)
                this._writeTodo()
            } else {
                log('Task cannot be empty')
            }
        }
    }

    dueTodayReminder(): void {
        let todo = this._readTodo()
        const today = new Date()
        todo = this._todoList.filter(todo => todo.dueDate == today)
        if (todo.length > 0) {
            todo.forEach(todo => log(`Task: ${todo.task} is due today`))
        } else {
            log('No task is due today')
        }
    }

    completeTodo(id: number): void {
        const todo = this._todoList.find(todo => todo.id === id)
        if (todo) {
            this._todoList.forEach(task => {
                if (todo === task) {
                    task.completed = true
                }
            })
            this._writeTodo()
            log(`${todo.task.toUpperCase()} task has been completed successfully`)
        } else {
            log('Task not found')
        }
    }

    removeTodo(id: number): void {
        const todo = this._todoList.find(todo => todo.id === id)
        if (todo) {
            this._todoList = this._todoList.filter(todo => todo.id !== id)
            this._writeTodo()
            log(`${todo.task.toUpperCase()} task as been removed successfully`)
        } else {
            log('Task not found')
        }
       
    }

    filterCompletedTodos<T extends Todo>():T[] {
        return this._todoList.filter(todo => todo.completed) as T[]
    }

    clearCompletedTodos(): void {
        this._todoList = this._todoList.filter(todo => !todo.completed)
        this._writeTodo()
        log('Completed tasks removed successfully')
    }

}


// first case
const firstList = new TodoList('josh')
const date = new Date()

firstList.addTodo('cooking rice')
firstList.addTodo('reading for test', date)


firstList.viewTodoList()


firstList.removeTodo(2)
firstList.viewTodoList()


firstList.dueTodayReminder()
firstList.completeTodo(1)
log(firstList.filterCompletedTodos())
firstList.viewTodoList()


firstList.clearCompletedTodos()
firstList.viewTodoList()


firstList.addTodo('eat fish')
firstList.addTodo('break bread', date)
firstList.addTodo('go to exam hall', date)
firstList.addTodo('break wind', date)


firstList.viewTodoList()
firstList.completeTodo(3)
firstList.completeTodo(5)
firstList.completeTodo(6)


firstList.viewTodoList()
log(firstList.filterCompletedTodos())
firstList.clearCompletedTodos()
firstList.viewTodoList()
firstList.dueTodayReminder()


// second case
const secondList = new TodoList('Daniel')

secondList.addTodo('Code the todolist app')
secondList.addTodo('submit task on time')
secondList.addTodo('Prepare for blockchain')

secondList.viewTodoList()

secondList.completeTodo(1)
secondList.completeTodo(2)
log(secondList.filterCompletedTodos())

// secondList
