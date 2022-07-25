import React from "react";
import {
  AutocompleteInput,
  Create,
  DateField,
  DateInput,
  DisabledInput,
  Edit,
  EditButton,
  Filter,
  List,
  LongTextInput,
  ReferenceField,
  ReferenceInput,
  Responsive,
  SelectInput,
  SimpleList,
  SimpleForm,
  TextField,
  TextInput,
  minLength,
  translate,
  Show,
  ShowButton,
  SimpleShowLayout,
  required
} from "react-admin"; // eslint-disable-line import/no-unresolved

import PositionIcon from "material-ui-icons/Place";
import Avatar from "material-ui/Avatar";
import Card, { CardActions, CardHeader, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import Toolbar from "material-ui/Toolbar";
import ChevronLeft from "material-ui-icons/ChevronLeft";
import ChevronRight from "material-ui-icons/ChevronRight";
import Grid from "material-ui/Grid";
import { withStyles } from "material-ui/styles";
import BookIcon from "material-ui-icons/Public";
export const AddressIcon = BookIcon;
import MapIcon from "material-ui-icons/LocationOn";
export const DeleteIcon = MapIcon;

const AddressFilter = props => (
  <Filter {...props}>
    <ReferenceInput source="city" reference="addresess">
      <SelectInput optionText="city" />
    </ReferenceInput>
    <ReferenceInput source="country" reference="addresess">
      <SelectInput optionText="country" />
    </ReferenceInput>
    <ReferenceInput source="zipCode" reference="addresess">
      <SelectInput optionText="zipCode" />
    </ReferenceInput>
  </Filter>
);

const AddressPagination = translate(
  ({ page, perPage, total, setPage, translate }) => {
    const nbPages = Math.ceil(total / perPage) || 1;
    return (
      nbPages > 1 && (
        <Toolbar>
          {page > 1 && (
            <Button
              color="primary"
              key="prev"
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeft />
              &nbsp;
              {translate("ra.navigation.prev")}
            </Button>
          )}
          {page !== nbPages && (
            <Button
              color="primary"
              key="next"
              onClick={() => setPage(page + 1)}
            >
              {translate("ra.navigation.next")}&nbsp;
              <ChevronRight />
            </Button>
          )}
        </Toolbar>
      )
    );
  }
);

const listStyles = theme => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardContent: theme.typography.body1,
  cardLink: {
    ...theme.typography.body1,
    flexGrow: 1
  },
  cardActions: {
    justifyContent: "flex-end"
  }
});

const AddressGrid = withStyles(listStyles)(
  translate(({ classes, ids, data, basePath, translate }) => (
    <Grid container style={{ padding: "1em" }}>
      {ids.map(id => (
        <Grid item key={id} sm={12} md={6} lg={4}>
          <Card className={classes.card}>
            <CardHeader
              title={
                <div>
                  <TextField record={data[id]} source="streetName" />
                  &nbsp;
                  <TextField record={data[id]} source="streetType" />
                </div>
              }
              subheader={<TextField record={data[id]} source="country" />}
              avatar={
                <Avatar>
                  <PositionIcon />
                </Avatar>
              }
            />
            <CardContent className={classes.cardContent}>
              <TextField record={data[id]} source="streetNumber" />
              &nbsp;
              <TextField record={data[id]} source="streetName" />
              &nbsp;
              <TextField record={data[id]} source="streetType" />
              <br />
              <TextField record={data[id]} source="addressLine2" />
              <br />
              <TextField record={data[id]} source="zipCode" />
              <br />
              <TextField record={data[id]} source="city" />
              &nbsp;
              <TextField record={data[id]} source="country" />
            </CardContent>

            <CardActions className={classes.cardActions}>
              <Button color="primary">
                Location
                <DeleteIcon className={classes.rightIcon} />
              </Button>
              <EditButton
                resource="posts"
                basePath={basePath}
                record={data[id]}
              />
              <ShowButton
                resource="posts"
                basePath={basePath}
                record={data[id]}
              />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  ))
);

AddressGrid.defaultProps = {
  data: {},
  ids: []
};

const AddressMobileList = props => (
  <SimpleList
    primaryText={record => record.streetName}
    secondaryText={record => record.city}
    tertiaryText={record => record.country}
    leftAvatar={() => <AddressIcon />}
    {...props}
  />
);

export const AddressList = props => (
  <List
    {...props}
    perPage={9}
    filters={<AddressFilter />}
    pagination={<AddressPagination />}
  >
    <Responsive small={<AddressMobileList />} medium={<AddressGrid />} />
  </List>
);

export const AddressEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="streetNumber" />
      <TextInput source="streetName" validate={minLength(2)} />
      <SelectInput
        source="streetType"
        choices={[
          { name: "Boulevard", id: "Blvd." },
          { name: "Street", id: "St." },
          { name: "Road", id: "Rd." },
          { name: "Avenue", id: "Av." }
        ]}
      />
      <TextInput source="addressLine2" />
      <TextInput source="zipCode" />
      <TextInput source="city" />
      <TextInput source="country" />
      <DateInput source="created_at" />
    </SimpleForm>
  </Edit>
);

export const AddressCreate = props => (
  <Create {...props}>
    <SimpleForm
      defaultValue={{
        created_at: new Date(),
        ...(props.location.state ? props.location.state.record : {})
      }}
    >
      <TextInput source="id" />
      <TextInput source="streetNumber" />
      <TextInput source="streetName" validate={minLength(2)} />
      <SelectInput
        source="streetType"
        choices={[
          { name: "Boulevard", id: "Blvd." },
          { name: "Street", id: "St." },
          { name: "Road", id: "Rd." },
          { name: "Avenue", id: "Av." }
        ]}
      />
      <TextInput source="addressLine2" />
      <TextInput source="zipCode" />
      <TextInput source="city" />
      <TextInput source="country" />
      <DateInput source="created_at" />
    </SimpleForm>
  </Create>
);

export const AddressShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />

      <TextField source="streetNumber" />
      <TextField source="streetName" />
      <TextField source="streetType" />
      <TextField source="addressLine2" label="Address Line 2" />
      <TextField source="zipCode" />
      <TextField source="city" />
      <TextField source="country" />
    </SimpleShowLayout>
  </Show>
);

export const AddressM = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />

      <TextField source="streetNumber" />
      <TextField source="streetName" />
      <TextField source="streetType" />
      <TextField source="addressLine2" label="Address Line 2" />
      <TextField source="zipCode" />
      <TextField source="city" />
      <TextField source="country" />
    </SimpleShowLayout>
  </Show>
);
