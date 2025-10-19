import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AboutYou } from 'src/modules/about-you/entities/about-you.entity';

@Entity('fundamental_line_course')
export class FundamentalLineCourse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @OneToMany(() => AboutYou, (aboutYou) => aboutYou.fundamentalLineCourse)
  aboutYou: AboutYou[];
}
