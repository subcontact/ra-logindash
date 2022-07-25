//Celina
import React from "react";
import {
  BulkActions,
  BulkDeleteMenuItem,
  BooleanField,
  BooleanInput,
  CheckboxGroupInput,
  ChipField,
  Create,
  CreateButton,
  Datagrid,
  DateField,
  DateInput,
  DisabledInput,
  Edit,
  EditButton,
  Filter,
  FormTab,
  ImageField,
  ImageInput,
  List,
  LongTextInput,
  NumberField,
  NumberInput,
  ReferenceArrayField,
  ReferenceArrayInput,
  ReferenceManyField,
  Responsive,
  RichTextField,
  SaveButton,
  SelectField,
  SelectArrayInput,
  SelectInput,
  Show,
  ShowButton,
  SimpleForm,
  SimpleList,
  SingleFieldList,
  Tab,
  TabbedForm,
  TabbedShowLayout,
  TextField,
  TextInput,
  Toolbar,
  minValue,
  number,
  required,
  translate
} from "react-admin"; // eslint-disable-line import/no-unresolved
import RichTextInput from "ra-input-rich-text";
import Chip from "material-ui/Chip";
import { withStyles } from "material-ui/styles";

import PageviewIcon from "material-ui-icons/Pageview";
export const SearchEngineIcon = PageviewIcon;

/*
const QuickFilter = translate(({ label, translate }) => (
  <Chip style={{ marginBottom: 8 }} label={translate(label)} />
));
*/
const SearchEngineFilter = props => (
  <Filter {...props}>
    <TextInput label="Enter search criteria value" source="q" alwaysOn />
    <TextInput source="name" defaultValue="Enter search criteria value" />
  </Filter>
);

const styles = {
  name: {
    maxWidth: "20em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  publishedAt: { fontStyle: "italic" }
};

export const SearchEngineList = withStyles(styles)(({ classes, ...props }) => (
  <List {...props} filters={<SearchEngineFilter />}>
    <Responsive
      small={
        <SimpleList
          primaryText={record => record.name}
          secondaryText={record => record.version}
        />
      }
      medium={
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" cellClassName={classes.name} />
          <TextField source="version" cellClassName={classes.version} />

          <EditButton />
          <ShowButton />
        </Datagrid>
      }
    />
  </List>
));

const SearchEngineTitle = translate(({ record, translate }) => (
  <span>
    {record ? translate("customer.edit.name", { name: record.name }) : ""}
  </span>
));

const SearchEngineCreateToolbar = props => (
  <Toolbar {...props}>
    <SaveButton
      label="searchEngine.action.save_and_show"
      redirect="show"
      submitOnEnter={true}
    />
    <SaveButton
      label="searchEngine.action.save_and_add"
      redirect={false}
      submitOnEnter={false}
      variant="flat"
    />
  </Toolbar>
);

export const SearchEngineCreate = props => (
  <Create {...props}>
    <SimpleForm
      toolbar={<SearchEngineCreateToolbar />}
      defaultValue={{ average_note: 0 }}
      validate={values => {
        const errors = {};
        ["name", "version"].forEach(field => {
          if (!values[field]) {
            errors[field] = ["Required field"];
          }
        });

        if (values.average_note < 0 || values.average_note > 5) {
          errors.average_note = ["Should be between 0 and 5"];
        }

        return errors;
      }}
    >
      <TextInput source="name" />
      <TextInput source="version" />
    </SimpleForm>
  </Create>
);

export const SearchEngineEdit = props => (
  <Edit name={<SearchEngineTitle />} {...props}>
    <TabbedForm defaultValue={{ average_note: 0 }}>
      <FormTab label="Data Model Version">
        <DisabledInput source="id" />
        <TextInput source="name" validate={required} />
        <TextInput source="version" validate={required} />
      </FormTab>
      <FormTab label="Data Model - Entities">
        <ReferenceArrayInput
          reference="customerProperties"
          source="customerProperties"
        >
          <SelectArrayInput>
            <ChipField source="name" />
          </SelectArrayInput>
        </ReferenceArrayInput>
        <ReferenceArrayInput
          reference="addressProperties"
          source="addressProperties"
        >
          <SelectArrayInput>
            <ChipField source="name" />
          </SelectArrayInput>
        </ReferenceArrayInput>
      </FormTab>
      <FormTab label="Queries">
        <ReferenceManyField
          label="Queries"
          reference="queries"
          target="searchEngines_id"
        >
          <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="selection" />
            <TextField source="filter" />
            <EditButton />
            <ShowButton />
          </Datagrid>
        </ReferenceManyField>
      </FormTab>
    </TabbedForm>
  </Edit>
);

export const SearchEngineShow = props => (
  <Show name={<SearchEngineTitle />} {...props}>
    <TabbedShowLayout>
      <Tab label="Data Model">
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="version" />
      </Tab>
      <Tab label="Data Model - Entities">
        <ReferenceArrayField
          label="Customer Properties"
          reference="customerProperties"
          source="customerProperties"
        >
          <SingleFieldList>
            <ChipField source="name" />
          </SingleFieldList>
        </ReferenceArrayField>
        <ReferenceArrayField
          label="Address Properties"
          reference="addressProperties"
          source="addressProperties"
        >
          <SingleFieldList>
            <ChipField source="name" />
          </SingleFieldList>
        </ReferenceArrayField>
      </Tab>
      <Tab label="Queries">
        <ReferenceManyField
          label="Queries"
          reference="queries"
          target="searchEngines_id"
        >
          <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="selection" />
            <TextField source="filter" />
            <EditButton />
            <ShowButton />
          </Datagrid>
        </ReferenceManyField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);
