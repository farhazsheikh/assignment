import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ExpenseForm from "./ExpensesForm";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
export default function ExpensesPopup({ open, close }) {
  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" mt={2}>
          Add Expense
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ExpenseForm />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Box position={"absolute"} top={5} right={0}>
            <Button onClick={close} autoFocus>
              <CloseIcon style={{ color: "black" }} />
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
