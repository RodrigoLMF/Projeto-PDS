# CrtlF (Aplicação de controle financeiro entre amigos)

## Membros e papéis

-  Rodrigo Luiz Macêdo Ferreira (front-end e DBA)
-  Igor Roiz Teixeira (full stack)
-  Pedro Henrique Solano De Oliveira (back-end)
-  Emyle Santos Lima (back-end)

## Escopo

Nós desenvolveremos uma aplicação web para controle e gerenciamento financeiro entre grupos de amigos. Nesse sentido, os principais objetivos da aplicação seriam de facilitar e organizar possíveis relações financeiras que ocorrem nesse contexto, como empréstimos, dívidas, consórcios, etc. 

## Backlog do Produto

1. Como usuário eu gostaria de cadastrar uma conta (um valor monetário).
2. Como usuário eu gostaria de parcelar o valor de uma conta.
3. Como usuário eu gostaria de comparar minha dívida com outra pessoa.
4. Como usuário eu gostaria de calcular os juros nas contas.
5. Como usuário eu gostaria de consultar meu saldo de entrada, saída e o saldo total.
6. Como usuário eu gostaria de poder criar um grupo com outros usuários.(Como administrador)
7. Como usuário eu gostaria de poder cadastrar contas de um grupo.
8. Como usuário eu gostaria de poder filtrar contas por um período.
9. Como usuário eu gostaria de poder definir uma conta como quitada.
10. Como participante de um grupo eu gostaria de cadastrar uma conta no grupo.
11. Como administrador eu gostaria de poder aprovar a conta como paga.
12. Como usuário eu gostaria de poder convidar um usuário para um grupo.
13. Como administrador de um grupo eu gostaria de poder aprovar a entrada de um usuário em um grupo.
14. Como usuário eu gostaria de poder ver a listagem de grupos que eu sou um participante.
15. Como usuário eu gostaria de ser notificado sobre uma conta a ser paga.
16. Como usuário eu gostaria de poder cadastrar um perfil
17. Como usuário eu gostaria de poder acessar o sistema fazendo login

## Backlog da Sprint

### História 1: Como usuário eu gostaria de poder cadastrar um perfil
	* Tarefas e responsáveis:
   - Implementação do banco de dados e criação das tabelas pertinentes [Rodrigo]
   - Desenvolvimento da interface web da tela de cadastro [Igor]
   - Implementação no backend a lógica para realizar o cadastro [Emyle]
   - Integração backend e frontend da tela de cadastro [Pedro]
   - Realização de testes para homologar a história [Pedro e Emyle]

História 2: Como usuário eu gostaria de poder acessar o sistema fazendo login
	* Tarefas e responsáveis:
   - Desenvolvimento da interface web da tela de login [Rodrigo]
   - Desenvolvimento da lógica backend para realizar o login [Pedro]
   - Integração backend e frontend da tela de login [Emyle]
   - Integração backend e frontend da tela de cadastro [Pedro]
   - Realização de testes para homologar a história [Igor]

História 3: Como usuário eu gostaria de poder cadastrar uma conta(um valor monetário)
	Tarefas e responsáveis:
   - Criação das tabelas e relacionamentos pertinentes no banco de dados [Igor]
   - Desenvolvimento do componente web de cadastro de conta da homepage [Rodrigo]
   - Implementação da lógica backend para cadastrar uma conta para um usuário [Emyle]
   - Integração backend e frontend da homepage [Pedro]
   - Realização de testes para homologar a história [Emyle e Pedro]

História 4: Como usuário eu gostaria de consultar meu saldo de entrada, saída e o saldo total
	Tarefas e responsáveis:
   - Criação das tabelas e ou relacionamentos pertinentes no banco de dados[Igor]
   - Desenvolvimento do componente web responsável por exibir o saldo de entrada ou saída [Rodrigo]
   - Implementação da lógica backend para consulta do saldo de entrada e saída [Pedro]
   - Integração backend e frontend da funcionalidade de consulta de saldo de entrada e saída [Pedro]
   - Realização de testes para homologar a história [Igor]

História 5: Como usuário eu gostaria de poder definir uma conta como quitada
	Tarefas e responsáveis:
   - Atualização de tabela do banco de dados para incluir pagamento [Rodrigo]
   - Adicionar componente na tela para quitar conta [Igor]
   - Desenvolver lógica backend para quitar conta [Emyle]
   - Integração backend e frontend da funcionalidade de quitar uma conta [Pedro]
   - Realização de testes para homologar a história [Emyle]

História 6: Como usuário eu gostaria de ser notificado sobre uma conta a ser paga
	Tarefas e responsáveis:
   - Criação das tabelas e ou relacionamentos pertinentes no banco de dados[Rodrigo]
   - Desenvolvimento do componente web responsável pelas notificações [Rodrigo e Igor]
   - Implementação da lógica backend para emissão da notificação [Emyle]
   - Integração backend e frontend da funcionalidade de notificação [Pedro]
   - Realização de testes para homologar a história [Rodrigo]

História 7: Como usuário eu gostaria de poder filtrar contas por um período
	Tarefas e responsáveis:
   - Desenvolvimento do componente web responsável por filtrar as contas [Igor]
   - Desenvolvimento do componente web da listagem de contas de um usuário [Rodrigo]
   - Implementação da lógica backend do filtro de contas de um usuário [Pedro]
   - Integração backend e frontend da funcionalidade do filtro de contas [Emyle]
   - Realização de testes para homologar a história [Pedro

História 8: Como usuário eu gostaria de parcelar o valor de uma conta
	Tarefas e responsáveis:
   - Desenvolvimento do componente web de parcelamento de uma conta [Rodrigo e Igor]
   - Desenvolvimento da lógica backend responsável por realizar o parcelamento de uma conta [Emyle]
   - Integração backend e frontend da funcionalidade de parcelamento de conta [Emyle e Pedro]
   - Realização de testes para homologar a história [Rodrigo]

## Tecnologias

HTML5, CSS3, python, JavaScript, MySQL Workbench, Node.js, Express.js, Balsamiq
