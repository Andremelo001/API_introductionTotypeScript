import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuidV4} from "uuid";

@Entity("rentals")
class Rental {
    @PrimaryColumn()
    id: string;

    @Column()
    car_id: string;

    @Column()
    user_id: string;

    @Column({ type: 'date', nullable: true })
    start_date: Date | null;

    @Column({ type: 'date', nullable: true })
    end_date: Date | null;

    @Column()
    expected_return_date: Date;

    @Column({ type: 'integer', nullable: true })
    total: number | null;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date; 

    constructor(){
        if(!this.id){
            this.id = uuidV4();
        }
    }
}

export {Rental}