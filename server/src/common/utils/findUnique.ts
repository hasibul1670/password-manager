import { ApiError } from './ApiError';

export const findUnique = async (model: any, findBy: any, payload: any) => {
  const query = { [findBy]: payload };
  const res = await model.findOne(query).exec();
  if (res) {
    throw ApiError(409, ` ${payload} is Already Exist`, 'Conflict Error');
  }
  return res;
};
