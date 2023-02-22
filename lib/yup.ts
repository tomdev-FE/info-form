import * as yup from 'yup';
import { StepOneData, StepThreeData, StepTwoData } from '@/types';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const stepOneSchema: yup.SchemaOf<StepOneData> = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Need to be a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  age: yup
    .number()
    .typeError('Must be a number')
    .positive('Must be a positive value')
    .integer('Must be a number')
    .required('Age is required'),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone is required'),
});

// @ts-ignore - file type still not found
export const stepTwoSchema: yup.SchemaOf<StepTwoData> = yup.object().shape({
  score_1: yup
    .number()
    .typeError('Must be a number')
    .positive('Must be a positive value')
    .lessThan(101, 'Max score is 100')
    .required('Age is required'),
  score_2: yup
    .number()
    .typeError('Must be a number')
    .positive('Must be a positive value')
    .lessThan(101, 'Max score is 100')
    .required('Age is required'),
  score_3: yup
    .number()
    .typeError('Must be a number')
    .positive('Must be a positive value')
    .lessThan(101, 'Max score is 100')
    .required('Age is required'),
  identity_card: yup.mixed().required('File is required'),
  score_file: yup.mixed().required('File is required'),
});

// @ts-ignore - override correct yup type
export const requiredDateSchema: yup.SchemaOf<Date> = yup
  .date()
  .required('Birth date is required');

export const stepThreeSchema: yup.SchemaOf<StepThreeData> = yup.object().shape({
  birth_date: requiredDateSchema,
  gender: yup.string().required('Gender is required'),
});

