// src/components/ExpenseForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense, updateExpense } from "./action";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const ExpenseForm = ({ expense }) => {
  const [formData, setFormData] = useState(
    expense || {
      id: "",
      name: "",
      category: "",
      subcategory: "",
      amount: "",
      date: "",
      description: "",
    }
  );
  const dispatch = useDispatch();

  const categories = [
    "Housing",
    "Transportation",
    "Food",
    "Entertainment",
    "Health",
    "Personal Care",
    "Education",
    "Miscellaneous",
  ];

  const subcategories = {
    Housing: ["Rent/Mortgage", "Utilities", "Maintenance/Repairs"],
    Transportation: [
      "Fuel",
      "Public Transportation",
      "Vehicle Maintenance",
      "Insurance",
    ],
    Food: ["Groceries", "Dining Out", "Coffee Shops"],
    Entertainment: ["Movies", "Concerts", "Hobbies"],
    Health: ["Medical Bills", "Prescriptions", "Gym Membership"],
    "Personal Care": [
      "Haircuts/Salon",
      "Personal Hygiene Products",
      "Clothing",
    ],
    Education: ["Tuition Fees", "Books", "Online Courses"],
    Miscellaneous: ["Gifts", "Donations", "Other"],
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      dispatch(updateExpense(formData));
    } else {
      dispatch(addExpense({ ...formData, id: Date.now() }));
    }
    setFormData({
      id: "",
      name: "",
      category: "",
      subcategory: "",
      amount: "",
      date: "",
      description: "",
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      {/* <Typography variant="h6">
        {formData.id ? "Update Expense" : "Add Expense"}
      </Typography> */}
      {/* <TextField
        label="Expense Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      /> */}
      <FormControl fullWidth required>
        <InputLabel>Category</InputLabel>
        <Select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* {formData.category && (
        <FormControl fullWidth required>
          <InputLabel>Subcategory</InputLabel>
          <Select
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
          >
            {subcategories[formData.category].map((subcategory) => (
              <MenuItem key={subcategory} value={subcategory}>
                {subcategory}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )} */}
      <TextField
        type="number"
        label="Amount"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        required
      />
      <TextField
        type="date"
        label="Date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        multiline
      />
      <Button type="submit" variant="contained" color="primary">
        {formData.id ? "Update" : "Add"}
      </Button>
    </Box>
  );
};

export default ExpenseForm;
