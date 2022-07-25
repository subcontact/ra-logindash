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

import BookIcon from "material-ui-icons/Book";
export const IssuesIcon = BookIcon;

const QuickFilter = translate(({ label, translate }) => (
  <Chip style={{ marginBottom: 8 }} label={translate(label)} />
));

const IssueFilter = props => (
  <Filter {...props}>
    <TextInput label="issues.list.search" source="q" alwaysOn />
    <TextInput source="title" defaultValue="Qui tempore rerum et voluptates" />
    <QuickFilter
      label="resources.issues.fields.commentable"
      source="commentable"
      defaultValue
    />
  </Filter>
);

const styles = {
  title: {
    maxWidth: "20em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  publishedAt: { fontStyle: "italic" }
};

export const IssueList = withStyles(styles)(({ classes, ...props }) => (
  <List
    {...props}
    filters={<IssueFilter />}
    sort={{ field: "published_at", order: "DESC" }}
  >
    <Responsive
      small={
        <SimpleList
          primaryText={record => record.title}
          secondaryText={record => `${record.views} views`}
          tertiaryText={record =>
            new Date(record.published_at).toLocaleDateString()
          }
        />
      }
      medium={
        <Datagrid>
          <TextField source="id" />
          <TextField source="title" cellClassName={classes.title} />
          <DateField
            source="published_at"
            cellClassName={classes.publishedAt}
          />
          <BooleanField
            source="commentable"
            label="resources.issues.fields.commentable_short"
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

const IssueTitle = translate(({ record, translate }) => (
  <span>
    {record ? translate("issue.edit.title", { title: record.title }) : ""}
  </span>
));

const IssueCreateToolbar = props => (
  <Toolbar {...props}>
    <SaveButton
      label="issue.action.save_and_show"
      redirect="show"
      submitOnEnter={true}
    />
    <SaveButton
      label="issue.action.save_and_add"
      redirect={false}
      submitOnEnter={false}
      variant="flat"
    />
  </Toolbar>
);

const getDefaultDate = () => new Date();

export const IssueCreate = props => (
  <Create {...props}>
    <SimpleForm
      toolbar={<IssueCreateToolbar />}
      defaultValue={{ average_note: 0 }}
      validate={values => {
        const errors = {};
        ["title", "teaser"].forEach(field => {
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
      <TextInput source="title" />
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
      state: { record: { issue_id: props.record.id } }
    }}
  />
);

export const IssueEdit = props => (
  <Edit title={<IssueTitle />} {...props}>
    <TabbedForm defaultValue={{ average_note: 0 }}>
      <FormTab label="issue.form.summary">
        <DisabledInput source="id" />
        <TextInput source="title" validate={required} />
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
          <ImageField source="src" title="title" />
        </ImageInput>
      </FormTab>
      <FormTab label="issue.form.body">
        <RichTextInput
          source="body"
          label=""
          validate={required}
          addLabel={false}
        />
      </FormTab>
      <FormTab label="issue.form.miscellaneous">
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
      <FormTab label="issue.form.comments">
        <CreateCommentButton />
        <ReferenceManyField
          reference="comments"
          target="issue_id"
          addLabel={false}
        >
          <Datagrid>
            <DateField source="created_at" />
            <TextField source="author.name" />
            <TextField source="body" />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
      </FormTab>
      <FormTab label="issue.form.comments">
        <CreateCommentButton />
        <ReferenceManyField
          reference="comments"
          target="issue_id"
          addLabel={false}
        >
          <Datagrid>
            <DateField source="created_at" />
            <TextField source="author.name" />
            <TextField source="body" />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
      </FormTab>
      <FormTab label="issue.form.comments">
        <CreateCommentButton />
        <ReferenceManyField
          reference="comments"
          target="issue_id"
          addLabel={false}
        >
          <Datagrid>
            <DateField source="created_at" />
            <TextField source="author.name" />
            <TextField source="body" />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
      </FormTab>
      <FormTab label="issue.form.comments">
        <CreateCommentButton />
        <ReferenceManyField
          reference="comments"
          target="issue_id"
          addLabel={false}
        >
          <Datagrid>
            <DateField source="created_at" />
            <TextField source="author.name" />
            <TextField source="body" />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
      </FormTab>
      <FormTab label="issue.form.comments">
        <CreateCommentButton />
        <ReferenceManyField
          reference="comments"
          target="issue_id"
          addLabel={false}
        >
          <Datagrid>
            <DateField source="created_at" />
            <TextField source="author.name" />
            <TextField source="body" />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
      </FormTab>
      <FormTab label="issue.form.comments">
        <CreateCommentButton />
        <ReferenceManyField
          reference="comments"
          target="issue_id"
          addLabel={false}
        >
          <Datagrid>
            <DateField source="created_at" />
            <TextField source="author.name" />
            <TextField source="body" />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
      </FormTab>
    </TabbedForm>
  </Edit>
);

export const IssueShow = props => (
  <Show title={<IssueTitle />} {...props}>
    <TabbedShowLayout>
      <Tab label="issue.form.summary">
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="teaser" />
      </Tab>
      <Tab label="issue.form.body">
        <RichTextField
          source="body"
          stripTags={false}
          label=""
          addLabel={false}
        />
      </Tab>
      <Tab label="issue.form.miscellaneous">
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
      <Tab label="issue.form.comments">
        <CreateCommentButton />
        <ReferenceManyField
          addLabel={false}
          reference="comments"
          target="issue_id"
          sort={{ field: "created_at", order: "DESC" }}
        >
          <Datagrid selectable={false}>
            <DateField source="created_at" />
            <TextField source="author.name" />
            <TextField source="body" />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);
