import { SketchContext } from "../utils/sketch-context";
import * as framework from '../framework';
import { createButton, createBoxSeparator } from './element';
import { getSubviewById } from "../utils/view-utils";

const EventEmitter = require('events');

export class MenuController {
    public id: string;
    public view: any;
    private emitter = new EventEmitter();
    private buttons: {[index: string]: any} = {};
    constructor(private ctx: SketchContext) {
        this.id = `${ctx.documentID}-navi-menu-panel`;
        const NSMenuController = framework.framework.getClass('MenuController');
        // const controller = NSMenuController.alloc().initWithNibName_bundle("Menu", NSBundle.mainBundle());
        const controller = NSMenuController.viewControllerFromNIB();
        this.view = controller.view();
        this.view.identifier = this.id;
        this.generateInterface();
    }
    toogle() {
        const index = this.ctx.findView(this.id);
        index === -1 ? this.show() : this.hide();
    }
    show() {
        this.ctx.insertViewAfter(this.view);
        const index = this.ctx.findView(this.id);
        // this.ctx.stageView.delegate().splitView_shouldAdjustSizeOfSubview = () => {
        //     return 1;
        // }
        // console.log(this.ctx.stageView.delegate().splitView_shouldAdjustSizeOfSubview(this.ctx.stageView, this.view));
        // console.log(this.ctx.stageView.subviews()[0], this.ctx.stageView.delegate().splitView_shouldAdjustSizeOfSubview(this.ctx.stageView, this.ctx.stageView.subviews()[0]));
        // console.log(this.ctx.stageView.subviews()[1],this.ctx.stageView.delegate().splitView_shouldAdjustSizeOfSubview(this.ctx.stageView, this.ctx.stageView.subviews()[1]));
        // console.log(this.ctx.stageView.subviews()[2],this.ctx.stageView.delegate().splitView_shouldAdjustSizeOfSubview(this.ctx.stageView, this.ctx.stageView.subviews()[2]));

        // const xxx = this.ctx.stageView.delegate();

        // this.ctx.stageView.setDelegate(new MochaJSDelegate({
        //     'splitView_shouldAdjustSizeOfSubview:': (a, c, c) => {
        //         return xxx.splitView_shouldAdjustSizeOfSubview();
        //         this.emitter.emit(PANEL_EVENT.WINDOW_CLOSE);
        //         return NSApp.stopModal();
        //     }
        // }).getClassInstance());

    }
    hide() {
        this.ctx.removeView(this.id);
    }
    private generateInterface() {
        const parent = getSubviewById(this.view, 'headStack');
        parent.addView_inGravity(createBoxSeparator(), 3);
        options.forEach((option, index) => {
            const button = createButton({
                rect: NSMakeRect(0, 0, 40, 40),
                size: NSMakeSize(40, 40),
                tooltip: option.tooltip,
                type: 2,
                iconUrl: this.ctx.NSURL(`icons/${option.id}.png`),
                activeIconUrl: this.ctx.NSURL(`icons/${option.id}-active.png`),
                callAction: () => {
                    this.onClick(option, button);
                },
            });
            this.buttons[option.id] = button;
            parent.addView_inGravity(button, option.gravity || 1);
            parent.addView_inGravity(createBoxSeparator(), option.gravity || 1);
        });
    }

    private onClick(option: MenuOption, view: any) {
        if (option.event === MENU_EVENT.MAIN_CLICK) {

        } else if (option.event === MENU_EVENT.BUTTON_CLICK){

        } else if (option.event === MENU_EVENT.PANEL_CLICK){
            // 点击普通按钮时 如果总控Main未激活 则模拟激活 打开主面板
            if (this.buttons['main'] && view.state() === 1 && this.buttons['main'].state() !== 1) {
                this.buttons['main'] && this.buttons['main'].performClick('callAction:');
            }
        }
        this.emitter.emit(option.event, option, view);
    }

    on(event: MENU_EVENT, cb: any){
        this.emitter.on(event, cb);
    }
    public setMainButtonState(state: number) {
        this.buttons['main'] && this.buttons['main'].setState(state);
    }
}

export enum MENU_EVENT {
    'MAIN_CLICK' = 1,
    'PANEL_CLICK' = 2,
    'BUTTON_CLICK' = 3,
}

export interface MenuOption {
    tooltip: string,
    id: string,
    gravity: 1 | 2 | 3,
    event?: MENU_EVENT
}


const options : MenuOption[] = [{
    tooltip: '全部',
    id: 'main',
    gravity: 1,
    event: MENU_EVENT.MAIN_CLICK
}, {
    tooltip: '颜色',
    id: 'color',
    gravity: 1,
    event: MENU_EVENT.PANEL_CLICK
}, {
    tooltip: '文本',
    id: 'text',
    gravity: 1,
    event: MENU_EVENT.PANEL_CLICK
}, {
    tooltip: '设置',
    id: 'mask',
    gravity: 3,
    event: MENU_EVENT.BUTTON_CLICK
}, {
    tooltip: '用户',
    id: 'border',
    gravity: 3,
    event: MENU_EVENT.BUTTON_CLICK
}];



// main.click
// tools.click
//

        // toolbar.addView_inGravity(createImageView(NSMakeRect(0, 0, 40, 8), this.ctx.NSURL('icons/transparent.png')), 3);

        // this.nib.buttonMain.image = NSImage.alloc().initByReferencingFile(`${this.ctx.resourcesPath()}/icons/icon-main.png`);

        // // this.buttonMainChanged = this.buttonMainChanged.bind(this);
        // // this.nib.buttonMain.setCOSJSTargetFunction(this.buttonMainChanged);
        // this.nib.buttonMain.setCOSJSTargetFunction(function(sender: any){
        //     console.log('XXXXXX!!HAHAHAHA');
        // });
