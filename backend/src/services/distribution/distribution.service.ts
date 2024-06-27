import { Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';
import * as fs from 'fs';
import { join } from 'path';
import { classCapacities } from '../../../dto/capacities';

@Injectable()
export class DistributionService {
  distributeData() {
    const outputDir = './output';
    const distributionDir = './distributed';

    if (!fs.existsSync(distributionDir)) {
      fs.mkdirSync(distributionDir);
    }

    const files = fs.readdirSync(outputDir).filter(file => file.endsWith('.xlsx'));

    let remainingCapacities = { ...classCapacities };

    files.forEach(file => {
      const filePath = join(outputDir, file);
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = xlsx.utils.sheet_to_json(sheet) as any[];

      let currentIndex = 0;

      for (const [className, capacity] of Object.entries(remainingCapacities)) {
        if (jsonData.length <= 0) break;

        const remainingCapacity = capacity as number;

        if (jsonData.length <= remainingCapacity) {
          this.writeToFile(distributionDir, className, jsonData);
          remainingCapacities[className] -= jsonData.length;
          jsonData.splice(0, jsonData.length);
        } else {
          const dataChunk = jsonData.splice(0, remainingCapacity);
          this.writeToFile(distributionDir, className, dataChunk);
          remainingCapacities[className] = 0;
        }
      }
    });
  }

  private writeToFile(directory: string, className: string, data: any[]) {
    const ws = xlsx.utils.json_to_sheet(data);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    const outputFilePath = join(directory, `${className}.xlsx`);
    xlsx.writeFile(wb, outputFilePath);
    console.log(`Data written to ${outputFilePath}`);
  }
}
