import fs from "fs";

const path = "./database/data.json";

const saveOnDB = (data) => {
  fs.writeFileSync(path, JSON.stringify(data));
};

const readFromDB = (data) => {
  if (!fs.existsSync(path)) {
    return null;
  }

  const info = fs.readFileSync(path, "utf8");

  return JSON.parse(info);
};

export { saveOnDB, readFromDB };
