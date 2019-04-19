import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  Edit,
  Create,
  Delete,
  SimpleForm,
  TextInput,
  CardActions,
  ListButton,
  SaveButton,
  RefreshButton,
  DisabledInput,
  Toolbar
} from "react-admin";

import { validateTransaction } from "../validations";
import DeleteButtonWithConfirmation from "./custom/DeleteButtonWithConfirmation";

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

const TransactionEditActions = ({ basePath, data, resource }) => (
  <CardActions>
    <ListButton basePath={basePath} />
    <DeleteButtonWithConfirmation
      basePath={basePath}
      record={data}
      resource={resource}
      undoable={false}
    />
    <RefreshButton />
  </CardActions>
);

const TransactionEditToolbar = props => (
  <Toolbar {...props}>
    <SaveButton />
    <DeleteButtonWithConfirmation
      basePath={props.basePath}
      record={props.data}
      resource={props.resource}
      undoable={false}
    />
  </Toolbar>
);

export const TransactionEdit = props => {
  return (
    <Edit {...props} undoable={false}>
      <SimpleForm
        validate={validateTransaction}
        toolbar={<TransactionEditToolbar />}
      >
        <TextInput source="name" autoComplete="off" />
        <TextInput source="amount" autoComplete="off" />
      </SimpleForm>
    </Edit>
  );
};

export const TransactionCreate = props => (
  <Create {...props}>
    <SimpleForm validate={validateTransaction} redirect={"list"}>
      <TextInput source="name" autoComplete="off" />
      <TextInput source="amount" autoComplete="off" />
    </SimpleForm>
  </Create>
);
