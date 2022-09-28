import os
import shutil

PROJ_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def run_clang_format():
    """Run clang-format, to foramt our source code
    Args:
        args (argparse.NameSpace): Arguments object
    """
    print('\n[*] Running "clang-format" to format source code...')

    if not shutil.which('clang-format'):
        print('\n[ERROR] Can not find "clang-format" in PATH env, skip!')
        return
    
    cmd = [
        '-r', '-q', '-i',
        os.path.join(PROJ_ROOT, 'native', 'src')
    ]

    import run_clang_format 
    run_clang_format .main(cmd)
    print('[*] "clang-format" completed! See git status for the result\n')
