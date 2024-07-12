import React from "react";
import { Box, Grid, Paper, styled, Typography } from "@mui/material";
import { useDrag, useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { ItemTypes } from "./Drag/itemType";
import { updateExpense } from "./action";
// import { updateExpenseCategory } from "./redux/actions"; // Import your action to update expense category

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function ExpenseItem({ expense, category, onDrop }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.EXPENSE,
    item: {
      id: expense.id,
      currentCategory: category,
      amount: expense.amount,
      date: expense.date,
      description: expense.description,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      p={1}
      bgcolor={"#f7f7f7"}
      m={1}
      borderRadius={2}
      ref={drag}
      sx={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography variant="subtitle2">
          Amount:{" "}
          <Typography component={"span"} fontWeight={400}>
            {expense.amount}
          </Typography>
        </Typography>
        <Typography variant="subtitle2">
          Date:{" "}
          <Typography component={"span"} fontWeight={400}>
            {expense.date}
          </Typography>
        </Typography>
      </Box>
      <Box textAlign={"left"}>
        <Typography variant="subtitle2">
          Description:{" "}
          <Typography component={"span"} fontWeight={400}>
            {expense.description}
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}

function Category({ category, children }) {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expense.expenses);
  const categoryExpenses = expenses.filter(
    (expense) => expense.category === category
  );

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.EXPENSE,
    drop: (item) => {
      if (item.currentCategory !== category) {
        console.log(item);
        dispatch(
          updateExpense({
            id: item.id,
            category: category,
            amount: item.amount,
            date: item.date,
            description: item.description,
          })
        );
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <Grid item xs={12} md={3}>
      <Item
        sx={{
          padding: "0",
          border: "1px solid #eee",
          maxHeight: "275px",
          overflowY: "auto",
          minHeight: "275px",
        }}
        elevation={0}
        ref={drop}
        style={{ backgroundColor: isOver ? "#e0e0e0" : "inherit" }}
      >
        <Box bgcolor={"#f3f3f3"} textAlign={"left"} px={2} py={1}>
          <Typography variant="h6" gutterBottom>
            {category}
          </Typography>
        </Box>
        {categoryExpenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} category={category} />
        ))}
      </Item>
    </Grid>
  );
}

export default function CategoryContainer() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Category category="Housing" />
        <Category category="Transportation" />
        <Category category="Food" />
        <Category category="Entertainment" />
        <Category category="Health" />
        <Category category="Personal Care" />
        <Category category="Education" />
        <Category category="Miscellaneous" />
        {/* Add more categories as needed */}
      </Grid>
    </Box>
  );
}
