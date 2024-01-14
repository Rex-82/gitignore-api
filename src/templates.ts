import fs from 'fs';
import path from 'path';
const directoryPath = path.join(__dirname, '../templates');

export default async function count() {
    const files = await fs.promises.readdir(directoryPath, { recursive: true, withFileTypes: true });
    const response : any = [];
    files.forEach(element => {
        element.path = path.relative(directoryPath, element.path);
        if (element.path != "") response.push({ name: element.name, path: element.path});
    });
    console.log(response);
}
