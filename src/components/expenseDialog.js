import { Box, Button, Dialog, TextField, Typography } from "@mui/material";

const ExpenseDialog = ({ open, onClose }) => {
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
        <TextField label="Location" variant="standard" />
        <TextField label="Location Address" variant="standard" />
        <TextField label="Items" variant="standard" />
        <TextField label="Amount" variant="standard" />
        <Button variant="contained">Submit</Button>
      </Box>
    </Dialog>
  );
};

export default ExpenseDialog;
