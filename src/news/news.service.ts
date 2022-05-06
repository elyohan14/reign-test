import { Injectable, Logger } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { New } from './entities/new.entity';

@Injectable()
export class NewsService {
  constructor(
    private httpService: HttpService,
    @InjectRepository(New)
    private newsRepository: Repository<New>,
  ) {}
  private readonly logger = new Logger(NewsService.name);

  async create(createNewsDto: CreateNewsDto[]) {
    // Save new into database if doesn't exist
    await this.newsRepository.upsert(createNewsDto, ['objectID']);
  }

  async findAll(search: string): Promise<New[]> {
    // return this.newsRepository.find();
    const [data] = await this.newsRepository.findAndCount({
      take: 5,
      skip: 0,
      where: [
        { author: Like(`%${search}%`) },
        { title: search },
        { _tags: search },
      ],
    });
    return data;
  }

  findOne(id: string): Promise<New> {
    return this.newsRepository.findOne(id);
  }

  update(id: number, updateNewsDto: UpdateNewsDto) {
    return `This action updates a #${id} news`;
  }

  async remove(id: string): Promise<void> {
    await this.newsRepository.delete(id);
  }
  /**
   * Cron every 5 seconds
   */
  @Cron('*/5 * * * * *')
  async handleCron() {
    const data = await this.getHackerNews();
    // console.log(data.hits.length);
    await this.create(data);
  }
  /**
   * Get hacker news
   */
  async getHackerNews() {
    const url = 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs';
    const { data } = await this.httpService.get(url).toPromise();
    return data.hits;
  }
}
