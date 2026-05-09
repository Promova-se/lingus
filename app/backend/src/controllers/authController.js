import supabase from '../utils/supabase.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;

    // Validações
    if (!name || !email || !password || !userType) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    // Hash da senha
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Inserir no Supabase
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          name,
          email,
          password: hashedPassword,
          user_type: userType,
          status: 'active'
        }
      ])
      .select();

    if (error) {
      console.error('Erro Supabase:', error);
      return res.status(400).json({ error: error.message });
    }

    // Criar JWT token
    const token = jwt.sign(
      { id: data[0].id, email: data[0].email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(201).json({
      token,
      user: {
        id: data[0].id,
        name: data[0].name,
        email: data[0].email,
        userType: data[0].user_type
      }
    });

  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    // Buscar usuário
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    // Verificar senha
    const senhaValida = await bcryptjs.compare(password, data.password);

    if (!senhaValida) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    // Criar JWT token
    const token = jwt.sign(
      { id: data.id, email: data.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(200).json({
      token,
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        userType: data.user_type
      }
    });

  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};
