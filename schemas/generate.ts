import * as path from 'path';
import * as fs from 'fs';
import * as TJS from 'typescript-json-schema';
import { pipe } from './index';

const settings: TJS.PartialArgs = {
    required: true,
};
const compilerOptions: TJS.CompilerOptions = {
    strictNullChecks: true,
};
const sourcePath = path.resolve(__dirname, '../interfaces');
const targetPath = path.resolve(__dirname, '../.schemas');
const source = (...route: string[]) => {
    return path.join(sourcePath, ...route);
};
const target = (...route: string[]) => {
    return path.join(targetPath, ...route);
};
const getInterfaceFiles = (): string[] => {
    return (() => {
        const files = fs.readdirSync(source(''));
        return files.map(file => source('', file)).filter((item) => {
            // return !!item.match(/\/I.*Request.ts$/g);
            return item !== 'index.ts';
        });
    })();
};
const generateSchemas = (files: string[]): any[] => {
    const res: any[] = [];
    files.forEach((item) => {
        const match = /\/(?<symbol>I.*).ts$/g.exec(item);
        if (match && match['groups'] && match['groups']['symbol']) {
            res.push({
                symbol: match['groups']['symbol'],
                file: item,
            });
        }
    });
    return res;
};
const saveSchemas = (list: any[]): void => {
    if (!fs.existsSync(target(''))) {
        fs.mkdirSync(target(''));
    }
    const program = TJS.getProgramFromFiles(list.map(item => item.file), compilerOptions, sourcePath);
    list.forEach((item) => {
        const generator = TJS.buildGenerator(
            program,
            settings,
        ) as TJS.JsonSchemaGenerator;
        const schema = generator.getSchemaForSymbol(item.symbol);
        const filePath = `${target('', `${item.symbol}.json`)}`;
        const fileContents = `${JSON.stringify(schema, null, 4)}`;
        fs.writeFileSync(filePath, fileContents);
    });
};
pipe(
    getInterfaceFiles,
    generateSchemas,
    saveSchemas,
)();
