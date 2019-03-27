import { call, put } from "redux-saga/effects";
import api from "../../services/api";

import { actionCreators as UsersCreator } from "../ducks/users";

export function* addUser(action) {
  try {
    const { data } = yield call(api.get, `users/${action.payload.user}`);

    const userData = {};

    yield put(UsersCreator.addUserSuccess(data));
  } catch {
    yield put(UsersCreator.addUserFailure("Erro ao adicionar um usuário"));
  }
}
