# Listei v2

- Passo a passo percorrido para configuração da solução.
- Especificações sobre o processo de desenvolvimento

# Processo de deenvolvimento

- Qualquer modificação/feature/fix deve possuir uma issue no Github/repo do projeto
  - A issue deverá ter uma lista de expectativas
    - Cada expectativa deverá tornar-se um teste automatizado
- Toda issue deverá ser resolvida em uma branch
  - A branch deverá respeitar o nome baseado no código da issue. Ex: `issues/7`(sendo "7" o código da issue)
- Toda branch deverá abrir um pull request (PR) para dar merge em develop

# Softwares necessários

- Node 14.7.0+: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
    - Instalar junto as dependências de Python, Build Tools e Chocolatey (instalação automática através do Node)
- Yarn LTS: [https://classic.yarnpkg.com/en/docs/install/](https://classic.yarnpkg.com/en/docs/install/)
- Git: [https://git-scm.com/downloads](https://git-scm.com/downloads)
- Docker Desktop: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
- KubeCTL: [https://kubernetes.io/docs/tasks/tools/install-kubectl/](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

# IDE e ambiente recomendado

- VS Code: [https://code.visualstudio.com/download](https://code.visualstudio.com/download)
- Abra o VS Code e configure as extensões da seguinte forma:
    - `EditorConfig for VS Code`
    - `ESLint`
    - `Reload`
    - `Docker`

    ⚠️  Certifique-se de remover a extensão **Prettier - Code Formatter** do seu VS Code, ela pode gerar incompatibilidades com as configurações que vamos fazer.

# Criando o projeto

Para iniciar o projeto, rodamos: `yarn create react-app listei --template typescript`

# Configurando o **EditorConfig**

Com a extensão `EditorConfig for VS Code` instalada, vamos clicar com o botão direito sobre o explorador de arquivos do projeto vamos selecionar a opção `Generate .editorconfig` . Abra o arquivo e deixe-o desta forma:

```
root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
end_of_line = lf

```

# Configurando o VSCode com auto-fix

Antes de iniciar de fato a configuração do ESlint em nosso projeto, precisamos fazer o **VSCode** formatar o código sempre que salvarmos algum arquivo. Para isto, vamos adicionar uma opção chamada `codeActionsOnSave` nas **configurações do VS Code**, assim como mostrado abaixo:

```
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
}

```

# Configurando **o ESLint**

- `yarn add eslint eslint-plugin-react @typescript-eslint/parser @typescript-eslint/eslint-plugin -D`
- Criar arquivo `/.eslintrc.js`

```
module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true
		}
	},
	settings: {
		react: {
			version: "detect"
		}
	},
	extends: [
		"plugin:react/recommended",
	  	"plugin:@typescript-eslint/recommended"
	],
	rules: {
	  	"@typescript-eslint/explicit-module-boundary-types": "off"
	},
};

```

- Criar o arquivo `/.eslintignore`

```
/*.js
node_modules
dist

```

# Configurando o Prettier

- `yarn add prettier eslint-config-prettier eslint-plugin-prettier -D`
- Criar o arquivo `/.prettierrc.js`

```
module.exports = {
	semi: true,
	trailingComma: "all",
	singleQuote: true,
	printWidth: 120,
	tabWidth: 2
};

```

- Adicionar duas novas extensões ao ESLint:

```
"prettier/@typescript-eslint",
"plugin:prettier/recommended"

```

# Configurando bibliotecas base para o desenvolvimento

- Instalar styled-componentes: `yarn add styled-components` e `yarn add @types/styled-components -D`
- Instalar o Material UI: `yarn add @material-ui/core @material-ui/lab @material-ui/icons fontsource-roboto`
    - Importamos a fonte Roboto ao index da solução (`./src/index.tsx`):

    ```python
    import React from 'react';
    import ReactDOM from 'react-dom';
    import 'fontsource-roboto';
    [...]
    ```

# 💡 Configuração das rotas

Para a configuração das rotas, vamos instalar o react-router-dom usando `yarn add react-router-dom` e `yarn add -D @types/react-router-dom` (o segundo para adicionar a tipagem à nossa aplicação).

- Tanto o menu quanto as rotas são configuradas baseado no array do arquivo `./src/routes/index.tsx`

    ```tsx
    import React from 'react';
    import HomeIcon from '@material-ui/icons/Home';
    import { SvgIconProps } from '@material-ui/core/SvgIcon';

    export interface RoutesModel {
      path: string;
      component: React.LazyExoticComponent<React.ComponentType<any>>;
      title: string;
      icon: React.ComponentType<SvgIconProps>;
    }

    export const AppRoutes: Array<RoutesModel> = [
      {
        path: '/',
        component: React.lazy(() => import('./../components/pages/dashboard/DashboardPage')),
        title: 'Início',
        icon: HomeIcon,
      },
    ];
    ```

- Para que o nosso app use o arquivo de rotas, precisamos atualizar, também, o `App.tsx`:

    ```tsx
    import React, { Suspense } from 'react';
    import styled from 'styled-components';
    import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
    import { NotFoundPage } from './components/pages';
    import { AppRoutes, RoutesModel } from './routes';
    import { Loading } from './components/utils/loading';

    const ContainerDiv = styled.div`
      height: 100%;
    `;

    function App() {
      return (
        <ContainerDiv className="App">
          <Router>
            <Suspense fallback={<Loading>Carregando...</Loading>}>
              <Switch>
                {AppRoutes &&
                  AppRoutes.map((route: RoutesModel) => (
                    <Route key={route.path} path={route.path} exact component={route.component} />
                  ))}
                <Route component={NotFoundPage} />
              </Switch>
            </Suspense>
          </Router>
        </ContainerDiv>
      );
    }

    export default App;
    ```

# Configurando testes automatizados

Existem duas ferramentas bem consolidadas para teste, na época deste projeto: enzyme e o react testing library; O enzyme foi criado pelo airbnb e consegue realizar testes em cima das propriedades dos componentes; O testing library foca os testes no DOM dos componentes;

Para este projeto, vamos utilizar o Enzyme, pelo tempo de existência do projeto (e a quantidade de conteúdo existente na comunidade).

## Configurando o JEST

Para compilar os testes usaremos o Jest. Para isso, precisamos configurá-lo para trabalhar com typescript no nosso projeto.

- `yarn add --dev jest ts-jest @types/jest`

Com as nossas bibliotecas adicionadas, vamos configurar o Jest para trabalhar com typescript e para coletar o coverage com arquivos TSX (nossos componentes) apenas. Para isso, vamos adicionar uma nova propriedade à raiz do nosso `package.json`:

```python
"jest": {
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    "roots": ["<rootDir>/src"],
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ],
    "coverageDirectory": "coverage",
    "coverageProvider": "v8",
    "collectCoverageFrom": [
      "<rootDir>/src/**/*.tsx",
      "!<rootDir>/src/**/index.tsx"
    ]
  },
```

Também poderíamos colocar estas configurações em um arquivo `jest.config.js`, na raiz do projeto.

Além disto, vamos modificar o script `test` e criar um script `test:ci` (também no nosso `package.json`):

```python
"test": "jest --passWithNoTests --runInBand",
"test:ci": "yarn test --coverage",
```
