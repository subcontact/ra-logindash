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

import FaceIcon from "material-ui-icons/Sync";
export const InteractionIcon = FaceIcon;

const QuickFilter = translate(({ label, translate }) => (
  <Chip style={{ marginBottom: 8 }} label={translate(label)} />
));

const InteractionFilter = props => (
  <Filter {...props}>
    <TextInput label="Search Interaction" source="q" alwaysOn />
    <TextInput source="friendly_name" autocomplete="true" />
    <TextInput source="type" />
    <TextInput source="status" />
    <TextInput source="created_at" />
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

export const InteractionList = withStyles(styles)(({ classes, ...props }) => (
  <List
    {...props}
    filters={<InteractionFilter />}
    sort={{ field: "friendly_name", order: "DESC" }}
  >
    <Responsive
      small={
        <SimpleList
          primaryText={record => record.friendly_name}
          secondaryText={record => record.type}
          tertiaryText={record => record.status}
        />
      }
      medium={
        <Datagrid>
          <TextField source="id" />
          <TextField source="friendly_name" cellClassName={classes.name} />
          <TextField source="type" cellClassName={classes.name} />
          <TextField source="status" cellClassName={classes.name} />
          <DateField source="created_at" cellClassName={classes.name} />
          <EditButton />
          <ShowButton />
        </Datagrid>
      }
    />
  </List>
));

const InteractionTitle = translate(({ record, translate }) => (
  <span>
    {record ? translate("friendly_name", { name: record.friendly_name }) : ""}
  </span>
));

const InteractionCreateToolbar = props => (
  <Toolbar {...props}>
    <SaveButton label="Save Interaction" redirect="show" submitOnEnter={true} />
    <SaveButton
      label="Add Interaction"
      redirect={false}
      submitOnEnter={false}
      variant="flat"
    />
  </Toolbar>
);

const getDefaultDate = () => new Date();

export const InteractionCreate = props => (
  <Create {...props}>
    <SimpleForm
      toolbar={<InteractionCreateToolbar />}
      defaultValue={{ average_note: 0 }}
      validate={values => {
        const errors = {};
        ["name", "teaser"].forEach(field => {
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
      <TextInput source="friendly_name" />
      <TextInput source="type" defaultValue />
      <TextInput source="status" defaultValue />
      <DateInput source="created_at" defaultValue={getDefaultDate} />
    </SimpleForm>
  </Create>
);

const CreateCommentButton = props => (
  <CreateButton
    {...props}
    resource="comments"
    label="Add a new comment"
    to={{
      pathname: "/comments/create",
      state: { record: { person_id: props.record.id } }
    }}
  />
);

export const InteractionEdit = props => (
  <Edit name={<InteractionTitle />} {...props}>
    <TabbedForm defaultValue={{ average_note: 0 }}>
      <FormTab label="Details">
        <DisabledInput source="id" />

        <TextField source="friendly_name" />
        <TextField source="type" />
        <TextField source="status" />
        <DateField source="created_at" />
      </FormTab>

      <FormTab label="Products">
        <RichTextInput
          source="body"
          label=""
          validate={required}
          addLabel={false}
        />
      </FormTab>
      <FormTab label="Resources">
        <RichTextInput
          source="body"
          label=""
          validate={required}
          addLabel={false}
        />
      </FormTab>
      <FormTab label="Subscriptions">
        <RichTextInput
          source="body"
          label=""
          validate={required}
          addLabel={false}
        />
        <FormTab label="Accounts">
          <RichTextInput
            source="body"
            label=""
            validate={required}
            addLabel={false}
          />
          <FormTab label="Documents">
            <RichTextInput
              source="body"
              label=""
              validate={required}
              addLabel={false}
            />
          </FormTab>
        </FormTab>
      </FormTab>
    </TabbedForm>
  </Edit>
);

export const InteractionShow = props => (
  <Show name={<InteractionTitle />} {...props}>
    <TabbedShowLayout>
      <Tab label="Details">
        <DisabledInput source="id" />
        <TextField source="friendly_name" />
        <TextField source="type" />
        <TextField source="status" />
        <DateField source="created_at" />
      </Tab>

      <Tab label="Authorization">
        <RichTextField
          source="body"
          stripTags={false}
          label=""
          addLabel={false}
        />
      </Tab>
      <Tab label="Followups">
        <ReferenceArrayField reference="tags" source="tags">
          <SingleFieldList>
            <ChipField source="name" />
          </SingleFieldList>
        </ReferenceArrayField>
        <DateField source="published_at" />
        <SelectField
          source="category"
          choices={[
            { name: "Tech", id: "tech" },
            { name: "Lifestyle", id: "lifestyle" }
          ]}
        />
        <NumberField source="average_note" />
        <BooleanField source="commentable" />
        <TextField source="views" />
      </Tab>
    </TabbedShowLayout>
  </Show>
);
