import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import { join } from 'path';

@Controller('output')
export class OutputController {
  @Get()
  listFiles(): string[] {
    const outputDir = './output';
    if (!fs.existsSync(outputDir)) {
      throw new Error('Output directory does not exist');
    }
    return fs.readdirSync(outputDir).filter(file => file.endsWith('.pdf'));
  }

  @Get(':filename')
  fetchFile(@Param('filename') filename: string, @Res() res: Response) {
    const outputDir = './output';
    const filePath = join(outputDir, filename);

    if (!fs.existsSync(filePath)) {
      throw new Error('File does not exist');
    }

    res.sendFile(filePath, { root: '.' });
  }
}
