# A Static Site Generator
Static site generator for prototyping, using [Handlebars](http://handlebarsjs.com/) templates & Bootstrap

## Setup Instructions

* `npm install` to get setup
* `gulp` to compile scss, js, & mustache templates
* `gulp serve` to watch & compile scss, js, & mustache templates, and run browserSync

## Directory Structure

Working files are in the `src` directory and are compiled into the `build` directory.
Any sass files placed in the components or elements directories will be imported automatically.

## Handlebars templates

Handlebars templates in the `templates/views` folder will be compiled with Gulp into separate html files in the `build` folder.

Handlebars templates in the `templates/components` folder can be included into other templates.

`{{#extend "parent-template-name"}}`
Extend pulls in a parent template.

`{{#block "block-name"}}`
Block allows you to define sections that the child templates can insert content into.

`{{#content "block-name"}}`
Content is injected into blocks with a matching name.

`{{ > component-name}}`
A component whose file basename

## Working with JSON

Data from JSON files can be added into the handlebars templates. This is setup within the `gulpfile.js` inside `handlebarsConfig`.
