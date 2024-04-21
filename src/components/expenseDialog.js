import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { createExpense } from "../firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

const ExpenseDialog = ({ open, onClose }) => {
  const { authUser } = useAuth();
  const [formData, setFormData] = useState({
    location: "",
    location_address: "",
    items: "",
    amount: "",
    date: dayjs(),
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onFieldValueChanges = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const formattedData = {
        ...formData,
        date: formData.date.format("YYYY/MM/DD hh:mm"),
        uid: authUser?.uid,
      };
      const res = await createExpense(formattedData);
      console.log("res ", res);
      onClose();
      toast("Successfully created!")
    } catch (error) {
      setError(error?.message ?? error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box
        minWidth="400px"
        p="1.5rem"
        display="flex"
        flexDirection="column"
        gap={1}
      >
        <Typography variant="h6">Add Expense</Typography>
        <TextField
          name="location"
          onChange={onFieldValueChanges}
          label="Location"
          variant="standard"
        />
        <TextField
          name="location_address"
          onChange={onFieldValueChanges}
          label="Location Address"
          variant="standard"
        />
        <TextField
          name="items"
          onChange={onFieldValueChanges}
          label="Items"
          variant="standard"
        />
        <TextField
          name="amount"
          onChange={onFieldValueChanges}
          label="Amount"
          variant="standard"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ marginTop: 2 }}
            value={formData.date}
            onChange={(date) => setFormData({ ...formData, date })}
            label="Date"
          />
        </LocalizationProvider>
        <Typography>{error}</Typography>
        <Button onClick={onSubmit} variant="contained" disabled={loading}>
          {loading ? <CircularProgress color="secondary" /> : "Submit"}
        </Button>
      </Box>
    </Dialog>
  );
};

export default ExpenseDialog;
