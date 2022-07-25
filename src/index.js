import React from "react";
import { render } from "react-dom";

import { Admin, Resource, Delete } from "react-admin";
import jsonRestDataProvider from "ra-data-fakerest";

import addUploadFeature from "./addUploadFeature";

import data from "./data";
import authProvider from "./authProvider";
import i18nProvider from "./i18n/provider";

import { PostList, PostCreate, PostEdit, PostShow, PostIcon } from "./posts";
import {
  CustomerList,
  CustomerCreate,
  CustomerEdit,
  CustomerShow,
  CustomerIcon
} from "./customers";

import {
  ResourceList,
  ResourceCreate,
  ResourceEdit,
  ResourceShow,
  ResourceIcon
} from "./resources";

import {
  PersonList,
  PersonCreate,
  PersonEdit,
  PersonShow,
  PersonIcon
} from "./persons";

import {
  ProductList,
  ProductCreate,
  ProductEdit,
  ProductShow,
  ProductIcon
} from "./products";

import {
  InteractionList,
  InteractionCreate,
  InteractionEdit,
  InteractionShow,
  InteractionIcon
} from "./interactions";

import { TagList, TagCreate, TagEdit, TagShow, TagIcon } from "./tags";

import {
  IssueList,
  IssueCreate,
  IssueEdit,
  IssueShow,
  IssueIcon
} from "./issues";
import {
  CommentList,
  CommentEdit,
  CommentCreate,
  CommentShow,
  CommentIcon
} from "./comments";
import {
  IndividualList,
  IndividualEdit,
  IndividualCreate,
  IndividualShow,
  IndividualIcon
} from "./individuals";

//Celina
import {
  SearchEngineList,
  SearchEngineEdit,
  SearchEngineCreate,
  SearchEngineShow,
  SearchEngineIcon
} from "./searchEngine";
import { QueryShow, QueryEdit, QueryList, QueryCreate } from "./queries";
import { TaskInboxList, TaskInboxIcon } from "./taskInboxes";
//Fin Celina
import {
  AddressList,
  AddressEdit,
  AddressCreate,
  AddressShow,
  AddressIcon
} from "./addresess";

const dataProvider = jsonRestDataProvider(data, true);
const uploadCapableDataProvider = addUploadFeature(dataProvider);
const delayedDataProvider = (type, resource, params) =>
  new Promise(resolve =>
    setTimeout(
      () => resolve(uploadCapableDataProvider(type, resource, params)),
      1000
    )
  );

render(
  <Admin
    title="CRM"
    dataProvider={delayedDataProvider}
    authProvider={authProvider}
    i18nProvider={i18nProvider}
  >
    {auth => [
      <Resource
        key="individuals"
        name="individuals"
        list={IndividualList}
        create={IndividualCreate}
        edit={IndividualEdit}
        show={IndividualShow}
        remove={Delete}
        icon={IndividualIcon}
      />,

      //    <Resource
      //     key="persons"
      //     name="persons"
      //     list={PersonList}
      //     create={PersonCreate}
      //     edit={PersonEdit}
      //     show={PersonShow}
      //     remove={Delete}
      //     icon={PersonIcon}
      //   />,
      <Resource
        key="interactions"
        name="interactions"
        list={InteractionList}
        create={InteractionCreate}
        edit={InteractionEdit}
        show={InteractionShow}
        remove={Delete}
        icon={InteractionIcon}
      />,

      <Resource
        key="products"
        name="products"
        list={ProductList}
        create={ProductCreate}
        edit={ProductEdit}
        show={ProductShow}
        remove={Delete}
        icon={ProductIcon}
      />,

      <Resource
        key="posts"
        name="posts"
        list={PostList}
        create={PostCreate}
        edit={PostEdit}
        show={PostShow}
        remove={Delete}
        icon={PostIcon}
      />,

      <Resource
        key="comments"
        name="comments"
        list={CommentList}
        create={CommentCreate}
        edit={CommentEdit}
        show={CommentShow}
        remove={Delete}
        icon={CommentIcon}
      />,

      <Resource
        key="issues"
        name="issues"
        list={IssueList}
        create={IssueCreate}
        edit={IssueEdit}
        show={IssueShow}
        remove={Delete}
        icon={IssueIcon}
      />,
      <Resource
        key="address"
        name="addresess"
        list={AddressList}
        create={AddressCreate}
        edit={AddressEdit}
        show={AddressShow}
        remove={Delete}
        icon={AddressIcon}
      />,

      // José: In progress
      <Resource
        key="customers"
        name="customers"
        list={CustomerList}
        create={CustomerCreate}
        edit={CustomerEdit}
        show={CustomerShow}
        remove={Delete}
        icon={CustomerIcon}
      />,

      <Resource
        key="resources"
        name="resources"
        list={ResourceList}
        create={ResourceCreate}
        edit={ResourceEdit}
        show={ResourceShow}
        remove={Delete}
        icon={ResourceIcon}
      />,

      <Resource
        key="tags"
        name="tags"
        list={TagList}
        create={TagCreate}
        edit={TagEdit}
        show={TagShow}
        remove={Delete}
        icon={TagIcon}
      />,
      //Celina
      <Resource
        key="searchEngines"
        name="searchEngines"
        list={SearchEngineList}
        create={SearchEngineCreate}
        edit={SearchEngineEdit}
        show={SearchEngineShow}
        remove={Delete}
        icon={SearchEngineIcon}
      />,
      <Resource key="customerProperties" name="customerProperties" />,
      <Resource key="addressProperties" name="addressProperties" />,
      <Resource key="entities" name="entities" />,
      <Resource key="queryOperators" name="queryOperators" />,
      <Resource
        key="queries"
        name="queries"
        edit={QueryEdit}
        show={QueryShow}
        list={QueryList}
        create={QueryCreate}
      />,
      <Resource key="users" name="users" />,
      <Resource
        key="taskInboxes"
        name="taskInboxes"
        icon={TaskInboxIcon}
        list={TaskInboxList}
      />
    ]}
  </Admin>,
  document.getElementById("root")
);
