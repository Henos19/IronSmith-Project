import Joi, { ObjectSchema } from 'joi';
import { IProduct, IUser } from '../../interfaces';

const checkErrorForStatus = (message: string): number => {
  if ((/required/g).test(message)) return 400;
  return 422;
};

const productSchema: ObjectSchema<IProduct> = Joi.object({
  id: Joi.number(),
  name: Joi.string().min(3).required(),
  amount: Joi.string().min(3).required(),
  orderId: Joi.number(),
});

const userSchema: ObjectSchema<IUser> = Joi.object({
  id: Joi.number(),
  username: Joi.string().min(3).required(),
  classe: Joi.string().min(3).required(),
  level: Joi.number().min(1).required(),
  password: Joi.string().min(8).required(),
});

export default { checkErrorForStatus, productSchema, userSchema };
