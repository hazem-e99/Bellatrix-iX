# Build Optimization Guide for Windows

## Problem
The "EMFILE: too many open files" error occurs on Windows when building projects with large dependencies like `@mui/icons-material`, which contains thousands of individual icon files.

## Solutions Implemented

### 1. **Optimized Vite Configuration** ✅
We've updated `vite.config.js` with the following optimizations:

#### Manual Chunking Strategy
- **MUI Icons**: Icons are grouped by their first letter (e.g., `mui-icons-a`, `mui-icons-b`) to reduce the number of chunks while preventing file handle exhaustion
- **MUI Core**: Separated into its own chunk
- **DND Kit**: All `@dnd-kit` packages bundled together
- **Vendor**: Other node_modules dependencies

#### Dependency Optimization
- Pre-bundled essential dependencies: `@mui/material`, `react`, `react-dom`, `react-router-dom`, and all `@dnd-kit` packages
- Removed the `exclude` for `@mui/icons-material` to prevent resolution issues

#### Resolve Configuration
- Added `dedupe` for React packages to prevent duplicate bundling

### 2. **Alternative Solutions** (if build still fails)

#### Option A: Import Icons Individually
Instead of importing from the barrel file:
```javascript
// ❌ Avoid this (loads all icons)
import { Home, Settings, User } from '@mui/icons-material';

// ✅ Do this (loads only what you need)
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import UserIcon from '@mui/icons-material/User';
```

#### Option B: Increase Windows File Handle Limit
Run PowerShell as Administrator and execute:
```powershell
# Check current limit
Get-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Services\LanmanServer\Parameters" -Name "MaxMpxCt"

# Increase limit (requires restart)
Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Services\LanmanServer\Parameters" -Name "MaxMpxCt" -Value 2048
```

#### Option C: Use Dynamic Imports
For pages that use many icons, load them dynamically:
```javascript
const IconComponent = lazy(() => import('@mui/icons-material/Home'));
```

#### Option D: Clear Cache and Rebuild
```bash
# Remove build artifacts and cache
rm -rf node_modules/.vite
rm -rf dist

# Rebuild
npm run build
```

#### Option E: Reduce Concurrent Operations
Add to `vite.config.js`:
```javascript
build: {
  rollupOptions: {
    maxParallelFileOps: 20, // Limit concurrent file operations
  }
}
```

## Current Configuration

The current `vite.config.js` includes:
- ✅ Optimized manual chunking for MUI icons
- ✅ Proper dependency pre-bundling
- ✅ React deduplication
- ✅ CommonJS transformation for mixed ES modules
- ✅ Server watch optimization for Windows

## Monitoring Build Progress

The build may take longer than usual due to:
1. Processing thousands of MUI icon files
2. Creating multiple chunk files
3. First-time dependency optimization

This is normal and expected. Subsequent builds will be faster due to caching.

## If Build Still Fails

1. **Check which icons you're actually using** - You might be importing more than needed
2. **Consider using a different icon library** - `lucide-react` or `react-icons` have fewer files
3. **Use WSL2** - Linux has higher file handle limits by default
4. **Upgrade Node.js** - Newer versions handle file operations more efficiently

## Performance Tips

- **Development**: Use `npm run dev` - it doesn't need to bundle everything
- **Production**: Build times are longer but the output is optimized
- **CI/CD**: Consider building on Linux-based runners if possible
