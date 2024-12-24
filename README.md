# Cardápio Virtual

Este projeto é um site de cardápio interativo para um restaurante de hambúrgueres chamado **Burguer**. Ele permite que os clientes visualizem o menu, adicionem itens ao carrinho e façam pedidos com facilidade.

## 🚀 Funcionalidades

- **Exibição do cardápio:** Menu organizado com imagens, descrições e preços de hambúrgueres e bebidas.
- **Carrinho de compras:** Adicione itens ao carrinho e veja o total em tempo real.
- **Integração com WhatsApp** Envio do pedido para o WhatsApp.
- **Horário de funcionamento** Verificação do horário de funcionamento do restaurante (18h às 22h).
- **Interface responsiva:** Design adaptado para dispositivos móveis e desktops.
- **Finalização do pedido:** Campo para inserir endereço e concluir o pedido.

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estrutura principal do site.
- **CSS (Tailwind CSS):** Estilização da página com classes utilitárias.
- **JavaScript:** Funcionalidades interativas como o carrinho de compras.
- **Toastify.js:** Notificações visuais.
- **Font Awesome:** Ícones utilizados no site.

## 📚 Pré-requisitos

Certifique-se de que possui um navegador moderno para visualizar o site corretamente.

- **Node.js** (https://nodejs.org) e **npm** instalados.

## ⚙️ Configuração e Execução

### Passo a passo

1. **Abra o terminal** no seu computador.


2. **Clone o repositório** para sua máquina local. Copie o link abaixo e cole no terminal:
     ```bash
   git clone https://github.com/alezin54/cardapio.git
     ```
    ```bash
      cd cardapio-virtual
    ```
      ***Agora você está dentro do projeto e pode começar a trabalhar nele.***

  
3. **Instalar as Dependências** Para que o projeto funcione corretamente, você precisa instalar as dependências. Execute o seguinte comando:
     ```bash
     npm install
    ```
      ***Isso irá baixar todas as bibliotecas necessárias listadas no arquivo package.json.***


4. **Iniciar o Desenvolvimento** Para iniciar o servidor e começar a compilar o código do TailwindCSS em tempo real, execute o seguinte comando:
     ```bash
      npm run dev
    ```
      ***Agora, o TailwindCSS será monitorado e compilado automaticamente enquanto você faz alterações nos arquivos.***


5. **Acessar o Projeto** Depois de executar o comando acima, abra o arquivo ***index.html*** no seu navegador para visualizar o projeto em ação.

## 📂 Estrutura de Arquivos

    cardapio-virtual/
    │
    ├── assets/               # Imagens e outros arquivos estáticos
    ├── styles/               # Arquivos CSS
    │   ├── style.css         # Arquivo CSS de entrada
    │   ├── output.css        # Arquivo CSS gerado pelo Tailwind
    │
    ├── script.js             # Código JavaScript principal
    ├── tailwind.config.js    # Configuração do TailwindCSS
    ├── package.json          # Arquivo de dependências e scripts npm
    ├── index.html            # Página inicial
    └── README.md             # Documentação do projeto

## 🌟 Personalização

- Substitua as imagens em `./assets` para utilizar seu próprio conteúdo visual.
- Atualize os dados do menu diretamente no arquivo `index.html`.
- Modifique as cores e estilos no arquivo CSS localizado em `styles/output.css`.

## 📞 Integração com WhatsApp

  - Os pedidos são enviados para o WhatsApp no número configurado no código.
  - Certifique-se de que o WhatsApp Web esteja funcionando para receber os pedidos.

## 🕒 Horários de Funcionamento

  - O restaurante funciona das 18h às 22h.
  - Se estiver fora desse horário, um aviso será exibido e a funcionalidade de checkout será desativada.


## 🌟 Melhorias Futuras
  - Implementar persistência do carrinho usando LocalStorage.
  - Criar uma interface administrativa para gerenciar itens do menu.
  - Melhorar a responsividade para dispositivos móveis.
  - Adicionar suporte multi-idioma.


## 🖼️ Pré-visualização

### Header
![Header do site](./assets/hamb-1.png)

### Cardápio
![Menu do site](./assets/hamb-2.png)

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e enviar pull requests.

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.


    Esse `README.md` fornece uma visão geral clara do projeto, detalhando as funcionalidades, instruções de instalação e ideias para melhorias futuras. Se precisar de mais personalizações, é só avisar! 😊


---

**Feito com ❤️ por Alex santos.**
