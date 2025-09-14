import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the data directory
const dataDir = path.join(__dirname, 'public', 'data');

// Function to create JSON Server database from individual files
function createDatabase() {
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
          
          console.log(`✓ Loaded ${file} as endpoint: /${endpointName}`);
        } catch (error) {
          console.error(`✗ Error reading ${file}:`, error.message);
        }
      }
    });
    
    console.log(`\n📁 Database created with ${Object.keys(database).length} endpoints`);
    return database;
    
  } catch (error) {
    console.error('Error creating database:', error.message);
    return {};
  }
}

// Create and export the database
const database = createDatabase();

export default database;