const framework = require('./framework/Navi.xcworkspace/contents.xcworkspacedata');
const MochaJSDelegate = require('mocha-js-delegate');
const NVApp = framework.getClass('NVApp');

export function onStart(context: any) {
    COScript.currentCOScript().setShouldKeepAround(true);
    NVApp.currentApp().toggle();
}
export function onOpenDocument(){
    COScript.currentCOScript().setShouldKeepAround(true);
    const app = NVApp.prepareInit();
    // app.dataSource = new MochaJSDelegate({
    //     'updateSpec': () => {
    //         const path =  app.bundlePath();
    //         const spec =  getSpecs(path.substring(0, path.indexOf('/_webpack_resources')));
    //         app.specs = spec;

    //     },
    // }).getClassInstance();
}

export function onSelectionChanged(context: any) {
    NVApp.currentApp()?.selectionChange();
}

export function beforeCopy(){
    NVApp.currentApp()?.beforeCopy();
}

export function onPaste(){
    NVApp.currentApp()?.onPaste();
}
