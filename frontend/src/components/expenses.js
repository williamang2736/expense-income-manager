import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  DisabledInput
} from "react-admin";

import { validateTransaction } from "../validations";

export const ExpensesList = props => (
  <List {...props} sort={{ field: "name", order: "DESC" }}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="amount" />
      <DateField source="created_at" />
      <EditButton />
    </Datagrid>
  </List>
);

export const ExpenseEdit = props => (
  <Edit {...props}>
    <SimpleForm validate={validateTransaction}>
      <TextInput source="name" autoComplete="off" />
      <TextInput source="amount" />
    </SimpleForm>
  </Edit>
);

export const ExpenseCreate = props => (
  <Create {...props}>
    <SimpleForm validate={validateTransaction}>
      <TextInput source="name" autoComplete="off" />
      <TextInput source="amount" />
    </SimpleForm>
  </Create>
);
