import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { User } from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import bcrypt from 'bcrypt';

export const getAllUsers = async (_req: Request, res: Response) => {
  const { data, error } = await supabase.from('users').select('*');

  if (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
      data: [],
    });
  }

  res.status(200).json({
    status: 200,
    message: 'Users fetched successfully',
    data: data || [],
  });
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const body: Omit<User, 'user_id'> = req.body;

    if (!body.password) {
      return res.status(400).json({
        status: 400,
        message: 'Password is required',
        data: [],
      });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser: User = {
      ...body,
      password: hashedPassword,
      user_id: uuidv4(),
    };

    const { data, error } = await supabase.from('users').insert([newUser]);

    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
        data: [],
      });
    }

    res.status(201).json({
      status: 201,
      message: 'Successfully created',
      data: data || [],
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
      data: [],
    });
  }
};


export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ status: 400, message: 'Email and password required' });
  }

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) {
    return res.status(401).json({ status: 401, message: 'Invalid email or password' });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ status: 401, message: 'Invalid email or password' });
  }

  if (!config.jwtSecret) {
    return res.status(500).json({ status: 500, message: 'JWT secret is not defined' });
  }

  if (!config.jwtSecret) {
  return res.status(500).json({ status: 500, message: 'JWT secret is not defined' });
}

const token = jwt.sign(
  {
    user_id: user.user_id,
    email: user.email,
    role_type: user.role_type,
  },
  config.jwtSecret as string, // cast to string to satisfy TS
  { expiresIn: config.jwtExpiresIn as string } // cast expiresIn to string
);

  // Set HttpOnly cookie with token
res.cookie('token', token, {
  httpOnly: true,
  secure: false,
  maxAge: 1000 * 60 * 60,
  sameSite: 'lax',
  path: '/',
});


  // Respond with user data only, NOT token
  res.status(200).json({
    status: 200,
    message: 'Login successful',
    data: {
      user: {
        user_id: user.user_id,
        email: user.email,
        full_name: user.full_name,
        role_type: user.role_type,
        is_active: user.is_active,
      }
    }
  });
};

export const getCurrentUser = async (req: Request, res: Response) => {
  const user = (req as any).user;

  if (!user) {
    return res.status(401).json({ status: 401, message: 'Not authenticated' });
  }

  return res.status(200).json({
    status: 200,
    message: 'User is logged in',
    data: { user },
  });
};


// New logout function
export const logoutUser = async (_req: Request, res: Response) => {
  // Clear the token cookie
  res.cookie('token', '', {
    httpOnly: true,
    secure: false, // true if HTTPS
    expires: new Date(0), // Expire immediately
    sameSite: 'lax',
    path: '/',
  });

  res.status(200).json({
    status: 200,
    message: 'Logged out successfully',
  });
};

