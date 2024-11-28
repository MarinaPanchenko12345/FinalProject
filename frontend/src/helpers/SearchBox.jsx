import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { useTheme } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  height: "32px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0.5, 1, 0.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
  },
}));

export default function SearchBox({ searchText, setSearchText }) {
  const theme = useTheme();
  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon sx={{ color: theme.palette.icons.main }} />
      </SearchIconWrapper>
      <StyledInputBase
        sx={{ color: theme.palette.icons.main }}
        placeholder='Search…'
        value={searchText}
        onChange={handleInputChange}
        inputProps={{
          "aria-label": "search",
          id: "search-input",
          name: "searchInput",
        }}
      />
    </Search>
  );
}

export const searchCards = (cards, searchText) => {
   if (!searchText) {
     return cards;
   }
  return cards.filter(
    (card) =>
      (card.title &&
        typeof card.title === "string" &&
        card.title.toLowerCase().includes(searchText.toLowerCase())) ||
      (card.subtitle &&
        typeof card.subtitle === "string" &&
        card.subtitle.toLowerCase().includes(searchText.toLowerCase())) ||
      (card.color &&
        typeof card.color === "string" &&
        card.color.toLowerCase().includes(searchText.toLowerCase())) ||
      (card.model &&
        typeof card.model === "string" &&
        card.model.toLowerCase().includes(searchText.toLowerCase())) ||
      (card.category &&
        typeof card.category === "string" &&
        card.category.toLowerCase().includes(searchText.toLowerCase())) ||
      (card.company &&
        typeof card.company === "string" &&
        card.company.toLowerCase().includes(searchText.toLowerCase())) ||
      (card.price &&
        typeof card.price === "number" &&
        card.price.toString().includes(searchText))
  );
};

export const searchOrders = (orders, searchText) => {
  if (!searchText) {
    return orders;
  }
  return orders
    .map((order) => {
      const filteredItems = order.items.filter((item) => {
        return (
          (item.title &&
            typeof item.title === "string" &&
            item.title.toLowerCase().includes(searchText.toLowerCase())) ||
          (item.color &&
            typeof item.color === "string" &&
            item.color.toLowerCase().includes(searchText.toLowerCase())) ||
          (typeof item.quantity === "number" &&
            item.quantity.toString().includes(searchText)) ||
          (typeof item.price === "number" &&
            item.price.toString().includes(searchText)) ||
          (typeof item.isPending === "boolean" &&
            (item.isPending ? "pending" : "").includes(
              searchText.toLowerCase()
            )) ||
          (typeof item.isSent === "boolean" &&
            (item.isSent ? "sent" : "").includes(searchText.toLowerCase())) ||
          (typeof item.isDelivered === "boolean" &&
            (item.isDelivered ? "delivered" : "").includes(
              searchText.toLowerCase()
            ))
        );
      });
      return { ...order, items: filteredItems };
    })
    .filter((order) => order.items.length > 0);
};

export const searchUsers = (users, searchText) => {
  if (!searchText) {
    return users;
  }
  return users.filter(
    (user) =>
      (user.name &&
        typeof user.name.first === "string" &&
        user.name.first.toLowerCase().includes(searchText.toLowerCase())) ||
      (user.name.middle &&
        typeof user.name.middle === "string" &&
        user.name.middle.toLowerCase().includes(searchText.toLowerCase())) ||
      (user.name.last &&
        typeof user.name.last === "string" &&
        user.name.last.toLowerCase().includes(searchText.toLowerCase())) ||
      (user.email &&
        typeof user.email === "string" &&
        user.email.toLowerCase().includes(searchText.toLowerCase())) ||
      (user.phone &&
        typeof user.phone === "string" &&
        user.phone.toLowerCase().includes(searchText.toLowerCase())) ||
      (typeof user.isAdmin === "boolean" &&
        (user.isAdmin ? "admin" : "user").includes(searchText.toLowerCase())) ||
      (typeof user.isBusiness === "boolean" &&
        (user.isBusiness ? "business" : "regular").includes(
          searchText.toLowerCase()
        )) ||
      (user.createdAt &&
        new Date(user.createdAt).toLocaleDateString().includes(searchText))
  );
};
