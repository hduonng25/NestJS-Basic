import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ select: false })
    createdDate: Date;

    @UpdateDateColumn({ select: false })
    updatedDate: Date;

    @DeleteDateColumn({ select: false })
    deletedDate: Date;

    @Column({ default: true, select: true })
    isActive: boolean;
}
