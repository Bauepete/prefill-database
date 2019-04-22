import fs from "fs"
import {CommandLine} from "./CommandLine.mjs"

const commandLine = new CommandLine(process.argv)

if (commandLine.count !== 2) {
  console.error("usage: node importImages.js <image-directory> <db-file>")
  process.exit(-1)
}

const imageDirectory = commandLine.getElement(0)
if (!imageDirectoryIsOk(imageDirectory)) {
  console.error("Given image directory does either not exist or is no directory")
  process.exit(-1)
}

const dbFile = commandLine.getElement(1)
if (!dbFileIsOk(dbFile)) {
  console.error("DB file does not exist")
  process.exit(-1)
}

const fileContent = fs.readFileSync(dbFile, "utf-8")

let dbContent = JSON.parse(fileContent)

const imagePaths =  []
const imageFiles = fs
  .readdirSync(imageDirectory)
  .forEach(file => {
    const imgRecord = {
      id: imagePaths.length + 1,
      name: file,
      src: "images/"+file
    }
    imagePaths.push(imgRecord)
  })
dbContent.enumIconsPaths = imagePaths

fs.writeFileSync(dbFile, JSON.stringify(dbContent, null, 2), "utf-8")

function imageDirectoryIsOk(imageDirectory) {
  return fs.existsSync(imageDirectory) && fs.lstatSync(imageDirectory).isDirectory()
}

function dbFileIsOk(dbFile) {
  return fs.existsSync(dbFile) && fs.lstatSync(dbFile).isFile()
}
