import fs from 'fs'
import path from 'path'

let DEVELOPMENT_MODE = true

let PROJ_ASSETS_PATH = path.join(Editor.Project.path, 'assets')
let PROJ_PLUGINS_PATH = path.join(Editor.Project.path, 'native', 'plugins')

let SRC_SCRIPTS_PATH = path.join(__dirname, '..', 'scripts')
let DST_SCRIPTS_PATH = path.join(PROJ_ASSETS_PATH, 'zego_express_engine')

let SRC_NATIVE_PATH = path.join(__dirname, '..', 'native')
let DST_NATIVE_PATH = path.join(PROJ_PLUGINS_PATH, 'zego_express_engine')

//////////////////
// Entry Points //
//////////////////

export const methods: { [key: string]: (...any: any) => any } = {}

export function load() {
  console.log('[ZEGO][RTC] Extension load')
  installScripts()
  installNativePlugins()
}

export function unload() {
  console.log('[ZEGO][RTC] Extension unload')
  uninstallScripts()
  uninstallNativePlugins()
}

///////////////////////
// Scripts Operation //
///////////////////////

function installScripts() {
  uninstallScripts() // Uninstall old scripts if needed
  _makeSureDirectoryExists(PROJ_ASSETS_PATH)
  _copyDirectory(SRC_SCRIPTS_PATH, DST_SCRIPTS_PATH)
}

function uninstallScripts() {
  if (!fs.existsSync(DST_SCRIPTS_PATH)) {
    return
  }

  if (DEVELOPMENT_MODE) {
    // Copy back the modified scripts
    _removeDirectory(SRC_SCRIPTS_PATH)
    _copyDirectory(DST_SCRIPTS_PATH, SRC_SCRIPTS_PATH)
  }

  _removeDirectory(DST_SCRIPTS_PATH)
}

//////////////////////////////
// Native Plugins Operation //
//////////////////////////////

function installNativePlugins() {
  uninstallNativePlugins() // Uninstall old native plugins if needed
  _makeSureDirectoryExists(PROJ_PLUGINS_PATH)
  _copyDirectory(SRC_NATIVE_PATH, DST_NATIVE_PATH)

  if (!DEVELOPMENT_MODE) {
    _updateSourcePluginJson() // To avoid double import
  }
}

function uninstallNativePlugins() {
  if (!fs.existsSync(DST_NATIVE_PATH)) {
    return
  }

  if (DEVELOPMENT_MODE) {
    // Copy back the modified native plugins
    _removeDirectory(SRC_NATIVE_PATH)
    _copyDirectory(DST_NATIVE_PATH, SRC_NATIVE_PATH)
  }

  _removeDirectory(DST_NATIVE_PATH)

  if (!DEVELOPMENT_MODE) {
    _updateSourcePluginJson(true) // Restore the source json
  }
}

//////////////////////
// Helper Functions //
//////////////////////

function _updateSourcePluginJson(restore: boolean = false) {
  let src = path.join(__dirname, '..', 'native')
  let origin_json = path.join(src, 'cc_plugin.json')
  let backup_json = path.join(src, 'cc_plugin.bak.json')
  if (restore) {
    if (fs.existsSync(backup_json)) {
      fs.renameSync(backup_json, origin_json)
    }
  } else {
    if (fs.existsSync(origin_json)) {
      fs.renameSync(origin_json, backup_json)
    }
  }
}

function _makeSureDirectoryExists(dir: string) {
  if (!fs.existsSync(dir)) {
    console.log('[ZEGO][RTC] Make:', dir)
    fs.mkdirSync(dir)
  }
}

function _removeDirectory(dir: string) {
  console.log('[ZEGO][RTC] Remove:', dir)
  fs.rmSync(dir, { force: true, maxRetries: 3, recursive: true })
}

function _copyDirectory(src: string, dst: string, log: boolean = true) {
  if (log) {
    console.log('[ZEGO][RTC] Copy directory from', src, 'to', dst)
  }
  fs.mkdirSync(dst, { recursive: true })
  let entries = fs.readdirSync(src, { withFileTypes: true })

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name)
    let dstPath = path.join(dst, entry.name)
    if (entry.isSymbolicLink()) {
      fs.symlinkSync(fs.readlinkSync(srcPath), dstPath)
    } else if (entry.isDirectory()) {
      _copyDirectory(srcPath, dstPath, false)
    } else {
      fs.copyFileSync(srcPath, dstPath)
    }
  }
}
