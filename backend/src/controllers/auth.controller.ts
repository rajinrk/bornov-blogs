import { Request, Response } from 'express';
import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import { Types, Document } from 'mongoose';
import { User } from '../models/user.model';
import { LoginCredentials, RegisterCredentials } from '../types/user';

const generateToken = (id: Types.ObjectId) => {
 

  const jwtSecret: Secret = process.env.JWT_SECRET!;
  const options: SignOptions = {
    expiresIn:  '8h'
  };

  return jwt.sign({ id: id.toString() }, jwtSecret, options);
};

interface IUserDocument extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, confirmPassword }: RegisterCredentials = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      email,
      password,
    }) as IUserDocument;

    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginCredentials = req.body;

    

    const user = await User.findOne({ email }) as IUserDocument | null;
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}; 