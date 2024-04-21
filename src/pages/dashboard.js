import {
  Box,
  Button,
  Container,
  Dialog,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/header";
import { Add } from "@mui/icons-material";
import { useState } from "react";

const Dashboard = () => {
  const [form, setForm] = useState(false);

  const { authUser } = useAuth();

  console.log("authUser ", authUser);

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
        <Dialog open={form} onClose={() => setForm(false)}>
          <Box
            minWidth="400px"
            p="1.5rem"
            display="flex"
            flexDirection="column"
            gap={1}
          >
            <Typography variant="h6">Add Expense</Typography>
            <TextField label="Location" variant="standard" />
            <TextField label="Location Address" variant="standard" />
            <TextField label="Items" variant="standard" />
            <TextField label="Amount" variant="standard" />
            <Button variant="contained">Submit</Button>
          </Box>
        </Dialog>
      </Container>
    </>
  );
};

export default Dashboard;
