import validator from 'validator';

/**
 * 폼 필드 검증용 인터페이스
 */
interface FieldStatus {
  value: string;
  error?: boolean;
  required?: boolean;
  helperText?: string;
}

/**
 * 폼 검증용 데이터 타입
 */
export type FormValidation = {
  [a: string]: FieldStatus;
};

/**
 * form 필드 검증이 react 나 mui 에서 제공하는거 같지 않아
 * 현재 앱에서 공통으로 form 검사를 위해 만듬
 * form field 검사
 * @param {FormValidation<T>} data
 */
export default function FormValidate(data: FormValidation): boolean {
  let allPass = [];
  for (let key in data) {
    switch (key) {
      case 'email':
        allPass.push(validEmail(data[key]));
        break;
      case 'password':
        allPass.push(validPassword(data[key]));
        break;
      case 'confirmpassword':
        allPass.push(confirmPassword(data[key], data['password']));
        break;
      default:
        allPass.push(defaultField(data[key]));
        break;
    }
  }
  return allPass.every(x => x);
}

/**
 * email 검사
 * @param {FieldStatus} field
 */
const validEmail: (field: FieldStatus) => boolean = field => {
  if (field.required && field.value.length === 0) {
    field.error = true;
    field.helperText = 'is required.';
  } else if (!validator.isEmail(field.value)) {
    field.error = true;
    field.helperText = 'is invalid';
  } else {
    field.error = false;
    field.helperText = '';
  }

  return !field.error;
};

/**
 * password 검사
 * @param {FieldStatus} field
 */
const validPassword: (field: FieldStatus) => boolean = field => {
  if (field.required && field.value.length === 0) {
    field.error = true;
    field.helperText = 'is required.';
  }
  // 패스워드 유효성 검사를 사용하고 싶었으나 결과 값이 단순히 pass/fail 이고
  // 어떤 부분이 부족한지 message 화가 안되어 있어 일단 패쓰
  // else if (!validator.isStrongPassword(field.value)) {
  //   field.error = true;
  //   field.helperText = 'Is not strong password';
  // }
  else {
    field.error = false;
    field.helperText = '';
  }

  return !field.error;
};

/**
 * 패스워드과 확인용 패스워드가 일치하는지 검사
 * @param confirm 확인용 패스워드
 * @param password 패스워드
 * @returns
 */
const confirmPassword: (confirm: FieldStatus, password: FieldStatus) => boolean = (
  confirm,
  password,
) => {
  if (confirm.required && confirm.value.length === 0) {
    confirm.error = true;
    confirm.helperText = 'is required.';
  } else if (password.value !== confirm.value) {
    confirm.error = true;
    confirm.helperText = 'The password confirm does not match';
  } else {
    confirm.error = false;
    confirm.helperText = '';
  }

  return !confirm.error;
};

/**
 * required 필드가 빈값인지 아닌지 검사
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
