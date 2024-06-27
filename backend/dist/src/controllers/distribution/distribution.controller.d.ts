import { DistributionService } from '../../services/distribution/distribution.service';
export declare class DistributionController {
    private readonly distributionService;
    constructor(distributionService: DistributionService);
    distributeData(): {
        message: string;
    };
}
