import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the data directory
const dataDir = path.join(__dirname, 'public', 'data');
const dbPath = path.join(__dirname, 'db.json');

// Function to sync JSON Server database from individual files
function syncDatabase() {
  const database = {};
  
  try {
    // Read all JSON files in the data directory
    const files = fs.readdirSync(dataDir);
    
    files.forEach(file => {
      if (file.endsWith('.json')) {
        const fileName = path.basename(file, '.json');
        const filePath = path.join(dataDir, file);
        
        try {
          const fileContent = fs.readFileSync(filePath, 'utf8');
          const data = JSON.parse(fileContent);
          
          // Create endpoint name from filename
          let endpointName = fileName;
          
          // Handle special cases for cleaner endpoint names
          if (fileName === 'homeData') {
            endpointName = 'home';
          } else if (fileName === 'manufacturing-data') {
            endpointName = 'manufacturing';
          } else if (fileName === 'integration-data') {
            endpointName = 'integration';
          } else if (fileName === 'retail-data') {
            endpointName = 'retail';
          } else if (fileName === 'netSuiteConsulting') {
            endpointName = 'netsuite-consulting';
          }
          
          // Add data to database
          database[endpointName] = data;
          
          console.log(`✓ Synced ${file} → /${endpointName}`);
        } catch (error) {
          console.error(`✗ Error reading ${file}:`, error.message);
        }
      }
    });
    
    // Write the database to db.json
    fs.writeFileSync(dbPath, JSON.stringify(database, null, 2));
    
    console.log(`\n📁 Database synced to db.json with ${Object.keys(database).length} endpoints`);
    console.log('📍 Available endpoints:');
    Object.keys(database).forEach(endpoint => {
      console.log(`   GET http://localhost:3001/${endpoint}`);
    });
    
  } catch (error) {
    console.error('Error syncing database:', error.message);
  }
}

// Run the sync
syncDatabase();