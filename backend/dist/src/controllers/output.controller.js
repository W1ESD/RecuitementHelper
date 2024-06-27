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
exports.OutputController = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path_1 = require("path");
let OutputController = class OutputController {
    listFiles() {
        const outputDir = './output';
        if (!fs.existsSync(outputDir)) {
            throw new Error('Output directory does not exist');
        }
        return fs.readdirSync(outputDir).filter(file => file.endsWith('.pdf'));
    }
    fetchFile(filename, res) {
        const outputDir = './output';
        const filePath = (0, path_1.join)(outputDir, filename);
        if (!fs.existsSync(filePath)) {
            throw new Error('File does not exist');
        }
        res.sendFile(filePath, { root: '.' });
    }
};
exports.OutputController = OutputController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], OutputController.prototype, "listFiles", null);
__decorate([
    (0, common_1.Get)(':filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OutputController.prototype, "fetchFile", null);
exports.OutputController = OutputController = __decorate([
    (0, common_1.Controller)('output')
], OutputController);
//# sourceMappingURL=output.controller.js.map