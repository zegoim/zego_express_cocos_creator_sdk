import fs from 'fs'
import path from 'path'

let DEVELOPMENT_MODE = true

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

function installScripts() {
  uninstallScripts() // Uninstall old scripts if needed
  let assetsDir = path.join(Editor.Project.path, 'assets')
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir)
  }
  let src = path.join(__dirname, '..', 'scripts')
  let dst = path.join(Editor.Project.path, 'assets', 'zego_express_engine')
  if (DEVELOPMENT_MODE) {
    console.log('[ZEGO][RTC][DevelopmentMode] Symlink scripts from', src, 'to', dst)
    fs.symlinkSync(src, dst)
  } else {
    console.log('[ZEGO][RTC] Copy scripts from', src, 'to', dst)
    copyDirectory(src, dst)
  }
}

function uninstallScripts() {
  let dst = path.join(Editor.Project.path, 'assets', 'zego_express_engine')
  if (fs.existsSync(dst)) {
    if (DEVELOPMENT_MODE) {
      console.log('[ZEGO][RTC][DevelopmentMode] Unlink scripts directory:', dst)
      fs.unlinkSync(dst)
    } else {
      console.log('[ZEGO][RTC] Remove scripts directory:', dst)
      fs.rmSync(dst, { force: true, maxRetries: 3, recursive: true })
    }
  }
}

function installNativePlugins() {
  uninstallNativePlugins() // Uninstall old plugins if needed
  let pluginsDir = path.join(Editor.Project.path, 'native', 'plugins')
  if (!fs.existsSync(pluginsDir)) {
    console.log('[ZEGO][RTC][DevelopmentMode] mkdir pluginsDir')
    fs.mkdirSync(pluginsDir)
  }
  let src = path.join(__dirname, '..', 'native')
  let dst = path.join(pluginsDir, 'zego_express_engine')
  if (DEVELOPMENT_MODE) {
    console.log('[ZEGO][RTC][DevelopmentMode] Symlink native plugins from', src, 'to', dst)
    fs.symlinkSync(src, dst)
  } else {
    console.log('[ZEGO][RTC] Copy native plugins from', src, 'to', dst)
    copyDirectory(src, dst)
    // To avoid double import, rename the source json
    updatePluginJson()
  }
}

function uninstallNativePlugins() {
  let dst = path.join(Editor.Project.path, 'native', 'plugins', 'zego_express_engine')
  if (fs.existsSync(dst)) {
    if (DEVELOPMENT_MODE) {
      console.log('[ZEGO][RTC][DevelopmentMode] Unlink native plugins directory:', dst)
      fs.unlinkSync(dst)
    } else {
      console.log('[ZEGO][RTC] Remove native plugins directory:', dst)
      fs.rmSync(dst, { force: true, maxRetries: 3, recursive: true })
      // Restore the source json
      updatePluginJson(true)
    }
  }
}

function updatePluginJson(restore: boolean = false) {
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

function copyDirectory(src: string, dst: string) {
  fs.mkdirSync(dst, { recursive: true })
  let entries = fs.readdirSync(src, { withFileTypes: true })

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name)
    let dstPath = path.join(dst, entry.name)
    if (entry.isSymbolicLink()) {
      fs.symlinkSync(fs.readlinkSync(srcPath), dstPath)
    } else if (entry.isDirectory()) {
      copyDirectory(srcPath, dstPath)
    } else {
      fs.copyFileSync(srcPath, dstPath)
    }
  }
}
