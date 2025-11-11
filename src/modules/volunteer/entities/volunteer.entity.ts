import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { AboutYou } from 'src/modules/about-you/entities/about-you.entity';
import { PhoneNumber } from 'src/modules/phone-number/entities/phone-number.entity';
import { VolunteerHasDepartment } from 'src/modules/volunteer-has-department/entities/volunteer-has-department.entity';

@Entity('volunteer')
export class Volunteer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'social_media_link', type: 'varchar', length: 255, nullable: false })
  socialMediaLink: string;

  @Column({ name: 'age', type: 'varchar', length: 255, nullable: false })
  age: string;

  @Column({ name: 'response_qe_one', type: 'text', nullable: false })
  responseQEOne: string;

  @Column({ name: 'response_qe_two', type: 'text', nullable: false })
  responseQETwo: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'gender', type: 'varchar', length: 255, nullable: false })
  gender: string;

  @OneToOne(() => AboutYou, (aboutYou) => aboutYou.volunteer)
  @JoinColumn({ name: 'about_you_id' })
  aboutYou: AboutYou;

  @ManyToOne(() => PhoneNumber, (phoneNumber) => phoneNumber.volunteers)
  @JoinColumn({ name: 'phone_number_id' })
  phoneNumber: PhoneNumber;

  @OneToMany(
    () => VolunteerHasDepartment,
    (volunteerHasDepartment) => volunteerHasDepartment.volunteer,
  )
  volunteerHasDepartments: VolunteerHasDepartment[];
}
