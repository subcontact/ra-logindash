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

import PersonIcon from "material-ui-icons/Contacts";
import Avatar from "material-ui/Avatar";
import Card, { CardActions, CardHeader, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import Toolbar from "material-ui/Toolbar";
import Chip from "material-ui/Chip";
import ChevronLeft from "material-ui-icons/ChevronLeft";
import ChevronRight from "material-ui-icons/ChevronRight";
import Grid from "material-ui/Grid";
import { withStyles } from "material-ui/styles";
export const IndividualIcon = PersonIcon;

const QuickFilter = translate(({ label, translate }) => (
  <Chip style={{ marginBottom: 8 }} label={translate(label)} />
));

const IndividualFilter = props => (
  <Filter {...props}>
    <TextInput label="fullname" source="q" alwaysOn />
    <TextInput source="fullname" />
    <QuickFilter
      label="resources.individuals.fields.fullname"
      source="fullname"
      defaultValue
    />
  </Filter>
);

//const IndividualFilter = props => (
//  <Filter {...props}>
//    <ReferenceInput source="fullname" reference="fullname">
//      <SelectInput optionText="fullname" />
//    </ReferenceInput>
//  </Filter>
//);

const IndividualPagination = translate(
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

const IndividualGrid = withStyles(listStyles)(
  translate(({ classes, ids, data, basePath, translate }) => (
    <Grid container style={{ padding: "1em" }}>
      {ids.map(id => (
        <Grid item key={id} sm={12} md={6} lg={4}>
          <Card className={classes.card}>
            <CardHeader
              title={<TextField record={data[id]} source="fullname" />}
              subheader={<TextField record={data[id]} source="individual_id" />}
              avatar={
                <Avatar>
                  <PersonIcon />
                </Avatar>
              }
            />
            <CardContent className={classes.cardContent}>
              <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField record={data[id]} source="gender" />
                &nbsp; - &nbsp;
                <TextField record={data[id]} source="marital_status" />
              </div>
              <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Born in <DateField record={data[id]} source="birthdate" />
                &nbsp;at &nbsp;
                <TextField record={data[id]} source="country_of_birth" />
              </div>
            </CardContent>

            <CardActions className={classes.cardActions}>
              <EditButton
                resource="persons"
                basePath={basePath}
                record={data[id]}
              />
              <ShowButton
                resource="persons"
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

IndividualGrid.defaultProps = {
  data: {},
  ids: []
};

const IndividualMobileList = props => (
  <SimpleList
    primaryText={record => record.fullname}
    secondaryText={record => record.gender}
    tertiaryText={record => new Date(record.birthdate).toLocaleDateString()}
    leftAvatar={() => <PersonIcon />}
    {...props}
  />
);

export const IndividualList = props => (
  <List
    {...props}
    perPage={6}
    filters={<IndividualFilter />}
    pagination={<IndividualPagination />}
  >
    <Responsive small={<IndividualMobileList />} medium={<IndividualGrid />} />
  </List>
);

export const IndividualEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <ReferenceInput
        source="individual_id"
        reference="individuals"
        perPage={15}
        sort={{ field: "individual_id", order: "ASC" }}
      >
        <AutocompleteInput optionText="individual_id" />
      </ReferenceInput>
      <TextInput source="fullname" validate={minLength(3)} />
      <DateInput source="birthdate" />
      <TextInput source="gender" validate={minLength(1)} />
      <TextInput source="marital_status" validate={minLength(1)} />
    </SimpleForm>
  </Edit>
);

export const IndividualCreate = props => (
  <Create {...props}>
    <SimpleForm
      defaultValue={{
        created_at: new Date(),
        ...(props.location.state ? props.location.state.record : {})
      }}
    >
      <DateInput source="birthdate" />
      <TextInput source="fullname" />
    </SimpleForm>
  </Create>
);

export const IndividualShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="individual_id" />
      <ReferenceField source="id" reference="individuals">
        <TextField source="fullname" />
      </ReferenceField>
      <TextField source="name" />
      <TextField source="lastname" />
      <DateField source="birthdate" />
    </SimpleShowLayout>
  </Show>
);
