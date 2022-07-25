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

import InputIcon from "material-ui-icons/Input";
export const ResourceIcon = InputIcon;

const QuickFilter = translate(({ label, translate }) => (
  <Chip style={{ marginBottom: 8 }} label={translate(label)} />
));

const ResourceFilter = props => (
  <Filter {...props}>
    <TextInput
      source="Id_Cliente_Externo"
      defaultValue="Enter search criteria value"
    />
    <TextInput
      source="Nombre_de_la_oferta"
      defaultValue="Enter search criteria value"
    />
    <TextInput
      source="Codigo_de_Cliente"
      defaultValue="Enter search criteria value"
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

export const ResourceList = withStyles(styles)(({ classes, ...props }) => (
  <List
    {...props}
    filters={<ResourceFilter />}
    sort={{ field: "Id_Cliente_Externo", order: "DESC" }}
  >
    <Responsive
      small={
        <SimpleList
          primaryText={record => record.Id_Cliente_Externo}
          tertiaryText={record => record.Nombre_de_la_oferta}
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

const ResourceTitle = translate(({ record, translate }) => (
  <span>
    {record ? translate("resource.edit.offer", { name: record.offer }) : ""}
  </span>
));

const ResourceCreateToolbar = props => (
  <Toolbar {...props}>
    <SaveButton
      label="resource.action.save_and_show"
      redirect="show"
      submitOnEnter={true}
    />
    <SaveButton
      label="resource.action.save_and_add"
      redirect={false}
      submitOnEnter={false}
      variant="flat"
    />
  </Toolbar>
);

const getDefaultDate = () => new Date();

export const ResourceCreate = props => (
  <Create {...props}>
    <SimpleForm
      toolbar={<ResourceCreateToolbar />}
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
      <TextInput source="Id_Cliente_Externo" validate={required} />
      <SelectInput
        source="Nombre_de_la_oferta"
        choices={[
          { id: " Sin Fronteras 2" },
          { id: " Con Equipo AB" },
          { name: "SA", id: "Servicios adicionales" },
          { name: "NA", id: "NA" },
          { name: "Elegidos ", id: "Elegidos " },
          { name: "Voz", id: "Voz" },
          { name: "SIM", id: "SIM" }
        ]}
      />
      <TextInput source="Contrato_Externo" validate={required} />
      <TextInput source="Contrato_Legal" validate={required} />
      <NumberInput source="SimCard" validate={required} />
      <NumberInput source="Imei" validate={required} />
      <TextInput source="Numero_de_referencia" validate={required} />
      <TextInput source="Codigo_de_Cliente" validate={required} />
      <TextInput source="Aprovisionado" validate={required} />

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
      state: { record: { resource_id: props.record.id } }
    }}
  />
);

export const ResourceEdit = props => (
  <Edit name={<ResourceTitle />} {...props}>
    <TabbedForm defaultValue={{ average_note: 0 }}>
      <FormTab label="resource details">
        <TextInput source="Id_Cliente_Externo" validate={required} />
        <SelectInput
          source="Nombre_de_la_oferta"
          choices={[
            { name: "Sin Fronteras 2", id: "SF2" },
            { name: "ConEquipoAB", id: "CEAB" },
            { name: "Servicios adicionales", id: "SA" },
            { name: "NA", id: "NA" },
            { name: "Elegidos ", id: "Elegidos " },
            { name: "Voz", id: "Voz" },
            { name: "SIM", id: "SIM" }
          ]}
        />

        <TextInput source="Contrato_Externo" validate={required} />
        <TextInput source="Contrato_Legal" validate={required} />
        <NumberInput source="SimCard" validate={required} />
        <NumberInput source="Imei" validate={required} />
        <TextInput source="Numero_de_referencia" validate={required} />
        <TextInput source="Codigo_de_Cliente" validate={required} />
        <TextInput source="Aprovisionado" validate={required} />

        <ImageInput multiple source="pictures" accept="image/*">
          <ImageField source="src" name="offer" />
        </ImageInput>
      </FormTab>
    </TabbedForm>
  </Edit>
);

export const ResourceShow = props => (
  <Show name={<ResourceTitle />} {...props}>
    <TabbedShowLayout>
      <Tab label="Resource details">
        <TextField source="Id_Cliente_Externo" />
        <TextField source="Nombre_de_la_oferta" />
        <TextField source="Contrato_Externo" />
        <TextField source="Contrato_Legal" />
        <NumberField source="SimCard" />
        <NumberField source="Imei" />
        <TextField source="Numero_de_referencia" />
        <TextField source="Codigo_de_Cliente" />
        <TextField source="Aprovisionado" />
      </Tab>
    </TabbedShowLayout>
  </Show>
);
