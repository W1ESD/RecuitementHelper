import { Controller, Post, UploadedFiles, UseInterceptors, InternalServerErrorException } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as xlsx from 'xlsx';
import PDFDocument = require('pdfkit');
import * as fs from 'fs';
import { join } from 'path';

interface Candidate {
  Nom: string;
  Prenom: string;
  Grade: string;
  Spe: string;
}

@Controller('upload')
export class UploadController {
  arrayFile1: any[] = [];
  arrayFile2: any[] = [];
  contentArray: Candidate[][] = [];

  @Post()
  @UseInterceptors(FilesInterceptor('files', 2, {
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(xls|xlsx)$/)) {
        return cb(new Error('Only Excel files are allowed!'), false);
      }
      cb(null, true);
    },
  }))
  async uploadFiles(@UploadedFiles() files) {
    try {
      if (!files || files.length === 0) {
        throw new Error('No files uploaded');
      }

      let tokens = {
        Grade: 'default1',
        Spe: 'default2',
      };
      let currentArray: Candidate[] = [];

      const finalizeCurrentArray = () => {
        if (currentArray.length > 0) {
          this.contentArray.push(currentArray);
          currentArray = [];
        }
      };

      files.forEach((file, index) => {
        const workbook = xlsx.read(file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(sheet, { header: 1 });

        if (index === 0) {
          this.arrayFile1 = jsonData;
        } else if (index === 1) {
          this.arrayFile2 = jsonData;
        }

        jsonData.forEach((row, rowIndex) => {
          if (rowIndex < 4) return; // Skip the first 5 lines

          const newItem: Candidate = {
            Nom: row[2] || 'Nom',
            Prenom: row[3] || 'Prenom',
            Grade: row[7] || 'SANS GRADE',
            Spe: row[8] || 'SANS SPECIALITE',
          };

          if (newItem.Grade !== tokens.Grade || newItem.Spe !== tokens.Spe) {
            finalizeCurrentArray();
            tokens.Grade = newItem.Grade;
            tokens.Spe = newItem.Spe;
          }

          currentArray.push(newItem);
        });
      });

      const arrayClass = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 100, 100, 199];
      finalizeCurrentArray();
      let currentIndex = 0;

      const GetStep = (index: number, array: Candidate[]): { step: number; flag: boolean } => {
        let step = 0;
        let flag = true;
        let sum = arrayClass[index++];
        let lastCapacity = 0;
        while (array.length > sum) {
          lastCapacity = array.length - sum;
          flag = false;
          sum += arrayClass[index++];
          step++;
        }
        if (lastCapacity > (arrayClass[index] / 5)) {
          step++;
          flag = true;
        }

        if (step === 0) step = 1;

        return { step, flag };
      };

      let newStepIndex;
      console.log('Processed content arrays:');
      this.contentArray.forEach((array, index) => {
        const { step, flag } = GetStep(currentIndex, array);
        newStepIndex = currentIndex + step;

        while (currentIndex < newStepIndex && currentIndex < arrayClass.length) {
          console.log('CurrentIndex:', currentIndex);
          const outputDir = './output';
          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
          }
          console.log('Current Index' + currentIndex);
          let fileName = `class_${currentIndex + 1}--${array[0].Grade}--${array[0].Spe}.pdf`;
          let filePath = join(outputDir, fileName);
          let doc = new PDFDocument();
          doc.pipe(fs.createWriteStream(filePath));
          doc.fontSize(25)
          .fillColor('blue')
          .text(`Classe-${currentIndex + 1}--${array[0].Grade}--${array[0].Spe}`, { align: 'center' });
          doc.moveDown();
          for (let j = 0; j < arrayClass[currentIndex]; j++) {
            if (j >= array.length) {
              break;
            }
            doc
    .fontSize(12) // Set font size
    .fillColor('black') // Set text color to black
    .text(`${array[j].Nom}        ${array[j].Prenom}        ${array[j].Grade}       ${array[j].Spe}`, {
      align: 'left'
    });
            doc.text('--------------------------------------------------------------------------------------------------------------------');
            doc.moveDown();
          }
          doc.end();
          currentIndex++;
        }
      });

      return { message: 'Files uploaded and processed successfully', contentArray: this.contentArray };
    } catch (error) {
      console.error('Error processing files:', error);
      throw new InternalServerErrorException('An error occurred while uploading the files.');
    }
  }
}
