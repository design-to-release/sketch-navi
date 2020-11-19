const { existsSync, readFileSync } = require("@skpm/fs");

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
            if (!spec.code || spec.code.indexOf('F_Txt') !== 0) {
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
            if (!spec.code || spec.code.indexOf('S_J') !== 0) {
                return;
            }
            spec.dim = [item.cclass, item.cmeaning];
            exist[spec.code] = true;
            arr.push(spec);
        });
        return arr;
    }
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
    }
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
            if (!spec.code || spec.code.indexOf(prefix) !== 0) {
                return;
            }
            spec.dim = [item.cclass, item.cmeaning];
            exist[spec.code] = true;
            arr.push(spec);
        });
        return arr;
    }
    getMaskSpec() {
        let arr: any[] = [];
        let exist: any = {};
        SpecData.loadJSONData('/data/spec-baiduboxapp.json', this.assetsPath)
            .data.forEach(function(item: any) {
                let spec = item;
                if (exist[spec.code]) {
                    return;
                }
                if (!spec.code || spec.code.indexOf('Mask_X') === -1) {
                    return;
                }
                spec.dim = [item.cclass, item.cmeaning];
                exist[spec.code] = true;
                arr.push(spec);
            });
        return arr;
    }
    getShadowSpec() {
        let arr: any[] = [];
        let exist: any = {};
        SpecData.loadJSONData('/data/spec-baiduboxapp.json', this.assetsPath)
            .data.forEach(function(item: any) {
                let spec = item;
                if (exist[spec.code]) {
                    return;
                }
                if (!spec.code || spec.code.indexOf('S_O_X') === -1) {
                    return;
                }
                spec.dim = [item.cclass, item.cmeaning];
                exist[spec.code] = true;
                const { h5, defaultValue } = spec;
                arr.push({
                    ...spec,
                    x: h5.x,
                    y: h5.y,
                    size: h5.size,
                    color: `#${defaultValue.color}`,
                    opacity: defaultValue.opacity,
                });
            });
        return arr;
    }
}

export function getSpecs(resourcesPath: string) {
    const specData = new SpecData(resourcesPath);
    const textSpec = specData.getTextSpec();
    const borderSpec = specData.getBorderSpec();
    // console.log(borderSpec);

    return {
        Color: specData.getColorSpec(),
        Line: [{
            weight: '1', text: '1', specCode: 'F_L_X01', desc: '粗分割线高度', dim: ['通栏模版'],
        }, {
            weight: '2', text: '2', specCode: 'F_L_X02', desc: '细分割线高度', dim: ['非通栏分割线'],
        }, {
            weight: '6', text: '6', specCode: 'F_L_X03', desc: '细分割线高度', dim: ['通栏分割线'],
        }],
        Text: textSpec,
        Border: borderSpec,
        Grid: specData.getGridSpec(),
        Margin: specData.getMarginSpec(),
        Mask: specData.getMaskSpec(),
        Hori: specData.getMarginSpec('M_H'),
        Shadow: specData.getShadowSpec(),
    };
}


