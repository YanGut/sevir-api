import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import { Price } from 'src/prices/entities/price.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Index({ unique: true, where: 'ean IS NOT NULL' })
  @Column({ type: 'varchar', length: 64, nullable: true })
  ean?: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Price, (price) => price.product)
  prices: Price[];
}
