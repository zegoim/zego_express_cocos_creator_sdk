#!/usr/bin/env python3
# coding: utf-8
# Copyright 2022 Patrick Fu. All rights reserved.

import os
import subprocess
import sys
import tarfile
import zipfile
from typing import List


def zip_single_file(src_file: str, dst_folder: str, zip_name: str, verbose=True) -> bool:
    if not os.path.exists(src_file):
        print('[*] [ZipUtil] SRC File: "{}" dose not exist!'.format(src_file))
        return False

    if not os.path.exists(dst_folder):
        os.makedirs(dst_folder)

    zip_file = os.path.realpath(os.path.join(dst_folder, zip_name))
    basename = os.path.split(src_file)[-1]
    with zipfile.ZipFile(zip_file, 'w', zipfile.ZIP_DEFLATED) as f:
        _write_zip_content(src_file, f, basename, verbose=verbose)
    return True


def zip_folder(source_folder, dest_folder, zip_name,
    exclude_file_names: List[str]=['.DS_Store'], append_dir_link: bool=True, verbose=True):
    def _is_exclude_file(fname):
        if exclude_file_names is None or len(exclude_file_names) == 0:
            return False

        for exclude_name in exclude_file_names:
            if fname.endswith(exclude_name):
                return True
        return False

    if not os.path.exists(source_folder):
        print('[*] [ZipUtil] SRC Folder: "{}" does not exist!'.format(source_folder))
        return False

    if not os.path.exists(dest_folder):
        os.makedirs(dest_folder)

    filelist = []
    if os.path.isfile(source_folder) or os.path.islink(source_folder):
        filelist.append(source_folder)
    else:
        for root, dirs, files in os.walk(source_folder):
            for name in files:
                if _is_exclude_file(name):
                    continue
                filelist.append(os.path.join(root, name))
            if append_dir_link:
                # Folder soft links are also added to the package list (compatible with macOS framework)
                for name in dirs:
                    if os.path.islink(os.path.join(root, name)):
                        filelist.append(os.path.join(root, name))
            if len(files) == 0:
                filelist.append(root)

    zip_file = os.path.realpath(os.path.join(dest_folder, zip_name))
    f = zipfile.ZipFile(zip_file, 'w', zipfile.ZIP_DEFLATED)
    for tar in filelist:
        basename = os.path.split(source_folder)[-1]
        arcname = tar[len(source_folder):]
        filename = basename + arcname
        _write_zip_content(tar, f, filename, verbose=verbose)

    f.close()

    return True


def zip_folder_list(src_folder_list: List[str], dst_folder: str, zip_name: str,
    exclude_file_names: List[str]=['.DS_Store'], append_dir_link: bool=True,
    verbose=True):
    def _is_exclude_file(fname):
        if exclude_file_names is None or len(exclude_file_names) == 0:
            return False
        for exclude_name in exclude_file_names:
            if fname.endswith(exclude_name):
                return True
        return False

    if not os.path.exists(dst_folder):
        os.makedirs(dst_folder)

    zip_file = os.path.realpath(os.path.join(dst_folder, zip_name))
    handle = zipfile.ZipFile(zip_file, 'w', zipfile.ZIP_DEFLATED)

    for src_folder in src_folder_list:
        if not os.path.exists(src_folder):
            print('[*] [ZipUtil] SRC Folder: "{}" does not exist!'.format(src_folder))
            continue

        filelist = []
        if os.path.isfile(src_folder) or os.path.islink(src_folder):
            filelist.append(src_folder)
        else:
            for root, dirs, files in os.walk(src_folder):
                for name in files:
                    if _is_exclude_file(name):
                        continue
                    filelist.append(os.path.join(root, name))
                if append_dir_link:
                    # Folder soft links are also added to the package list (compatible with macOS framework)
                    for name in dirs:
                        if os.path.islink(os.path.join(root, name)):
                            filelist.append(os.path.join(root, name))

        for tar in filelist:
            basename = os.path.split(src_folder)[-1]
            arcname = tar[len(src_folder):]
            filename = basename + arcname
            _write_zip_content(tar, handle, filename, verbose=verbose)

    handle.close()
    return True

def _write_zip_content(src_file, zip_fh, name_in_zip, verbose=True):
    if os.path.islink(src_file):
        if verbose:
            print('>> zip link "{}"'.format(name_in_zip))
        _zipLink = zipfile.ZipInfo(name_in_zip)
        _zipLink.create_system = 3
        # long type of hex val of '0xA1ED0000L',
        # say, symlink attr magic...
        _zipLink.external_attr = 2716663808
        zip_fh.writestr(_zipLink, os.readlink(src_file))
    else:
        if verbose:
            print('>> zip file "{}"'.format(name_in_zip))
        zip_fh.write(src_file, name_in_zip)


def unzip_file(src_zip_file: str, dst_folder: str):
    """Unzip file into folder,
    using native 'unzip' command in unix like system,
    because it can preserve symlinks inside the zip

    Note: Also support tar/tgz/tar.gz/tar.xz

    Args:
        source_zip_file (str): The zip file to be unzip
        dst_folder ([type]): The destination folder
    """
    print('[*] [ZipUtil] Unzip "{}" to "{}"'.format(src_zip_file, dst_folder))
    if src_zip_file.endswith('.tar') or src_zip_file.endswith('.gz') or src_zip_file.endswith('.tgz') or src_zip_file.endswith('.xz'):
        if sys.platform == 'win32':
            with tarfile.open(src_zip_file) as f:
                f.extractall(dst_folder)
        else:
            subprocess.check_call(['tar', 'xf', src_zip_file, '-C', dst_folder])
    elif src_zip_file.endswith('.zip') or src_zip_file.endswith('.jar'):
        if sys.platform == 'win32':
            with zipfile.ZipFile(src_zip_file, 'r') as f:
                f.extractall(dst_folder)
        else:
            subprocess.check_call(['unzip', '-o', '-q', src_zip_file, '-d', dst_folder])
