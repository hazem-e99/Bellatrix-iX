import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Path to data directory
const DATA_DIR = path.join(__dirname, "public", "data");

// WebSocket support for real-time updates
import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Store connected clients
const connectedClients = new Set();

io.on("connection", (socket) => {
  connectedClients.add(socket);
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    connectedClients.delete(socket);
    console.log("Client disconnected:", socket.id);
  });
});

// Utility function to broadcast updates
function broadcastUpdate(filename, data) {
  io.emit("dataUpdated", { filename, data });
}

// Get list of all JSON files in data directory
app.get("/api/data", async (req, res) => {
  try {
    const files = await fs.readdir(DATA_DIR);
    const jsonFiles = files
      .filter((file) => file.endsWith(".json"))
      .map((file) => ({
        filename: file,
        name: file.replace(".json", ""),
        lastModified: null, // We'll add this if needed
      }));

    res.json(jsonFiles);
  } catch (error) {
    console.error("Error reading data directory:", error);
    res.status(500).json({ error: "Failed to read data directory" });
  }
});

// Get specific JSON file
app.get("/api/data/:filename", async (req, res) => {
  try {
    const { filename } = req.params;

    // Ensure filename has .json extension
    const jsonFilename = filename.endsWith(".json")
      ? filename
      : `${filename}.json`;
    const filePath = path.join(DATA_DIR, jsonFilename);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return res.status(404).json({ error: "File not found" });
    }

    const fileContent = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContent);

    res.json({
      filename: jsonFilename,
      data: data,
      lastModified: (await fs.stat(filePath)).mtime,
    });
  } catch (error) {
    console.error("Error reading file:", error);
    res.status(500).json({ error: "Failed to read file" });
  }
});

// Update specific JSON file
app.put("/api/data/:filename", async (req, res) => {
  try {
    const { filename } = req.params;
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ error: "No data provided" });
    }

    // Ensure filename has .json extension
    const jsonFilename = filename.endsWith(".json")
      ? filename
      : `${filename}.json`;
    const filePath = path.join(DATA_DIR, jsonFilename);

    // Create backup before updating
    const backupDir = path.join(__dirname, "backups");
    try {
      await fs.mkdir(backupDir, { recursive: true });
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const backupPath = path.join(
        backupDir,
        `${jsonFilename}.${timestamp}.backup`
      );

      // Copy current file to backup if it exists
      try {
        await fs.copyFile(filePath, backupPath);
      } catch {
        // File doesn't exist yet, that's okay
      }
    } catch (error) {
      console.warn("Failed to create backup:", error);
    }

    // Write new data
    const formattedData = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, formattedData, "utf8");

    // Broadcast update to connected clients
    broadcastUpdate(jsonFilename, data);

    res.json({
      success: true,
      filename: jsonFilename,
      message: "File updated successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error writing file:", error);
    res.status(500).json({ error: "Failed to write file" });
  }
});

// Legacy endpoints for direct data access (used by React app)
app.get("/home", async (req, res) => {
  try {
    const filePath = path.join(DATA_DIR, "homeData.json");
    const fileContent = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContent);
    res.json(data);
  } catch (error) {
    console.error("Error reading home data:", error);
    res.status(500).json({ error: "Failed to read home data" });
  }
});

app.get("/hr", async (req, res) => {
  try {
    const filePath = path.join(DATA_DIR, "hr.json");
    const fileContent = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContent);
    res.json(data);
  } catch (error) {
    console.error("Error reading hr data:", error);
    res.status(500).json({ error: "Failed to read hr data" });
  }
});

app.get("/payroll", async (req, res) => {
  try {
    const filePath = path.join(DATA_DIR, "payroll.json");
    const fileContent = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContent);
    res.json(data);
  } catch (error) {
    console.error("Error reading payroll data:", error);
    res.status(500).json({ error: "Failed to read payroll data" });
  }
});

app.get("/implementation", async (req, res) => {
  try {
    const filePath = path.join(DATA_DIR, "Implementation.json");
    const fileContent = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContent);
    res.json(data);
  } catch (error) {
    console.error("Error reading implementation data:", error);
    res.status(500).json({ error: "Failed to read implementation data" });
  }
});

app.get("/training", async (req, res) => {
  try {
    const filePath = path.join(DATA_DIR, "training.json");
    const fileContent = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContent);
    res.json(data);
  } catch (error) {
    console.error("Error reading training data:", error);
    res.status(500).json({ error: "Failed to read training data" });
  }
});

app.get("/customization", async (req, res) => {
  try {
    const filePath = path.join(DATA_DIR, "customization.json");
    const fileContent = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContent);
    res.json(data);
  } catch (error) {
    console.error("Error reading customization data:", error);
    res.status(500).json({ error: "Failed to read customization data" });
  }
});

app.get("/integration", async (req, res) => {
  try {
    const filePath = path.join(DATA_DIR, "integration-data.json");
    const fileContent = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContent);
    res.json(data);
  } catch (error) {
    console.error("Error reading integration data:", error);
    res.status(500).json({ error: "Failed to read integration data" });
  }
});

app.get("/manufacturing", async (req, res) => {
  try {
    const filePath = path.join(DATA_DIR, "manufacturing-data.json");
    const fileContent = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContent);
    res.json(data);
  } catch (error) {
    console.error("Error reading manufacturing data:", error);
    res.status(500).json({ error: "Failed to read manufacturing data" });
  }
});

app.get("/netSuiteConsulting", async (req, res) => {
  try {
    const filePath = path.join(DATA_DIR, "netSuiteConsulting.json");
    const fileContent = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContent);
    res.json(data);
  } catch (error) {
    console.error("Error reading netSuite consulting data:", error);
    res.status(500).json({ error: "Failed to read netSuite consulting data" });
  }
});

app.get("/retail", async (req, res) => {
  try {
    const filePath = path.join(DATA_DIR, "retail-data.json");
    const fileContent = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContent);
    res.json(data);
  } catch (error) {
    console.error("Error reading retail data:", error);
    res.status(500).json({ error: "Failed to read retail data" });
  }
});

app.get("/about", async (req, res) => {
  try {
    const filePath = path.join(DATA_DIR, "about.json");
    const fileContent = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContent);
    res.json(data);
  } catch (error) {
    console.error("Error reading about data:", error);
    res.status(500).json({ error: "Failed to read about data" });
  }
});

// API endpoint for about data (for Redux store)
app.get("/api/about", async (req, res) => {
  try {
    const filePath = path.join(DATA_DIR, "about.json");
    const fileContent = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContent);
    res.json({ data });
  } catch (error) {
    console.error("Error reading about data:", error);
    res.status(500).json({ error: "Failed to read about data" });
  }
});

// ========== PAGES MANAGEMENT API ==========

// Get list of all pages (JSON files)
app.get("/api/pages", async (req, res) => {
  try {
    const files = await fs.readdir(DATA_DIR);
    const jsonFiles = files.filter((file) => file.endsWith(".json"));

    const pages = await Promise.all(
      jsonFiles.map(async (file) => {
        try {
          const filePath = path.join(DATA_DIR, file);
          const stats = await fs.stat(filePath);
          const content = await fs.readFile(filePath, "utf8");
          const data = JSON.parse(content);

          return {
            name: file.replace(".json", ""),
            filename: file,
            lastModified: stats.mtime,
            size: stats.size,
            hasData: Object.keys(data).length > 0,
            dataPreview: Object.keys(data).slice(0, 3), // First 3 keys for preview
          };
        } catch (error) {
          return {
            name: file.replace(".json", ""),
            filename: file,
            lastModified: null,
            size: 0,
            hasData: false,
            error: "Failed to read file",
          };
        }
      })
    );

    res.json(pages);
  } catch (error) {
    console.error("Error reading pages:", error);
    res.status(500).json({ error: "Failed to read pages directory" });
  }
});

// Get specific page data
app.get("/api/pages/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const filename = name.endsWith(".json") ? name : `${name}.json`;
    const filePath = path.join(DATA_DIR, filename);

    const content = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(content);

    res.json({
      name: name.replace(".json", ""),
      filename,
      data,
    });
  } catch (error) {
    if (error.code === "ENOENT") {
      res.status(404).json({ error: "Page not found" });
    } else {
      console.error("Error reading page:", error);
      res.status(500).json({ error: "Failed to read page data" });
    }
  }
});

// Create new page
app.post("/api/pages", async (req, res) => {
  try {
    const { name, data } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Page name is required" });
    }

    const sanitizedName = name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, "-");
    const filename = `${sanitizedName}.json`;
    const filePath = path.join(DATA_DIR, filename);

    // Check if file already exists
    try {
      await fs.access(filePath);
      return res.status(409).json({ error: "Page already exists" });
    } catch (error) {
      // File doesn't exist, which is what we want
      if (error.code !== "ENOENT") {
        throw error;
      }
    }

    // Handle enhanced page builder data structure
    let pageData;
    if (data && data.components && Array.isArray(data.components)) {
      // Enhanced page builder format
      pageData = {
        name: data.name || sanitizedName,
        categoryId: data.categoryId || 0,
        slug: data.slug || sanitizedName,
        metaTitle: data.metaTitle || "",
        metaDescription: data.metaDescription || "",
        isHomepage: data.isHomepage || false,
        isPublished: data.isPublished || false,
        components: data.components.map((component) => ({
          componentType: component.componentType,
          componentName: component.componentName,
          contentJson: component.contentJson,
          orderIndex: component.orderIndex,
        })),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    } else {
      // Legacy format
      pageData = data || {
        title: sanitizedName,
        content: "",
        createdAt: new Date().toISOString(),
      };
    }

    await fs.writeFile(filePath, JSON.stringify(pageData, null, 2));

    // Broadcast update
    broadcastUpdate(filename, pageData);

    res.status(201).json({
      name: sanitizedName,
      filename,
      data: pageData,
      message: "Page created successfully",
    });
  } catch (error) {
    console.error("Error creating page:", error);
    res.status(500).json({ error: "Failed to create page" });
  }
});

// Update page data
app.put("/api/pages/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ error: "Page data is required" });
    }

    const filename = name.endsWith(".json") ? name : `${name}.json`;
    const filePath = path.join(DATA_DIR, filename);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch (accessError) {
      return res.status(404).json({ error: "Page not found" });
    }

    // Add lastModified timestamp
    const updatedData = {
      ...data,
      lastModified: new Date().toISOString(),
    };

    await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2));

    // Broadcast update
    broadcastUpdate(filename, updatedData);

    res.json({
      name: name.replace(".json", ""),
      filename,
      data: updatedData,
      message: "Page updated successfully",
    });
  } catch (error) {
    console.error("Error updating page:", error);
    res.status(500).json({ error: "Failed to update page" });
  }
});

// Delete page
app.delete("/api/pages/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const filename = name.endsWith(".json") ? name : `${name}.json`;
    const filePath = path.join(DATA_DIR, filename);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch (accessError) {
      return res.status(404).json({ error: "Page not found" });
    }

    await fs.unlink(filePath);

    // Broadcast deletion
    broadcastUpdate(filename, null);

    res.json({
      name: name.replace(".json", ""),
      filename,
      message: "Page deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting page:", error);
    res.status(500).json({ error: "Failed to delete page" });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// ========== JSON SERVER COMPATIBILITY ENDPOINTS ==========
// Serve db.json content for compatibility with existing frontend code

// Load db.json data
let dbData = {};

const loadDbData = async () => {
  try {
    const dbPath = path.join(__dirname, "db.json");
    const dbContent = await fs.readFile(dbPath, "utf8");
    dbData = JSON.parse(dbContent);
    console.log("✓ Loaded db.json data");
  } catch (error) {
    console.error("Error loading db.json:", error);
  }
};

// Load data on startup
loadDbData();

// Serve individual endpoints from db.json
app.get("/customization", (req, res) => {
  res.json(dbData.customization || {});
});

app.get("/home", (req, res) => {
  res.json(dbData.home || {});
});

app.get("/hr", (req, res) => {
  res.json(dbData.hr || {});
});

app.get("/Implementation", (req, res) => {
  res.json(dbData.Implementation || {});
});

app.get("/integration", (req, res) => {
  res.json(dbData.integration || {});
});

app.get("/manufacturing", (req, res) => {
  res.json(dbData.manufacturing || {});
});

app.get("/netsuite-consulting", (req, res) => {
  res.json(dbData["netsuite-consulting"] || {});
});

app.get("/payroll", (req, res) => {
  res.json(dbData.payroll || {});
});

app.get("/retail", (req, res) => {
  res.json(dbData.retail || {});
});

app.get("/training", (req, res) => {
  res.json(dbData.training || {});
});

// Serve the full database
app.get("/db", (req, res) => {
  res.json(dbData);
});

// Error handling middleware
app.use((err, req, res, _next) => {
  console.error("Server error:", err);
  if (res && typeof res.status === "function") {
    res.status(500).json({ error: "Internal server error" });
  } else {
    res.end("Internal server error");
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Admin API Server running on http://localhost:${PORT}`);
  console.log(`📁 Data directory: ${DATA_DIR}`);
  console.log(`🔄 WebSocket enabled for real-time updates`);
});
