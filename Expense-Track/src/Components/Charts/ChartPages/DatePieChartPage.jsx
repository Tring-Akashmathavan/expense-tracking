import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const DatePieChartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const transactions = location.state?.transactions || [];

  const dateData = transactions.reduce((acc, txn) => {
    const date = new Date(txn.date).toLocaleDateString();
    acc[date] = (acc[date] || 0) + txn.amount;
    return acc;
  }, {});

  const dateChartData = Object.keys(dateData).map(date => ({
    name: date,
    value: dateData[date],
  }));

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Date-wise Breakdown
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={dateChartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {dateChartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>
        Back
      </Button>
    </Box>
  );
};

export default DatePieChartPage;
