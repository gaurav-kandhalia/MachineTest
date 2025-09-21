
import fs from "fs";
import csv from "csv-parser";
import XLSX from "xlsx";

// export const parseCSV = async (filePath) => {
//   const rows = [];
//   const stream = fs.createReadStream(filePath).pipe(csv());
  

//   for await (const row of stream) {
//     rows.push(row);
//   }



//   return rows;
// };
export const parseCSV = async (filePath) => {
  const rows = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        // Map only required keys and trim spaces
        rows.push({
          firstName: row.FirstName?.trim() || "",
          phoneNumber: row.Phone?.trim() || "",
          notes: row.Notes?.trim() || "",
        });
      })
      .on("end", () => {
        console.log("Total rows parsed:", rows.length);
        resolve(rows);
      })
      .on("error", (err) => reject(err));
  });
};
export const parseXLSX = async (filePath) => {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  return sheet;
};
