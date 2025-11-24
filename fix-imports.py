import os
import re
import json
from pathlib import Path

# Configuration
SRC_DIR = Path(__file__).parent / 'src'
EXTENSIONS = {'.jsx', '.js', '.tsx', '.ts'}

# Results
file_map = {}
issues = []
fixes = []

def build_file_map():
    """Build a map of all source files with their exact paths"""
    for root, dirs, files in os.walk(SRC_DIR):
        # Skip node_modules, .git, dist
        dirs[:] = [d for d in dirs if d not in {'node_modules', '.git', 'dist'}]
        
        for file in files:
            if Path(file).suffix in EXTENSIONS:
                full_path = Path(root) / file
                rel_path = full_path.relative_to(SRC_DIR).as_posix()
                key = rel_path.lower()
                file_map[key] = {
                    'actualPath': rel_path,
                    'fullPath': str(full_path),
                    'name': file
                }
    
    print(f"✓ Found {len(file_map)} files")

def resolve_import(import_path, current_file):
    """Resolve an import path to an actual file"""
    if not import_path.startswith('.'):
        return None  # External package
    
    current_dir = Path(current_file).parent
    target = (current_dir / import_path).as_posix()
    
    # Try with different extensions
    for ext in ['', '.jsx', '.js', '.tsx', '.ts']:
        test_path = (target + ext).lower()
        if test_path in file_map:
            return file_map[test_path]
    
    # Try index files
    for idx in ['/index.jsx', '/index.js', '/index.tsx', '/index.ts']:
        test_path = (target + idx).lower()
        if test_path in file_map:
            return file_map[test_path]
    
    return None

def get_correct_import_path(current_file, target_file):
    """Generate the correct relative import path"""
    current_path = SRC_DIR / current_file
    target_path = SRC_DIR / target_file['actualPath']
    
    rel_path = os.path.relpath(target_path, current_path.parent)
    rel_path = rel_path.replace('\\', '/')
    
    if not rel_path.startswith('.'):
        rel_path = './' + rel_path
    
    # Remove extension
    rel_path = re.sub(r'\.(jsx|js|tsx|ts)$', '', rel_path)
    
    return rel_path

def fix_file(file_path):
    """Fix imports in a single file"""
    rel_path = file_path.relative_to(SRC_DIR).as_posix()
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"✗ Error reading {rel_path}: {e}")
        return
    
    # Find all imports
    import_pattern = r'from\s+([\'"])([^\'"]+)\1'
    matches = list(re.finditer(import_pattern, content))
    
    if not matches:
        return
    
    new_content = content
    offset = 0
    
    for match in matches:
        quote = match.group(1)
        import_path = match.group(2)
        
        if not import_path.startswith('.'):
            continue  # Skip external packages
        
        resolved = resolve_import(import_path, rel_path)
        
        if not resolved:
            issues.append({
                'file': rel_path,
                'import': import_path,
                'reason': 'File not found'
            })
            continue
        
        correct_path = get_correct_import_path(rel_path, resolved)
        
        if import_path != correct_path:
            old_statement = match.group(0)
            new_statement = f'from {quote}{correct_path}{quote}'
            
            start = match.start() + offset
            end = match.end() + offset
            
            new_content = new_content[:start] + new_statement + new_content[end:]
            offset += len(new_statement) - len(old_statement)
            
            fixes.append({
                'file': rel_path,
                'old': import_path,
                'new': correct_path,
                'target': resolved['actualPath']
            })
    
    if new_content != content:
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"✓ Fixed: {rel_path}")
        except Exception as e:
            print(f"✗ Error writing {rel_path}: {e}")

def scan_all_files():
    """Scan all source files"""
    for root, dirs, files in os.walk(SRC_DIR):
        dirs[:] = [d for d in dirs if d not in {'node_modules', '.git', 'dist'}]
        
        for file in files:
            if Path(file).suffix in EXTENSIONS:
                fix_file(Path(root) / file)

def print_report():
    """Print summary report"""
    print('\n' + '=' * 80)
    print('IMPORT FIX REPORT')
    print('=' * 80)
    print(f'\n📊 SUMMARY:')
    print(f'   Fixes Applied: {len(fixes)}')
    print(f'   Issues Found: {len(issues)}')
    
    if fixes:
        print(f'\n✅ FIXES APPLIED ({len(fixes)}):')
        for i, fix in enumerate(fixes[:50], 1):  # Show first 50
            print(f'\n   {i}. {fix["file"]}')
            print(f'      {fix["old"]} → {fix["new"]}')
        
        if len(fixes) > 50:
            print(f'\n   ... and {len(fixes) - 50} more fixes')
    
    if issues:
        print(f'\n❌ ISSUES ({len(issues)}):')
        for i, issue in enumerate(issues[:20], 1):  # Show first 20
            print(f'\n   {i}. {issue["file"]}')
            print(f'      Import: {issue["import"]}')
            print(f'      Reason: {issue["reason"]}')
        
        if len(issues) > 20:
            print(f'\n   ... and {len(issues) - 20} more issues')
    
    # Save JSON report
    report = {
        'fixes': fixes,
        'issues': issues,
        'summary': {
            'totalFixes': len(fixes),
            'totalIssues': len(issues)
        }
    }
    
    with open('import-fix-report.json', 'w') as f:
        json.dump(report, f, indent=2)
    
    print('\n📄 Detailed report saved to: import-fix-report.json')
    print('=' * 80 + '\n')

if __name__ == '__main__':
    print('🔍 Starting import path scanner...\n')
    print('Step 1: Building file map...')
    build_file_map()
    
    print('\nStep 2: Scanning and fixing imports...')
    scan_all_files()
    
    print('\nStep 3: Generating report...')
    print_report()
    
    print('✨ Done!\n')
