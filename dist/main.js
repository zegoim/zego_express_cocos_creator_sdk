"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.load = exports.methods = void 0;
const fs_1 = __importDefault(require("fs"));
// import fse from 'fs-extra';
const path_1 = require("path");
/**
 * @en Registration method for the main process of Extension
 * @zh 为扩展的主进程的注册方法
 */
exports.methods = {};
/**
 * @en Hooks triggered after extension loading is complete
 * @zh 扩展加载完成后触发的钩子
 */
function load() {
    // 1. 拷贝 TS 脚本（此扩展目录下的 scripts 目录里的所有文件）到用户工程的 assets/zego_expres_egnine/ 目录下
    // 2. 拷贝 Native 代码、动态库（此扩展目录下的 native 目录里的所有文件）到用户工程的 native/plugins/zego_express_engine/ 目录下
    // （若上述用户目录下已有 zego_express_engine 文件夹可能是上一次遗留的文件，先删除再拷贝，从而实现版本更新的效果）
    console.log('[ZEGO] Extension load');
    let projectPath = Editor.Project.path;
    console.log('[ZEGO] project path:', projectPath);
    let srcScriptsPath = (0, path_1.join)(__dirname, '..', 'scripts');
    console.log('[ZEGO] srcScriptsPath path:', srcScriptsPath);
    let dstScriptsPath = (0, path_1.join)(projectPath, 'assets', 'zego_express_engine');
    console.log('[ZEGO] dstScriptsPath:', dstScriptsPath);
    if (fs_1.default.existsSync(dstScriptsPath)) {
        console.log('[ZEGO] Remove dstScriptsPath:', dstScriptsPath);
        fs_1.default.rmdirSync(dstScriptsPath);
    }
    // // File destination.txt will be created or overwritten by default.
    // fs.copyFile('source.txt', 'destination.txt', (err) => {
    // if (err) throw err;
    // console.log('source.txt was copied to destination.txt');
    // });
}
exports.load = load;
/**
 * @en Hooks triggered after extension uninstallation is complete
 * @zh 扩展卸载完成后触发的钩子
 */
function unload() {
    // 1. 删除用户工程的 assets/zego_expres_egnine/ 目录
    // 2. 删除用户工程的 native/plugins/zego_express_engine/ 目录
    console.log('[ZEGO] Extension unload');
}
exports.unload = unload;
