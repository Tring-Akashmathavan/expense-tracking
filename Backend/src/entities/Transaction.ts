import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User";
import { Category } from "./Category";
export type TransactionType = "INCOME" | "EXPENSE";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    transactionId: number;

    @Column()
    title: string;
    
    @Column("float")
    amount: number;

    @Column({ type: "enum", enum: ["INCOME", "EXPENSE"] })
    type: TransactionType;

    @Column()
    date: string;

    @Column({ default: () => "CURRENT_TIMESTAMP" })
    createdAt: string;

    @Column({ nullable: true })
    updatedAt: string;

    @ManyToOne(() => User, (user) => user.expenses, { onDelete: "CASCADE" })
    user: User;

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[];
}
