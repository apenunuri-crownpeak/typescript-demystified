/// <reference path="model.ts" />
/// <reference path="view.ts" />
/// <reference path="controller.ts" />


namespace demys {
    export class TypescriptTodo {
        private model = new Model();
        private view = new View();
        private controller = new Controller(this.model, this.view);
    }

    const app = new TypescriptTodo();
}