Yet another JavaScript MVC
============================

# fivefold.View

Like `Backbone.View`.

```typescript
class IssueView extends fivefold.View {
    constructor(private issue: GithubIssue) {
        super({
            tagName: 'article',
            className: 'gh-issue list',
            attributes: {
                'data-open': 'true',
            },
            id: issue.number
        });
    }
    
    render() {
        $el.html(template.render(issue));
        return this;
    }
}
```

# fivefold.Router and Routes

```typescript
class IssueRoutes {
    list(): fivefold.ActionFuture {
        retrun fivefold.actionFuture(() => new IssueView());
    }
}
```
