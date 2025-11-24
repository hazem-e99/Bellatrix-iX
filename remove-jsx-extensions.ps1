# Remove .jsx extensions from imports

$files = Get-ChildItem -Path "src" -Recurse -Include *.jsx,*.js | Where-Object {
    $_.FullName -notmatch '\\node_modules\\|\\dist\\|\\.git\\'
}

$count = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $original = $content
    
    # Remove .jsx from ../UI/ imports
    $content = $content -replace 'from\s+([''"])\.\.\/UI\/(\w+)\.jsx\1', 'from $1../UI/$2$1'
    
    # Remove .jsx from ../../components/UI/ imports
    $content = $content -replace 'from\s+([''"])\.\.\/\.\.\/components\/UI\/(\w+)\.jsx\1', 'from $1../../components/UI/$2$1'
    
    # Remove .jsx from ../components/UI/ imports
    $content = $content -replace 'from\s+([''"])\.\.\/components\/UI\/(\w+)\.jsx\1', 'from $1../components/UI/$2$1'
    
    if ($content -ne $original) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Fixed: $($file.FullName.Replace((Get-Location).Path, '.'))" -ForegroundColor Green
        $count++
    }
}

Write-Host "`nTotal files fixed: $count" -ForegroundColor Cyan
