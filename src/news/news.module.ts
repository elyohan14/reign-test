import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm'; // VEr
import { New } from './entities/new.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([New])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
