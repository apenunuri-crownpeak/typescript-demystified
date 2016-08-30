/// <reference path="itodo.ts" />

namespace demys {
    export class Model {
        private todos: ITodo[];

        constructor() {
            this.todos = [];
        }

        public create(title: string, callback: (todos: ITodo[]) => void) {
            const newTodo: ITodo = {
                id: this.getNextId(),
                title: title,
                completed: false,
            };

            this.todos.push(newTodo);

            if (callback)
                callback(this.todos);
        }

        public save(id: number, done: boolean, callback: () => void) {
            if (!id) {
                return;
            }

            let todo = this.getTodo(id);

            if (todo) {
                todo.completed = done;

                if (callback) {
                    callback();
                }
            }
        }

        private getNextId(): number {
            return new Date().getTime();
        }

        private getTodo(id: number): ITodo {
            for (let i = 0; i < this.todos.length; i++) {
                let todo = this.todos[i];
                
                if (todo.id == id) {
                    return todo;
                }
            }

            return undefined;
        }
    }
}