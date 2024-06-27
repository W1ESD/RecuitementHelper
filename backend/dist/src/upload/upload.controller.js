"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer = require("multer");
const xlsx = require("xlsx");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path_1 = require("path");
let UploadController = class UploadController {
    constructor() {
        this.arrayFile1 = [];
        this.arrayFile2 = [];
        this.contentArray = [];
    }
    async uploadFiles(files) {
        try {
            if (!files || files.length === 0) {
                throw new Error('No files uploaded');
            }
            let tokens = {
                Grade: 'default1',
                Spe: 'default2',
            };
            let currentArray = [];
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
                }
                else if (index === 1) {
                    this.arrayFile2 = jsonData;
                }
                jsonData.forEach((row, rowIndex) => {
                    if (rowIndex < 4)
                        return;
                    const newItem = {
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
            const GetStep = (index, array) => {
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
                if (step === 0)
                    step = 1;
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
                    let filePath = (0, path_1.join)(outputDir, fileName);
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
                            .fontSize(12)
                            .fillColor('black')
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
        }
        catch (error) {
            console.error('Error processing files:', error);
            throw new common_1.InternalServerErrorException('An error occurred while uploading the files.');
        }
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 2, {
        storage: multer.memoryStorage(),
        fileFilter: (req, file, cb) => {
            if (!file.originalname.match(/\.(xls|xlsx)$/)) {
                return cb(new Error('Only Excel files are allowed!'), false);
            }
            cb(null, true);
        },
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadFiles", null);
exports.UploadController = UploadController = __decorate([
    (0, common_1.Controller)('upload')
], UploadController);
//# sourceMappingURL=upload.controller.js.map