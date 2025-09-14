import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Path to data directory
const DATA_DIR = path.join(__dirname, 'public', 'data');

// WebSocket support for real-time updates
import { createServer } from 'http';
import { Server } from 'socket.io';

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Store connected clients
const connectedClients = new Set();

io.on('connection', (socket) => {
  connectedClients.add(socket);
  console.log('Client connected:', socket.id);
  
  socket.on('disconnect', () => {
    connectedClients.delete(socket);
    console.log('Client disconnected:', socket.id);
  });
});

// Utility function to broadcast updates
function broadcastUpdate(filename, data) {
  io.emit('dataUpdated', { filename, data });
}

// Get list of all JSON files in data directory
app.get('/api/data', async (req, res) => {
  try {
    const files = await fs.readdir(DATA_DIR);
    const jsonFiles = files
      .filter(file => file.endsWith('.json'))
      .map(file => ({
        filename: file,
        name: file.replace('.json', ''),
        lastModified: null // We'll add this if needed
      }));
    
    res.json(jsonFiles);
  } catch (error) {
    console.error('Error reading data directory:', error);
    res.status(500).json({ error: 'Failed to read data directory' });
  }
});

// Get specific JSON file
app.get('/api/data/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    
    // Ensure filename has .json extension
    const jsonFilename = filename.endsWith('.json') ? filename : `${filename}.json`;
    const filePath = path.join(DATA_DIR, jsonFilename);
    
    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return res.status(404).json({ error: 'File not found' });
    }
    
    const fileContent = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    res.json({
      filename: jsonFilename,
      data: data,
      lastModified: (await fs.stat(filePath)).mtime
    });
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).json({ error: 'Failed to read file' });
  }
});

// Update specific JSON file
app.put('/api/data/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const { data } = req.body;
    
    if (!data) {
      return res.status(400).json({ error: 'No data provided' });
    }
    
    // Ensure filename has .json extension
    const jsonFilename = filename.endsWith('.json') ? filename : `${filename}.json`;
    const filePath = path.join(DATA_DIR, jsonFilename);
    
    // Create backup before updating
    const backupDir = path.join(__dirname, 'backups');
    try {
      await fs.mkdir(backupDir, { recursive: true });
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupPath = path.join(backupDir, `${jsonFilename}.${timestamp}.backup`);
      
      // Copy current file to backup if it exists
      try {
        await fs.copyFile(filePath, backupPath);
      } catch {
        // File doesn't exist yet, that's okay
      }
    } catch (error) {
      console.warn('Failed to create backup:', error);
    }
    
    // Write new data
    const formattedData = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, formattedData, 'utf8');
    
    // Broadcast update to connected clients
    broadcastUpdate(jsonFilename, data);
    
    res.json({
      success: true,
      filename: jsonFilename,
      message: 'File updated successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error writing file:', error);
    res.status(500).json({ error: 'Failed to write file' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((error, req, res) => {
  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

server.listen(PORT, () => {
  console.log(`🚀 Admin API Server running on http://localhost:${PORT}`);
  console.log(`📁 Data directory: ${DATA_DIR}`);
  console.log(`🔄 WebSocket enabled for real-time updates`);
});