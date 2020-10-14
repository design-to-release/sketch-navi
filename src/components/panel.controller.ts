import { SketchContext } from "../utils/sketch-context";
import * as framework from '../framework';
import { createButton, createImageView, createBoxSeparator, createWindow } from './element';
import { getSubviewById } from "../utils/view-utils";
import { splitViewItemLimitRezise } from "../utils/resize-delegate";
const MochaJSDelegate = require('mocha-js-delegate');
const EventEmitter = require('events');

/** 插件面板区 */
export class PanelController {
    public id: string;
    public view: any;
    private window: any;
    private emitter = new EventEmitter();
    private NSController: any;
    private floatButton: any;
    private minWidth: number;
    public colorController: any; // 临时对象
    public lineController: any; // 临时对象
    public sectionInfo: any;
    constructor(private ctx: SketchContext) {
        this.id = `${ctx.documentID}-navi-tools-panel`;
        const NSPanel = framework.framework.getClass('Panel');
        this.NSController = NSPanel.viewControllerFromNIB();
        this.view = this.NSController.view();
        this.view.identifier = this.id;
        this.floatButton = getSubviewById(this.view, 'floatButton');
        this.floatButton.setCOSJSTargetFunction(() => {
            this.hide();
            this.show();
        });
        this.minWidth = this.view.frame().size.width;
        // 以下是颜色测试代码
        const section = getSubviewById(this.view, 'section');
        this.sectionInfo = getSubviewById(this.view, 'sectionInfo');
        const colorp = getSubviewById(section, 'colorp');
        this.colorController = colorp.colorPanelController();
        this.colorController.delegate = new MochaJSDelegate({
            'colorChange:': (colorCode: string) => {
                this.sectionInfo.setTitle(colorCode);
                this.emitter.emit(PANEL_EVENT.COLOR_CHANGE, colorCode);
            }
        }).getClassInstance();
        // 颜色测试代码结束

        // 以下是线条测试代码
        const linep = getSubviewById(getSubviewById(this.view, 'section'), 'linep');
        console.log('-----', linep.toString())
        console.log('-----', colorp.toString())
        this.lineController = linep.linePanelController();
        console.log('--this.lineController---', this.lineController)
        this.lineController.delegate = new MochaJSDelegate({
            'lineChange:': () => {
                this.sectionInfo.setTitle('line changed');
                // this.emitter.emit(PANEL_EVENT.COLOR_CHANGE, colorCode);
            }
        }).getClassInstance();
        // 线条测试代码结束
    }
    show() {
        this.floatButton.state() === 0 ? this.showWindow() : this.showSlider();
        this.emitter.emit(PANEL_EVENT.PANEL_SHOW);
    }
    hide() {
        if (this.window) {
            this.NSController.delegate = null;
            this.window.setContentView(null);
            this.window.close();
        }
        this.ctx.removeView(this.id);
    }
    private showSlider() {
        if (this.ctx.findView(this.id) === -1) {
            // 插入到目录左侧
            this.ctx.insertViewBefore(this.view, `${this.ctx.documentID}-navi-menu-panel`);
            this.floatButton.setState(1);
            // 下面这个代理方法主要实现限制menu宽度，策略1限制最小宽度，策略2限制在lockSize时间段内，不发生size变化
            this.NSController.delegate = new MochaJSDelegate({
                'viewWillLayoutSize:': (newSize: string) => {
                    if (new Date().getTime() - this.lastLockTime > 0) {
                        this.emitter.emit(PANEL_EVENT.WIIL_LAYOUT);
                        splitViewItemLimitRezise(this.ctx.stageView, this.view, this.minWidth);
                        this.lockWidth = this.view.frame().size.width;
                    } else if(this.lockWidth) {
                        splitViewItemLimitRezise(this.ctx.stageView, this.view, this.lockWidth, this.lockWidth);
                    }
                }
            }).getClassInstance();

        }
    }
    private showWindow() {
        const size = this.view.frame().size;
        this.NSController.delegate = null;
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

    private lastLockTime: number = 0; // 锁定时间
    private lockWidth: number = 0; // 锁定宽度
        // 锁定大小以避免重绘
    public lockSize() {
        this.lastLockTime = new Date().getTime() + 1000; // 锁定1000ms
    }
    on(event: PANEL_EVENT, cb: any){
        this.emitter.on(event, cb);
    }
}

export enum PANEL_EVENT {
    'WINDOW_CLOSE' = 1,
    'WIIL_LAYOUT' = 10,
    'PANEL_SHOW' = 11,
    'COLOR_CHANGE' = 21,
}
