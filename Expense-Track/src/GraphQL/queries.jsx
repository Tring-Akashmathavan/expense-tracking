import { gql } from '@apollo/client';


export const SIGN_IN = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      user {
        id
        name
        email
      }
      token
    }
  }
`;

export const SIGN_UP = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    registerUser(name: $name, email: $email, password: $password) {
      user {
        id
        name
        email
      }
      token
    }
  }
`;

export const GET_USER_TRANSACTIONS = gql`
  query GetUserTransactions($userId: ID!) {
    getUserTransactions(userId: $userId) {
      transactionId
      title
      amount
      date
      type
      categories {
        categoryId
        categoryName
      }
    }
  }
`;

// GraphQL Mutations
export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction(
    $userId: ID!
    $title: String!
    $amount: Float!
    $date: String!
    $type: String!
    $categoryIds: [ID!]!
  ) {
    createTransaction(
      userId: $userId
      title: $title
      amount: $amount
      date: $date
      type: $type
      categoryIds: $categoryIds
    ) {
      transactionId
      title
      amount
      date
      type
    }
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction(
    $transactionId: ID!
    $title: String!
    $amount: Float!
    $date: String!
    $type: String!
    $categoryIds: [ID!]!
  ) {
    updateTransaction(
      transactionId: $transactionId
      title: $title
      amount: $amount
      date: $date
      type: $type
      categoryIds: $categoryIds
    ) {
      transactionId
      title
      amount
      date
      type
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($transactionId: ID!) {
    deleteTransaction(transactionId: $transactionId)
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    getAllCategories {
      categoryId
      categoryName
    }
  }
`;