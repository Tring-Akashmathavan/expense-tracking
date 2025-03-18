import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];


const YearPieChartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const transactions = location.state?.transactions || [];

  const yearData = transactions.reduce((acc, txn) => {
    const year = new Date(txn.date).getFullYear();
    acc[year] = (acc[year] || 0) + txn.amount;
    return acc;
  }, {});

  const yearChartData = Object.keys(yearData).map(year => ({
    name: year.toString(),
    value: yearData[year],
  }));

  return (
     <Box sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Year-wise Breakdown
              </Typography>
        
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={yearChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {yearChartData.map((_, index) => (
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

export default YearPieChartPage;
