import {
  Box,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import Header from "../components/header";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import ExpenseDialog from "../components/expenseDialog";

const Dashboard = () => {
  const [form, setForm] = useState(false);
  return (
    <>
      <Header />
      <Container>
        <Box display={"flex"} alignItems={"center"} pt={2} gap={1}>
          <Typography variant="h6">Expenses</Typography>
          <IconButton onClick={() => setForm(true)}>
            <Add />
          </IconButton>
        </Box>
        <ExpenseDialog open={form} onClose={() => setForm(false)} />
      </Container>
    </>
  );
};

export default Dashboard;
