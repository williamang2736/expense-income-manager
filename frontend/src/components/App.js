import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import ExpenseIcon from "@material-ui/icons/CreditCardTwoTone";
import IncomeIcon from "@material-ui/icons/CreditCard";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./Dashboard/Dashboard";
import authProvider from "./authProvider";
import dataProvider from "./dataProvider";
import { ExpensesList, ExpenseEdit, ExpenseCreate } from "./expenses";
import { IncomesList, IncomeEdit, IncomeCreate } from "./incomes";
import Login from "./Authentication/Login";
import customRoutes from "./customRoutes";

toast.configure({
  autoClose: 5000,
  draggable: false,
  closeOnClick: true,
  pauseOnHover: true,
  transition: Slide,
  position: "bottom-right"
});

class App extends Component {
  render() {
    return (
      <Admin
        customRoutes={customRoutes}
        dashboard={Dashboard}
        authProvider={authProvider}
        dataProvider={dataProvider}
        loginPage={Login}
      >
        <Resource
          name="expenses"
          list={ExpensesList}
          edit={ExpenseEdit}
          create={ExpenseCreate}
          icon={ExpenseIcon}
        />
        <Resource
          name="incomes"
          list={IncomesList}
          edit={IncomeEdit}
          create={IncomeCreate}
          icon={IncomeIcon}
        />
      </Admin>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
