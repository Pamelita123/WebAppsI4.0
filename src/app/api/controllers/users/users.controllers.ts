import Users from '../../sequelize/models/users.models';
import { UserLoginPayload, UserPayload, UserWithToken } from '../../models/users/users.types';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
config();

const JWT_SECRET = process.env['SECRET'];
const JWT_OPTIONS = { expiresIn: 600 };

// Crear usuario
export const createUser = async (userPayload: UserPayload): Promise<Users | Error> => {
  try {
    // Validación básica (puedes mejorarla si quieres)
    if (!userPayload.name || !userPayload.lastname || !userPayload.email || !userPayload.password) {
      return new Error('Todos los campos son obligatorios');
    }
    // Hash de la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(userPayload.password, 10);
    const userToCreate = { ...userPayload, password: hashedPassword };
    return await Users.create(userToCreate);
  } catch (error) {
    console.error('Error creando usuario:', error);
    throw error;
  }
};

// Login usuario
export const loginUser = async (userLoginPayload: UserLoginPayload): Promise<UserWithToken | Error> => {
  if (!userLoginPayload.email || !userLoginPayload.password) {
    return new Error('Email y contraseña son obligatorios');
  }

  try {
    // Busca por email
    const user = await Users.findOne({
      where: { email: userLoginPayload.email },
      attributes: ['user_id', 'name', 'lastname', 'email', 'password'] // <-- agrega esto
    });

    if (!user) {
      return new Error('Usuario o contraseña incorrectos');
    }

    // Compara la contraseña hasheada
    const plainUser = user.get({ plain: true });
    const isPasswordValid = await bcrypt.compare(userLoginPayload.password, plainUser.password);
    if (!isPasswordValid) {
      return new Error('Usuario o contraseña incorrectos');
    }

    if (!JWT_SECRET) {
      return new Error('Error del servidor: JWT_SECRET no definido');
    }
    // plainUser ya fue definido arriba
    const token = jwt.sign(plainUser, JWT_SECRET, JWT_OPTIONS);

    if (!token) {
      return new Error('No se pudo generar el token');
    }

    return { user: plainUser, token };
    return { user: plainUser, token };
  } catch (err) {
    console.error('Error en login:', err);
    return new Error('Error interno del servidor');
  }
};