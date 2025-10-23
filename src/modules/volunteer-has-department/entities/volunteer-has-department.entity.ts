import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Volunteer } from 'src/modules/volunteer/entities/volunteer.entity';
import { Department } from 'src/modules/department/entities/department.entity';
import { VolunteerStatus } from 'src/modules/volunteer-status/entities/volunteer-status.entity';

@Entity('volunteer_has_department')
export class VolunteerHasDepartment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Volunteer, (volunteer) => volunteer.id, { nullable: false })
  volunteer: Volunteer;

  @ManyToOne(() => Department, (department) => department.id, { nullable: false })
  department: Department;

  @ManyToOne(() => VolunteerStatus, (volunteerStatus) => volunteerStatus.id, { nullable: false })
  volunteerStatus: VolunteerStatus;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
