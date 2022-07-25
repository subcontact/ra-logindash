import React from "react";
import {
  AutocompleteInput,
  BulkActions,
  BulkDeleteAction,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditButton,
  Filter,
  List,
  LongTextInput,
  ReferenceField,
  ReferenceInput,
  Responsive,
  SearchInput,
  SelectInput,
  SimpleForm,
  TextField
} from "react-admin";

import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "material-ui-icons/Inbox";
//"material-ui-icons/ThumbUp";

//pruebas de iconos
import AssignmentTask from "material-ui-icons/Assignment";

import rowStyle from "./taskManagement/rowStyle";
import ApproveButton from "./taskManagement/ApproveButton";
//import CustomerReferenceField from "./taskManagement/users/CustomerReferenceField";
import UserReferenceField from "./taskManagement/users/UserReferenceField";

export const TaskInboxIcon = Icon;

const filterStyles = {
  status: { width: 150 }
};

export const TaskInboxFilter = withStyles(filterStyles)(
  ({ classes, ...props }) => (
    <Filter {...props}>
      <SearchInput source="q" /*alwaysOn*/ />
      <SelectInput
        source="status"
        choices={[
          { id: "accepted", name: "Accepted" },
          { id: "pending", name: "Pending" },
          { id: "rejected", name: "Rejected" }
        ]}
        className={classes.status}
      />
      <ReferenceInput source="customer_id" reference="customers">
        <AutocompleteInput
          optionText={choice => `${choice.first_name} ${choice.last_name}`}
        />
      </ReferenceInput>
      <DateInput source="date_gte" />
      <DateInput source="date_lte" />
    </Filter>
  )
);

const listStyles = {
  comment: {
    maxWidth: "18em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
};

const TaskInboxsBulkActions = props => (
  <BulkActions {...props}>
    <BulkDeleteAction />
  </BulkActions>
);

export const TaskInboxList = withStyles(listStyles)(({ classes, ...props }) => (
  <List
    {...props}
    bulkActions={<TaskInboxsBulkActions />}
    filters={<TaskInboxFilter />}
    perPage={25}
    sort={{ field: "creationDate", order: "DESC" }}
  >
    <Responsive
      medium={
        <Datagrid rowStyle={rowStyle}>
          <DateField source="creationDate" />
          <UserReferenceField label="User assigned" />
          <TextField source="taskType" />
          <TextField source="priority" />
          <TextField source="status" />
          <ApproveButton />
          <EditButton />
        </Datagrid>
      }
    />
  </List>
));

const editStyle = {
  detail: {
    display: "inline-block",
    verticalAlign: "top",
    marginRight: "2em",
    minWidth: "8em"
  }
};
