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