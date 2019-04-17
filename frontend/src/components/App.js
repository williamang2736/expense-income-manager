import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import ExpenseIcon from "@material-ui/icons/CreditCard";
import IncomeIcon from "@material-ui/icons/CreditCard";

import Dashboard from "./Dashboard/Dashboard";
import authProvider from "./authProvider";
import dataProvider from "./dataProvider";
import { ExpensesList, ExpenseEdit, ExpenseCreate } from "./expenses";
import { IncomesList, IncomeEdit, IncomeCreate } from "./incomes";
import LoginPage from "./Authentication/LoginPage";

// import jsonServerProvider from "ra-data-json-server";
// const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');

const App = () => (
  <Admin
    dashboard={Dashboard}
    authProvider={authProvider}
    dataProvider={dataProvider}
    loginPage={LoginPage}
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

ReactDOM.render(<App />, document.getElementById("app"));
