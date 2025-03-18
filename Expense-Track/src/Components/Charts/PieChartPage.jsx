import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Grid } from "@mui/material";
import "./PieChartPage.css"

const PieChartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const transactions = location.state?.transactions || [];

  return (
    <Box sx={{ p: 3 }} className="box-pie-charts" >
      <Typography variant="h4" gutterBottom>
        Expense Tracker - Pie Charts
      </Typography>

      <Grid container spacing={2} className="pie-charts-pages">
        {/* Date-wise Chart Button */}
        <Grid item xs={12} md={3}>
          <Button
            fullWidth
            variant="contained"
            onClick={() =>
              navigate("/charts/date", { state: { transactions } })
            }
          >
            Date-wise Chart
          </Button>
        </Grid>

        <Grid item xs={12} md={3}>
          <Button
            fullWidth
            variant="contained"
            onClick={() =>
              navigate("/charts/month", { state: { transactions } })
            }
          >
            Month-wise Chart
          </Button>
        </Grid>

        <Grid item xs={12} md={3}>
          <Button
            fullWidth
            variant="contained"
            onClick={() =>
              navigate("/charts/year", { state: { transactions } })
            }
          >
            Year-wise Chart
          </Button>
        </Grid>

      </Grid>

      <Button
        variant="outlined"
        onClick={() => navigate("/dashboard")}
        sx={{ mt: 3 }}
      >
        Back to Dashboard
      </Button>
    </Box>
  );
};

export default PieChartPage;
