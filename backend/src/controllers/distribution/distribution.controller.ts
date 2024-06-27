import { Controller, Get } from '@nestjs/common';
import { DistributionService } from '../../services/distribution/distribution.service';

@Controller('distribution')
export class DistributionController {
  constructor(private readonly distributionService: DistributionService) {}

  @Get()
  distributeData() {
    this.distributionService.distributeData();
    return { message: 'Data distributed successfully' };
  }
}
