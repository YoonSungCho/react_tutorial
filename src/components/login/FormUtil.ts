import validator from 'validator';

interface FieldStatus {
  value: string;
  error?: boolean;
  required?: boolean;
  helperText?: string;
}

export type FormValidation = {
  [a: string]: FieldStatus;
};

/**
 * form field 검사
 * @param {FormValidation<T>} data
 */
export default function FormValidate(data: FormValidation): boolean {
  let allPass = true;
  for (let key in data) {
    switch (key) {
      case 'email':
        allPass = allPass && validEmail(data[key]);
        break;
      case 'password':
      case 'confirmpassword':
        allPass = allPass && validPassword(data[key]);
        break;
      default:
        allPass = allPass && defaultField(data[key]);
        break;
    }
  }
  return allPass;
}

/**
 * email 검사
 * @param {FieldStatus} field
 */
const validEmail: (field: FieldStatus) => boolean = field => {
  if (validator.isEmail(field.value)) {
    field.error = false;
    field.helperText = '';
  } else if (field.required && field.value.length === 0) {
    field.error = true;
    field.helperText = 'Email is required.';
  } else {
    field.error = true;
    field.helperText = 'Email is invalid';
  }

  return !field.error;
};

/**
 * password 검사
 * @param {FieldStatus} field
 */
const validPassword: (field: FieldStatus) => boolean = field => {
  if (
    true
    // validator.isStrongPassword(field.value, {
    //   minLength: 1,
    // }
    //)
  ) {
    field.error = false;
    field.helperText = '';
  } else if (field.required && field.value.length === 0) {
    field.error = true;
    field.helperText = 'Password is required.';
  } else {
    field.error = true;
    field.helperText = 'Is not strong password';
  }

  return !field.error;
};

/**
 * required 검사
 * @param {FieldStatus} field
 */
const defaultField: (field: FieldStatus) => boolean = field => {
  if (field.required && field.value.length === 0) {
    field.error = true;
    field.helperText = 'Is required.';
  } else {
    field.error = false;
    field.helperText = '';
  }

  return !field.error;
};
