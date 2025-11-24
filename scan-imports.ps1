# PowerShell script to find and fix import case sensitivity issues

$srcDir = ".\src"
$report = @{
    filesScanned = 0
    issuesFound = @()
    fixesApplied = @()
}

# Build file map
Write-Host "Building file map..." -ForegroundColor Cyan
$fileMap = @{}
Get-ChildItem -Path $srcDir -Recurse -Include *.jsx,*.js,*.tsx,*.ts | Where-Object {
    $_.FullName -notmatch '\\node_modules\\|\\dist\\|\\.git\\'
} | ForEach-Object {
    $relPath = $_.FullName.Replace((Get-Location).Path + "\src\", "").Replace("\", "/")
    $fileMap[$relPath.ToLower()] = @{
        actualPath = $relPath
        fullPath = $_.FullName
        name = $_.Name
    }
}

Write-Host "Found $($fileMap.Count) files" -ForegroundColor Green

# Scan files
Write-Host "`nScanning files for import issues..." -ForegroundColor Cyan

Get-ChildItem -Path $srcDir -Recurse -Include *.jsx,*.js,*.tsx,*.ts | Where-Object {
    $_.FullName -notmatch '\\node_modules\\|\\dist\\|\\.git\\'
} | ForEach-Object {
    $report.filesScanned++
    $file = $_
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $relPath = $file.FullName.Replace((Get-Location).Path + "\src\", "").Replace("\", "/")
    
    # Find all imports
    $pattern = 'from\s+([''"])([^''"]+)\1'
    $matches = [regex]::Matches($content, $pattern)
    
    $newContent = $content
    $offset = 0
    
    foreach ($match in $matches) {
        $importPath = $match.Groups[2].Value
        
        # Skip external packages
        if (-not $importPath.StartsWith('.')) { continue }
        
        # Resolve import
        $currentDir = Split-Path $relPath -Parent
        if ($currentDir) {
            $targetPath = Join-Path $currentDir $importPath
        } else {
            $targetPath = $importPath.TrimStart('./')
        }
        $targetPath = $targetPath.Replace("\", "/")
        
        # Try to find the file
        $found = $null
        $extensions = @('', '.jsx', '.js', '.tsx', '.ts')
        foreach ($ext in $extensions) {
            $testPath = ($targetPath + $ext).ToLower()
            if ($fileMap.ContainsKey($testPath)) {
                $found = $fileMap[$testPath]
                break
            }
        }
        
        # Try index files
        if (-not $found) {
            $indexFiles = @('/index.jsx', '/index.js', '/index.tsx', '/index.ts')
            foreach ($idx in $indexFiles) {
                $testPath = ($targetPath + $idx).ToLower()
                if ($fileMap.ContainsKey($testPath)) {
                    $found = $fileMap[$testPath]
                    break
                }
            }
        }
        
        if (-not $found) {
            $report.issuesFound += @{
                file = $relPath
                import = $importPath
                reason = "File not found"
            }
        } else {
            # Calculate correct path
            $currentFullDir = Split-Path $file.FullName -Parent
            $targetFullPath = $found.fullPath
            
            $correctPath = (Resolve-Path -Path $targetFullPath -Relative -RelativeBasePath $currentFullDir).Replace("\", "/")
            if (-not $correctPath.StartsWith('.')) {
                $correctPath = "./" + $correctPath
            }
            
            # Remove extension
            $correctPath = $correctPath -replace '\.(jsx|js|tsx|ts)$', ''
            
            if ($importPath -ne $correctPath) {
                Write-Host "  Found issue in $relPath" -ForegroundColor Yellow
                Write-Host "    $importPath -> $correctPath" -ForegroundColor Gray
                
                $report.fixesApplied += @{
                    file = $relPath
                    old = $importPath
                    new = $correctPath
                }
            }
        }
    }
}

# Print report
Write-Host "`n" + ("=" * 80) -ForegroundColor Cyan
Write-Host "SUMMARY" -ForegroundColor Cyan
Write-Host ("=" * 80) -ForegroundColor Cyan
Write-Host "Files Scanned: $($report.filesScanned)"
Write-Host "Fixes Needed: $($report.fixesApplied.Count)" -ForegroundColor Yellow
Write-Host "Issues Found: $($report.issuesFound.Count)" -ForegroundColor Red

if ($report.fixesApplied.Count -gt 0) {
    Write-Host "`nFIXES NEEDED:" -ForegroundColor Yellow
    $report.fixesApplied | Select-Object -First 20 | ForEach-Object {
        Write-Host "  $($_.file)" -ForegroundColor White
        Write-Host "    $($_.old) -> $($_.new)" -ForegroundColor Gray
    }
    
    if ($report.fixesApplied.Count -gt 20) {
        Write-Host "  ... and $($report.fixesApplied.Count - 20) more" -ForegroundColor Gray
    }
}

if ($report.issuesFound.Count -gt 0) {
    Write-Host "`nISSUES (files not found):" -ForegroundColor Red
    $report.issuesFound | Select-Object -First 10 | ForEach-Object {
        Write-Host "  $($_.file)" -ForegroundColor White
        Write-Host "    Import: $($_.import)" -ForegroundColor Gray
    }
}

# Save report
$report | ConvertTo-Json -Depth 10 | Out-File "import-scan-report.json" -Encoding UTF8
Write-Host "`nReport saved to: import-scan-report.json" -ForegroundColor Green
