import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { showErrorToast } from "../../Utils/toast";
import { GET_ALL_CATEGORIES } from "../../GraphQL/queries";

const AddTransaction = ({
  open,
  handleClose,
  addTransaction,
  userId,
  initialData,
}) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("EXPENSE"); 
  const [categoryIds, setCategoryIds] = useState([]);

  const { data, loading, error } = useQuery(GET_ALL_CATEGORIES);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setAmount(initialData.amount?.toString() || "");
      setDate(initialData.date || "");
      setType(initialData.type || "EXPENSE");
      setCategoryIds(
        initialData.categories?.map((cat) => cat.categoryId) || []
      );
    } else {
      setTitle("");
      setAmount("");
      setDate("");
      setType("EXPENSE");
      setCategoryIds([]);
    }
  }, [initialData]);

  const handleSubmit = () => {
    const parsedAmount = parseFloat(amount);
    if (!title || !amount || !date || !type || categoryIds.length === 0) {
      showErrorToast("Please fill in all fields.");
      return;
    }

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      showErrorToast("Please enter a valid amount.");
      return;
    }

    const newTransaction = {
      transactionId: initialData?.transactionId, 
      title,
      amount: parsedAmount,
      date,
      type,
      categoryIds,
    };

    addTransaction({ ...newTransaction, userId });
    setTitle("");
    setAmount("");
    setDate("");
    setType("");
    setCategoryIds([]);
    handleClose(); 
  };
  const handleCloseAdd = () => {
    setTitle("");
    setAmount("");
    setDate("");
    setType("EXPENSE");
    setCategoryIds([]);
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{initialData ? "Edit Expense" : "Add New"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Amount"
          fullWidth
          margin="normal"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <TextField
          label="Date"
          fullWidth
          margin="normal"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <MenuItem value="INCOME">Income</MenuItem>
            <MenuItem value="EXPENSE">Expense</MenuItem>
          </Select>
        </FormControl>

      
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          {loading ? (
            <CircularProgress size={24} />
          ) : error ? (
            <p style={{ color: "red" }}>Error loading categories</p>
          ) : (
            <Select
              value={categoryIds}
              onChange={(e) => setCategoryIds(e.target.value)}
            >
              {data?.getAllCategories.map((category) => (
                <MenuItem key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </MenuItem>
              ))}
            </Select>
          )}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseAdd}>Cancel</Button>
        <Button onClick={handleSubmit}>{initialData ? "Update" : "Add"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTransaction;
