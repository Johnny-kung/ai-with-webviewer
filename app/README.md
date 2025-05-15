# Setup
Need to build from the WebViewer branch: https://github.com/XodoDocs/webviewer/pull/11045
1. Run `npm run build`, then copy the `core`, `ui` folders and `webviewer.min.js`.
2. Paste `webviewer.min.js` to `node_modules/@pdftron/webviewer`. Then paste `core` `ui` folders to `node_modules/@pdftron/webviewer/public`. (Overwrite if the folders/files already there.)
3. Manually paste `core` `ui` folders to `app/public/webviewer` as well.