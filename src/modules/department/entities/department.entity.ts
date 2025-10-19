import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('department')
export class Department {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'active', type: 'boolean', default: true })
  active: boolean;

  @Column({ name: 'in_request_qe_one', type: 'boolean', default: true })
  inRequestQEOne: boolean;

  @Column({ name: 'in_request_qe_two', type: 'boolean', default: true })
  inRequestQETwo: boolean;

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

  @ManyToOne(() => User, (user) => user.departments)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
