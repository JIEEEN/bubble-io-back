import { Column, PrimaryColumn, Entity, CreateDateColumn } from 'typeorm';

@Entity('User')
export class UserEntity{
    @PrimaryColumn()
    id: string;

    @Column({length: 15})
    name: string;

    @Column()
    password: string;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;
}