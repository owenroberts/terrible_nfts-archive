const fs = require('fs');
const path = require('path');

// Specify the directory
const directoryPath = './fposts'; // Replace with your directory path

// Read the directory
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.error(`Unable to scan directory: ${err}`);
    }

    // Process each file
    files.forEach((file) => {
        const filePath = path.join(directoryPath, file);

        // Ensure it's a file (not a directory)
        fs.stat(filePath, (err, stats) => {
            if (err) {
                return console.error(`Error getting stats for file ${file}: ${err}`);
            }

            if (stats.isFile()) {
                // Read the file
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) {
                        return console.error(`Error reading file ${file}: ${err}`);
                    }

                    // Remove the first line
                    // const lines = data.split('\n');
                    // const modifiedContent = lines.slice(1).join('\n');
                    const modifiedContent = data.replace("../", "../../");

                    // Write the modified content back to the file
                    fs.writeFile(filePath, modifiedContent, (err) => {
                        if (err) {
                            return console.error(`Error writing to file ${file}: ${err}`);
                        }
                        console.log(`Processed file: ${file}`);
                    });
                });
            }
        });
    });
});
