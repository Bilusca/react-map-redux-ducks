import { call, put } from "redux-saga/effects";
import api from "../../services/api";

import { actionCreators as UsersCreator } from "../ducks/users";
import { actionCreators as ModalCreators } from "../ducks/modal";

export function* addUser(action) {
  try {
    const { data } = yield call(api.get, `users/${action.payload.user}`);

    console.log(action);

    const userData = {
      cordinates: action.payload.cordinates,
      login: data.login,
      avatar: data.avatar_url,
      name: data.name,
      id: data.id
    };

    yield put(UsersCreator.addUserSuccess(userData));
  } catch {
    yield put(UsersCreator.addUserFailure("Erro ao adicionar um usuário"));
  } finally {
    yield put(ModalCreators.closeModal());
  }
}
