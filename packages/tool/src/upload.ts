import fs from 'node:fs/promises'
import path from 'node:path'
import { upload } from './services';

const NORMAL_MODULE_DIR = path.resolve(__dirname, "../packages/javascript/pkg");
const BINARY_MODULE_DIR = path.resolve(__dirname, "../packages/wasm/pkg");

/* 上传模块后缀名 */
const exts = [".js", ".wasm"];

/* code module data */
const modules: Record<string, string> = {};

async function getModules() {
    await addModule(NORMAL_MODULE_DIR);
    await addModule(BINARY_MODULE_DIR);
}

async function addModule(dir: string) {
    const files = await fs.readdir(dir);
    for (let name of files) {
        console.log(path.extname(name));
        if (exts.includes(path.extname(name))) {
            const [module] = name.split(".");
            modules[module] = (await fs.readFile(path.join(dir, name))).toString();
        }
    }
}

async function main() {
    try {
        await getModules();
        console.log(modules);
    } catch (e) {
        console.log(e);
    }
}

main();
