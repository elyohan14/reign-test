import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('news')
export class New {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  created_at: Date;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  url: string;

  @Column()
  author: string;

  @Column({ nullable: true })
  points: number;

  @Column({ nullable: true })
  story_text: string;

  @Column()
  comment_text: string;

  @Column({ nullable: true })
  num_comments: number;

  @Column()
  story_id: number;

  @Column()
  story_title: string;

  @Column({ nullable: true })
  story_url: string;

  @Column()
  parent_id: number;

  @Column()
  created_at_i: number;

  @Column('simple-array')
  _tags: string[];

  @Column({ unique: true })
  objectID: string;

  @Column({ type: 'json' })
  _highlightResult: any;
}
