#!/usr/bin/env python3
# coding: utf-8
# Copyright 2022 Patrick Fu. All rights reserved.

import os
import shutil
import ssl
import tempfile
import urllib.request
import yaml
import ziputil

PROJ_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEPS_YAML = os.path.join(PROJ_ROOT, 'DEPS.yaml')


class Downloader:
    def __init__(self) -> None:
        self.lib_version = ''
        self.deps = {}
        # Prefer use DEPS in Jenkins environment
        env_deps = os.environ.get('DEPS')
        if env_deps and len(env_deps) > 0:
            self.deps = yaml.safe_load(env_deps)
        else:
            with open(DEPS_YAML, 'r') as f:
                self.deps = yaml.safe_load(f)
        # To fix the issue of "<urlopen error [SSL: CERTIFICATE_VERIFY_FAILED] \
        # certificate verify failed: unable to get local issuer certificate (_ssl.c:1129)>"
        ssl._create_default_https_context = ssl._create_unverified_context

    def download(self):
        if 'products' in self.deps:
            self.deps = self.deps['products']

        for target in self.deps:
            platform = target.split('-')[0].replace('win', 'windows')
            dep_src = self.deps[target]
            dep_dst = os.path.join(PROJ_ROOT, 'native', platform, 'libs')
            print('[*] Downloading "{}" native SDK from "{}"'.format(platform, dep_src))

            # Remove previous deps files, except '.gitkeep' file
            self.__clean_libs_cache(dep_dst)
            temp_dir = tempfile.mkdtemp(platform)

            artifact = os.path.join(temp_dir, dep_src.split('/')[-1].split('?')[0])
            product, _ = urllib.request.urlretrieve(dep_src, artifact)
            ziputil.unzip_file(product, temp_dir)

            sdk_path = os.path.join(temp_dir, 'release', 'Library')
            for item_name in os.listdir(sdk_path):
                item_path = os.path.join(sdk_path, item_name)
                if os.path.isdir(item_path):
                    shutil.copytree(item_path, os.path.join(dep_dst, item_name), symlinks=True)
                else:
                    shutil.copy2(item_path, os.path.join(dep_dst, item_name))

            # Handle SDK version
            lib_version_file = os.path.join(temp_dir, 'release', 'VERSION.txt')
            assert os.path.exists(lib_version_file)
            with open(lib_version_file, 'r', encoding='utf8') as f:
                lib_version = f.readline().strip()
            assert len(lib_version.split('.')) == 4
            if self.lib_version:
                # All libraries should be the same [major, minor] version
                assert self.lib_version.split('.')[0] == lib_version.split('.')[0]
                assert self.lib_version.split('.')[1] == lib_version.split('.')[1]

            if not self.lib_version or int(lib_version.split('.')[3]) > int(self.lib_version.split('.')[3]):
                self.lib_version = lib_version

    def get_lib_version(self) -> str:
        assert self.lib_version
        return self.lib_version

    def __clean_libs_cache(self, libs_dir: str):
        if not os.path.exists(libs_dir):
            return
        for name in os.listdir(libs_dir):
            item = os.path.join(libs_dir, name)
            if os.path.isdir(item):
                shutil.rmtree(item)
            elif name != '.gitkeep' and name != 'README.md':
                os.remove(item)
