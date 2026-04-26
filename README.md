🛡️ SEC-AUDIT Labs - CyberSecurity PoC Platform

English Reference

📝 Description

SEC-AUDIT Labs is an interactive Proof-of-Concept (PoC) platform designed to
demonstrate the most common web vulnerabilities identified in the OWASP Top 10.
Instead of a simple "capture the flag" game, this project serves as a technical
sandbox for security auditing, providing both a practical exploit environment
and detailed technical documentation for each vulnerability.

🧪 Vulnerabilities Covered

1.  Broken Access Control (IDOR): Exploiting insecure direct object references
    in a billing API to access unauthorized invoices.
2.  Security Misconfiguration: Information leak through verbose error headers
    and exposed diagnostic endpoints.
3.  Authentication Failures: User enumeration through inconsistent server
    responses, allowing the identification of administrative accounts.
4.  Cryptographic Failures: Exploitation of weak encoding (Base64) in session
    cookies to perform privilege escalation.

🛠️ Tech Stack

  - Backend: Node.js (Express)
  - Database: SQLite (In-Memory for transient labs)
  - Frontend: React / Tailwind CSS (JetBrains Mono for terminal aesthetics)
  - Virtualization: Docker & Docker Compose

🚀 Installation & Running

Make sure you have Docker and Docker Compose installed on your machine.

1.  Clone the repository:
    git clone https://github.com/your-username/sec-audit-labs.git
    cd sec-audit-labs
2.  Run with Docker Compose:
    docker-compose up --build
3.  Access the platform: Open your browser and navigate to http://localhost:3000

🔍 Highlights:

  - Proactive Remediation: Every lab includes a "Technical Briefing" explaining
    why the vulnerability exists and how to fix it at the code level.
  - Clean UI/UX: Minimalist orange/dark-mode dashboard focused on readability
    and data presentation.
  - Backend-Validation: Flag verification is handled server-side to prevent
    client-side "cheating".

🇧🇷 Referência em Português

📝 Descrição

O SEC-AUDIT Labs é uma plataforma interativa de Prova de Conceito (PoC)
desenvolvida para demonstrar as vulnerabilidades web mais comuns identificadas
no OWASP Top 10. Mais do que um jogo de "capture the flag", este projeto serve
como um laboratório técnico para auditoria de segurança, fornecendo um ambiente
prático de exploração e documentação técnica detalhada para cada falha.

🧪 Vulnerabilidades Cobertas

1.  Controle de Acesso Quebrado (IDOR): Exploração de referências diretas a
    objetos inseguros em uma API de faturamento para acessar faturas não
    autorizadas.
2.  Configuração Incorreta de Segurança: Vazamento de informações através de
    headers de erro verbosos e endpoints de diagnóstico expostos.
3.  Falhas de Autenticação: Enumeração de usuários através de respostas
    inconsistentes do servidor, permitindo a identificação de contas
    administrativas.
4.  Falhas de Criptografia: Exploração de codificação fraca (Base64) em cookies
    de sessão para realizar escalação de privilégios.

🛠️ Tecnologias Utilizadas

  - Backend: Node.js (Express)
  - Banco de Dados: SQLite (Em memória para labs efêmeros)
  - Frontend: HTML5 / Tailwind CSS (Estética minimalista com JetBrains Mono)
  - Virtualização: Docker & Docker Compose

🚀 Instalação e Execução

Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

1.  Clone o repositório:
    git clone https://github.com/4ybbe/sec-audit-labs.git
    cd sec-audit-labs
2.  Execute com Docker Compose:
    docker-compose up --build
3.  Acesse a plataforma: Abra seu navegador em http://localhost:3000

🔍 Diferenciais:

  - Remediação Proativa: Cada lab inclui um "Technical Briefing" explicando por
    que a vulnerabilidade ocorre e como corrigi-la no nível do código.
  - UI/UX Profissional: Dashboard minimalista laranja/dark-mode focado em
    legibilidade e apresentação de dados técnicos.
  - Validação no Backend: A verificação de flags é feita no lado do servidor
    para demonstrar práticas seguras de desenvolvimento.

Disclaimer: This project is for educational purposes only. Do not use these
techniques on systems you do not have explicit permission to test.

Developed by [Marco Antonio] - | [temp4agro@gmail.com]
