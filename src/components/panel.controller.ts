import { SketchContext } from "../utils/sketch-context";
import * as framework from '../framework';
import { createButton, createImageView, createBoxSeparator, createWindow } from './element';
const MochaJSDelegate = require('mocha-js-delegate');
const EventEmitter = require('events');

/** 插件面板区 */
export class PanelController {
    public id: string;
    public view: any;
    private nib: any;
    private window: any;
    private emitter = new EventEmitter();
    constructor(private ctx: SketchContext) {
        this.id = `${ctx.documentID}-navi-tools-panel`;
        this.nib = framework.PanelNib();
        this.view = this.nib.getRoot();
        this.view.identifier = this.id;
        this.nib.floatButton.setCOSJSTargetFunction(() => {
            this.hide();
            this.show();
        });
    }
    show() {
        this.nib.floatButton.state() === 0 ? this.showWindow() : this.showSlider();
        this.emitter.emit(PANEL_EVENT.PANEL_SHOW);
    }
    hide() {
        if (this.window) {
            this.window.setContentView(nil);
            this.window.close();
        }
        this.ctx.removeView(this.id);
    }
    private showSlider() {
        if (this.ctx.findView(this.id) === -1) {
            // 插入到目录左侧
            this.ctx.insertViewBefore(this.view, `${this.ctx.documentID}-navi-menu-panel`);
            this.nib.floatButton.setState(1);
        }
    }
    private showWindow() {
        const size = this.view.frame().size;
        const window = createWindow({
            title: "无极设计工具",
            frame: NSMakeRect(0, 0, size.width, size.height)
        });
        window.setDelegate(new MochaJSDelegate({
            'windowWillClose:': () => {
                this.emitter.emit(PANEL_EVENT.WINDOW_CLOSE);
                return NSApp.stopModal();
            }
        }).getClassInstance());
        window.setContentView(this.view);
        window.setAutorecalculatesKeyViewLoop(true);
        this.window = window;
    }
    on(event: PANEL_EVENT, cb: any){
        this.emitter.on(event, cb);
    }
}

export enum PANEL_EVENT {
    'WINDOW_CLOSE' = 1,
    'PANEL_SHOW'
}
