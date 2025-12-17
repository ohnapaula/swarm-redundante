# Sistema Redundante com Docker Swarm e Express.js

Atividade prática da disciplina de **Ambiente e Desenvolvimento de Software** (IFCE) demonstrando a implementação de uma API resiliente com orquestração de containers.

---

## ✨ Principais Características

* **Load Balancing:** distribuição automática de requisições entre réplicas.
* **Escalabilidade Horizontal:** múltiplas instâncias da mesma API em execução.
* **Auto-healing:** recriação automática de containers em caso de falha.
* **Orquestração:** gerenciamento de serviços via Docker Swarm.

---

## 🗂 Estrutura do Projeto

```
.
├── api/                # API Node.js (Express) + Dockerfile
├── prints/             # Evidências de execução e testes
├── docker-compose.yml  # Definição da stack Swarm
└── README.md
```

---

## 🚀 Execução Local

### Pré-requisitos

* Docker instalado
* Docker Swarm habilitado

### Passos

**1. Build da imagem da API**

```bash
docker build -t aluno/swarm-api:1.0 ./api
```

**2. Inicialização do Swarm (se necessário)**

```bash
docker swarm init
```

**3. Deploy da stack**

```bash
docker stack deploy -c docker-compose.yml redundante
```

---

## 🔍 Testes

Após o deploy, a API pode ser acessada em:

* **Root:** [http://127.0.0.1:8080/](http://127.0.0.1:8080/)
* **Info (instância):** [http://127.0.0.1:8080/info](http://127.0.0.1:8080/info)

Ao atualizar o endpoint `/info`, observa-se a alternância do campo `host`, comprovando o balanceamento de carga entre as réplicas.

---

## 📊 Monitoramento

Visualização dos logs do serviço monitor:

```bash
docker service logs -f redundante_monitor
```

---

## 🛠 Auto-healing (Resiliência)

Procedimento de validação:

```bash
docker ps
docker stop <ID>
docker service ps redundante_api
```

O Docker Swarm detecta a falha e recria automaticamente a task. Evidências encontram-se na pasta `prints/`.

---

## 🧹 Encerramento

```bash
docker stack rm redundante
```