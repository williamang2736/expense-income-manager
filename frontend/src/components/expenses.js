import React from 'react';
import { List, Datagrid, TextField, EmailField, DateField, EditButton, Edit, Create, SimpleForm, TextInput, DateInput, DisabledInput } from 'react-admin';

export const ExpensesList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="amount" />
            <DateField source="created_at" />
            <EditButton />
        </Datagrid>
    </List>
);

export const ExpenseEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" autoComplete="off" />
            <TextInput source="amount" />
        </SimpleForm>
    </Edit>
)

export const ExpenseCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" autoComplete="off" />
            <TextInput source="amount" />
        </SimpleForm>
    </Create>
)