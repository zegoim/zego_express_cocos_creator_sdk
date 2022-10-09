"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.load = exports.methods = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let DEVELOPMENT_MODE = true;
let PROJ_ASSETS_PATH = path_1.default.join(Editor.Project.path, 'assets');
let PROJ_PLUGINS_PATH = path_1.default.join(Editor.Project.path, 'native', 'plugins');
let SRC_SCRIPTS_PATH = path_1.default.join(__dirname, '..', 'scripts');
let DST_SCRIPTS_PATH = path_1.default.join(PROJ_ASSETS_PATH, 'zego_express_engine');
let SRC_NATIVE_PATH = path_1.default.join(__dirname, '..', 'native');
let DST_NATIVE_PATH = path_1.default.join(PROJ_PLUGINS_PATH, 'zego_express_engine');
//////////////////
// Entry Points //
//////////////////
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
///////////////////////
// Scripts Operation //
///////////////////////
function installScripts() {
    uninstallScripts(); // Uninstall old scripts if needed
    _makeSureDirectoryExists(PROJ_ASSETS_PATH);
    _copyDirectory(SRC_SCRIPTS_PATH, DST_SCRIPTS_PATH);
}
function uninstallScripts() {
    if (!fs_1.default.existsSync(DST_SCRIPTS_PATH)) {
        return;
    }
    if (DEVELOPMENT_MODE) {
        // Copy back the modified scripts
        _removeDirectory(SRC_SCRIPTS_PATH);
        _copyDirectory(DST_SCRIPTS_PATH, SRC_SCRIPTS_PATH);
    }
    _removeDirectory(DST_SCRIPTS_PATH);
}
//////////////////////////////
// Native Plugins Operation //
//////////////////////////////
function installNativePlugins() {
    uninstallNativePlugins(); // Uninstall old native plugins if needed
    _makeSureDirectoryExists(PROJ_PLUGINS_PATH);
    _copyDirectory(SRC_NATIVE_PATH, DST_NATIVE_PATH);
    if (!DEVELOPMENT_MODE) {
        _updateSourcePluginJson(); // To avoid double import
    }
}
function uninstallNativePlugins() {
    if (!fs_1.default.existsSync(DST_NATIVE_PATH)) {
        return;
    }
    if (DEVELOPMENT_MODE) {
        // Copy back the modified native plugins
        _removeDirectory(SRC_NATIVE_PATH);
        _copyDirectory(DST_NATIVE_PATH, SRC_NATIVE_PATH);
    }
    _removeDirectory(DST_NATIVE_PATH);
    if (!DEVELOPMENT_MODE) {
        _updateSourcePluginJson(true); // Restore the source json
    }
}
//////////////////////
// Helper Functions //
//////////////////////
function _updateSourcePluginJson(restore = false) {
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
function _makeSureDirectoryExists(dir) {
    if (!fs_1.default.existsSync(dir)) {
        console.log('[ZEGO][RTC] Make:', dir);
        fs_1.default.mkdirSync(dir);
    }
}
function _removeDirectory(dir) {
    console.log('[ZEGO][RTC] Remove:', dir);
    fs_1.default.rmSync(dir, { force: true, maxRetries: 3, recursive: true });
}
function _copyDirectory(src, dst, log = true) {
    if (log) {
        console.log('[ZEGO][RTC] Copy directory from', src, 'to', dst);
    }
    fs_1.default.mkdirSync(dst, { recursive: true });
    let entries = fs_1.default.readdirSync(src, { withFileTypes: true });
    for (let entry of entries) {
        let srcPath = path_1.default.join(src, entry.name);
        let dstPath = path_1.default.join(dst, entry.name);
        if (entry.isSymbolicLink()) {
            fs_1.default.symlinkSync(fs_1.default.readlinkSync(srcPath), dstPath);
        }
        else if (entry.isDirectory()) {
            _copyDirectory(srcPath, dstPath, false);
        }
        else {
            fs_1.default.copyFileSync(srcPath, dstPath);
        }
    }
}
