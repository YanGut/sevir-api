import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { AboutYou } from 'src/modules/about-you/entities/about-you.entity';
import { PhoneNumber } from 'src/modules/phone-number/entities/phone-number.entity';

@Entity('volunteer')
export class Volunteer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'social_media_link', type: 'varchar', length: 255, nullable: false })
  socialMediaLink: string;

  @Column({ name: 'age', type: 'int', nullable: false })
  age: number;

  @Column({ name: 'response_qe_one', type: 'text', nullable: false })
  responseQEOne: string;

  @Column({ name: 'response_qe_two', type: 'text', nullable: false })
  responseQETwo: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToOne(() => AboutYou, (aboutYou) => aboutYou.volunteer)
  @JoinColumn({ name: 'about_you_id' })
  aboutYou: AboutYou;

  @ManyToOne(() => PhoneNumber, (phoneNumber) => phoneNumber.volunteers)
  @JoinColumn({ name: 'phone_number_id' })
  phoneNumber: PhoneNumber;
}
