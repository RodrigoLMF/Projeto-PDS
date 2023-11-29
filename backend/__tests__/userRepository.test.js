const repository = require('../adapters/userRepository');
const { User } = require('../domain/User/User');

jest.mock('../adapters/config-connection', () => ({
  execute: jest.fn(),
}));

describe('find function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Recupera um usuário pelo login', async () => {
    // Mock da execução do SQL
    const mockExecute = jest.fn().mockResolvedValue([
      {
        USER_ID: 1,
        USER_LOGIN: 'marco',
        USER_PASSWORD: 'password123',
      },
    ]);
    require('../adapters/config-connection').execute.mockImplementation(mockExecute);

    // Chama a função find
    const result = await repository.find('marco');

    // Verifica se a execução do SQL ocorreu corretamente
    expect(mockExecute).toHaveBeenCalledWith(
      'SELECT * FROM USER WHERE USER_LOGIN = ?',
      ['marco']
    );

    // Verifica se o resultado do teste é uma lista de usuários
    expect(result).toBeInstanceOf(Array);
    if (result.length > 0) {
        const firstUser = result[0];
      
        // Substitua os valores esperados pelos valores reais que você espera da consulta ao banco de dados
        expect(firstUser.userId).toEqual(1);
        expect(firstUser.userLogin).toEqual('marco');
        expect(firstUser.userPassword).toEqual('password123');
      }
  });

  test('Lida com erros recuperando usuario por login', async () => {
    // Mock da execução do SQL que simula um erro
    const mockExecute = jest.fn().mockRejectedValue(new Error('Erro ao buscar o usuário'));
    require('../adapters/config-connection').execute.mockImplementation(mockExecute);

    // Chama a função find e verifica se ela trata o erro corretamente
    await expect(repository.find('marco')).rejects.toThrow('Erro ao buscar o usuário');
  });
});

describe('add function', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    /*test('Adiciona usuário ao banco de dados', async () => {
      // Mock da execução do SQL
      const mockExecute = jest.fn().mockResolvedValue({
        insertId: 1,
      });
      require('../adapters/config-connection').execute.mockImplementation(mockExecute);
  
      // Chama a função add
      const userToAdd = new User(0, 'marco', 'password123');
      const result = await repository.add(userToAdd);
  
      // Verifica se a execução do SQL ocorreu corretamente
      expect(mockExecute).toHaveBeenCalledWith(
        'INSERT INTO USER (USER_LOGIN, USER_PASSWORD) VALUES ( ?, ? )',
        ['marco', 'password123']
      );
  
      // Verifica se o resultado do teste é o ID do usuário inserido
      expect(result).toBe(1);
    });*/
  
    test('Lida com erros adicionando usuário', async () => {
      // Mock da execução do SQL que simula um erro
      const mockExecute = jest.fn().mockRejectedValue(new Error('Erro ao cadastrar usuário'));
      require('../adapters/config-connection').execute.mockImplementation(mockExecute);
  
      // Chama a função add e verifica se ela trata o erro corretamente
      const userToAdd = new User(0, 'marco', 'password123');
      await expect(repository.add(userToAdd)).rejects.toThrow('Erro ao cadastrar usuário');
    });
  });