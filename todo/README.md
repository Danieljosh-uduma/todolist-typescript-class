# Todo List Application

This application is a simple Todo List manager written in TypeScript. It allows users to create, view, complete, and remove tasks. Each user has their own Todo list stored in a JSON file.

## Features

- **Add Todo**: Add a new task to the Todo list.
- **View Todo List**: View all tasks in the Todo list.
- **Complete Todo**: Mark a task as completed.
- **Remove Todo**: Remove a task from the Todo list.
- **Due Today Reminder**: Get a reminder for tasks that are due today.
- **Filter Completed Todos**: Filter and view all completed tasks.
- **Clear Completed Todos**: Remove all completed tasks from the Todo list.

## Classes and Methods

### `TodoList` Class

#### Properties

- `username: string`: The username associated with the Todo list.
- `_todoList: Todo[]`: The list of Todo items.
- `_nextId: number`: The ID to be assigned to the next Todo item.

#### Methods

- **Constructor**
    - `constructor(username: string)`: Initializes a new Todo list for the given username.

- **Private Methods**
    - `_writeTodo()`: Writes the current Todo list to a JSON file.
    - `_readTodo()`: Reads the Todo list from a JSON file.

- **Public Methods**
    - `viewTodoList()`: Displays all tasks in the Todo list.
    - `addTodo(task: string, dueDate?: Date)`: Adds a new task to the Todo list.
    - `dueTodayReminder()`: Displays tasks that are due today.
    - `completeTodo(id: number)`: Marks a task as completed.
    - `removeTodo(id: number)`: Removes a task from the Todo list.
    - `filterCompletedTodos<T extends Todo>(): T[]`: Returns a list of completed tasks.
    - `clearCompletedTodos()`: Removes all completed tasks from the Todo list.

## Example Usage

```typescript
const firstList = new TodoList('josh');
const date = new Date();

firstList.addTodo('cooking rice');
firstList.addTodo('reading for test', date);

firstList.viewTodoList();

firstList.removeTodo(2);
firstList.viewTodoList();

firstList.dueTodayReminder();
firstList.completeTodo(1);
console.log(firstList.filterCompletedTodos());
firstList.viewTodoList();

firstList.clearCompletedTodos();
firstList.viewTodoList();

firstList.addTodo('eat fish');
firstList.addTodo('break bread', date);
firstList.addTodo('go to exam hall', date);
firstList.addTodo('break wind', date);

firstList.viewTodoList();
firstList.completeTodo(3);
firstList.completeTodo(5);
firstList.completeTodo(6);

firstList.viewTodoList();
console.log(firstList.filterCompletedTodos());
firstList.clearCompletedTodos();
firstList.viewTodoList();
firstList.dueTodayReminder();
```

## File Structure

- `todo.ts`: Contains the main logic for the Todo list application.
- `README.md`: Documentation for the Todo list application.

## Dependencies

- `fs`: File system module for reading and writing JSON files.

## Running the Application

To run the application, compile the TypeScript file and execute the resulting JavaScript file using Node.js.

```bash
tsc todo.ts
node todo.js
```

This will execute the example usage code provided in the `todo.ts` file.
