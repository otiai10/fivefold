/// <reference path="../monapt/monapt.d.ts" />
/// <reference path="../jquery/jquery.d.ts" />

declare module fivefold {
    var silent: boolean;
    class Realizer<T> {
        public prefix: string;
        public suffix: string;
        public realizeTry(pathOrName: string): monapt.Try<T>;
        private realize(pathOrName);
        public parsePathOrName(pathOrName: string): string[];
        public getClass(pathComponents: string[]): new() => Controller;
    }
    class View {
        private cid;
        public $el: JQuery;
        public tagName: string;
        public id: string;
        public className: string;
        public attributes: Object;
        public events: Object;
        public autoRender: boolean;
        static create(): any;
        public delegateEvents(events?: Object): View;
        public delegate(event: string, fn: Function);
        public delegate(event: string, selector: string, fn: Function);
        public undelegateAll(): void;
        public render(): View;
    }
    class Layout extends View {
        public $el: JQuery;
        public $content: JQuery;
        static create(): Layout;
        public beforeDisplayContent(): void;
        public display(elem: JQuery): void;
    }
    class Controller {
        public layout: Layout;
        public dispatch(method: string, optionsOrError: any): monapt.Future<View>;
    }
    class ControllerRealizer extends Realizer<Controller> {
        public suffix: string;
    }
    class ActionFuture<V extends fivefold.View> extends monapt.Future<V> {
    }
    var actionFuture: (f: (promise: monapt.IFuturePromiseLike<View>) => void) => ActionFuture<V>;
    class ActionError implements Error {
        public name: string;
        public message: string;
        constructor(name: string, message: string);
    }
    class Route {
        public pattern: string;
        public controller: string;
        public method: string;
        constructor(pattern: string, controller: string, method: string);
    }
    interface IRouteRegister {
        (pattern: string, controllerAndMethod: string);
        (pattern: string, redirect: {
            redirectTo: string;
        });
    }
    interface IErrorRouteRegister {
        (code: RouteError, controllerAndMethod: string);
        (errorMessage: string, controllerAndMethod: string);
    }
    enum RouteError {
        NotFound,
        DispatchFailure,
    }
    interface IRouteParser {
        (relativeURL: string): monapt.Option<monapt.Tuple2<string, Object>>;
    }
    interface IRouteMatcher {
        (matched: string, pattern: string): boolean;
    }
    interface IRouteAndOptions {
        route: Route;
        options: Object;
    }
    interface RouteResolver {
        resolve(relativeURL: string, routes: monapt.Map<string, Route>): monapt.Future<IRouteAndOptions>;
    }
    class Router {
        private resolver;
        private dispatcher;
        constructor(resolver: RouteResolver);
        private start();
        private onHashChange();
        public reload(): void;
        public routes(routes: (match: IRouteRegister) => void): void;
        public errorRoutes(routes: (match: IErrorRouteRegister) => void): void;
    }
}
