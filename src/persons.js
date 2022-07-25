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

import FaceIcon from "material-ui-icons/Face";
export const PersonIcon = FaceIcon;

const QuickFilter = translate(({ label, translate }) => (
  <Chip style={{ marginBottom: 8 }} label={translate(label)} />
));

const PersonFilter = props => (
  <Filter {...props}>
    <TextInput label="Search Person" source="q" alwaysOn />
    <TextInput source="name" autocomplete="true" />
    <TextInput source="lastname" />
    <TextInput source="nationality" />
    <TextInput source="marital_status" />
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

export const PersonList = withStyles(styles)(({ classes, ...props }) => (
  <List
    {...props}
    filters={<PersonFilter />}
    sort={{ field: "fullname", order: "DESC" }}
  >
    <Responsive
      small={
        <SimpleList
          primaryText={record => record.fullname}
          secondaryText={record => record.individual_id}
          tertiaryText={record => record.gender}
        />
      }
      medium={
        <Datagrid>
          <TextField source="id" />
          <TextField source="fullname" cellClassName={classes.name} />
          <DateField source="birthdate" cellClassName={classes.publishedAt} />
          <TextField source="nationality" cellClassName={classes.name} />
          <TextField source="marital_status" cellClassName={classes.name} />
          <EditButton />
          <ShowButton />
        </Datagrid>
      }
    />
  </List>
));

const PersonTitle = translate(({ record, translate }) => (
  <span>
    {record ? translate("person.edit.name", { name: record.name }) : ""}
  </span>
));

const PersonCreateToolbar = props => (
  <Toolbar {...props}>
    <SaveButton
      label="person.action.save_and_show"
      redirect="show"
      submitOnEnter={true}
    />
    <SaveButton
      label="person.action.save_and_add"
      redirect={false}
      submitOnEnter={false}
      variant="flat"
    />
  </Toolbar>
);

const getDefaultDate = () => new Date();

export const PersonCreate = props => (
  <Create {...props}>
    <SimpleForm
      toolbar={<PersonCreateToolbar />}
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
      <TextInput source="name" />
      <TextInput source="password" type="password" />
      <LongTextInput source="teaser" />
      <RichTextInput source="body" />
      <DateInput source="published_at" defaultValue={getDefaultDate} />
      <NumberInput source="average_note" />
      <BooleanInput source="commentable" defaultValue />
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

export const PersonEdit = props => (
  <Edit name={<PersonTitle />} {...props}>
    <TabbedForm defaultValue={{ average_note: 0 }}>
      <FormTab label="Demographic Data">
        <DisabledInput source="id" />

        <TextInput source="fullname" validate={required} />
        <TextInput source="name" validate={required} />
        <TextInput source="lastname" validate={required} />

        <SelectInput
          source="nationality"
          choices={[
            { name: "American", id: "1" },
            { name: "Argentinian", id: "2" },
            { name: "English", id: "3" },
            { name: "Spaniard", id: "4" }
          ]}
        />

        <TextInput source="marital_status" />

        <ImageInput multiple source="pictures" accept="image/*">
          <ImageField source="src" name="name" />
        </ImageInput>
      </FormTab>
      <FormTab label="Contact Medium">
        <RichTextInput
          source="body"
          label=""
          validate={required}
          addLabel={false}
        />
      </FormTab>
      <FormTab label="Addresses">
        <ReferenceArrayInput reference="tags" source="tags">
          <SelectArrayInput>
            <ChipField source="name" />
          </SelectArrayInput>
        </ReferenceArrayInput>
        <DateInput source="published_at" options={{ locale: "pt" }} />
        <SelectInput
          source="category"
          choices={[
            { name: "Tech", id: "tech" },
            { name: "Lifestyle", id: "lifestyle" }
          ]}
        />
        <NumberInput
          source="average_note"
          validate={[required, number, minValue(0)]}
        />
        <BooleanInput source="commentable" defaultValue />
        <DisabledInput source="views" />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export const PersonShow = props => (
  <Show name={<PersonTitle />} {...props}>
    <TabbedShowLayout>
      <Tab label="person.form.summary">
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="teaser" />
      </Tab>
      <Tab label="person.form.body">
        <RichTextField
          source="body"
          stripTags={false}
          label=""
          addLabel={false}
        />
      </Tab>
      <Tab label="person.form.miscellaneous">
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
