import { Module } from '@nestjs/common';
import { CancellationService } from './services/cancellation.service';
import { CancellationController } from './controllers/cancellation.controller';

@Module({
  providers: [CancellationService],
  controllers: [CancellationController],
})
export class CancellationLogsModule {}
