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

import FaceIcon from "material-ui-icons/ShoppingCart";
export const ProductIcon = FaceIcon;

const QuickFilter = translate(({ label, translate }) => (
  <Chip style={{ marginBottom: 8 }} label={translate(label)} />
));

const ProductFilter = props => (
  <Filter {...props}>
    <TextInput label="product.list.search" source="q" alwaysOn />
    <TextInput source="offer" defaultValue="Enter search criteria value" />
    <QuickFilter
      label="resources.products.fields.commentable"
      source="commentable"
      defaultValue
    />
  </Filter>
);

const styles = {
  offer: {
    maxWidth: "20em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
};

export const ProductList = withStyles(styles)(({ classes, ...props }) => (
  <List
    {...props}
    filters={<ProductFilter />}
    sort={{ field: "published_at", order: "DESC" }}
  >
    <Responsive
      small={
        <SimpleList
          primaryText={record => record.offer}
          tertiaryText={record => record.recurrentAmount}
        />
      }
      medium={
        <Datagrid>
          <TextField source="id" />
          <TextField source="offer" cellClassName={classes.offer} />
          <NumberField source="oneTimeAmount" />
          <NumberField source="recurrentAmount" />
          <EditButton />
          <ShowButton />
        </Datagrid>
      }
    />
  </List>
));

const ProductTitle = translate(({ record, translate }) => (
  <span>
    {record ? translate("product.edit.offer", { name: record.offer }) : ""}
  </span>
));

const ProductCreateToolbar = props => (
  <Toolbar {...props}>
    <SaveButton
      label="product.action.save_and_show"
      redirect="show"
      submitOnEnter={true}
    />
    <SaveButton
      label="product.action.save_and_add"
      redirect={false}
      submitOnEnter={false}
      variant="flat"
    />
  </Toolbar>
);

const getDefaultDate = () => new Date();

export const ProductCreate = props => (
  <Create {...props}>
    <SimpleForm
      toolbar={<ProductCreateToolbar />}
      defaultValue={{ average_note: 0 }}
      validate={values => {
        const errors = {};
        ["offer", "teaser"].forEach(field => {
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
      <TextInput source="offer" validate={required} />
      <NumberInput source="oneTimeAmount" validate={required} />
      <NumberInput source="recurrentAmount" validate={required} />
      <CheckboxGroupInput
        source="includes"
        choices={[
          { id: 12, name: "100 SMS" },
          { id: 31, name: "Unlimited Calls" },
          { id: 42, name: "Unlimited WhatsApp" }
        ]}
      />
      <LongTextInput source="description" validate={required} />
      <ImageInput multiple source="pictures" accept="image/*">
        <ImageField source="src" name="offer" />
      </ImageInput>
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
      state: { record: { product_id: props.record.id } }
    }}
  />
);

export const ProductEdit = props => (
  <Edit name={<ProductTitle />} {...props}>
    <TabbedForm defaultValue={{ average_note: 0 }}>
      <FormTab label="product.form.summary">
        <DisabledInput source="id" />
        <TextInput source="offer" validate={required} />
        <CheckboxGroupInput
          source="includes"
          choices={[
            { id: 12, name: "100 SMS" },
            { id: 31, name: "Unlimited Calls" },
            { id: 42, name: "Unlimited WhatsApp" }
          ]}
        />
        <LongTextInput source="description" validate={required} />
        <ImageInput multiple source="pictures" accept="image/*">
          <ImageField source="src" name="offer" />
        </ImageInput>
      </FormTab>
    </TabbedForm>
  </Edit>
);

export const ProductShow = props => (
  <Show name={<ProductTitle />} {...props}>
    <TabbedShowLayout>
      <Tab label="product details">
        <TextField source="id" />
        <TextField source="offer" />
        <NumberField source="oneTimeAmount" />
        <NumberField source="recurrentAmount" />
        <TextField source="includes" />
        <TextField source="description" />
      </Tab>
    </TabbedShowLayout>
  </Show>
);
