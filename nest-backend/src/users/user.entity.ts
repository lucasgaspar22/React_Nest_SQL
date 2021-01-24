import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    email:string;
    
    @Column({ type: 'varchar', length: 255, nullable: false })
    password:string;

    public constuctor(name:string, email:string, password:string){
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
