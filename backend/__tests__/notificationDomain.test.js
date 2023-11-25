// __tests__/notificationDomain.test.js
const notificationDomain = require('../domain/Notification/notificationDomain');
const { Notification } = require('../domain/Notification/Notification');

jest.mock('../adapters/notificationRepository', () => {
  const originalModule = jest.requireActual('../adapters/notificationRepository');
  return {
    ...originalModule,
    getBillsWithinPeriod: jest.fn(),
  };
});

describe('notificationDomain functions', () => {
  let userRepository;

  beforeEach(() => {
    userRepository = {
      getBillsWithinPeriod: jest.fn(),
    };
    notificationDomain.configRepo(userRepository);
  });

  test('Deve obter notificações do usuário com sucesso', async () => {
    const userId = 1;
    const mockBills = [
      {
        userId,
        billId: 1,
        name: 'Conta de Luz',
        value: 100,
        type: 'fixa',
        divide: false,
        repeat: true,
        numParts: 3,
        firstPayment: new Date('2023-01-01'),
        payday: new Date('2023-01-05'),
      },
    ];

    userRepository.getBillsWithinPeriod.mockResolvedValue(mockBills);

    const result = await notificationDomain.getUserNotifications(userId);

    expect(result).toHaveLength(1); // Uma notificação para a Conta de Luz
    expect(result[0]).toBeInstanceOf(Notification);
    expect(userRepository.getBillsWithinPeriod).toHaveBeenCalledWith(userId, expect.any(Date), expect.any(Date));
  });

  test('Deve lidar com erro ao obter notificações do usuário', async () => {
    const userId = 1;
    const errorMessage = 'Erro ao buscar contas. Por favor, tente novamente mais tarde.';
    userRepository.getBillsWithinPeriod.mockRejectedValue(new Error(errorMessage));

    await expect(notificationDomain.getUserNotifications(userId)).rejects.toThrow(errorMessage);
    expect(userRepository.getBillsWithinPeriod).toHaveBeenCalledWith(userId, expect.any(Date), expect.any(Date));
  });
});
