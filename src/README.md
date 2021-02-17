# Persistência de dados

As listas de compras são armazenadas apenas em runtime (por enquanto).
Para controle da lista (e pensando no crescimento da solução - inclusão de novos componentes), toda a gestão em cima da lista de compras aberta/principal é feita através de um context (Context API).

# Testes automatizados

Os testes são criados conforme as regras de negócio/uso da solução.
O objetivo não é testar e validar todas as linhas do código, mas sim todas as operações possíveis de fazer na tela/componente e o resultado esperado.
Por enquanto, estamos deixando hard-coded ids para os testes, sem padrões de escrita. Isto será refatorado em um futuro breve.

# Pattern

Estamos tentando evitar a dependência de bibliotecas, criando componentes que implementam as bibliotecas (e usando os nossos componentes "implementadores" na solução). Então, por exemplo, ao invés de utilizar diretamente o TextBox do Material UI na Dashboard, criamos o nosso componente para Textbox. Desta forma, se precisarmos migrar do Material UI para outro framework, só precisamos fazer isto em um único lugar.
