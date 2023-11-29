// __tests__/billDomain.test.js
// Teste de dominio
const billDomain = require('../domain/Bill/billDomain.js');
const { Bill } = require('../domain/Bill/Bill.js');

jest.mock('../adapters/billRepository.js', () => {
  const originalModule = jest.requireActual('../adapters/billRepository.js');
  return {
    ...originalModule,
    Bill: jest.fn(),
  };
});

describe('billDomain registerBill', () => {
    let userRepository;
    let newBill;
  
    beforeEach(() => {
      userRepository = {
        add: jest.fn(),
      };
      billDomain.configRepo(userRepository);
  
      newBill = new Bill(1, 1, 'Conta de Luz', 100, 'fixa', false, true, 3, new Date('2023-01-01'), new Date('2023-01-05'));
    });
  
    test('Deve cadastrar uma conta única com sucesso', async () => {
      // Configuração para cadastrar uma única conta
      newBill.divide = false;
      newBill.repeat = false;
  
      const result = await billDomain.registerBill(1, 'Conta única', 200, 'fixa', false, false, 1, new Date('2023-01-01'), new Date('2023-01-05'));
  
      expect(result).toEqual({ message: 'Conta cadastrada com sucesso!' });
      expect(userRepository.add).toHaveBeenCalledWith(newBill);
    });
  
    test('Deve cadastrar uma conta dividida com sucesso', async () => {
      // Configuração para cadastrar uma conta dividida
      newBill.divide = true;
      newBill.repeat = false;
  
      const result = await billDomain.registerBill(1, 'Conta dividida', 300, 'fixa', true, false, 3, new Date('2023-01-01'), new Date('2023-01-05'));
  
      expect(result).toEqual({ message: 'Conta cadastrada com sucesso!' });
      expect(userRepository.add).toHaveBeenCalledTimes(3);
    });
  
    test('Deve cadastrar uma conta repetida com sucesso', async () => {
      // Configuração para cadastrar uma conta repetida
      newBill.divide = false;
      newBill.repeat = true;
  
      const result = await billDomain.registerBill(1, 'Conta repetida', 400, 'fixa', false, true, 2, new Date('2023-01-01'), new Date('2023-01-05'));
  
      expect(result).toEqual({ message: 'Conta cadastrada com sucesso!' });
      expect(userRepository.add).toHaveBeenCalledTimes(2);
    });
  });

  describe('billDomain payBill', () => {
    let userRepository;
    let bill;
  
    beforeEach(() => {
      userRepository = {
        payBill: jest.fn(),
      };
      billDomain.configRepo(userRepository);
  
      bill = new Bill(1, 1, 'Conta de Luz', 100, 'fixa', false, true, 3, new Date('2023-01-01'), new Date('2023-01-05'));
    });
  
    test('Deve quitar uma conta com sucesso', async () => {
      userRepository.payBill.mockResolvedValue(true);
  
      const result = await billDomain.payBill(1);
  
      expect(result).toEqual({ message: 'Conta quitada com sucesso!' });
      expect(userRepository.payBill).toHaveBeenCalledWith(1);
    });
  
    test('Deve lidar com erro ao quitar conta', async () => {
      const errorMessage = 'Erro ao quitar conta. Por favor, tente novamente mais tarde.';
      userRepository.payBill.mockRejectedValue(new Error(errorMessage));
  
      await expect(billDomain.payBill(1)).rejects.toThrow(errorMessage);
      expect(userRepository.payBill).toHaveBeenCalledWith(1);
    });
  });

  describe('billDomain getAllBillsByUserId', () => {
    let userRepository;
  
    beforeEach(() => {
      userRepository = {
        getAllBillsByUserId: jest.fn(),
      };
      billDomain.configRepo(userRepository);
    });
  
    test('Deve obter todas as contas com sucesso', async () => {
      const userId = 1;
      const mockBills = [
        new Bill(1, userId, 'Conta de Luz', 100, 'fixa', false, true, 3, new Date('2023-01-01'), new Date('2023-01-05')),
      ];
  
      userRepository.getAllBillsByUserId.mockResolvedValue(mockBills);
  
      const result = await billDomain.getAllBills(userId);
  
      expect(result).toEqual(mockBills);
      expect(userRepository.getAllBillsByUserId).toHaveBeenCalledWith(userId);
    });
  
    test('Deve lidar com erro ao obter contas', async () => {
      const userId = 1;
      const errorMessage = 'Erro ao buscar contas. Por favor, tente novamente mais tarde.';
      userRepository.getAllBillsByUserId.mockRejectedValue(new Error(errorMessage));
  
      await expect(billDomain.getAllBills(userId)).rejects.toThrow(errorMessage);
      expect(userRepository.getAllBillsByUserId).toHaveBeenCalledWith(userId);
    });
  });

  describe('billDomain getBillsWithinPeriod', () => {
    let userRepository;
  
    beforeEach(() => {
      userRepository = {
        getBillsWithinPeriod: jest.fn(),
      };
      billDomain.configRepo(userRepository);
    });
  
    test('Deve obter contas dentro do período com sucesso', async () => {
      const userId = 1;
      const startDate = new Date('2023-01-01');
      const endDate = new Date('2023-01-31');
      const mockBills = [
        new Bill(1, userId, 'Conta de Luz', 100, 'fixa', false, true, 3, new Date('2023-01-05'), new Date('2023-01-10')),
      ];
  
      userRepository.getBillsWithinPeriod.mockResolvedValue(mockBills);
  
      const result = await billDomain.getBillsWithinPeriod(userId, startDate, endDate);
  
      expect(result).toEqual(mockBills);
      expect(userRepository.getBillsWithinPeriod).toHaveBeenCalledWith(userId, startDate, endDate);
    });
  
    test('Deve lidar com erro ao obter contas dentro do período', async () => {
      const userId = 1;
      const startDate = new Date('2023-01-01');
      const endDate = new Date('2023-01-31');
      const errorMessage = 'Erro ao buscar contas. Por favor, tente novamente mais tarde.';
      userRepository.getBillsWithinPeriod.mockRejectedValue(new Error(errorMessage));
  
      await expect(billDomain.getBillsWithinPeriod(userId, startDate, endDate)).rejects.toThrow(errorMessage);
      expect(userRepository.getBillsWithinPeriod).toHaveBeenCalledWith(userId, startDate, endDate);
    });
  });

  describe('billDomain getParcialBalanceAll', () => {
    let userRepository;
  
    beforeEach(() => {
      userRepository = {
        getAllBillsByUserId: jest.fn(),
      };
      billDomain.configRepo(userRepository);
    });
  
    test('Deve obter somatório de contas do tipo específico com sucesso', async () => {
      const userId = 1;
      const type = 'fixa';
      const mockBills = [
        new Bill(1, userId, 'Conta de Luz', 100, 'fixa', false, true, 3, new Date('2023-01-01'), new Date('2023-01-05')),
        new Bill(2, userId, 'Conta de Água', 50, 'fixa', false, true, 3, new Date('2023-01-01'), new Date('2023-01-05')),
        new Bill(3, userId, 'Conta de Internet', 80, 'variavel', false, true, 3, new Date('2023-01-01'), new Date('2023-01-05')),
      ];
  
      userRepository.getAllBillsByUserId.mockResolvedValue(mockBills);
  
      const result = await billDomain.getParcialBalanceAll(userId, type);
  
      expect(result).toEqual(150); // Soma de Conta de Luz (100) + Conta de Água (50)
      expect(userRepository.getAllBillsByUserId).toHaveBeenCalledWith(userId);
    });
  
    test('Deve lidar com erro ao obter somatório de contas do tipo específico', async () => {
      const userId = 1;
      const type = 'fixa';
      const errorMessage = 'Erro ao buscar contas parciais. Por favor, tente novamente mais tarde.';
      userRepository.getAllBillsByUserId.mockRejectedValue(new Error(errorMessage));
  
      await expect(billDomain.getParcialBalanceAll(userId, type)).rejects.toThrow(errorMessage);
      expect(userRepository.getAllBillsByUserId).toHaveBeenCalledWith(userId);
    });
  });

  describe('billDomain getBillsWithinPeriod', () => {
    let userRepository;
  
    beforeEach(() => {
      userRepository = {
        getBillsWithinPeriod: jest.fn(),
      };
      billDomain.configRepo(userRepository);
    });
  
    test('Deve obter somatório de contas do tipo específico dentro do período com sucesso', async () => {
      const userId = 1;
      const type = 'fixa';
      const startDate = new Date('2023-01-01');
      const endDate = new Date('2023-01-31');
      const mockBills = [
        new Bill(1, userId, 'Conta de Luz', 100, 'fixa', false, true, 3, new Date('2023-01-05'), new Date('2023-01-10')),
        new Bill(2, userId, 'Conta de Água', 50, 'variavel', false, true, 3, new Date('2023-01-15'), new Date('2023-01-20')),
      ];
  
      userRepository.getBillsWithinPeriod.mockResolvedValue(mockBills);
  
      const result = await billDomain.getParcialBalanceWithinPeriod(userId, type, startDate, endDate);
  
      expect(result).toEqual(100); // Soma de Conta de Luz (100)
      expect(userRepository.getBillsWithinPeriod).toHaveBeenCalledWith(userId, startDate, endDate);
    });
  
    test('Deve lidar com erro ao obter somatório de contas do tipo específico dentro do período', async () => {
      const userId = 1;
      const type = 'fixa';
      const startDate = new Date('2023-01-01');
      const endDate = new Date('2023-01-31');
      const errorMessage = 'Erro ao buscar contas parciais. Por favor, tente novamente mais tarde.';
      userRepository.getBillsWithinPeriod.mockRejectedValue(new Error(errorMessage));
  
      await expect(billDomain.getParcialBalanceWithinPeriod(userId, type, startDate, endDate)).rejects.toThrow(errorMessage);
      expect(userRepository.getBillsWithinPeriod).toHaveBeenCalledWith(userId, startDate, endDate);
    });
  });

  describe('billDomain getAllBillsByUserId', () => {
    let userRepository;
  
    beforeEach(() => {
      userRepository = {
        getAllBillsByUserId: jest.fn(),
      };
      billDomain.configRepo(userRepository);
    });
  
    test('Deve obter somatório de contas do tipo "G" ou "D" com sucesso', async () => {
      const userId = 1;
      const mockBills = [
        new Bill(1, userId, 'Receita', 500, 'G', false, true, 1, new Date('2023-01-01'), new Date('2023-01-05')),
        new Bill(2, userId, 'Despesa', 200, 'D', false, true, 1, new Date('2023-01-10'), new Date('2023-01-15')),
        new Bill(3, userId, 'Conta de Luz', 100, 'fixa', false, true, 3, new Date('2023-01-20'), new Date('2023-01-25')),
      ];
  
      userRepository.getAllBillsByUserId.mockResolvedValue(mockBills);
  
      const result = await billDomain.getTotalBalanceAll(userId);
  
      expect(result).toEqual(700); // Soma de Receita (500) + Despesa (200)
      expect(userRepository.getAllBillsByUserId).toHaveBeenCalledWith(userId);
    });
  
    test('Deve lidar com erro ao obter somatório de contas do tipo "G" ou "D"', async () => {
      const userId = 1;
      const errorMessage = 'Erro ao buscar contas parciais. Por favor, tente novamente mais tarde.';
      userRepository.getAllBillsByUserId.mockRejectedValue(new Error(errorMessage));
  
      await expect(billDomain.getTotalBalanceAll(userId)).rejects.toThrow(errorMessage);
      expect(userRepository.getAllBillsByUserId).toHaveBeenCalledWith(userId);
    });

  });

  describe('billDomain getBillsWithinPeriod', () => {
    let userRepository;
  
    beforeEach(() => {
      userRepository = {
        getBillsWithinPeriod: jest.fn(),
      };
      billDomain.configRepo(userRepository);
    });
  
    test('Deve obter somatório de contas do tipo "G" ou "D" dentro do período com sucesso', async () => {
      const userId = 1;
      const startDate = new Date('2023-01-01');
      const endDate = new Date('2023-01-31');
      const mockBills = [
        new Bill(1, userId, 'Receita', 500, 'G', false, true, 1, new Date('2023-01-05'), new Date('2023-01-10')),
        new Bill(2, userId, 'Despesa', 200, 'D', false, true, 1, new Date('2023-01-15'), new Date('2023-01-20')),
        new Bill(3, userId, 'Conta de Luz', 100, 'fixa', false, true, 3, new Date('2023-02-01'), new Date('2023-02-05')),
      ];
  
      userRepository.getBillsWithinPeriod.mockResolvedValue(mockBills);
  
      const result = await billDomain.getTotalBalanceWithinPeriod(userId, startDate, endDate);
  
      expect(result).toEqual(700); // Soma de Receita (500) + Despesa (200)
      expect(userRepository.getBillsWithinPeriod).toHaveBeenCalledWith(userId, startDate, endDate);
    });
  
    test('Deve lidar com erro ao obter somatório de contas do tipo "G" ou "D" dentro do período', async () => {
      const userId = 1;
      const startDate = new Date('2023-01-01');
      const endDate = new Date('2023-01-31');
      const errorMessage = 'Erro ao buscar contas parciais. Por favor, tente novamente mais tarde.';
      userRepository.getBillsWithinPeriod.mockRejectedValue(new Error(errorMessage));
  
      await expect(billDomain.getTotalBalanceWithinPeriod(userId, startDate, endDate)).rejects.toThrow(errorMessage);
      expect(userRepository.getBillsWithinPeriod).toHaveBeenCalledWith(userId, startDate, endDate);
    });
  });