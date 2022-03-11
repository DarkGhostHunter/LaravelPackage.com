---
title: "Blade"
description: "Description pending"
tags: ["Localization files", "Translation"]
image: "https://www.laravelpackage.com/assets/pages/laravelpackage.jpeg"
date: 2022-02-09
---

# Blade

There are three ways to extend the Blade template engine: directives and components.

Directives are mostly used to alter a view content with minimal boilerplate. Notable examples are `@if`, `@can` and `@foreach`.

Components are containerized views with slots the develoepr can use to add data to them, but is not mandatory. You can think of them as complete views that can be injected into any other view.

For example, a date formatter makes more sense to become a directive like `@date()` than a component. An HTML piece for an alert message makes more sense to be a component like `<x-alert color="green">This is good</x-alert>`.

## Creating directives

Directives are tricky to create. These receive a single string, called the "expression". The directive then returns a string that would replace it.

In our example of formatting a date, we won't be able to use the variable as it were PHP, but rather the string of it, `"$date"`. 

Finally, you can register a directive by deferring it once the Blade engine is called:

```php
$this->app->resolving('blade.compiler', function ($blade) {
    $blade->if('skyblue', function ($expression) {
        return "<?php echo \Date::parse($expression)->toDateTimeString(); ?>"
    })
})
```

### Condition directives

## Creating components

Components are 

### Component data

Components are resolved using the Service Container, and the dependencies will be overriden by the arguments these receive in the view where they're called.

When rendering a component, the Blade engine will also inject the properties added at the view into the constructor as tags.

## Testing

### Testing directives

### Testing components

To test a component in isolation, the `render` and `renderComponent` methods are helpful tools to check their behaviour.

```php
public function test_alert_receives_message(): void
{
    $component = $this->blade('<x-alert>Hello world</x-alert>');

    $component->assertSee('Hello world');
}
```