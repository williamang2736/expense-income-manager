import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  EditButton,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  DisabledInput
} from "react-admin";

import { validateTransaction } from "../validations";

export const IncomesList = props => (
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

export const IncomeEdit = props => (
  <Edit {...props}>
    <SimpleForm validate={validateTransaction}>
      <TextInput source="name" autoComplete="off" />
      <TextInput source="amount" />
    </SimpleForm>
  </Edit>
);

export const IncomeCreate = props => (
  <Create {...props}>
    <SimpleForm validate={validateTransaction}>
      <TextInput source="name" autoComplete="off" />
      <TextInput source="amount" />
    </SimpleForm>
  </Create>
);
