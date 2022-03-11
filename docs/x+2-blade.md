---
title: "Blade"
description: "Descrition pending"
tags: ["Localization files", "Translation"]
image: "https://www.laravelpackage.com/assets/pages/laravelpackage.jpeg"
date: 2022-02-09
---

# Blade

The Blade template engine is the default engine for default Laravel installations. If your package interacts with views, you will probably use the Blade syntax in these. It's imperative to be [familiar with Blade](https://laravel.com/docs/9.x/blade) before continuing.

There are two ways to may extend the Blade template engine: directives and components.

- Directives are mostly used to alter a view content with minimal boilerplate. Notable examples are `@if`, `@can` and `@foreach`.

- Components are containerized views with slots the developer can use to add data to them, but is not mandatory. You can think of them as complete views that can be injected into any other view.

For example, a date formatter makes more sense to become a directive like `@date()` than a component. An HTML piece for an alert message makes more sense to be a component like `<x-alert color="green">This is good</x-alert>`.

To avoid loading the Blade Compiler when not needed, you can use `callAfterResolving()` helper in the Service Provider to only extend the service when called.

```php
$this->callAfterResolving('blade.compiler', function ($blade) {
    // ...
})
```

## Creating directives

Directives are tricky to create, but not difficult to understand. These receive a single string, called the "expression", which you can think as a string of inert code. The directive then must return a string with the inert code that should replace it.

In our example of formatting a date, we won't be able to use the variable as it were PHP, but rather the string of it, `"$date"`. This example will fail:

```php
// Don't do this
$blade->directive('date', function ($expression) {
    return \Date::parse($expression)->toDateTimeString();
})
```

Instead, return a string of code that will be compiled and executed.

```php
$blade->directive('date', function ($expression) {
    return "<?php echo \Date::parse($expression)->toDateTimeString(); ?>"
})
```

### Condition directives

Condition directives are basically `if` blocks. For example, we can add a condition to check if a date is today. Contrary to directives, these receive and return live code.

```php
$blade->if('today', function ($date) {
    return \Date::parse($date)->isToday();
});
```

It's recommended to register positive directives whenever possible, as the `@unless` directive will be created automatically to negate the condition.

```blade
@today($date) Is today! @endtoday

@unlesstoday($date) Is not today! @endunlesstoday
```

## Creating components

Components are convenitent way to simplify HTML into a few lines that can be centralized. For example, to create simple HTML alerts or notifications that spawn lengthy code but only need a simple message to display.

```html
<div class="alert">{{ $message }}</div>
```

The recommended way to create components is using class-based components first, as you can have tighter control over how and when to render them.

```php
<?php

namespace Vendor\Package\View\Components;

use Illuminate\View\Component;
use Illuminate\Collection\Collection;

class Alert extends Component
{
    public function __construct(public string $message)
    {
        //
    }

    public function shouldRender()
    {
        return filled($message);
    }

    public function render()
    {
        return view('package::alert');
    }
}
```

### Component data

Components are resolved using the Service Container, and the dependencies will be overriden by the arguments these receive in the view where they're called.

When rendering a component, the Blade engine receives the attributes added at the view into the constructor, like HTML tags, but won't add it to the view unless you explicitely pass them `$this->attributes`, which is an useful way to pass the attributes to the view.

```php
public function render()
{
    return view('my-component')->with([
        'attributes' => $this->attributes
    ]);
}
```

## Registering views

To use any view from your package, load them into the Laravel using `loadViewsFrom()` with the path where the views are located, and the namespace like the package name.

```php
$this->loadViewsFrom(__DIR__ . '/../views', 'package');
```

This will enable the user to use your package views using the namespace.

```blade
@include('package::alert', $alertData);
```

> Registering views are also needed for components that return views.

## Registering components

Once your component is ready, you need to register them in your Service Provider. For that, you will also need the namespace (prefix) these will be in.

For example, the Alert component can be registered prefixing the name of the package to avoid collisions.

```php
$this->loadViewComponentsAs('package', [
    View\Components\Alert::class
]);
```

This will make the component available as `<x-package-alert />`.

You can also use an alias for the component, that will be used instead of the class name.

```php
$this->loadViewComponentsAs('package', [
    'notification' => View\Components\Alert::class
]);
```

The above makes it available as `<x-package-notification />`.

### Registering anonymous components

There is no direct way to register an anonymous components, as is recommended to use class-based components. In the case a class feels redundant, you may need to put your anonymous components inside the `components` subdirectory.

```
views/
    - components
         - alert.blade.php
         - button.blade.php
```

Then, register both the views location, and the components. Ensure that both views and component namespace are equal.

```php
$this->loadViewsFrom(__DIR__.'/../views', 'package')

$this->callAfterResolving('blade.compiler', function ($blade) {
    $blade->componentNamespace('package', 'alerts')
})
```

The above makes all your anonymous components available as `package`, without needing to use classes to render them, like `<x-package-button />`.

## Testing

Testing blade directive and components can be made easily in isolation using `blade()`, which is helppful to check as the user will write them in their views.

```php
public function test_directive_today(): void
{
    $rendered = $this->blade('@today("yesterday") is-today @endtoday');

    $rendered->assertDontSee('is-today');
}

public function test_alert_receives_message(): void
{
    $rendered = $this->blade('<x-package-alert>Hello world</x-package-alert>');

    $rendered->assertSee('Hello world');
}
```

Meanwhile, the `component()` method will accept a component class which will be tested with data.

```php
public function test_component(): void
{
    $rendered = $this->component(MyComponent::class, ['slot' => 'message']);

    $rendered->assertSee('Hello world');
}
```