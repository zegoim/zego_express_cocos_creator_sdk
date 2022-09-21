#!/usr/bin/env python3
# coding: utf-8
# Copyright 2022 Patrick Fu. All rights reserved.

import argparse
import os
import shutil
import sys
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

def main(argv):
    args = __parse_args(argv)

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

    zip_name = 'zego_express_cocos_creator_sdk.zip'
    ziputil.zip_folder_list([os.path.join(PROJ_ROOT, x) for x in DIST], out_dir, zip_name)

if __name__ == '__main__':
    sys.exit(main(sys.argv))
