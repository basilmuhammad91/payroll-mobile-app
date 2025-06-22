import { createOne, deleteOne, getAll, updateOne } from '../../api/genericApi';

const RESOURCE = 'employees/allownce';

export const getLeaves = () => getAll(RESOURCE);
export const createLeave = (data) => createOne(RESOURCE, data);
export const updateLeave = (id, data) => updateOne(RESOURCE, id, data);
export const deleteLeave = (id) => deleteOne(RESOURCE, id);
