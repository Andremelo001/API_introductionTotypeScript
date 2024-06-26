import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import {v4 as uuid} from "uuid";
import { Category } from "./category";

@Entity("cars")
class Car{
    @PrimaryColumn()
    id: string;
    
    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    daily_rate: number;

    @Column()
    available: boolean;

    @Column()
    license_plate: string;

    @Column()
    fine_amount: number;

    @Column()
    brand: string;

    @ManyToOne(() => Category)
    @JoinColumn({name: "category_id"})
    category: Category;

    @Column()
    category_id: string;

    @CreateDateColumn()
    create_at: Date;
    
    constructor(){
        if(!this.id){
            this.id = uuid();
            this.available = true;
        }

    }
}

export {Car}