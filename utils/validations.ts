import { RegisterData, LoginCredentials } from '../types/auth';

export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email é obrigatório';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Email inválido';
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Senha é obrigatória';
  if (password.length < 6) {
    return 'A senha deve ter pelo menos 6 caracteres';
  }
  return null;
};

export const validateCPF = (cpf: string): string | null => {
  if (!cpf) return 'CPF é obrigatório';
  const cleanCPF = cpf.replace(/[^\d]/g, '');
  if (cleanCPF.length !== 11) {
    return 'CPF inválido';
  }
  return null;
};

export const validatePhone = (phone: string): string | null => {
  if (!phone) return 'Telefone é obrigatório';
  const cleanPhone = phone.replace(/[^\d]/g, '');
  if (cleanPhone.length < 10 || cleanPhone.length > 11) {
    return 'Telefone inválido';
  }
  return null;
};

export const validateName = (name: string): string | null => {
  if (!name) return 'Nome é obrigatório';
  if (name.length < 3) {
    return 'Nome deve ter pelo menos 3 caracteres';
  }
  return null;
};

export const validateLoginForm = (data: LoginCredentials): Record<string, string | null> => {
  return {
    email: validateEmail(data.email),
    password: validatePassword(data.password),
  };
};

export const validateRegisterForm = (data: RegisterData): Record<string, string | null> => {
  const errors: Record<string, string | null> = {
    name: validateName(data.name),
    email: validateEmail(data.email),
    confirmEmail: data.email !== data.confirmEmail ? 'Os emails não coincidem' : null,
    password: validatePassword(data.password),
    confirmPassword: data.password !== data.confirmPassword ? 'As senhas não coincidem' : null,
    cpf: validateCPF(data.cpf),
    phone: validatePhone(data.phone),
    gender: !data.gender ? 'Gênero é obrigatório' : null,
    birthDate: !data.birthDate ? 'Data de nascimento é obrigatória' : null,
  };

  return errors;
};
