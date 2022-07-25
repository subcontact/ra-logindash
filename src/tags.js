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

import TagIcon from "material-ui-icons/Face";
export const TagsIcon = TagIcon;

const QuickFilter = translate(({ label, translate }) => (
  <Chip style={{ marginBottom: 8 }} label={translate(label)} />
));

const TagFilter = props => (
  <Filter {...props}>
    <TextInput label="tag.list.search" source="q" alwaysOn />
    <TextInput source="name" defaultValue="Enter search criteria value" />
    <QuickFilter
      label="resources.tags.fields.commentable"
      source="commentable"
      defaultValue
    />
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

export const TagList = withStyles(styles)(({ classes, ...props }) => (
  <List
    {...props}
    filters={<TagFilter />}
    sort={{ field: "published_at", order: "DESC" }}
  >
    <Responsive
      small={
        <SimpleList
          primaryText={record => record.Name}
          secondaryText={record => `${record.views} views`}
          tertiaryText={record =>
            new Date(record.published_at).toLocaleDateString()
          }
        />
      }
      medium={
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" cellClassName={classes.name} />
          <DateField
            source="published_at"
            cellClassName={classes.publishedAt}
          />
          <BooleanField
            source="commentable"
            label="resources.tags.fields.commentable_short"
          />
          <NumberField source="views" />
          <ReferenceArrayField label="Tags" reference="tags" source="tags">
            <SingleFieldList>
              <ChipField source="name" />
            </SingleFieldList>
          </ReferenceArrayField>
          <EditButton />
          <ShowButton />
        </Datagrid>
      }
    />
  </List>
));

const TagTitle = translate(({ record, translate }) => (
  <span>{record ? translate("tag.edit.name", { name: record.name }) : ""}</span>
));

const TagCreateToolbar = props => (
  <Toolbar {...props}>
    <SaveButton
      label="tag.action.save_and_show"
      redirect="show"
      submitOnEnter={true}
    />
    <SaveButton
      label="tag.action.save_and_add"
      redirect={false}
      submitOnEnter={false}
      variant="flat"
    />
  </Toolbar>
);

const getDefaultDate = () => new Date();

export const TagCreate = props => (
  <Create {...props}>
    <SimpleForm
      toolbar={<TagCreateToolbar />}
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
      state: { record: { tag_id: props.record.id } }
    }}
  />
);

export const TagEdit = props => (
  <Edit name={<TagTitle />} {...props}>
    <TabbedForm defaultValue={{ average_note: 0 }}>
      <FormTab label="tag.form.summary">
        <DisabledInput source="id" />
        <TextInput source="name" validate={required} />
        <CheckboxGroupInput
          source="notifications"
          choices={[
            { id: 12, name: "Ray Hakt" },
            { id: 31, name: "Ann Gullar" },
            { id: 42, name: "Sean Phonee" }
          ]}
        />
        <LongTextInput source="teaser" validate={required} />
        <ImageInput multiple source="pictures" accept="image/*">
          <ImageField source="src" name="name" />
        </ImageInput>
      </FormTab>
      <FormTab label="tag.form.body">
        <RichTextInput
          source="body"
          label=""
          validate={required}
          addLabel={false}
        />
      </FormTab>
      <FormTab label="tag.form.miscellaneous">
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

export const TagShow = props => (
  <Show name={<TagTitle />} {...props}>
    <TabbedShowLayout>
      <Tab label="tag.form.summary">
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="teaser" />
      </Tab>
      <Tab label="tag.form.body">
        <RichTextField
          source="body"
          stripTags={false}
          label=""
          addLabel={false}
        />
      </Tab>
      <Tab label="tag.form.miscellaneous">
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
