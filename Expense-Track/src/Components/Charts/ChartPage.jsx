import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Box, Typography, Button } from "@mui/material";

const ChartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const transactions = location.state?.transactions || [];

  const data = transactions.map(txn => ({
    date: new Date(txn.date).toLocaleDateString(),
    income: txn.type === "INCOME" ? txn.amount : 0,
    expense: txn.type === "EXPENSE" ? txn.amount : 0,
    balance: txn.type === "INCOME" ? txn.amount : -txn.amount
  }));

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Expense Tracker - Charts
      </Typography>

      {data.length > 0 ? (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#4caf50" name="Income" />
              <Line type="monotone" dataKey="expense" stroke="#f44336" name="Expense" />
            </LineChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height={300} style={{ marginTop: "20px" }}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="balance" fill="#2196f3" name="Balance" />
            </BarChart>
          </ResponsiveContainer>
        </>
      ) : (
        <Typography>No transaction data available.</Typography>
      )}

      <Button
        variant="contained"
        onClick={() => navigate("/dashboard")}
        sx={{ mt: 3 }}
        style={{textTransform : "capitalize"}}
      >
        Back to Dashboard
      </Button>
    </Box>
  );
};

export default ChartPage;
