# PowerShell script to extract and count all colors in the project
$tailwindColors = @{}
$customColors = @{}

# Get all JavaScript/JSX/TypeScript files
$files = Get-ChildItem -Path "src\" -Recurse -Include "*.js", "*.jsx", "*.ts", "*.tsx", "*.css", "*.json"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
    if (-not $content) { continue }
    
    # Extract Tailwind color classes
    $tailwindPattern = '\b(bg|text|border|ring|shadow|outline|decoration|divide|from|via|to|accent|caret|fill|stroke|placeholder|hover:bg|hover:text|hover:border|focus:bg|focus:text|focus:border|focus:ring)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)\b|\b(bg|text|border)-(white|black|transparent|inherit|current)\b'
    $tailwindMatches = [regex]::Matches($content, $tailwindPattern)
    
    foreach ($match in $tailwindMatches) {
        $color = $match.Value
        if ($tailwindColors.ContainsKey($color)) {
            $tailwindColors[$color]++
        } else {
            $tailwindColors[$color] = 1
        }
    }
    
    # Extract custom hex colors
    $hexPattern = '#[0-9a-fA-F]{3,6}'
    $hexMatches = [regex]::Matches($content, $hexPattern)
    
    foreach ($match in $hexMatches) {
        $color = $match.Value.ToLower()
        if ($customColors.ContainsKey($color)) {
            $customColors[$color]++
        } else {
            $customColors[$color] = 1
        }
    }
    
    # Extract rgb/rgba colors
    $rgbPattern = 'rgba?\([^)]*\)'
    $rgbMatches = [regex]::Matches($content, $rgbPattern)
    
    foreach ($match in $rgbMatches) {
        $color = $match.Value
        if ($customColors.ContainsKey($color)) {
            $customColors[$color]++
        } else {
            $customColors[$color] = 1
        }
    }
}

# Sort by frequency (descending)
$sortedTailwind = $tailwindColors.GetEnumerator() | Sort-Object Value -Descending
$sortedCustom = $customColors.GetEnumerator() | Sort-Object Value -Descending

Write-Host "=== TAILWIND COLORS (Top 50) ===" -ForegroundColor Green
$sortedTailwind | Select-Object -First 50 | ForEach-Object { Write-Host "$($_.Value)x - $($_.Key)" }

Write-Host "`n=== CUSTOM COLORS ===" -ForegroundColor Cyan
$sortedCustom | ForEach-Object { Write-Host "$($_.Value)x - $($_.Key)" }

# Output to JSON file for processing
$output = @{
    tailwindColors = $sortedTailwind | ForEach-Object { @{ color = $_.Key; count = $_.Value } }
    customColors = $sortedCustom | ForEach-Object { @{ color = $_.Key; count = $_.Value } }
}

$output | ConvertTo-Json -Depth 3 | Out-File "color-analysis.json" -Encoding UTF8
Write-Host "`nResults saved to color-analysis.json" -ForegroundColor Yellow
