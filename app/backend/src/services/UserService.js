import supabase from '../utils/supabase.js';
import bcryptjs from 'bcryptjs';

class UserService {
  /**
   * Criar novo usuário
   */
  static async createUser(userData) {
    try {
      const { name, email, password, userType } = userData;

      // Hash da senha
      const hashedPassword = await bcryptjs.hash(password, 10);

      // Inserir no banco
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
        throw new Error(error.message);
      }

      return data[0];
    } catch (error) {
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
  }

  /**
   * Buscar usuário por email
   */
  static async getUserByEmail(email) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
  }

  /**
   * Buscar usuário por ID
   */
  static async getUserById(id) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
  }

  /**
   * Verificar senha
   */
  static async verifyPassword(plainPassword, hashedPassword) {
    try {
      return await bcryptjs.compare(plainPassword, hashedPassword);
    } catch (error) {
      throw new Error(`Erro ao verificar senha: ${error.message}`);
    }
  }

  /**
   * Atualizar usuário
   */
  static async updateUser(id, updates) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          ...updates,
          updated_at: new Date()
        })
        .eq('id', id)
        .select();

      if (error) {
        throw new Error(error.message);
      }

      return data[0];
    } catch (error) {
      throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
  }

  /**
   * Listar usuários por tipo
   */
  static async getUsersByType(userType, limit = 10) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('user_type', userType)
        .eq('status', 'active')
        .limit(limit);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      throw new Error(`Erro ao listar usuários: ${error.message}`);
    }
  }

  /**
   * Deletar usuário (desativar)
   */
  static async deleteUser(id) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({ status: 'inactive' })
        .eq('id', id)
        .select();

      if (error) {
        throw new Error(error.message);
      }

      return data[0];
    } catch (error) {
      throw new Error(`Erro ao deletar usuário: ${error.message}`);
    }
  }
}

export default UserService;
