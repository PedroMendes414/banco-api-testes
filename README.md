# Banco API Testes

Automação de testes da API **Banco API** (https://github.com/juliodelimas/banco-api) usando **JavaScript** com Mocha, Supertest, Chai e Mochawesome.

---

## 🎯 Objetivo
Validar automaticamente os principais endpoints da API (clientes, contas, transações), garantindo regressões rápidas e relatórios legíveis para análise de falhas.

---

## 🛠 Stack
- Node.js
- Mocha (runner)
- Chai (assertions)
- Supertest (requisições HTTP / integração)
- Mochawesome (relatórios HTML)
- dotenv (variáveis de ambiente)

---

## 📁 Estrutura do repositório
> Observação: esta estrutura foi verificada diretamente no repositório. 

```
banco-api-testes/
├── fixtures/            # exemplos de payloads / dados de teste
├── helpers/             # utilitários e helpers (ex: configuração de requests)
├── test/                # arquivos de teste (Mocha + Supertest)
├── .gitignore           # arquivos/pastas ignorados pelo git
├── package.json         # dependências e scripts do projeto
├── package-lock.json    # lockfile gerado pelo npm
└── README.md            # documentação (este arquivo)
```

**Nota:** a pasta `mochawesome-report/` **não** está presente no repositório (é gerada quando os testes são executados com Mochawesome). Se você quer manter os relatórios gerados fora do controle de versão, inclua `mochawesome-report/` no `.gitignore` (exemplos abaixo). Referência Mochawesome: documentação de geração de relatórios.

---

## ⚙️ Arquivo `.env`
Crie um arquivo `.env` na raiz do projeto com a variável abaixo (exemplo):

```env
BASE_URL=http://localhost:3000
```

A `BASE_URL` deve apontar para a instância da **Banco API** que será testada.

---

## ▶️ Como executar (passo-a-passo)
1. Instalar dependências:
```bash
npm install
```

2. Rodar todos os testes (script `test` em `package.json`):
```bash
npm test
```

3. Gerar relatório com Mochawesome
- Se houver um script `test:report` em `package.json`:
```bash
npm run test:report
```
- Caso não exista, você pode executar o Mocha e forçar o reporter Mochawesome diretamente:
```bash
npx mocha --reporter mochawesome --reporter-options reportDir=mochawesome-report,reportFilename=mochawesome
```
Após a execução com Mochawesome, o relatório HTML normalmente fica em:
```
mochawesome-report/mochawesome.html
```

> Verifique os scripts em `package.json` para confirmar nomes específicos dos comandos. (o `package.json` está no repositório).

---

## .gitignore (presente no repositório)
O repositório já contém um arquivo `.gitignore`. Recomenda-se garantir que ele ignore itens gerados localmente e dados sensíveis, por exemplo:

```gitignore
# node / npm
node_modules/
package-lock.json

# ambiente
.env

# relatórios / artefatos de teste
mochawesome-report/
npm-debug.log

# editor / SO
.DS_Store
.vscode/
```
---

## 📄 Boas práticas e observações
- Não commite o `.env` contendo URLs ou credenciais sensíveis. Use `.env.example` para documentar as variáveis necessárias.
- Mantenha `mochawesome-report/` ignorado para evitar grandes commits de HTML gerado automaticamente.
- Se quiser adicionar scripts úteis ao `package.json`, exemplos úteis são:
```json
"scripts": {
  "test": "mocha",
  "test:mochawesome": "mocha --reporter mochawesome --reporter-options reportDir=mochawesome-report,reportFilename=mochawesome"
}
```

---

## 📚 Links úteis
- Mocha: https://mochajs.org/
- Chai: https://www.chaijs.com/
- Supertest: https://www.npmjs.com/package/supertest
- Mochawesome (geração de relatório): https://www.npmjs.com/package/mochawesome citeturn7search3
- dotenv: https://www.npmjs.com/package/dotenv

---

## 🤝 Contribuindo
1. Fork → 2. Branch → 3. Commit → 4. PR (pull request)
Siga as regras do repositório e adicione descrições claras nos commits.

---
