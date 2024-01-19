import dotenv from "dotenv";

dotenv.config();

export default {
  HOSTNAME: process.env.HOSTNAME || "localhost",
  PORT: process.env.PORT || "443",
  URL: process.env.URL || "/api/templates",
  ENDPOINT: process.env.ENDPOINT || "/Global/",

  OUTPUT_TO_FILE: process.env.OUTPUT_TO_FILE || "false",
  OUTPUT_PATH: process.env.OUTPUT_LOCATION || "output",
  OUTPUT_NAME: process.env.OUTPUT_NAME || "output",
  
  PATH_TYPE: process.env.PATH_TYPE == "windows" ? "\\" : "/",
};
