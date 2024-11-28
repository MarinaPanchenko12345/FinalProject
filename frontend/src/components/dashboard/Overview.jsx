import React, { useContext } from "react";
import "./Overview.css";
import GroupsIcon from "@mui/icons-material/Groups";
import StyleIcon from "@mui/icons-material/Style";
import CreditScoreRoundedIcon from "@mui/icons-material/CreditScoreRounded";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useSelector } from "react-redux";
import { useUser } from "../../contexts/UserContext";
import { useOrder } from "../../contexts/OrderContext";
import { useCardsUser } from "../../contexts/CardsUserContext";

const Overview = () => {
  const role = useSelector((state) => state.token.role);
  const { customStyles } = useContext(ThemeContext);
  const { users  ,deletedUsersCount} = useUser();
  const { userCards, deletedCardsCount } = useCardsUser();
  const { totalItems, totalPrice } = useOrder();

      const criticalQuantityCount = userCards.filter(
        (card) => card.quantity < 3
      ).length;

  return (
    <div className='overview_container'>
      <div className='overview_components' style={customStyles.container}>
        <AccountCircleSharpIcon sx={{ fontSize: 40 }} />
        <p>Your Status</p>
        <div className='components_info'>
          <div>
            {role === "admin" && <p>Admin</p>}
            {role === "business" && <p>Business</p>}
            {role === "regular" && <p>Regular</p>}
          </div>
        </div>
      </div>
      {role === "admin" && (
        <>
          <div className='overview_components_products'>
            <div className='overview_components' style={customStyles.container}>
              <GroupsIcon sx={{ fontSize: 40 }} />
              <p>All Users</p>
              <div className='components_info'>{users.length}</div>
            </div>
            <div className='overview_components' style={customStyles.container}>
              <PersonRemoveIcon sx={{ fontSize: 40 }} />
              <p>Deleted Users</p>
              <div className='components_info'>{deletedUsersCount}</div>
            </div>
          </div>
        </>
      )}
      {(role === "admin" || role === "business") && (
        <>
          <div className='overview_components_products'>
            <div className='overview_components' style={customStyles.container}>
              <StyleIcon sx={{ fontSize: 40 }} />
              <p>Your Products</p>
              <div className='components_info'>{userCards.length}</div>
            </div>
            <div className='overview_components' style={customStyles.container}>
              <RunningWithErrorsIcon sx={{ fontSize: 40 }} />
              <p>Low-Stock Products</p>
              <div className='components_info'>{criticalQuantityCount}</div>
            </div>
            <div className='overview_components' style={customStyles.container}>
              <DeleteSweepIcon sx={{ fontSize: 40 }} />
              <p>Deleted Products</p>
              <div className='components_info'>{deletedCardsCount}</div>
            </div>
          </div>
        </>
      )}
      <div className='overview_components_orders'>
        <div className='overview_components' style={customStyles.container}>
          <CreditScoreRoundedIcon sx={{ fontSize: 40 }} />
          <p>Ordered Products</p>
          <div className='components_info'> {totalItems}</div>
        </div>
        <div className='overview_components' style={customStyles.container}>
          <CurrencyExchangeIcon sx={{ fontSize: 40 }} />
          <p>Orders Grand Total</p>
          <div className='components_info'> {totalPrice.toFixed(2)}$</div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
