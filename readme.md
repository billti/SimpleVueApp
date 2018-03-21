# Creating a basic TypeScript & Vue.js ASP.NET Core site

Creating a site with Vue.js and WebPack is generally geared towards consuming
Vue.js via ES2015 module syntax, and creating a final 'bundle' containing all the code
for the site (i.e. a "SPA" like setup). This sample will demonstrate how to author
a more "traditional" site, consisting of multiple pages where the Vue.js library is
included in the page via a `<script>` tag, and each page includes its own JavaScript
script(s).

The way Vue.js is structured (as of 2.5.16 at the time of this writing), is to include
the TypeScript definition files as part of the npm package, and to also only include
declarations for Vue.js modules (not for the global `Vue` defined when loading the 
library as a script in a web page). This means the Vue.js definitions should be acquired
by running `npm install vue`, and that the Vue.js definitions will need to be _imported_
and then added to the global space. This can be done by adding a file containing the below
to the TypeScript code, for example in a source file named `vueglobal.ts`

```ts
import { default as _Vue, VNode as _VNode} from "vue";

declare global {
    var Vue: typeof _Vue;
    interface VNode extends _VNode { }
}
```

Other TypeScript files can then reference the items added to the global scope directly,
without having to import them first, e.g.

```ts
import model from "./model"

const component = Vue.extend({
    data() {
        return { msg: "Hello " };
    },
    // etc...
    render(createElement): VNode {
        return createElement('div', this.greeting)
    }
});

var instance = new component({ el: "#app" });
```

Note that this code still uses ES2015 syntax to import other code within the project. WebPack will
then be used to convert the TypeScript into JavaScript, and package up all the code into a `bundle`
for each script desired. (Note: The bundle will not include Vue.js, as this is assumed now to be an
available global).

At the root of the TypeScript source, a `tsconfig.json` file should be present with the appropritate
settings for compilation, e.g.

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "module": "es2015",
    "moduleResolution": "node",
    "target": "es5",
    "sourceMap": true,
    "strict": true
  }
}
```

Note how "compileOnSave" is set to `false`, as the compilation needs to be carried out by WebPack.
In a Visual Studio/MSBuild based project, stop the default TypeScript build of the tsconfig.json when
the project is built by adding the following property to the .csproj file

```xml
    <TypeScriptCompileBlocked>true</TypeScriptCompileBlocked>
```

If not already installed, install WebPack and the TypeScript loader via `npm install -D webpack ts-loader`.
Next add a file named `webpack.config.js` to the root folder. Below shows simple content that
creates two bundles based on the entry points "index.ts" and "about.ts" from under the "src" folder,
creating the bundles "index.js" and "about.js" under "wwwroot/js", and including the source maps inline.

```js
// Note: This defines a development build only currently
const path = require('path');
const srcDir = path.resolve(__dirname, "src");

module.exports = {
    "mode": "development",
    "devtool": "inline-source-map",
    "entry": {
        "index": path.resolve(srcDir, "index.ts"),
        "about": path.resolve(srcDir, "about.ts")
    },
    "output": {
        "filename": "[name].js",
        "path": path.resolve(__dirname, "wwwroot/js")
    },
    "resolve": {"extensions": [".ts"]},
    "module": {
        "rules": [
            {
                "test": /\.ts$/,
                "use": "ts-loader",
                "exclude": path.resolve(__dirname, "node_modules")
            }
        ]
    }
}
```

This bundle, along with the Vue.js library directly from the CDN, would then be included in a page similar
to the below. (Here showing an ASP.NET Core Razor page)

```cshtml
@page
@model SimpleVueApp.IndexModel
@{
}
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>
<h3>@Model.Heading</h3>
<div id="app"></div>
<script src="~/js/index.js"></script>
```

To run WebPack, the easiest way it to open the `package.json` file from the root of the project, and
add a `build` script similar to the below:

```js
{
  // etc.
  "scripts": {
    "build": "webpack --config webpack.config.js",
  },
  // etc.
}
```

Then run WebPack from the command-line via `npm run build`.

