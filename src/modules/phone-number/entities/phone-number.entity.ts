import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Volunteer } from 'src/modules/volunteer/entities/volunteer.entity';

@Entity('phone_number')
export class PhoneNumber {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'number', type: 'varchar', length: 24, nullable: false })
  number: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @OneToMany(() => Volunteer, (volunteer) => volunteer.phoneNumber)
  volunteers: Volunteer[];
}
