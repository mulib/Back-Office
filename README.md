# Back Office Application

## 1. General

this document describe the development principals for react-redux web application, including TDD, localization, UI, API calls, configuration and third party libraries

## 2. Infrastructure

this section describe the main infra libraries used in the project

### 2.2. devDependencies

devDependencies are the libraries that require for build time (resolving modules, code linting, testing, bundling etc.)
devDependencies will not be part of production bundle

#### 2.2.1. webpack

webpack is a static module bundler for modern JavaScript applications. 

webpack generates one or more bundles from application assets (Typescript files, Sass files, images, fonts etc.)

**Loaders**:

Out of the box, webpack only understands JavaScript and JSON files. Loaders allow webpack to process other types of files and convert them into valid modules that can be consumed by your application and added to the dependency graph

**Plugins**:

While loaders are used to transform certain types of modules, plugins can be leveraged to perform a wider range of tasks like bundle optimization, asset management and injection of environment variables.

In order to use a plugin, you need to require() it and add it to the plugins array.

Most plugins are customizable through options.

package | version | description
---------|----------|---------
[webpack](https://github.com/webpack/webpack) | ^4.26.0 | webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser.
[webpack-cli](https://www.npmjs.com/package/webpack-cli) | ^3.1.2 | webpack CLI is a CLI tool for providing a flexible set of commands for developers to increase speed when setting up a custom webpack project
[webpack-dev-server](https://github.com/webpack/webpack-dev-server) | ^3.1.10 | Use webpack with a development server that provides live reloading. This should be used for development only.

It uses webpack-dev-middleware under the hood, which provides fast in-memory access to the webpack assets.

**Entry and Output**:
TODO: change the entry value once adding React

below configuration shows the entry and output of webpack build. it means that `index.ts` will wrap the entire application. once webpack done with his magic, the output bundle will be saved under `dist/main.bundle.js`.
the bundle can be served by node-express server hosted on AWS
TODO: figure out what AWS service is better to host web applications (lambda+API GW or S3 or other)

```javascript
    entry: {app: "./src/index.ts"},
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist'),
    },

```

**build modes**:
bellow configuration define the available build modes

```javascript
// webpack.config.js
    devServer: {
        contentBase: './dist' // This tells webpack-dev-server to serve the files from the dist directory
    },

```

```json
// package.json
"scripts": {
        "test": "test",
        "start": "webpack-dev-server --open",
        "prod": "webpack --config webpack.config.js --mode production"
    },
```

for development we using webpack-dev-server to enable live reloading (watch file change and rebuild)
the webpack-dev-server will lunch the browser on port :8080 and serve the `dist/index.html`

**to run dev mode from terminal run** `npm start`
**to run prod mode from terminal (or CI/CB ) run** `npm run prod`
TODO: add configuration and console command for tests

##### 2.2.1.1 Sass

package | version | description
---------|----------|---------
 [node-sass](https://github.com/sass/node-sass) | ^4.10.0 | Node-sass is a library that provides binding for Node.js to LibSass, the C version of the stylesheet preprocessor, Sass. allows you to compile .scss files to css
 [sass-loader](https://github.com/webpack-contrib/sass-loader)| ^7.1.0 | compiles Sass to CSS, using Node Sass by default
 [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)| ^0.4.4 | This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps. (used in prod only to save build time in dev mode)
Sass (`.scss` extension) language enable to write more scalable CSS using concepts like mixings, variables, inheritance etc.

webpack compile .scss files using Node-Sass and sass-loader plugin.

- webpack enables to import css file and use it as a module within your typescript code (using `css-loader`)
- style-loader will create`<style>` section within the source HTML and throw the compiled css there

```javascript
// webpack.config.js
module.exports = {
    module: {
        rules: [{
                test: /\.ts$/,
                loader: "ts-loader"
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            }
        ]
    }
};

```

##### 2.2.1.1 Images

##### 2.2.1.1 Fonts

#### typescript

package | version | description
---------|----------|---------
 [typescript](https://github.com/Microsoft/TypeScript) | ^3.1.6 | TypeScript is a strict syntactical superset of JavaScript, and adds optional static typing to the language.
 [ts-loader](https://github.com/TypeStrong/ts-loader)| ^5.3.0 | webpack plugin used in order to compile typescript to javascript

we using ts loader to compile `.ts|.tsx` files from src folder to `dist/main.bundle.js`
the file static file `dist/index.html` have single reference to `dist/main.bundle.js` that includes the front end code (react application).

### 2.3. dependencies

dependencies are the libraries that require for run time (data model, Utilities, UI rendering, API calls)

#### 2.3.1. React

#### 2.3.2. Redux

#### 2.3.3. blueprintjs

#### 2.3.4. Axios

TODO:

1. add gulp build scripts for test, dev, prod
2. separate webpack config for test dev prod
3. optimize the bundle for prod(thread-loader/optimize assets)
4. separate  entities to node modules (themes, server, ui-components)
5. add react router with code splitting

### 2.4. theme

theme is set of variables and classNames that define the colors, fonts and icons 
in addition, the theme contains the style for custom react components, we expose the theme thru single theme file that we require() in global scope of the application (for build optimization)

TODO: add explanation on the folder and refer to CONTRIBUTING.md

### 2.5. VSCode extension

TODO: add recommended extensions to workspace settings

### 2.6. Workspace Set up

TODO: create workspace file