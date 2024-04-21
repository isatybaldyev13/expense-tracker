import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { createExpense } from "../firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

const ExpenseDialog = ({
  open,
  onClose,
}) => {
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

  const onChangeFieldValue = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const formattedDate = {
        ...formData,
        date: formData.date?.format("YYYY/MM-DD hh:mm:ss"),
        uid: authUser?.uid,
      };

      console.log("formattedDate", formattedDate);
      const expense = await createExpense(formattedDate);
      console.log("expense ", expense);
      toast("Successfully created")
      onClose();
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
          value={formData.location}
          onChange={onChangeFieldValue}
          label="Location"
          variant="standard"
        />
        <TextField
          name="location_address"
          value={formData.location_address}
          onChange={onChangeFieldValue}
          label="Location Address"
          variant="standard"
        />
        <TextField
          name="items"
          onChange={onChangeFieldValue}
          value={formData.items}
          label="Items"
          variant="standard"
        />
        <TextField
          name="amount"
          onChange={onChangeFieldValue}
          value={formData.amount}
          label="Amount"
          variant="standard"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={formData.date}
            onChange={(date) => setFormData({ ...formData, date })}
          />
        </LocalizationProvider>
        <Button onClick={onSubmit} variant="contained" disabled={loading}>
          Submit
        </Button>
      </Box>
    </Dialog>
  );
};

export default ExpenseDialog;
