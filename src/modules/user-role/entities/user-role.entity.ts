import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('user_role')
export class UserRole {
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

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
