//Celina
import React from "react";
import {
  Button,
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
  ReferenceInput,
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
  translate,
  ArrayInput,
  SimpleFormIterator
} from "react-admin"; // eslint-disable-line import/no-unresolved
import { withStyles } from "material-ui/styles";

const QueryTitle = translate(({ record, translate }) => (
  <span>{record.name}</span>
));

export const QueryShow = props => (
  <Show name={<QueryTitle />} {...props}>
    <TabbedShowLayout>
      <Tab label="QUERY">
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="version" />
        <ReferenceManyField
          label="Data Model"
          reference="searchEngines"
          source="searchEngines_id"
          target="id"
        >
          <SingleFieldList>
            <ChipField source="name" />
          </SingleFieldList>
        </ReferenceManyField>

        <TextField source="selection" />
        <TextField source="filter" />
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export const QueryEdit = props => (
  <Edit name={<QueryTitle />} {...props}>
    <TabbedForm defaultValue={{ average_note: 0 }}>
      <FormTab label="Query admin">
        <DisabledInput source="id" />
        <TextInput source="name" validate={required} />
        <TextInput source="version" validate={required} />
        <ReferenceInput
          label="Data Model"
          reference="searchEngines"
          source="searchEngines"
          value="searchEngines_id"
          validate={required}
        >
          <SelectInput optionText="name" source="searchEngines_id" />
        </ReferenceInput>
      </FormTab>
      <FormTab label="Query Builder" style={{ width: 500 }}>
        <NumberInput label="Top" min={1} />
        <ReferenceArrayInput
          label="From entity"
          reference="entities"
          source="entities"
        >
          <SelectArrayInput>
            <ChipField source="name" />
          </SelectArrayInput>
        </ReferenceArrayInput>
        <ReferenceArrayInput
          label="Columns"
          reference="customerProperties"
          source="customerProperties"
        >
          <SelectArrayInput>
            <ChipField source="name" />
          </SelectArrayInput>
        </ReferenceArrayInput>
        <br />
        <Button label="Add filter - (where)" component="span" />
        <ReferenceInput
          label="Fields"
          reference="customerProperties"
          source="customerProperties"
        >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput
          label="Operator"
          reference="queryOperators"
          source="queryOperators"
        >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <TextInput label="value condition" />
      </FormTab>
    </TabbedForm>
  </Edit>
);

const QueryCreateToolbar = props => (
  <Toolbar {...props}>
    <SaveButton label="Save and show" redirect="show" submitOnEnter={true} />
    <SaveButton
      label="Save and add"
      redirect={false}
      submitOnEnter={false}
      variant="flat"
    />
  </Toolbar>
);

export const QueryCreate = props => (
  <Create {...props}>
    <SimpleForm
      toolbar={<QueryCreateToolbar />}
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
      <TextInput source="name" validate={required} />
      <TextInput source="version" validate={required} />
      <ReferenceInput
        label="Data Model"
        reference="searchEngines"
        source="searchEngines"
        value="searchEngines_id"
        validate={required}
      >
        <SelectInput optionText="name" source="searchEngines_id" />
      </ReferenceInput>
      <NumberInput label="Top" min={1} />
      <ReferenceArrayInput
        label="From entity"
        reference="entities"
        source="entities"
      >
        <SelectArrayInput>
          <ChipField source="name" />
        </SelectArrayInput>
      </ReferenceArrayInput>
      <ReferenceArrayInput
        label="Columns"
        reference="customerProperties"
        source="customerProperties"
      >
        <SelectArrayInput>
          <ChipField source="name" />
        </SelectArrayInput>
      </ReferenceArrayInput>
      <br />
      <Button label="Add filter - (where)" component="span" />
      <ReferenceInput
        label="Fields"
        reference="customerProperties"
        source="customerProperties"
      >
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput
        label="Operator"
        reference="queryOperators"
        source="queryOperators"
      >
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput label="value condition" />
    </SimpleForm>
  </Create>
);

const QueryFilter = props => (
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

export const QueryList = withStyles(styles)(({ classes, ...props }) => (
  <List {...props} filters={<QueryFilter />}>
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
