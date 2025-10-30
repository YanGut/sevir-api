import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AboutYou } from 'src/modules/about-you/entities/about-you.entity';

@Entity('baptized_status')
export class BaptizedStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => AboutYou, (aboutYou) => aboutYou.baptizedStatus)
  aboutYou: AboutYou[];
}
