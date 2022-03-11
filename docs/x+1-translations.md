---
title: "Localization files"
description: "Some packages may offer localization for messages. This sections explains where to create multiple translation files and how to publish them within a Laravel project."
tags: ["Localization files", "Translation"]
image: "https://www.laravelpackage.com/assets/pages/laravelpackage.jpeg"
date: 2022-02-09
---

# Localization files

Translation files are excellent additions to your package when the end-user must read messages, allowing a Laravel application to offer these in the language the end-user speaks.

## Creating localization files

Localization files are located in `lang` directory, at the root of the project folder. Packages follow the same conventions explained [in the documentation](https://laravel.com/docs/9.x/localization#introduction), which is to put each file under a given directory with the target language to support.

```json
- lang
    - en
        - messages.php
        - validation.php
    - es
        - messages.php
        - validation.php
```

Prior versions of Laravel would locate the localization directory under the `resources` folder. To support past and future changes, you should use `langPath()` to publish the translation files.

## Loading translations

Once your files are ready, the next step is to register them. This can be done easily using `loadTranslationFrom()` in the `register()` method of your Service Provider, with the namespace to register them.

```php
public function register()
{
    $this->loadTranslationFrom(__DIR__ . '/../lang', 'my-package')
}
```

The above will make the translations lines available as `my-package::messages.hello`.

## Publishing translations

Call `publishes()` in the `boot()` method of your Service Provider to make the localization available to the developer to edit.

```php
public function boot()
{
    if ($this->app->runningInConsole()) {
        $this->publishes(
            [__DIR__ . '/../lang' => $this->app->langPath('vendor/my-package')], 'lang'
        );
    }
}
```

It's common convention to tag the translation files as `lang`, allowing the developer to publish multiple translation files from multiple packages in one command.

```shell
php artisan vendor:publish --provider="Vendor\Package\PackageServiceProvider" --tag="lang"
```