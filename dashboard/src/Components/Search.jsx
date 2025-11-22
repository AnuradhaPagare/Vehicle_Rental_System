import React, { useState } from "react"; 
import { styled, alpha } from "@mui/material/styles";
import { IconButton, InputBase } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

// Container styling for the search bar
const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius * 5,
  backgroundColor: alpha("#fff", 0.15),
  "&:hover": {
    backgroundColor: alpha("#fff", 0.25),
  },
  marginLeft: 0,
  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(2),
    width: "auto",
  },
}));

// Styled search input
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#fff",
  flex: 1,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: theme.spacing(2),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Search({ onSearch }) {
  const [query, setQuery] = useState("");

  // Live update search
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) onSearch(value); // send to parent in real-time
  };

  return (
    <SearchContainer>
      <StyledInputBase
        placeholder="Search…"
        value={query}
        onChange={handleChange}
        inputProps={{ "aria-label": "search" }}
      />
      <IconButton
        onClick={() => onSearch && onSearch(query)}
        sx={{ p: 1, color: "#fff" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </SearchContainer>
  );
}
