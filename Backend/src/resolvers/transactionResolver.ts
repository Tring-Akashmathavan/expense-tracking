import { Transaction } from "../entities/Transaction";
import { Category } from "../entities/Category";
import { User } from "../entities/User";
import { AppDataSource } from "../config/db";
import { In } from "typeorm";

export const transactionResolvers = {
  Query: {
    getUserTransactions: async (_: any, { userId }: { userId: number }) => {
      return await AppDataSource.getRepository(Transaction).find({
        where: { user: { id: userId } },
        relations: ["categories"],
      });
    },

    getTransactionsByDay: async (_: any, { userId, day }: { userId: number; day: string }) => {
      const transactions = await AppDataSource.getRepository(Transaction)
        .createQueryBuilder("transaction")
        .where("transaction.userId = :userId", { userId })
        .andWhere("DATE(transaction.date) = :day", { day })
        .leftJoinAndSelect("transaction.categories", "category")
        .getMany();

      return transactions;
    },

    getTransactionsByMonth: async (_: any, { userId, month }: { userId: number; month: string }) => {
      const transactions = await AppDataSource.getRepository(Transaction)
        .createQueryBuilder("transaction")
        .where("transaction.userId = :userId", { userId })
        .andWhere("TO_CHAR(transaction.date, 'YYYY-MM') = :month", { month })
        .leftJoinAndSelect("transaction.categories", "category")
        .getMany();

      return transactions;
    },

    getTransactionsByYear: async (_: any, { userId, year }: { userId: number; year: string }) => {
      const transactions = await AppDataSource.getRepository(Transaction)
        .createQueryBuilder("transaction")
        .where("transaction.userId = :userId", { userId })
        .andWhere("TO_CHAR(transaction.date, 'YYYY') = :year", { year })
        .leftJoinAndSelect("transaction.categories", "category")
        .getMany();

      return transactions;
    },

    getBalanceByDay: async (_: any, { userId, day }: { userId: number; day: string }) => {
      const transactions = await AppDataSource.getRepository(Transaction)
        .createQueryBuilder("transaction")
        .where("transaction.userId = :userId", { userId })
        .andWhere("DATE(transaction.date) = :day", { day })
        .getMany();

      const totalIncome = transactions
        .filter(txn => txn.type === "INCOME")
        .reduce((sum, txn) => sum + txn.amount, 0);

      const totalExpense = transactions
        .filter(txn => txn.type === "EXPENSE")
        .reduce((sum, txn) => sum + txn.amount, 0);

      return {
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense,
      };
    },

    getBalanceByMonth: async (_: any, { userId, month }: { userId: number; month: string }) => {
      const transactions = await AppDataSource.getRepository(Transaction)
        .createQueryBuilder("transaction")
        .where("transaction.userId = :userId", { userId })
        .andWhere("TO_CHAR(transaction.date, 'YYYY-MM') = :month", { month })
        .getMany();

      const totalIncome = transactions
        .filter(txn => txn.type === "INCOME")
        .reduce((sum, txn) => sum + txn.amount, 0);

      const totalExpense = transactions
        .filter(txn => txn.type === "EXPENSE")
        .reduce((sum, txn) => sum + txn.amount, 0);

      return {
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense,
      };
    },

    getBalanceByYear: async (_: any, { userId, year }: { userId: number; year: string }) => {
      const transactions = await AppDataSource.getRepository(Transaction)
        .createQueryBuilder("transaction")
        .where("transaction.userId = :userId", { userId })
        .andWhere("TO_CHAR(transaction.date, 'YYYY') = :year", { year })
        .getMany();

      const totalIncome = transactions
        .filter(txn => txn.type === "INCOME")
        .reduce((sum, txn) => sum + txn.amount, 0);

      const totalExpense = transactions
        .filter(txn => txn.type === "EXPENSE")
        .reduce((sum, txn) => sum + txn.amount, 0);

      return {
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense,
      };
    },
  },

  Mutation: {
  
    createTransaction: async (_: any, { userId, title, amount, date, type, categoryIds }: any) => {
      const user = await AppDataSource.getRepository(User).findOne({ where: { id: userId } });
      if (!user) throw new Error("User not found");

      const categories = await AppDataSource.getRepository(Category).findBy({ categoryId: In(categoryIds) });

      const transaction = AppDataSource.getRepository(Transaction).create({
        title,
        amount,
        date,
        type,
        user,
        categories,
      });

      await AppDataSource.getRepository(Transaction).save(transaction);
      return transaction;
    },

    updateTransaction: async (_: any, { transactionId, title, amount, date, type, categoryIds }: any) => {
      const transaction = await AppDataSource.getRepository(Transaction).findOne({
        where: { transactionId },
        relations: ["categories"],
      });

      if (!transaction) throw new Error("Transaction not found");

      if (title) transaction.title = title;
      if (amount) transaction.amount = amount;
      if (date) transaction.date = date;
      if (type) transaction.type = type;

      if (categoryIds) {
        const categories = await AppDataSource.getRepository(Category).findBy({ categoryId: In(categoryIds) });
        transaction.categories = categories;
      }

      await AppDataSource.getRepository(Transaction).save(transaction);
      return transaction;
    },

    deleteTransaction: async (_: any, { transactionId }: { transactionId: number }) => {
      const repository = AppDataSource.getRepository(Transaction);
      const transaction = await repository.findOne({ where: { transactionId } });

      if (!transaction) throw new Error("Transaction not found");

      await repository.remove(transaction);
      return "Transaction deleted successfully";
    },
  },
};
