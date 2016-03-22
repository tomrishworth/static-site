# static-site
Static site generator for prototyping

Inculdes Bootstrap 4

`npm install` to get setup
`gulp` to compile scss and watch with livereload


# {{#extend "parent-template-name"}}
Extend pulls in a parent template.

# {{#block "block-name"}}
Block allows you to define sections that the child templates can insert content into.

# {{#content "block-name"}}
Content is injected into blocks with a matching name.

# {{ > component-name}}
A component whose file basename