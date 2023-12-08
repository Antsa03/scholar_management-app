"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";

interface ExcelRow {
  [key: string]: any;
}

function NoteFromExcel() {
  const [excelData, setExcelData] = useState<any[]>([]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const excelFile = new Uint8Array(event.target!.result as ArrayBuffer);
      const workbook = XLSX.read(excelFile, { type: "array" });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: ExcelRow[] = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      }) as ExcelRow[];

      let startRow = 0;
      for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i][0] === "Nom et prénoms") {
          startRow = i + 1;
          break;
        }
      }

      let infoTitles: ExcelRow = jsonData[2];
      let data = [];
      for (let i = startRow; i < jsonData.length; i++) {
        let row = jsonData[i];
        for (let j = 1; j < row.length; j++) {
          let objkey = "001" + row[0];
          let obj = {
            [objkey]: {
              nom: row[0],
              code_matiere: infoTitles[j],
              note: row[j],
            },
          };
          data.push(obj);
        }
      }
      setExcelData(data);
    };
    reader.readAsArrayBuffer(file);
  };
  return (
    <div>
      <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFileChange} />
      <pre>{JSON.stringify(excelData, null, 2)}</pre>
    </div>
  );
}

export default NoteFromExcel;
