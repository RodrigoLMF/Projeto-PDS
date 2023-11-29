const repository = require('../adapters/notificationRepository');
const { Notification } = require('../domain/Notification/Notification');

jest.mock('../adapters/config-connection', () => ({
  execute: jest.fn(),
}));

describe('add function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  /*test('Adiciona notificação no banco de dados', async () => {
    // Mock da execução do SQL
    const mockExecute = jest.fn().mockResolvedValue({
      insertId: 1,
    });
    require('../adapters/config-connection').execute.mockImplementation(mockExecute);

    // Chama a função add
    const notificationToAdd = new Notification(0, 1, 1, 'Conta vencendo em breve', new Date());
    const result = await repository.add(notificationToAdd);

    // Verifica se a execução do SQL ocorreu corretamente
    expect(mockExecute).toHaveBeenCalledWith(
      'INSERT INTO NOTIFICATION (USER_ID, BILL_ID, NOTIFICATION_DESC, ISSUE_DATE) VALUES ( ?, ?, ?, ? )',
      [1, 1, 'Conta vencendo em breve', expect.any(Date)]
    );

    // Verifica se o resultado do teste é o ID da notificação inserida
    expect(result).toBe(1);
  });*/

  test('Lida com erros ao salvar notificação', async () => {
    // Mock da execução do SQL que simula um erro
    const mockExecute = jest.fn().mockRejectedValue(new Error('Erro ao cadastrar notificação'));
    require('../adapters/config-connection').execute.mockImplementation(mockExecute);

    // Chama a função add e verifica se ela trata o erro corretamente
    const notificationToAdd = new Notification(0, 1, 1, 'Conta vencendo em breve', new Date());
    await expect(repository.add(notificationToAdd)).rejects.toThrow('Erro ao cadastrar notificação');
  });
});
