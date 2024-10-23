import fs from "fs";
import path from "path";
import inquirer from "inquirer";

// Ruta de la carpeta de entrada y salida
const inputDir: string = path.join(__dirname, "../files");
const outputDir: string = path.join(__dirname, "../copies");

inquirer
  .prompt([
    {
      type: "number",
      name: "filesNumber",
      message: "Escribe el número de copias: ",
    },
  ])
  .then(({ filesNumber }) => {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    fs.readdir(inputDir, (err, files) => {
      if (err) {
        console.error("Error leyendo los archivos:", err);
        return;
      }

      files.forEach((file) => {
        const fileExtension = file.split(".").at(-1);
        const fileWithoutExtension = file.split(".").at(0);

        if (!fileWithoutExtension) return;

        const inputPath = path.join(inputDir, file);

        for (
          let numberOfCopy = 1;
          numberOfCopy <= filesNumber;
          numberOfCopy++
        ) {
          const outputPath = path.join(
            outputDir,
            `${numberOfCopy}-regions.${fileExtension}`
          );

          fs.copyFileSync(inputPath, outputPath);
        }
      });
    });
  });
