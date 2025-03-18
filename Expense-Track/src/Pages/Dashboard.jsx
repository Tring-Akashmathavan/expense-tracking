import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import AddTransaction from "../Components/Expense/AddExpense";
import ExpenseTable from "../Components/Expense/ExpenseTable";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  GET_USER_TRANSACTIONS,
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
} from "../GraphQL/queries";

import "./Dashboard.css";
import { showErrorToast } from "../Utils/toast";

const Dashboard = () => {
  const { userId } = useOutletContext() || {};
  const [transactions, setTransactions] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const navigate = useNavigate();

  const {
    data,
    loading,
    error: queryError,
    refetch,
  } = useQuery(GET_USER_TRANSACTIONS, {
    variables: { userId },
    skip: !userId,
  });

  useEffect(() => {
    if (!userId) {
      setError("User ID is missing. Please sign in again.");
    } else if (data) {
      setTransactions(data.getUserTransactions);
    } else if (queryError) {
      setError(queryError.message);
    }
  }, [data, queryError, userId]);

  const totalIncome = transactions
    .filter((txn) => txn.type === "INCOME")
    .reduce((sum, txn) => sum + txn.amount, 0);

  const totalExpense = transactions
    .filter((txn) => txn.type === "EXPENSE")
    .reduce((sum, txn) => sum + txn.amount, 0);

  const balance = totalIncome > 0 ? totalIncome - totalExpense : 0;

  // Add Transaction Mutation
  const [createTransaction] = useMutation(CREATE_TRANSACTION, {
    onCompleted: () => refetch(),
    onError: (error) => setError(error.message),
  });

  const handleAddTransaction = (newTransaction) => {
    if (newTransaction.type === "EXPENSE" && totalIncome <= 0) {
      showErrorToast("Cannot add an expense without any income.");
      return;
    }

    createTransaction({
      variables: {
        userId,
        title: newTransaction.title,
        amount: newTransaction.amount,
        date: newTransaction.date,
        type: newTransaction.type,
        categoryIds: newTransaction.categoryIds,
      },
    })
      .then(() => {
        setSelectedTransaction(null);
        setOpen(false);
      })
      .catch((error) => console.error("Error creating transaction:", error));
    setSelectedTransaction(null);
    setOpen(false);
  };

  // Update Transaction Mutation
  const [updateTransaction] = useMutation(UPDATE_TRANSACTION, {
    onCompleted: () => refetch(),
    onError: (error) => setError(error.message),
  });

  const handleUpdateTransaction = (transaction) => {
    updateTransaction({
      variables: {
        transactionId: transaction.transactionId,
        title: transaction.title,
        amount: transaction.amount,
        date: transaction.date,
        type: transaction.type,
        categoryIds: transaction.categoryIds,
      },
    })
      .then(() => {
        setSelectedTransaction(null);
        setOpen(false);
      })
      .catch((error) => console.error("Error updating transaction:", error));
  };

  // Delete Transaction Mutation
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    onCompleted: () => refetch(),
    onError: (error) => setError(error.message),
  });

  const handleDeleteTransaction = (transactionId) => {
    setTransactionToDelete(transactionId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteTransaction = () => {
    deleteTransaction({ variables: { transactionId: transactionToDelete } });
    setDeleteDialogOpen(false);
  };

  return (
    <Box sx={{ p: 3 }} className="Dashboard-Box">
      {/* <Typography variant="h4" gutterBottom>
        Expense Management System
      </Typography> */}

      {/* Error Message */}
      {error && (
        <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Total Income, Expense, and Balance */}
      <Box sx={{ display: "flex", gap: 8, mb: 6 }}>
        <Typography variant="h6" color="green">
          Total Income: <strong>${totalIncome.toFixed(2)}</strong>
        </Typography>
        <Typography variant="h6" color="red">
          Total Expense: <strong>${totalExpense.toFixed(2)}</strong>
        </Typography>
        <Typography variant="h6">
          Balance: <strong>${balance.toFixed(2)}</strong>
        </Typography>
      </Box>

      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{ mb: 3 }}
        className="dashboard-buttons"
      >
        Add New
      </Button>

      <Button
        variant="contained"
        onClick={() => navigate("/pie-charts", { state: { transactions } })}
        sx={{ mb: 3 }}
        className="dashboard-buttons"
      >
        Pie Charts
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/charts", { state: { transactions } })}
        sx={{ mb: 3 }}
        className="dashboard-buttons"
      >
        Charts
      </Button>
      {loading ? (
        <CircularProgress />
      ) : (
        <ExpenseTable
          transactions={transactions}
          onEdit={(transaction) => {
            setSelectedTransaction(transaction);
            setOpen(true);
          }}
          onDelete={handleDeleteTransaction}
        />
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Are you sure you want to delete this Expense?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteTransaction} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <AddTransaction
        open={open}
        handleClose={() => {
          setOpen(false);
          setSelectedTransaction(null);
        }}
        addTransaction={
          selectedTransaction ? handleUpdateTransaction : handleAddTransaction
        }
        userId={userId}
        initialData={selectedTransaction}
      />
    </Box>
  );
};

export default Dashboard;
