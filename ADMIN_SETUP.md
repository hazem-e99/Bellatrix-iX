# Bellatrix Admin Dashboard Setup - New Version

This admin dashboard allows you to edit JSON data files that power your website pages in real-time.

## Features

✅ **File Management**: List and select JSON files from `/public/data/`
✅ **Dynamic Editing**: Edit nested objects, arrays, and different field types
✅ **Drag & Drop**: Reorder sections and items within arrays
✅ **Real-time Updates**: Changes reflect immediately on user pages
✅ **Preview Mode**: JSON preview with syntax highlighting
✅ **Auto-save**: Changes are saved to actual JSON files
✅ **Notifications**: Visual feedback when data is updated

## Quick Start

### 1. Start the Admin API Server

```bash
# Install dependencies (if not already done)
npm install

# Start the API server (handles JSON file operations)
node server.js
```

The API server will run on `http://localhost:3001` and provide:
- `GET /api/data` - List all JSON files
- `GET /api/data/:filename` - Get specific file content
- `PUT /api/data/:filename` - Update specific file content
- WebSocket support for real-time updates

### 2. Start the React Development Server

```bash
# In a separate terminal
npm run dev
```

### 3. Access the Admin Dashboard

Navigate to: `http://localhost:5173/admin`

## File Structure

```
public/data/
├── hr.json              # HR solutions page data
├── payroll.json         # Payroll page data
├── homeData.json        # Homepage data
├── training.json        # Training page data
└── [other].json         # Other page data files
```

## Usage

1. **Select a file** from the sidebar
2. **Edit content** using the dynamic form
3. **Reorder items** by dragging the handle icons
4. **Preview changes** in the Preview tab
5. **Save changes** - they will be written to the actual JSON file
6. **View live updates** - user pages will refresh automatically

## Data Types Supported

- **Text fields**: Short text, URLs, emails
- **Textarea**: Long text content
- **Boolean**: Show/hide toggles
- **Numbers**: Numeric values
- **Arrays**: Lists of items with drag-and-drop reordering
- **Objects**: Nested data structures
- **Images**: File paths and URLs

## Real-time Updates

The system supports two methods for real-time updates:

1. **WebSocket (Preferred)**: Instant updates when admin saves changes
2. **Polling (Fallback)**: Checks for updates every 10 seconds

User pages will automatically refresh when their data is updated from the admin dashboard.

## API Endpoints

### Get all files
```
GET /api/data
```

### Get specific file
```
GET /api/data/hr.json
```

### Update file
```
PUT /api/data/hr.json
Content-Type: application/json

{
  "data": { ... }
}
```

## Backup System

The API server automatically creates backups before updating files:
- Backups are stored in `/backups/` directory
- Filename format: `[original-name].json.[timestamp].backup`
- Helps recover from accidental changes

## Troubleshooting

### Admin Dashboard shows "Loading..." or errors
1. Make sure the API server is running (`node server.js`)
2. Check console for error messages
3. Verify JSON files exist in `/public/data/`

### Real-time updates not working
1. Check WebSocket connection in browser dev tools
2. Ensure both servers are running
3. Try refreshing the page manually

### Cannot save changes
1. Check API server logs for errors
2. Verify file permissions in `/public/data/`
3. Ensure JSON data is valid

## Development Notes

- The admin dashboard is completely separate from your user-facing pages
- No changes to existing page designs or components are required
- JSON data structure is preserved exactly as-is
- All existing functionality continues to work normally

## Security Note

In production, you should:
- Add authentication to the admin routes
- Restrict API access to authorized users
- Use HTTPS for all communications
- Consider moving admin to a separate subdomain