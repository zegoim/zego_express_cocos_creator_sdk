import os
import shutil
import subprocess

PROJ_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def run_clang_format():
    if not shutil.which('clang-format'):
        print('\n[ERROR] Can not find "clang-format" in PATH env, skip!')
        return
    cmd = ['-r', '-q', '-i', os.path.join(PROJ_ROOT, 'native', 'src')]
    import run_clang_format
    run_clang_format.main(cmd)

def run_prettier():
    subprocess.check_call(' '.join(['npx', 'prettier', '--write', PROJ_ROOT]), shell=True, cwd=PROJ_ROOT)
