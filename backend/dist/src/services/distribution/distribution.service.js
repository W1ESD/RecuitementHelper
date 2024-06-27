"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistributionService = void 0;
const common_1 = require("@nestjs/common");
const xlsx = require("xlsx");
const fs = require("fs");
const path_1 = require("path");
const capacities_1 = require("../../../dto/capacities");
let DistributionService = class DistributionService {
    distributeData() {
        const outputDir = './output';
        const distributionDir = './distributed';
        if (!fs.existsSync(distributionDir)) {
            fs.mkdirSync(distributionDir);
        }
        const files = fs.readdirSync(outputDir).filter(file => file.endsWith('.xlsx'));
        let remainingCapacities = { ...capacities_1.classCapacities };
        files.forEach(file => {
            const filePath = (0, path_1.join)(outputDir, file);
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = xlsx.utils.sheet_to_json(sheet);
            let currentIndex = 0;
            for (const [className, capacity] of Object.entries(remainingCapacities)) {
                if (jsonData.length <= 0)
                    break;
                const remainingCapacity = capacity;
                if (jsonData.length <= remainingCapacity) {
                    this.writeToFile(distributionDir, className, jsonData);
                    remainingCapacities[className] -= jsonData.length;
                    jsonData.splice(0, jsonData.length);
                }
                else {
                    const dataChunk = jsonData.splice(0, remainingCapacity);
                    this.writeToFile(distributionDir, className, dataChunk);
                    remainingCapacities[className] = 0;
                }
            }
        });
    }
    writeToFile(directory, className, data) {
        const ws = xlsx.utils.json_to_sheet(data);
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
        const outputFilePath = (0, path_1.join)(directory, `${className}.xlsx`);
        xlsx.writeFile(wb, outputFilePath);
        console.log(`Data written to ${outputFilePath}`);
    }
};
exports.DistributionService = DistributionService;
exports.DistributionService = DistributionService = __decorate([
    (0, common_1.Injectable)()
], DistributionService);
//# sourceMappingURL=distribution.service.js.map