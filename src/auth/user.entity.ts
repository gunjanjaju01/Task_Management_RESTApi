import { type } from 'os';
import { Task } from '../tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
  
  //type of this property , how to we access this user otherside of relation hat is task 
  // whenever we fetch the user it automatically fetch task that's why eager is true
  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}