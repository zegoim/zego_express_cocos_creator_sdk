"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.load = exports.methods = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
exports.methods = {};
function load() {
    console.log('[ZEGO][RTC] Extension load');
    removeScripts();
    let src = (0, path_1.join)(__dirname, '..', 'scripts');
    let dst = (0, path_1.join)(Editor.Project.path, 'assets', 'zego_express_engine');
    console.log('[ZEGO][RTC] Copy scripts from', src, 'to', dst);
    copyDirectory(src, dst);
}
exports.load = load;
function unload() {
    console.log('[ZEGO][RTC] Extension unload');
    removeScripts();
}
exports.unload = unload;
function removeScripts() {
    let dst = (0, path_1.join)(Editor.Project.path, 'assets', 'zego_express_engine');
    if (fs_1.default.existsSync(dst)) {
        console.log('[ZEGO][RTC] Remove scripts directory:', dst);
        fs_1.default.rmSync(dst, { force: true, maxRetries: 3, recursive: true });
    }
}
function copyDirectory(src, dst) {
    fs_1.default.mkdirSync(dst, { recursive: true });
    let entries = fs_1.default.readdirSync(src, { withFileTypes: true });
    for (let entry of entries) {
        let srcPath = (0, path_1.join)(src, entry.name);
        let dstPath = (0, path_1.join)(dst, entry.name);
        entry.isDirectory() ?
            copyDirectory(srcPath, dstPath) :
            fs_1.default.copyFileSync(srcPath, dstPath);
    }
}
