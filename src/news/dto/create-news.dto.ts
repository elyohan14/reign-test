import {
  IsNotEmpty,
  IsDate,
  IsString,
  IsNumber,
  IsObject
} from 'class-validator';

export class CreateNewsDto {
  @IsDate()
  @IsNotEmpty()
  created_at: Date;

  title: string;

  url: string;

  @IsString()
  author: string;

  points: number;

  story_text: string;

  @IsString()
  comment_text: string;

  num_comments: number;

  story_id: number;

  @IsString()
  story_title: string;

  @IsString()
  story_url: string;

  @IsNumber()
  parent_id: number;

  @IsNumber()
  created_at_i: number;

  _tags: string[];

  @IsString()

  objectID: string;

  @IsObject()
  _highlightResult: any;
}
