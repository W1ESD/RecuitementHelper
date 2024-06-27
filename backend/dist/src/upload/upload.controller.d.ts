interface Candidate {
    Nom: string;
    Prenom: string;
    Grade: string;
    Spe: string;
}
export declare class UploadController {
    arrayFile1: any[];
    arrayFile2: any[];
    contentArray: Candidate[][];
    uploadFiles(files: any): Promise<{
        message: string;
        contentArray: Candidate[][];
    }>;
}
export {};
