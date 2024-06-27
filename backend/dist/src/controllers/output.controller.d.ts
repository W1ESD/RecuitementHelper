import { Response } from 'express';
export declare class OutputController {
    listFiles(): string[];
    fetchFile(filename: string, res: Response): void;
}
