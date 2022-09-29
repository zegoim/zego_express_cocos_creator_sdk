import fs from 'fs'
import { join } from 'path'

export const methods: { [key: string]: (...any: any) => any } = {}

export function load() {
  console.log('[ZEGO][RTC] Extension load')
  removeScripts()
  let src = join(__dirname, '..', 'scripts')
  let dst = join(Editor.Project.path, 'assets', 'zego_express_engine')
  console.log('[ZEGO][RTC] Copy scripts from', src, 'to', dst)
  copyDirectory(src, dst)
}

export function unload() {
  console.log('[ZEGO][RTC] Extension unload')
  removeScripts()
}

function removeScripts() {
  let dst = join(Editor.Project.path, 'assets', 'zego_express_engine')
  if (fs.existsSync(dst)) {
    console.log('[ZEGO][RTC] Remove scripts directory:', dst)
    fs.rmSync(dst, { force: true, maxRetries: 3, recursive: true })
  }
}

function copyDirectory(src: string, dst: string) {
  fs.mkdirSync(dst, { recursive: true })
  let entries = fs.readdirSync(src, { withFileTypes: true })

  for (let entry of entries) {
    let srcPath = join(src, entry.name)
    let dstPath = join(dst, entry.name)
    entry.isDirectory() ? copyDirectory(srcPath, dstPath) : fs.copyFileSync(srcPath, dstPath)
  }
}
