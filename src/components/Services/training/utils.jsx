export const renderIcon = (iconPath, className = "w-7 h-7 text-white") => {
    if (!iconPath || typeof iconPath !== 'string') return null;
    
    // Remove any "M" at the start of the path and ensure proper formatting
    const cleanedPath = iconPath.startsWith('M') ? iconPath.substring(1) : iconPath;
    
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={`M${cleanedPath}`} 
            />
        </svg>
    );
};