import { promiseHandler, resetReducer } from 'cooldux';
import { get, isUndefined, omitBy } from 'lodash';

import { apiFetch } from '../lib/fetch';

const { browseStart, browseEnd, browseError, browseHandler } = promiseHandler('browse', 'personalInfo');
const { editStart, editEnd, editError, editHandler } = promiseHandler('edit', 'personalInfo');
const { addStart, addEnd, addError, addHandler } = promiseHandler('add', 'personalInfo');

export function browsePersonalInfo() {
  return function dispatcher(dispatch, getState) {
    const selfId = get(getState(), 'user.id', null);
    const promise = apiFetch(`/users/${selfId}/personal_info`);
    return browseHandler(promise, dispatch);
  };
}

export function editPersonalInfo(update) {
  return function dispatcher(dispatch, getState) {
    const selfId = get(getState(), 'user.id', null);
    const options = {
      method: 'PUT',
      body: omitBy(update, isUndefined),
    };
    const promise = apiFetch(`/users/${selfId}/personal_info`, options);
    return editHandler(promise, dispatch);
  };
}

export function addPersonalInfo(newPersonalInfo) {
  return function dispatcher(dispatch, getState) {
    const selfId = get(getState(), 'user.id', null);
    const options = {
      method: 'POST',
      body: omitBy(newPersonalInfo, isUndefined),
    };
    const promise = apiFetch(`/users/${selfId}/personal_info`, options);
    return addHandler(promise, dispatch);
  };
}

const initialState = {
  browseError: null,
  addError: null,
  editError: null,
  browsePending: false,
  addPending: false,
  editPending: false,
  data: {},
};

function finishBrowse(state, item) {
  const data = item;
  return { ...state, data, browsePending: false, browseError: null };
}

function finishEdit(state, item) {
  const data = { ...item };
  return { ...state, editPending: false, editError: null, data };
}

function finishAdd(state, item) {
  const data = item;
  return { ...state, addPending: false, addError: null, data };
}

const personalInfo = resetReducer(initialState, (state = initialState, action) => {
  switch (action.type) {
    case browseStart.type:
      return { ...state, browsePending: true, browseError: null };
    case browseEnd.type:
      return finishBrowse(state, action.payload);
    case browseError.type:
      return { ...state, browsePending: false, browseError: action.payload };
    case addStart.type:
      return { ...state, addPending: true, addError: null };
    case addEnd.type:
      return finishAdd(state, action.payload);
    case addError.type:
      return { ...state, addPending: false, addError: action.payload };
    case editStart.type:
      return { ...state, editPending: true, editError: null };
    case editEnd.type:
      return finishEdit(state, action.payload);
    case editError.type:
      return { ...state, editPending: false, editError: action.payload };
    default:
      return state;
  }
});

export default personalInfo;
