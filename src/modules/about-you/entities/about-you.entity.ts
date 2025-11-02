import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { GcParticipationTime } from 'src/modules/gc-participation-time/entities/gc-participation-time.entity';
import { FundamentalLineCourse } from 'src/modules/fundamental-line-course/entities/fundamental-line-course.entity';
import { Volunteer } from 'src/modules/volunteer/entities/volunteer.entity';
import { BaptizedStatus } from 'src/modules/baptized-status/entities/baptized-status.entity';

@Entity('about_you')
export class AboutYou {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name_gc_leader', type: 'varchar', length: 255, nullable: false })
  nameGcLeader: string;

  @Column({ name: 'leader_contact', type: 'varchar', length: 255, nullable: false })
  leaderContact: string;

  @Column({ name: 'department_participation', type: 'text', nullable: false })
  departmentParticipation: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => GcParticipationTime, (gcParticipationTime) => gcParticipationTime.aboutYou)
  @JoinColumn({ name: 'gc_participation_time_id' })
  gcParticipationTime: GcParticipationTime;

  @ManyToOne(() => FundamentalLineCourse, (fundamentalLineCourse) => fundamentalLineCourse.aboutYou)
  @JoinColumn({ name: 'fundamental_line_course_id' })
  fundamentalLineCourse: FundamentalLineCourse;

  @ManyToOne(() => BaptizedStatus, (baptizedStatus) => baptizedStatus.aboutYou)
  @JoinColumn({ name: 'baptized_status_id' })
  baptizedStatus: BaptizedStatus;

  @OneToOne(() => Volunteer, (volunteer) => volunteer.aboutYou)
  volunteer: Volunteer;
}
