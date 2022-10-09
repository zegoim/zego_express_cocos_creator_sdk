"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.load = exports.methods = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let DEVELOPMENT_MODE = true;
exports.methods = {};
function load() {
    console.log('[ZEGO][RTC] Extension load');
    installScripts();
    installNativePlugins();
}
exports.load = load;
function unload() {
    console.log('[ZEGO][RTC] Extension unload');
    uninstallScripts();
    uninstallNativePlugins();
}
exports.unload = unload;
function installScripts() {
    uninstallScripts(); // Uninstall old scripts if needed
    let assetsDir = path_1.default.join(Editor.Project.path, 'assets');
    if (!fs_1.default.existsSync(assetsDir)) {
        fs_1.default.mkdirSync(assetsDir);
    }
    let src = path_1.default.join(__dirname, '..', 'scripts');
    let dst = path_1.default.join(Editor.Project.path, 'assets', 'zego_express_engine');
    if (DEVELOPMENT_MODE) {
        console.log('[ZEGO][RTC][DevelopmentMode] Symlink scripts from', src, 'to', dst);
        fs_1.default.symlinkSync(src, dst);
    }
    else {
        console.log('[ZEGO][RTC] Copy scripts from', src, 'to', dst);
        copyDirectory(src, dst);
    }
}
function uninstallScripts() {
    let dst = path_1.default.join(Editor.Project.path, 'assets', 'zego_express_engine');
    if (fs_1.default.existsSync(dst)) {
        if (DEVELOPMENT_MODE) {
            console.log('[ZEGO][RTC][DevelopmentMode] Unlink scripts directory:', dst);
            fs_1.default.unlinkSync(dst);
        }
        else {
            console.log('[ZEGO][RTC] Remove scripts directory:', dst);
            fs_1.default.rmSync(dst, { force: true, maxRetries: 3, recursive: true });
        }
    }
}
function installNativePlugins() {
    uninstallNativePlugins(); // Uninstall old plugins if needed
    let pluginsDir = path_1.default.join(Editor.Project.path, 'native', 'plugins');
    if (!fs_1.default.existsSync(pluginsDir)) {
        console.log('[ZEGO][RTC][DevelopmentMode] mkdir pluginsDir');
        fs_1.default.mkdirSync(pluginsDir);
    }
    let src = path_1.default.join(__dirname, '..', 'native');
    let dst = path_1.default.join(pluginsDir, 'zego_express_engine');
    if (DEVELOPMENT_MODE) {
        console.log('[ZEGO][RTC][DevelopmentMode] Symlink native plugins from', src, 'to', dst);
        fs_1.default.symlinkSync(src, dst);
    }
    else {
        console.log('[ZEGO][RTC] Copy native plugins from', src, 'to', dst);
        copyDirectory(src, dst);
        // To avoid double import, rename the source json
        updatePluginJson();
    }
}
function uninstallNativePlugins() {
    let dst = path_1.default.join(Editor.Project.path, 'native', 'plugins', 'zego_express_engine');
    if (fs_1.default.existsSync(dst)) {
        if (DEVELOPMENT_MODE) {
            console.log('[ZEGO][RTC][DevelopmentMode] Unlink native plugins directory:', dst);
            fs_1.default.unlinkSync(dst);
        }
        else {
            console.log('[ZEGO][RTC] Remove native plugins directory:', dst);
            fs_1.default.rmSync(dst, { force: true, maxRetries: 3, recursive: true });
            // Restore the source json
            updatePluginJson(true);
        }
    }
}
function updatePluginJson(restore = false) {
    let src = path_1.default.join(__dirname, '..', 'native');
    let origin_json = path_1.default.join(src, 'cc_plugin.json');
    let backup_json = path_1.default.join(src, 'cc_plugin.bak.json');
    if (restore) {
        if (fs_1.default.existsSync(backup_json)) {
            fs_1.default.renameSync(backup_json, origin_json);
        }
    }
    else {
        if (fs_1.default.existsSync(origin_json)) {
            fs_1.default.renameSync(origin_json, backup_json);
        }
    }
}
function copyDirectory(src, dst) {
    fs_1.default.mkdirSync(dst, { recursive: true });
    let entries = fs_1.default.readdirSync(src, { withFileTypes: true });
    for (let entry of entries) {
        let srcPath = path_1.default.join(src, entry.name);
        let dstPath = path_1.default.join(dst, entry.name);
        if (entry.isSymbolicLink()) {
            fs_1.default.symlinkSync(fs_1.default.readlinkSync(srcPath), dstPath);
        }
        else if (entry.isDirectory()) {
            copyDirectory(srcPath, dstPath);
        }
        else {
            fs_1.default.copyFileSync(srcPath, dstPath);
        }
    }
}
