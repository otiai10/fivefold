var uniqId = 0;
function viewUniqId(): string {
    return 'view' + uniqId++;
}

function ensureElement(view: View) {
    if (view.$el) {
        return ;
    }
    var attributes = {};
    for (var key in view.attributes) {
        attributes[key] = view.attributes[key];
    }

    if (view.id) {
        attributes['id'] = view.id;
    }

    if (view.className) {
        attributes['class'] = view.className;
    }
        
    view.$el =  $('<' + view.tagName + '>').attr(attributes);
}

var eventSplitter = /^(\S+)\s*(.*)$/;

export class View {

    private cid = viewUniqId();
    $el: JQuery = null;
    tagName: string = 'div';
    id: string = '';
    className: string = '';
    attributes: Object = {};
    events: Object;

    static create(): any {
        var view = new this();
        ensureElement(view);
        view.delegateEvents();
        return view;
    }

    delegateEvents(): View {
        this.undelegateAll();
        var events = new monapt.Map<string, any>(this.events);
        events.mapValues(fn => {
            if (isFunction(fn)) {
                return fn;
            }
            else {
                return this[fn];
            }
        }).filter((key, fn) => isFunction(fn)).map((event, fn) => {
            var match = event.match(eventSplitter);
            return monapt.Tuple2(match[1], monapt.Tuple2(match[2], proxy(fn, this)));    
        }).foreach((e, t) => this.delegate(e, t._1, t._2));
        return this;
    }

    delegate(event: string, fn: Function);
    delegate(event: string, selector:string, fn: Function);
    delegate(event: string, fnOrSelector: any, fn?: any) {
        var evt = event + '.ff' + this.cid;
        this.$el.on.call(this.$el, evt, fnOrSelector, fn);
    }

    undelegateAll() {
        this.$el.off('.ff' + this.cid);
    }

    render(): View {
        return this;
    }
}