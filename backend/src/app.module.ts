import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadController } from './upload/upload.controller';
import { OutputController } from './controllers/output.controller';

@Module({
  imports: [],
  controllers: [AppController, UploadController, OutputController],
  providers: [AppService],
})
export class AppModule {}
