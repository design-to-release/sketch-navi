import { COScript } from "sketch";

const { existsSync, readFileSync, readdirSync, extname } = require("@skpm/fs");

export class SpecData {
    constructor(private assetsPath: string) {
        // console.log(assetsPath);
    }
    static loadJSONData(filepath: string, assetsPath: string) {
        let json: any = {};
        if (existsSync(`${assetsPath}${filepath}`)) {
            const text = readFileSync(`${assetsPath}${filepath}`).toString();
            json =  JSON.parse(text);
        } else {
            const text = readFileSync(`${assetsPath}/example${filepath}`).toString();
            json =  JSON.parse(text);
        }
        return json;
    }
    getColorSpec() {
        let file = `/data/color-baiduboxapp-FC.json`;
        let json: any = {};
        let arr: any[] = [];
        let exist: any = {};
        if (existsSync(`${this.assetsPath}${file}`)) {
            const text = readFileSync(`${this.assetsPath}${file}`).toString();
            json =  JSON.parse(text);
        } else {
            const text = readFileSync(`${this.assetsPath}/example${file}`).toString();
            json =  JSON.parse(text);
        }
        json.data.forEach((item: any) => {
            let spec = item;
            if (exist[spec.cnum]) {
                return;
            }
            spec.dim = [item.cclass, item.cmeaning];

            if (item.cmeaning.indexOf('边') > -1 || item.cclass.indexOf('边') > -1 || item.cmeaning.indexOf('线') > -1 || item.cclass.indexOf('线') > -1) {
                spec.borderMode = true;
                spec.fillMode = false;
            } else {
                spec.borderMode = false;
                spec.fillMode = true;
            }
            if (item.cmeaning.indexOf('字') > -1 || item.cclass.indexOf('字') > -1) {
                spec.shapeMode = 'Text';
                spec.borderMode = false;
                spec.fillMode = true;
            } else {
                spec.shapeMode = 'Others';
            }
            exist[spec.cnum] = true;
            arr.push(spec);
        });
        return arr;
    }
    getTextSpec() {
        let file = `/data/spec-baiduboxapp.json`;
        let json: any = {};
        let arr: any[] = [];
        let exist: any = {};
        if (existsSync(`${this.assetsPath}${file}`)) {
            const text = readFileSync(`${this.assetsPath}${file}`).toString();
            json =  JSON.parse(text);
        } else {
            const text = readFileSync(`${this.assetsPath}/example${file}`).toString();
            json =  JSON.parse(text);
        }
        json.data.forEach((item: any) => {
            let spec = item;
            if (exist[spec.code] || spec.cline !=="FEED") {
                return;
            }
            if (!spec.code || (spec.code.indexOf('F_Txt') !== 0 && spec.code.indexOf('T_X') !== 0)) {
                return;
            }
            spec.dim = [item.cclass, item.cmeaning];
            exist[spec.code] = true;
            arr.push(spec);
        });
        return arr;
    }

    getFontSizeSpec() {
        let file = `/data/spec-baiduboxapp.json`;
        let json: any = {};
        let arr: any[] = [];
        let exist: any = {};
        if (existsSync(`${this.assetsPath}${file}`)) {
            const text = readFileSync(`${this.assetsPath}${file}`).toString();
            json =  JSON.parse(text);
        } else {
            const text = readFileSync(`${this.assetsPath}/example${file}`).toString();
            json =  JSON.parse(text);
        }
        json.data.forEach((item: any) => {
            let spec = item;
            if (exist[spec.code] || spec.cline !=="FEED") {
                return;
            }
            if (!spec.code || spec.code.indexOf('F_T_X') !== 0 || spec.cline !== 'FEED') {
                return;
            }
            spec.dim = [item.cclass, item.cmeaning];
            exist[spec.code] = true;
            arr.push(spec);
        });
        return arr;
    }

    getFontWeightSpec() {
        let file = `/data/spec-baiduboxapp.json`;
        let json: any = {};
        let arr: any[] = [];
        let exist: any = {};
        if (existsSync(`${this.assetsPath}${file}`)) {
            const text = readFileSync(`${this.assetsPath}${file}`).toString();
            json =  JSON.parse(text);
        } else {
            const text = readFileSync(`${this.assetsPath}/example${file}`).toString();
            json =  JSON.parse(text);
        }
        json.data.forEach((item: any) => {
            let spec = item;
            if (exist[spec.code] || spec.cline !=="FEED") {
                return;
            }
            if (!spec.code || spec.code.indexOf('F_F_X') !== 0 || spec.cline !== 'FEED') {
                return;
            }
            spec.dim = [item.cclass, item.cmeaning];
            exist[spec.code] = true;
            arr.push(spec);
        });
        return arr;
    }

    getBorderSpec() {
        let file = `/data/spec-baiduboxapp.json`;
        let json: any = {};
        let arr: any[] = [];
        let exist: any = {};
        if (existsSync(`${this.assetsPath}${file}`)) {
            const text = readFileSync(`${this.assetsPath}${file}`).toString();
            json =  JSON.parse(text);
        } else {
            const text = readFileSync(`${this.assetsPath}/example${file}`).toString();
            json =  JSON.parse(text);
        }
        json.data.forEach((item: any) => {
            let spec = item;
            if (exist[spec.code]) {
                return;
            }
            if (!spec.elementCode || spec.elementCode.indexOf('J_X') !== 0  || spec.cline !== 'FEED') {
                return;
            }
            spec.dim = [item.cclass, item.cmeaning];
            exist[spec.code] = true;
            arr.push(spec);
        });
        return arr;
    }
    /*
    getGridSpec() {
        let file = `/data/spec-baiduboxapp.json`;
        let json: any = {};
        let arr: any[] = [];
        let exist: any = {};
        if (existsSync(`${this.assetsPath}${file}`)) {
            const text = readFileSync(`${this.assetsPath}${file}`).toString();
            json =  JSON.parse(text);
        } else {
            const text = readFileSync(`${this.assetsPath}/example${file}`).toString();
            json =  JSON.parse(text);
        }
        json.data.forEach((item: any) => {
            let spec = item;
            if (exist[spec.code]) {
                return;
            }
            if (!spec.code || spec.code.indexOf('G_R') !== 0) {
                return;
            }
            spec.dim = [item.cclass, item.cmeaning];
            exist[spec.code] = true;
            arr.push(spec);
        });
        return arr;
    }*/

    getMarginSpec(prefix: string = 'M_L') {
        let file = `/data/spec-baiduboxapp.json`;
        let json: any = {};
        let arr: any[] = [];
        let exist: any = {};
        if (existsSync(`${this.assetsPath}${file}`)) {
            const text = readFileSync(`${this.assetsPath}${file}`).toString();
            json =  JSON.parse(text);
        } else {
            const text = readFileSync(`${this.assetsPath}/example${file}`).toString();
            json =  JSON.parse(text);
        }
        json.data.forEach((item: any) => {
            let spec = item;
            if (exist[spec.code]) {
                return;
            }
            if (!spec.code || spec.code.indexOf(prefix) !== 0 || spec.cline !== 'FEED') {
                return;
            }
            spec.desc = spec.code.substring(prefix.length, prefix.length+3);
            spec.dim = [item.cclass, item.cmeaning];
            exist[spec.code] = true;
            arr.push(spec);
        });
        return arr;
    }

    // getMaskSpec() {
    //     let arr: any[] = [];
    //     let exist: any = {};
    //     SpecData.loadJSONData('/data/spec-baiduboxapp.json', this.assetsPath)
    //         .data.forEach(function(item: any) {
    //             let spec = item;
    //             if (exist[spec.code]) {
    //                 return;
    //             }
    //             if (!spec.code || spec.code.indexOf('Mask_X') === -1) {
    //                 return;
    //             }
    //             spec.dim = [item.cclass, item.cmeaning];
    //             exist[spec.code] = true;
    //             arr.push(spec);
    //         });
    //     return arr;
    // }
    // getShadowSpec() {
    //     let arr: any[] = [];
    //     let exist: any = {};
    //     SpecData.loadJSONData('/data/spec-baiduboxapp.json', this.assetsPath)
    //         .data.forEach(function(item: any) {
    //             let spec = item;
    //             if (exist[spec.code]) {
    //                 return;
    //             }
    //             if (!spec.code || spec.code.indexOf('S_O_X') === -1) {
    //                 return;
    //             }
    //             spec.dim = [item.cclass, item.cmeaning];
    //             exist[spec.code] = true;
    //             const { h5, defaultValue } = spec;
    //             arr.push({
    //                 ...spec,
    //                 x: h5.x,
    //                 y: h5.y,
    //                 size: h5.size,
    //                 color: `#${defaultValue.color}`,
    //                 opacity: defaultValue.opacity,
    //             });
    //         });
    //     return arr;
    // }
    getMaskSpec() {
        const result =  SpecData.loadJSONData('/data/data.json', this.assetsPath)['mask']
            .sort((a: any, b: any) => a.rowNumber - b.rowNumber)
            .map((item: any) => {
                const { code, cclass = '贴吧蒙层' } = item;
                const cmeaning = (code as string).substr(2);
                return {
                    ...item,
                    cclass,
                    cmeaning,
                    elementCode: cmeaning,
                    dim: [cclass, cmeaning],
                }
            });
        return result;
    }
    getShadowSpec() {
        const result =  SpecData.loadJSONData('/data/data.json', this.assetsPath)['shadow']
            .sort((a: any, b: any) => a.rowNumber - b.rowNumber)
            .map((item: any) => {
                const {
                    cline, code, h5, color, opacity,
                    cclass = '贴吧阴影'
                } = item;
                const cmeaning = (code as string).substr(2);
                return {
                    cline,
                    code,
                    cclass,
                    cmeaning,
                    elementCode: cmeaning,
                    x: h5.x,
                    y: h5.y,
                    dim: [cclass, cmeaning],
                    size: h5.size,
                    spread: h5.spread,
                    opacity,
                    color: `#${color}`,
                };
            })
        return result;
    }
    getTBColor() {
        const exist: any = {};
        const arr: any = [];
        const data = {"cname":"FC1","cnum":"CAM_X791","cclass":"标题类文字","cmeaning":"列表页Feed标题字色","cline":"FEED","mods":[{"name":"default","color":"1F1F1F","opacity":1,"rgba":"31, 31, 31, 1"},{"name":"dark","color":"FFFFFF","opacity":0.8,"rgba":"255, 255, 255, 0.8"},{"name":"night","color":"666666","opacity":1,"rgba":"102, 102, 102, 1"}]};
        const text = readFileSync(`${this.assetsPath}/example/data/spec-color-tb.csv`).toString();
        text.split('\n').forEach((line: string) => {
            const tabs = line.split('\t');
            if (tabs.length < 5) return;
            let spec = JSON.parse(JSON.stringify(data));
            spec.dim = [tabs[0], tabs[1]];
            spec.cclass = tabs[0];
            spec.cmeaning = tabs[1];
            spec.cname = tabs[2].replace('CAM_', '');
            spec.cnum = tabs[2];
            if (exist[spec.cnum]) return;
            spec.mods[0].color = tabs[5].split(',')[0];
            spec.mods[0].opacity = parseFloat(tabs[5].split(',')[1]);
            spec.mods[1].color = tabs[6].split(',')[0];
            spec.mods[1].opacity = parseFloat(tabs[6].split(',')[1]);
            spec.mods[2].color = tabs[7].split(',')[0];
            spec.mods[2].opacity = parseFloat(tabs[7].split(',')[1]);

            if (tabs[5].split(',')[1] === undefined) spec.mods[0].opacity = 1;
            if (tabs[5].split(',')[1] === undefined) spec.mods[1].opacity = 1;
            if (tabs[5].split(',')[1] === undefined) spec.mods[2].opacity = 1;


            if (spec.cmeaning.indexOf('边') > -1 || spec.cclass.indexOf('边') > -1 || spec.cmeaning.indexOf('线') > -1 || spec.cclass.indexOf('线') > -1) {
                spec.borderMode = true;
                spec.fillMode = false;
            } else {
                spec.borderMode = false;
                spec.fillMode = true;
            }
            if (spec.cmeaning.indexOf('字') > -1 || spec.cclass.indexOf('字') > -1) {
                spec.shapeMode = 'Text';
                spec.borderMode = false;
                spec.fillMode = true;
            } else {
                spec.shapeMode = 'Others';
            }
            exist[spec.cnum] = true;
            arr.push(spec);
        });
        return arr;
    }
    getTBIcon() {
        const rs: any = [];
        const fileList = readdirSync(`${this.assetsPath}/icon/`);
        fileList.forEach((file: string, index: number) => {
            if(file.substr(-4).toLowerCase() === ".svg") {
                const svg = readFileSync(`${this.assetsPath}/icon/${file}`).toString();
                const id = `0000${index}`.substr(-3);
                rs.push({
                    "code": "I_X" + id,
                    "cline": "TIEBA",
                    "cclass": "默认",
                    "cmeaning": "",
                    "elementCode":  "I_X" + id,
                    "svg": svg,
                    "dim": ["默认"],
                    "width": 44,
                    "height": 44,
                });
            }
        });
        return rs;
    }
    getLineSpec() {
        let file = `/data/spec-baiduboxapp.json`;
        let json: any = {};
        let arr: any[] = [];
        let exist: any = {};
        if (existsSync(`${this.assetsPath}${file}`)) {
            const text = readFileSync(`${this.assetsPath}${file}`).toString();
            json =  JSON.parse(text);
        } else {
            const text = readFileSync(`${this.assetsPath}/example${file}`).toString();
            json =  JSON.parse(text);
        }
        json.data.forEach((item: any, index: number) => {
            let spec = item;
            if (exist[spec.code] || spec.cline !=="FEED") {
                return;
            }
            if (!spec.code || spec.code.indexOf('F_L_X') !== 0 || spec.cline !== 'FEED') {
                return;
            }
            spec.weight = spec.ios;
            spec.text = item.ios;
            spec.dim = [item.cclass, item.cmeaning];
            spec.index = index;
            exist[spec.code] = true;
            arr.push(spec);
        });
        return arr;
    }

    getGridSpec() {
        const result =  SpecData.loadJSONData('/data/data.json', this.assetsPath)['grid']
            .sort((a: any, b: any) => a.rowNumber - b.rowNumber)
        return result;
    }
    // getMarginSpec(prefix: string = 'M_L') {
    //     const result =  SpecData.loadJSONData('/data/data.json', this.assetsPath)['margin']
    //         .filter((item: any) => item.code.indexOf(prefix) >= 0)
    //         .sort((a: any, b: any) => a.rowNumber - b.rowNumber)
    //     return result;
    // }
}

export function getSpecs(resourcesPath: string) {
    const specData = new SpecData(resourcesPath);

    console.log(specData.getFontSizeSpec());
    return {
        Color: specData.getColorSpec(), //.getTBColor(), //getColorSpec(),
        Font: specData.getFontSizeSpec(),
        Weight: specData.getFontWeightSpec(),
        Line: specData.getLineSpec(),
        Border: specData.getBorderSpec(),
        Grid: specData.getGridSpec(),
        // Margin: specData.getMarginSpec(),
        Mask: specData.getMaskSpec(),
        Hori: specData.getMarginSpec('F_M_H_X'),
        Vert: specData.getMarginSpec('F_M_W_X'),
        Icon: specData.getTBIcon(),
        Shadow: specData.getShadowSpec(),
    };
}