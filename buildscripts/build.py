#!/usr/bin/env python3
# coding: utf-8
# Copyright 2022 Patrick Fu. All rights reserved.

import argparse
import os
import shutil
import subprocess
import sys
import utils
import ziputil
from downloader import Downloader

PROJ_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DIST = [
    'dist',
    'i18n',
    'native',
    # 'node_modules',
    'package.json',
    'scripts',
    'VERSION.txt',
]

def __parse_args(args):
    parser = argparse.ArgumentParser()
    parser.add_argument('-n', '--no-download-deps', default=False, action='store_true', help='Whether not to download native dependencies.')
    return parser.parse_args(args[1:])

def updateMainScript(restore=False):
    main_script = os.path.join(PROJ_ROOT, 'dist', 'main.js')
    key = 'let DEVELOPMENT_MODE = '
    with open(main_script, 'r') as fr:
        content = fr.readlines()
    with open(main_script, 'w') as fw:
        for line in content:
            if key in line:
                line = key + ('true' if restore else 'false') + ';\n'
            fw.write(line)

def main(argv):
    args = __parse_args(argv)

    subprocess.check_call('npm install', shell=True, cwd=PROJ_ROOT)

    utils.run_clang_format()
    utils.run_prettier()
    utils.run_gitmoji_changelog()

    if not args.no_download_deps:
        downloader = Downloader()
        downloader.download()
        version = downloader.get_lib_version()
        with open(os.path.join(PROJ_ROOT, 'VERSION.txt'), 'w') as f:
            f.write(version)

    out_dir = os.path.join(PROJ_ROOT, '_out')
    if os.path.exists(out_dir):
        shutil.rmtree(out_dir)
    os.makedirs(out_dir)

    # Update the main script
    subprocess.check_call('npm run build', shell=True, cwd=PROJ_ROOT)

    # Make a release script
    updateMainScript() 

    zip_name = 'zego_express_cocos_creator_sdk.zip'
    ziputil.zip_folder_list([os.path.join(PROJ_ROOT, x) for x in DIST], out_dir, zip_name)

    # Restore the script
    updateMainScript(True)

if __name__ == '__main__':
    sys.exit(main(sys.argv))
