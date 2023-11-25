// __tests__/billDomain.test.js
const billDomain = require('../domain/Bill/billDomain.js');
const { Bill } = require('../domain/Bill/Bill.js');

jest.mock('../adapters/billRepository.js', () => {
  const originalModule = jest.requireActual('../adapters/billRepository.js');
  return {
    ...originalModule,
    Bill: jest.fn(),
  };
});

describe('billDomain functions', () => {
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
  
    // Adicione mais testes conforme necessário
  });