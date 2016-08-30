/// <reference path="../typings/index.d.ts" />
/// <reference path="itodo.ts" />

namespace demys {
    export class View {
        private $newTodo: JQuery;
        private $todoList: JQuery;
        private onTodoChanged: Function;

        constructor() {
            this.$newTodo = $("#new-todo");
            this.$todoList = $("#todo-list");
        }

        public clearNewTodo(): void {
            this.$newTodo.val("");
        }

        public setTodoState(todoId: number, done: boolean) {
            let todo = $("input[id='" + todoId + "']", this.$todoList).parent("li");

            done ? todo.addClass("list-group-item-success") : todo.removeClass("list-group-item-success");
        }

        public render(todos: ITodo[]): void {
            this.$todoList.empty();
            this.$todoList.append(this.compileListTemplate(todos));
            this.bindDone();
        }

        public bind(event: TodoViewEvent, handler: Function) {
            switch (event) {
                case TodoViewEvent.newTodo:
                    this.$newTodo.get(0).addEventListener("change", () => {
                        handler(this.$newTodo.val());
                    });
                    break;
                case TodoViewEvent.todoDoneChanged:
                    this.onTodoChanged = handler;
                    break;
            }
        }

        private compileListTemplate(todos: ITodo[]): string {
            let compiled = "";

            for (let i = 0; i < todos.length; i++) {
                let todo     = todos[i];
                let template = $("#todo-item-template").text();

                template = template.replace("{{id}}", todo.id.toString());
                template = template.replace("{{title}}", todo.title);
                template = template.replace("{{checked}}", todo.completed ? "checked" : "");

                compiled += template;    
            }

            return compiled;
        }

        private bindDone(): void {
          this.$todoList.find("li input[type='checkbox']").each((i, e) => {
              e.addEventListener("change", (event: Event) => {
                  this.todoChanged($(event.target));
              });
          }); 
        }

        private todoChanged(todo: JQuery): void {
            this.onTodoChanged(parseInt(todo.attr("id")), todo.is(":checked"));
        }
    }

    export enum TodoViewEvent {
        newTodo,
        todoDoneChanged,
    }
}