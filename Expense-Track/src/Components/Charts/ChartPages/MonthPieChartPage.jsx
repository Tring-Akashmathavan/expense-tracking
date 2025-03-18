import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];


const MonthPieChartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const transactions = location.state?.transactions || [];

  const monthData = transactions.reduce((acc, txn) => {
    const month = new Date(txn.date).toLocaleString("default", { month: "short", year: "numeric" });
    acc[month] = (acc[month] || 0) + txn.amount;
    return acc;
  }, {});

  const monthChartData = Object.keys(monthData).map(month => ({
    name: month,
    value: monthData[month],
  }));

  return (
    <Box sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Month-wise Breakdown
          </Typography>
    
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={monthChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {monthChartData.map((_, index) => (
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

export default MonthPieChartPage;
