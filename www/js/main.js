class ToDoList {
    constructor(parent) {
        //Inicio estado
        this.state = {
            todos: []
        };

        this.addForm = parent.querySelector('form.add');
        this.cleanButton = parent.querySelector('button.clean');
        this.destroyButton = parent.querySelector('button.destroy');
        this.todoList = parent.querySelector('ul.todolist');

        if (
            !this.addForm ||
            !this.cleanButton ||
            !this.destroyButton ||
            !this.todoList
        ) {
            throw new Error('Faltan elementos. Revisa el HTML');
        }

        this.start();
    }

    start() {
        //Añadir un todo
        this.addForm.addEventListener('submit', e => {
            e.preventDefault();
            const todoInput = this.addForm.elements.todotext;
            const todoText = todoInput.value;

            if (todoText.length > 0 && todoText.length < 200) {
                this.addToDo(todoText);
                this.addForm.reset();
                this.render();
            }
        });

        //Borrar todo
        this.destroyButton.addEventListener('click', e => {
            if (prompt('Escribe BORRAR para borrar la lista de todos') === 'BORRAR') {
                this.deleteTodoList();
                this.render();
            }
        });

        //Limpiar todos
        this.cleanButton.addEventListener('click', e => {
            if (prompt('Escribe LIMPIAR para limpiar la lista de todos') === 'LIMPIAR') {
                this.cleanTodoList();
                this.render();
            }
        })
    }

    //Añadir un todo
    addToDo(text) {
        const newTodo = {
            text: text,
            done: false
        };

        this.state.todos.unshift(newTodo);


        this.sync();
    }

    //Marcar un todo como hecho / pendiente
    toggleTodoStatus(tarea) {
        tarea.done = !tarea.done;

        this.sync();
        this.render();
    }

    //Limpiar lista de todos
    cleanTodoList() {
        const cleanList = this.state.todos.filter(function (todo) {
            return !todo.done;
        });

        this.state.todos = cleanList;

        this.sync();
    }

    //Borrar todos los todos
    deleteTodoList() {
        this.state.todos = [];

        this.sync();
    }

    sync() {
        console.log(this.state.todos);
    }

    render() {
        this.todoList.innerHTML = '';
        for (const tarea of this.state.todos) {
            const li = document.createElement('li');
            const input = document.createElement('input');
            input.setAttribute('type', 'checkbox');
            if (tarea.done === true) {
                li.classList.add('done');
                input.setAttribute('checked', 'true');
            }
            input.addEventListener('click', e => {
                this.toggleTodoStatus(tarea);
            });
            const p = document.createElement('p');
            p.innerHTML = tarea.text;
            this.todoList.appendChild(li);
            li.appendChild(input);
            li.appendChild(p);
        }
    }
}

const main = document.querySelector('main');
const todos = new ToDoList(main);