import fs from "fs";
import path from "path";
import dotenv from "dotenv";
const directoryPath = path.join(__dirname, "../templates");
const outputPath = path.join(__dirname, "../output/output.json");

// Load environment variables from .env file
dotenv.config();

// Access environment variables
const HOSTNAME = process.env.HOSTNAME || "localhost";
const PORT = process.env.PORT || "3000";
const URL = process.env.URL || "/api/templates";
const ENDPOINT = process.env.ENDPOINT || "api/templates";

const OUTPUT_TO_FILE = process.env.OUTPUT_TO_FILE || "false";
const OUTPUT_PATH = process.env.OUTPUT_LOCATION || "output";
const OUTPUT_NAME = process.env.OUTPUT_NAME || "output";

// TODO: Set source directory from environment variable and/or docker volume
// TODO: Consider downloading templates from github when starting the server (check if they exist first)

export default async function count() {
  console.log("Listing .gitignore files in folder");

  const files = await fs.promises.readdir(directoryPath, {
    recursive: true,
    withFileTypes: true,
  });

  const response: any[] = [];
  const count = files.length;
  var filesCount: number = 0,
    dirCount: number = 0,
    othersCount: number = 0;

  files.forEach(async (element) => {
    const fileExtension = path.extname(element.name);
    if (fileExtension == ".gitignore") {
      filesCount++;
      // element.path = element.name;
      // element.path = path.relative(directoryPath, element.path);
      response.push({
        name: element.name,
        path: `${element.path}\\${element.name}`,
        // sha: "",
        // size: "elementSize",
        download_url: `http://${HOSTNAME}:${PORT}${URL}${ENDPOINT}${element.name}`,
        // html_url: `https://${HOSTNAME}${ENDPOINT}/${element.name}`,
      });
    } else if (element.isDirectory()) {
      dirCount++;
    } else {
      othersCount++;
    }
  });

  if (OUTPUT_TO_FILE == "true") {
    console.log("-----------------------------------");
    console.log("Output to file is enabled");
    console.log("Generating output file...");

    const output = JSON.stringify(response, null, 2);
    const outputExists = await fs.existsSync(
      `${OUTPUT_PATH}\\${OUTPUT_NAME}.json`
    );
    if (outputExists)
      await fs.promises.unlink(`${OUTPUT_PATH}\\${OUTPUT_NAME}.json`);
    await fs.promises.appendFile(`${OUTPUT_PATH}\\${OUTPUT_NAME}.json`, output);
    console.log(
      `Output appended to file ${directoryPath}\\${OUTPUT_PATH}\\${OUTPUT_NAME}.json`
    );
  }

  console.log("-----------------------------------");
  console.log(count, " files found");
  console.log(filesCount, " .gitignore files found");
  console.log(dirCount, " directories found");
  console.log(othersCount, " others found");
  console.log("-----------------------------------");
  return response;
}
