// __tests__/billRepository.test.js
const repository = require('../adapters/billRepository');
const { Bill } = require('../domain/Bill/Bill');

jest.mock('../adapters/config-connection', () => ({
  execute: jest.fn(),
}));

describe('add function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Adiciona conta ao banco de dados', async () => {
    // Mock da execução do SQL
    const mockExecute = jest.fn().mockResolvedValue([{ insertId: 1 }]);
    require('../adapters/config-connection').execute.mockImplementation(mockExecute);

    // Dados da conta para teste
    const testBill = new Bill(
      0,
      1,
      'Test Bill',
      100,
      'fixa',
      false,
      true,
      3,
      new Date('2023-01-01'),
      new Date('2023-01-05')
    );

    // Chama a função add
    const result = await repository.add(testBill);

    // Verifica se a execução do SQL ocorreu corretamente
    expect(mockExecute).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO BILL'),
      expect.arrayContaining([
        testBill.userId,
        testBill.name,
        testBill.value,
        testBill.type,
        testBill.divide,
        testBill.repeat,
        testBill.numParts,
        expect.any(String), // Espera uma string para a data de firstPayment
        expect.any(String), // Espera uma string para a data de payday
      ])
    );

    // Verifica se o resultado do teste é o ID retornado pelo SQL
    expect(result).toBe(1);
  });

  test('Lidar com erros adicionando contas', async () => {
    // Mock da execução do SQL que simula um erro
    const mockExecute = jest.fn().mockRejectedValue(new Error('Erro ao cadastrar a conta'));
    require('../adapters/config-connection').execute.mockImplementation(mockExecute);

    // Dados da conta para teste
    const testBill = new Bill(
      0,
      1,
      'Test Bill',
      100,
      'fixa',
      false,
      true,
      3,
      new Date('2023-01-01'),
      new Date('2023-01-05')
    );

    // Chama a função add e verifica se ela trata o erro corretamente
    await expect(repository.add(testBill)).rejects.toThrow('Erro ao cadastrar a conta');
  });
});

describe('payBill function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Marcar conta como paga no banco', async () => {
    // Mock da execução do SQL
    const mockExecute = jest.fn().mockResolvedValue([{ affectedRows: 1 }]);
    require('../adapters/config-connection').execute.mockImplementation(mockExecute);

    // Chama a função payBill
    const result = await repository.payBill(1);

    // Verifica se a execução do SQL ocorreu corretamente
    expect(mockExecute).toHaveBeenCalledWith(
      'UPDATE BILL SET BILL_TYPE = \'P\' WHERE BILL_ID = (?)',
      [1]
    );

    // Verifica se o resultado do teste é nulo
    expect(result).toBeNull();
  });

  test('Lidar com erros ao marcar conta como paga', async () => {
    // Mock da execução do SQL que simula um erro
    const mockExecute = jest.fn().mockRejectedValue(new Error('Erro ao quitar a conta'));
    require('../adapters/config-connection').execute.mockImplementation(mockExecute);

    // Chama a função payBill e verifica se ela trata o erro corretamente
    await expect(repository.payBill(1)).rejects.toThrow('Erro ao quitar a conta');
  });
});

describe('getAllBillsByUserId function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Recupera todas as contas da base de dados', async () => {
    // Mock da execução do SQL
    const mockExecute = jest.fn().mockResolvedValue([
      {
        BILL_ID: 1,
        USER_ID: 1,
        BILL_NAME: 'Electricity Bill',
        BILL_VALUE: 100,
        BILL_TYPE: 'fixa',
        BILL_DIVIDE: false,
        BILL_REPEAT: true,
        BILL_NUM_PARTS: 3,
        BILL_FIRST_PAYMENT: '2023-01-01',
        BILL_PAYDAY: '2023-01-05',
      },
    ]);
    require('../adapters/config-connection').execute.mockImplementation(mockExecute);

    // Chama a função getAllBillsByUserId
    const result = await repository.getAllBillsByUserId(1);

    // Verifica se a execução do SQL ocorreu corretamente
    expect(mockExecute).toHaveBeenCalledWith(
      'SELECT * FROM BILL WHERE USER_ID = ?',
      [1]
    );

    // Verifica se o resultado do teste é uma lista de contas
    expect(result).toBeInstanceOf(Array);
    if (result.length > 0) {
      const firstBill = result[0];
    
      // Substitua os valores esperados pelos valores reais que você espera da consulta ao banco de dados
      expect(firstBill.billId).toEqual(1);
      expect(firstBill.userId).toEqual(1);
      expect(firstBill.billName).toEqual('Electricity Bill');
      expect(firstBill.value).toEqual(100);
      expect(firstBill.type).toEqual('fixa');
      expect(firstBill.divide).toEqual(false);
      expect(firstBill.repeat).toEqual(true);
      expect(firstBill.numParts).toEqual(3);
      expect(firstBill.firstPayment).toEqual(new Date('2023-01-01'));
      expect(firstBill.payday).toEqual(new Date('2023-01-05'));
    }
  });

  test('Lida com erros recuperando todas as contas', async () => {
    // Mock da execução do SQL que simula um erro
    const mockExecute = jest.fn().mockRejectedValue(new Error('Erro ao buscar as contas'));
    require('../adapters/config-connection').execute.mockImplementation(mockExecute);

    // Chama a função getAllBillsByUserId e verifica se ela trata o erro corretamente
    await expect(repository.getAllBillsByUserId(1)).rejects.toThrow('Erro ao buscar as contas');
  });
});

describe('getBillsWithinPeriod function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Recupera as contas dentro de um determinado período de tempo', async () => {
    // Mock da execução do SQL
    const mockExecute = jest.fn().mockResolvedValue([
      {
        BILL_ID: 1,
        USER_ID: 1,
        BILL_NAME: 'Electricity Bill',
        BILL_VALUE: 100,
        BILL_TYPE: 'fixa',
        BILL_DIVIDE: false,
        BILL_REPEAT: true,
        BILL_NUM_PARTS: 3,
        BILL_FIRST_PAYMENT: '2023-01-01',
        BILL_PAYDAY: '2023-01-05',
      },
    ]);
    require('../adapters/config-connection').execute.mockImplementation(mockExecute);

    // Chama a função getBillsWithinPeriod
    const result = await repository.getBillsWithinPeriod(1, new Date('2023-01-01'), new Date('2023-01-31'));

    // Verifica se a execução do SQL ocorreu corretamente
    expect(mockExecute).toHaveBeenCalledWith(
      expect.stringMatching(/SELECT \* FROM BILL\s+WHERE USER_ID = \? AND BILL_PAYDAY >= \? AND BILL_PAYDAY <= \?\s+ORDER BY BILL_PAYDAY DESC/),
      [1, '2023-01-01', '2023-01-31']
    );

    // Verifica se o resultado do teste é uma lista de contas
    expect(result).toBeInstanceOf(Array);
    if (result.length > 0) {
      const firstBill = result[0];
    
      // Substitua os valores esperados pelos valores reais que você espera da consulta ao banco de dados
      expect(firstBill.billId).toEqual(1);
      expect(firstBill.userId).toEqual(1);
      expect(firstBill.billName).toEqual('Electricity Bill');
      expect(firstBill.value).toEqual(100);
      expect(firstBill.type).toEqual('fixa');
      expect(firstBill.divide).toEqual(false);
      expect(firstBill.repeat).toEqual(true);
      expect(firstBill.numParts).toEqual(3);
      expect(firstBill.firstPayment).toEqual(new Date('2023-01-01'));
      expect(firstBill.payday).toEqual(new Date('2023-01-05'));
    }
  });

  test('Lida com erros recuperando contas de um determinado período', async () => {
    // Mock da execução do SQL que simula um erro
    const mockExecute = jest.fn().mockRejectedValue(new Error('Erro ao buscar as contas'));
    require('../adapters/config-connection').execute.mockImplementation(mockExecute);

    // Chama a função getBillsWithinPeriod e verifica se ela trata o erro corretamente
    await expect(repository.getBillsWithinPeriod(1, new Date('2023-01-01'), new Date('2023-01-31')))
      .rejects.toThrow('Erro ao buscar as contas');
  });
});