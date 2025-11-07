Conrado Perini Fracacio - 04722073
Davi Araújo Gonçalves - 04722033
Lavínnia Luize Canossa Radaeli - 04722095

# Game Store
Esse programa está utilizando NodeJS com Reactive-Native para criar o frontend e usando um banco MYSQL para salvar os dados necessários.
Para auxiliar na conversa entre o front e o banco, foi feito uma API em Java, usando JPA para configurações e um Token JWT para segurança em algumas funções da API.

No banco de dados, foram utilizadas duas tabelas: “Login” e “Games”. (eu coloco as estruturas certinho depois, agora não tenho o MYSQL)

# Requisitos
Antes de rodar o frontend, precisa necessariamente rodar primeiro a API. Para rodar o frontend, precisa ser em um prompt de comando, ir para a pasta onde está o código e rodar o comando `npx run`. 

Se você rodar esse comando por CMD vai aparecer em um site, se você rodar pelo VSCode, vai aparecer um qrcode que faz o site conseguir ser acessado pelo celular.

Independente de por onde você irá rodar o programa, ainda terá as mesmas funcionalidades.

## Incializar
* Primeiramente, terá uma tela pedindo email e senha com dois botões: “criar cadastro” e “entrar”. Se você clicar em entrar, o código irá testar para erros (email ou senha vazios) e irá enviar uma requisição para a API. Se estiver com o email e senha correto, a API irá retornar um token JWT para o frontend, esse token serve para sinalizar que o usuário consegue cadastrar e retirar um jogo da API. Se o email ou a senha estiverem erradas, irá retornar um erro e o usuário não conseguirá entrar.
* Ao clicar em “criar cadastro”, aparece uma tela com campos para email, senha e repetir a senha. A senha repetida serve somente para o usuário ter mais certeza de qual senha está sendo utilizada.
* Ao clicar no botão “criar cadastro”, o código JavaScript fará uma série de verificações para possíveis erros (senhas diferentes, campos vazios). Se tudo estiver correto, o JS irá enviar o email e a senha para a API para cadastrar o usuário, irá enviar o token e o usuário já poderá começar a utilizar o programa.
* Na tela inicial, existem três botões, para a lista de jogos, cadastrar jogos e sair do programa. Sair do programa fará a API descartar o token criado para o usuário, tendo que recriar uma na próxima vez que o usuário entrar no programa.
* Ao clicar para ver a lista de jogos, o usuário é mandado para uma tela com uma lista de jogos e, em cima, várias especificações para filtrar os jogos mostrados.
* Foi criado um controller próprio para a filtragem de jogos. Quando o usuário clica para enviar o filtro, o frontend entrega um JSON, do mesmo formato em que seria entregue para criação de um jogo, sem tratamento, pois todo o tratamento será feito pela API.
* A API recebe o JSON de filtragem e verifica quais campos estão vazios e quais estão com informações. Se todos os campos estiverem vazios, ela devolve todos os jogos guardados.
* Para cada campo preenchido, a API faz a respectiva verificação com todos os jogos disponíveis (nome do jogo igual, gêneros de jogos parecidos, etc) e entrega todos os jogos com todas as verificações iguais, são ignorados os jogos que não atingem expectativas e campos vazios.
Ainda na tela de listagem, ao lado de cada jogo, terá um botão vermelho escrito ”Excluir”, que irá mandar o ID do jogo para ser apagado pela API sem verificações.
* Se, na tela de início, o usuário entrar na tela de cadastro de jogos, ele verá as mesmas configurações de filtragem da tela de listagem: Nome do Jogo, Valor, Classificação Etária, Gênero de Jogo e Console, como única diferença a incrementação de Sinopse.
* Ao clicar em cadastrar, o JavaScript faz as verificações necessárias (campos vazios) e envia o JSON criado para a API, a API por sua vez cadastra o jogo no banco de dados.
