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

export const TransactionsList = props => (
  <List
    {...props}
    sort={{ field: "name", order: "DESC" }}
    bulkActionButtons={false}
  >
    <Datagrid rowClick="edit">
      <TextField />
      <TextField source="name" />
      <TextField source="amount" />
      <DateField source="created_at" />
      <EditButton />
    </Datagrid>
  </List>
);
export const TransactionEdit = props => (
  <Edit {...props}>
    <SimpleForm validate={validateTransaction}>
      <TextInput source="name" autoComplete="off" />
      <TextInput source="amount" autoComplete="off" />
    </SimpleForm>
  </Edit>
);

export const TransactionCreate = props => (
  <Create {...props}>
    <SimpleForm validate={validateTransaction} redirect={"list"}>
      <TextInput source="name" autoComplete="off" />
      <TextInput source="amount" autoComplete="off" />
    </SimpleForm>
  </Create>
);
