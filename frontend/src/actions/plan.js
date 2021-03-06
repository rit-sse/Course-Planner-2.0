import uuidv4 from 'uuid/v4';

export const ADD_YEAR = 'ADD_YEAR';
export const ADD_TERM = 'ADD_TERM';
export const ADD_COURSE = 'ADD_COURSE';
export const MOVE_YEAR = 'MOVE_YEAR';
export const MOVE_TERM = 'MOVE_TERM';
export const MOVE_COURSE = 'MOVE_COURSE';
export const MINIMIZE_TERM = 'MINIMIZE_TERM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const UPDATE_PLAN = 'UPDATE_PLAN';
export const UPDATE_YEAR = 'UPDATE_YEAR';
export const UPDATE_TERM = 'UPDATE_TERM';
export const UPDATE_COURSE = 'UPDATE_COURSE';
export const ADD_REQUIREMENT = 'ADD_REQUIREMENT';
export const UPDATE_REQUIREMENT = 'UPDATE_REQUIREMENT';
export const ASSIGN_REQUIREMENT = 'ASSIGN_REQUIREMENT';
export const DELETE_REQUIREMENT = 'DELETE_REQUIREMENT';

const initialCourse = {
  title: 'New Course',
  subject: 'EX',
  number: '1234',
  credits: 3,
};

export function addRequirement() {
  return {
    type: ADD_REQUIREMENT,
  };
}
export function updateRequirement(updates) {
  return {
    type: UPDATE_REQUIREMENT,
    updates,
  };
}
export function assignRequirement(reqId, destId) {
  return {
    type: ASSIGN_REQUIREMENT,
    reqId,
    destId,
  };
}
export function deleteRequirement(reqId) {
  return {
    type: DELETE_REQUIREMENT,
    reqId,
  };
}

export function updatePlan(updates) {
  return {
    type: UPDATE_PLAN,
    updates,
  };
}

export function updateYear(fid, updates) {
  return {
    type: UPDATE_YEAR,
    fid,
    updates,
  };
}

export function updateTerm(fid, updates) {
  return {
    type: UPDATE_TERM,
    fid,
    updates,
  };
}

export function updateCourse(updates) {
  return {
    type: UPDATE_COURSE,
    updates,
  };
}

export function deleteItem(delete_type, item_fid, list_fid) {
  return {
    type: DELETE_ITEM,
    delete_type,
    item_fid,
    list_fid,
  };
}

export function addYear(year = {}) {
  return {
    type: ADD_YEAR,
    year: {
      fid: uuidv4(),
      terms: [],
      title: 'Year',
      ...year,
    },
  };
}

export function addTerm(yearId, term = {}) {
  return {
    type: ADD_TERM,
    yearId,
    term: {
      fid: uuidv4(),
      courses: [],
      title: 'Term',
      ...term,
    },
  };
}

export function addCourse(termId, course = initialCourse) {
  return {
    type: ADD_COURSE,
    termId,
    course: { ...course, fid: uuidv4() },
  };
}

export function moveYear(yearId, source, dest) {
  return {
    type: MOVE_YEAR,
    yearId,
    source,
    dest,
  };
}

export function moveTerm(termId, source, dest) {
  return {
    type: MOVE_TERM,
    termId,
    source,
    dest,
  };
}

export function moveCourse(courseId, source, dest) {
  return {
    type: MOVE_COURSE,
    courseId,
    source,
    dest,
  };
}

export function minimizeTerm(term) {
  return {
    type: MINIMIZE_TERM,
    term,
  };
}
