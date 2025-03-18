import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import NavBar from "./Components/Navigation/NavBar";
import Dashboard from "./Pages/Dashboard";
import AddExpense from "./Components/Expense/AddExpense";
import ExpenseTable from "./Components/Expense/ExpenseTable";
import PrivateRoute from "./Route/PrivateRoute";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import ChartPage from "./Components/Charts/ChartPage";
import "./App.css";
import { Navigate } from "react-router-dom";
import PieChartPage from "./Components/Charts/PieChartPage";
import DatePieChartPage from "./Components/Charts/ChartPages/DatePieChartPage";
import MonthPieChartPage from "./Components/Charts/ChartPages/MonthPieChartPage";
import YearPieChartPage from "./Components/Charts/ChartPages/YearPieChartPage";

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar />
        <Routes>
          {/* Public Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/charts" element={<ChartPage />} />
            <Route path="/pie-charts" element={<PieChartPage />} />
            <Route path="/charts/date" element={<DatePieChartPage />} />
        <Route path="/charts/month" element={<MonthPieChartPage />} />
        <Route path="/charts/year" element={<YearPieChartPage />} />
            <Route path="/addexpense" element={<AddExpense />} />
            <Route path="/expensetable" element={<ExpenseTable />} />
          </Route>

          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
