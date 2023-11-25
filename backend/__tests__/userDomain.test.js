// __tests__/userDomain.test.js
const userDomain = require('../domain/User/userDomain');
const { UserRepository } = require('../adapters/userRepository');

// Mock do UserRepository para evitar chamadas reais ao banco de dados
jest.mock('../adapters/userRepository', () => {
  const originalModule = jest.requireActual('../adapters/userRepository');
  return {
    ...originalModule,
    UserRepository: jest.fn(() => ({
      find: jest.fn(),
      add: jest.fn(),
    })),
  };
});

const { User } = require('../domain/User/User');

describe('userDomain functions', () => {
  beforeEach(() => {
    // Limpar a configuração do repositório antes de cada teste
    userDomain.configRepo(null);
  });

  test('Deve cadastrar um novo usuário com sucesso', async () => {
    const userRepository = new UserRepository();
    userRepository.find.mockResolvedValue([]);
    userRepository.add.mockResolvedValue(1);

    userDomain.configRepo(userRepository);

    const result = await userDomain.registerUser('novousuario', 'senha123');

    expect(result).toEqual({ message: 'Usuário cadastrado com sucesso!' });
  });

  test('Deve rejeitar o cadastro se o usuário já estiver cadastrado', async () => {
    const userRepository = new UserRepository();
    userRepository.find.mockResolvedValue([{ login: 'usuarioexistente' }]);

    userDomain.configRepo(userRepository);

    await expect(userDomain.registerUser('usuarioexistente', 'senha456')).rejects.toThrowError('Usuário já cadastrado.');
  });

  test('Deve rejeitar o cadastro se houver um erro ao verificar usuário existente', async () => {
    const userRepository = new UserRepository();
    userRepository.find.mockRejectedValue(new Error('Erro ao verificar usuário existente'));

    userDomain.configRepo(userRepository);

    await expect(userDomain.registerUser('novousuario', 'senha789')).rejects.toThrowError('Erro ao verificar usuário existente. Por favor, tente novamente mais tarde.');
  });

});

describe('userDomain functions', () => {
    let userRepository;
  
    beforeEach(() => {
      userRepository = new UserRepository();
      userDomain.configRepo(userRepository);
    });
  
    test('Deve autenticar um usuário com sucesso', async () => {
        const mockUser = { id: 1, login: 'usuario', password: 'senha123' };
        userRepository.find.mockResolvedValue([mockUser]);
    
        const result = await userDomain.authenticateUser('usuario', 'senha123');
    
        // Use diretamente a classe User, sem referenciar userDomain.User
        expect(result).toEqual(new User(mockUser.id, mockUser.login, mockUser.password));
    });
  
    test('Deve retornar null se a senha estiver incorreta', async () => {
      const mockUser = { id: 1, login: 'usuario', password: 'senha123' };
      userRepository.find.mockResolvedValue([mockUser]);
  
      const result = await userDomain.authenticateUser('usuario', 'senha456');
  
      expect(result).toBeNull();
    });
  
    test('Deve retornar null se o usuário não for encontrado', async () => {
      userRepository.find.mockResolvedValue([]);
  
      const result = await userDomain.authenticateUser('usuarioinexistente', 'senha789');
  
      expect(result).toBeNull();
    });
  
    test('Deve rejeitar a promessa se ocorrer um erro ao acessar o banco de dados', async () => {
      const errorMessage = 'Erro ao buscar usuário no banco de dados';
      userRepository.find.mockRejectedValue(new Error(errorMessage));
  
      await expect(userDomain.authenticateUser('usuario', 'senha123')).rejects.toThrowError(errorMessage);
    });
  
    // Adicione mais testes conforme necessário
  });