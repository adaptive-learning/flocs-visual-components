import { SET_STUDENT } from '../actionTypes';

export function setStudent(student) {
  return {
    type: SET_STUDENT,
    payload: student,
  };
}
