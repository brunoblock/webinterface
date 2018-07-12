# Modular Oyster Storage Interface

## Running the Server

Install dependencies through npm:
`npm install`

Build using gulp:
`npm run build:dev` or `npm run build:prod`

Run the node server:
`npm run start:dev` or `npm run start:prod`

## Structure

### Dependencies

The project has 7 web dependencies:

- react

- react-dom

- react-router

- styled-components

- tinycolor (this may be removed soon)

- filesaver

- oyster-streamable

These dependencies should be served via UMD so caching will reduce the load time of the user.

### Definitions

Components are styled react components meant to take the place of HTML elements. They do not contain any special functionality.

Widgets are also styled react components which contain specialized functionality. They have only one use but they are meant to be reusable across different pages (ie embeddable).

Scenes are normal react components that are the content of the page. They make use of components or widgets to give the user a page with a specific purpose. They are used only once.

### The document

The index.js file loads the document. The scenes are routed to inside the document described in index.js. Due to the lightweight nature of the scenes, the page transition is near instant so there is no animation.

## Why

The modularity of the interface will make the project easier to maintain. When developers look at the code, they will not need to know the whole project, just the process.

The CSS and JS are localized to a single file per component. This reduces the difficulty in finding and debugging problematic code. Errors are more specific because they come directly from components or widgets.

This will allow design between sites to be normalized over time. Components can be extended to remedy specific pain points that stem from having a shared component base. Therefore if Oyster goes through a design language change, all sites will be uploaded to match.

## Problems

Modules are difficult to load in web browsers. Ideally all browsers would support es6 modules (which are simple and performant). Sites using the components will either have to be bundled or use an AMD loader. For (the simplicity of) the storage interface bundling would make more sense. For a larger scale project (ie. a wrapper) where hundreds of components might be loaded depending on what is visited, a module loader would offer better load times for users.

The other problem is in the way that react handles errors. If react has a fatal error the react document is unloaded from the dom. This is not user friendly, so an error handling system should be put in place to notify users of action to take if they get an error.

## Build process

### Compiling

Babel is currently the compiler for the project. It is used to give full browser support even when using poorly supported features. It is also used to allow more declarative module loading (`import "@component/Section"` as opposed to `import "/Components/Section.js"`) by resolving special import paths.

### Distributing

Webpack is used to bundle the interface. The expected bundle size is 48kb right now and the expected total site size is around 600kb, mostly from iota and node-forge.

There is a node express server which URL routes the files to the appropriate locations for testing. This will not be needed for the production bundle. It can be hosted on ghpages if needed, or its own static server.

## Change log

### 0.1

- built components based on style of current interface

### 0.2

- started theme system

- created the document structure

- started scenes

- started widgets

### 0.3

- extended styled-components preprocess support (colors)

- added/improved components (text input, buttons, loading)

- finished download scene

- started download widget

### 0.4

- added components (file picker, select)

- started upload scene

- started upload widget

### 0.5

- improved theme system (theme object, extend support)

- finished upload scene

- started landing scene

- implemented react router### 0.6- started implementing oyster-streamable

- finished download widget

- finished landing scene

- started upload widget### 0.7- drag and drop### 0.8- finished upload widget

- finished completed upload scene## Next steps- improve completed upload scene (styles, copy to clipboard)

- improve download widget (executable file warning, file previews, paste from clipboard)

- improve upload widget (exif data warning, file preview)

- finish build/distribution process (webpack)

### 0.6

- started implementing oyster-streamable

- finished download widget

- finished landing scene

- started upload widget### 0.7- drag and drop

### 0.7

- drag and drop

### 0.8

- finished upload widget

- finished completed upload scene

### 0.9

- finish build/distribution process (webpack)

## Next steps

- improve completed upload scene (styles, copy to clipboard)

- improve download widget (executable file warning, file previews, paste from clipboard)

- improve upload widget (exif data warning, file preview)
