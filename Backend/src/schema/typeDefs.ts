export const typeDefs = `
    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
        transactions: [Transaction!]!
    }

    type Transaction {
        transactionId: ID!
        userId: ID!
        title: String!
        amount: Float!
        type: String!         
        date: String!
        createdAt: String!
        updatedAt: String
        categories: [Category]!
    }

    type Category {
        categoryId: ID!
        categoryName: String!
    }

    type AuthPayload {
        user: User!
        token: String!
    }

    type BalanceSummary {
        totalIncome: Float!
        totalExpense: Float!
        balance: Float!
    }

    type Query {
        getUsers: [User]
        getUser(id: ID!): User

        getUserTransactions(userId: ID!): [Transaction!]!
        getTransactionsByDay(userId: ID!, day: String!): [Transaction!]!
        getTransactionsByMonth(userId: ID!, month: String!): [Transaction!]!
        getTransactionsByYear(userId: ID!, year: String!): [Transaction!]!

        getBalanceByDay(userId: ID!, day: String!): BalanceSummary!
        getBalanceByMonth(userId: ID!, month: String!): BalanceSummary!
        getBalanceByYear(userId: ID!, year: String!): BalanceSummary!

        getAllCategories: [Category!]!
        getCategories: [Category!]!
    }

    type Mutation {
        registerUser(name: String!, email: String!, password: String!): AuthPayload!
        loginUser(email: String!, password: String!): AuthPayload!

        createTransaction(userId: ID!, title: String!, amount: Float!, type: String!, date: String!, categoryIds: [ID!]!): Transaction!
        updateTransaction(transactionId: ID!, title: String, amount: Float, type: String, date: String, categoryIds: [ID!]): Transaction!
        deleteTransaction(transactionId: ID!): String!

        createCategory(categoryName: String!): [Category]!
        updateCategory(categoryId: ID!, categoryName: String!): [Category]!
        deleteCategory(categoryId: ID!): String!
    }
`;
