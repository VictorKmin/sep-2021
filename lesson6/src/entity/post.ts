import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { CommonFields } from './commonFields';
import { User } from './user';

export interface IPost {
    title: string;
    text: string;
    userId: number;
}

@Entity('Posts', { database: 'okten' })
export class Post extends CommonFields implements IPost {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        title: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        text: string;

    @Column({
        type: 'int',
    })
        userId: number;

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'userId' })
        user: User;
}
