import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('volunteer_status')
export class VolunteerStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
