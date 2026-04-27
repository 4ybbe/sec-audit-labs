<div align="center">
  <img src="./docs/dashboard-preview.png" alt="AuditLabs Security Dashboard" width="100%" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
  
  <br><br>

  # 🛡️ AuditLabs
  **Interactive Security Training Dashboard & Vulnerability Lab**

  [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](#)
  [![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](#)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
  [![Security](https://img.shields.io/badge/Security-OWASP_Top_10-red?style=for-the-badge)](#)
</div>

<br>

## 📖 Overview

**AuditLabs** is an intentionally vulnerable web application disguised as a modern, sleek Cloud SaaS Platform. It is designed to help developers, security enthusiasts, and penetration testers understand common web vulnerabilities in a realistic, context-driven environment.

Instead of traditional "hacker terminal" aesthetics, AuditLabs places the user inside a realistic corporate portal, demonstrating how critical flaws often hide behind clean user interfaces.

---

## 🎯 Vulnerabilities Addressed (The Labs)

The platform currently features 4 interactive modules, each mapped to real-world security missteps:

### 1. Insecure Direct Object Reference (IDOR) / Broken Access Control
* **The Scenario:** The Order Management Service fetches client invoices based on an identity context bound to the DOM.
* **The Flaw:** The backend trusts user-supplied input (`accountId`) without validating if the current session actually owns that ID.
* **The Attack:** Attackers can inspect the application (F12 / DevTools), manipulate the data-attributes, and extract sensitive invoices belonging to administrative accounts.

### 2. Security Misconfiguration
* **The Scenario:** An Internal Service Health dashboard used by administrators.
* **The Flaw:** Improper production configuration leaves debug headers active (`X-Debug-Mode`) and leaks internal maintenance routes amidst a sea of legitimate server metrics.
* **The Attack:** Attackers probe the diagnostic endpoints and analyze HTTP response headers to map out hidden infrastructure.

### 3. Authentication Failures (Account Enumeration)
* **The Scenario:** An Identity Provider Probe testing login endpoints.
* **The Flaw:** The API returns inconsistent HTTP responses and verbose error messages depending on whether a username exists in the database or not.
* **The Attack:** Attackers can automate requests to differentiate between "User not found" and "Incorrect password", allowing them to enumerate valid accounts for targeted brute-force attacks.

### 4. Broken Session Management (Cryptographic Failure)
* **The Scenario:** Session context sent via HTTP Headers.
* **The Flaw:** The application serializes user session data using simple Base64 encoding rather than cryptographically signing it (e.g., JWT) or using secure server-side sessions.
* **The Attack:** Attackers capture the Base64 payload, decode it, escalate their privileges (`role=admin`), re-encode it, and spoof an administrative session.

---

## ✨ Features

- **Modern UI/UX:** Built with Tailwind CSS, featuring a responsive, floating app-window design.
- **Dark / Light Mode:** Fully supported theme toggling.
- **Gamified Progression:** Built-in flag verification system (`FLAG{...}`) that saves progress in the browser's Local Storage.
- **Technical Briefings:** Integrated documentation modal providing:
  - Threat Analysis.
  - Strategic Remediation advice.
  - Secure Coding Patterns with syntax highlighting for **Node.js, Python, Java, and PHP**.

---

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/4ybbe/sec-audit-labs.git
   cd sec--labs
   ```
   
2.  Install dependencies and start the server:

    docker-compose up


3.  Open your browser and navigate to:

    http://localhost:3000

⚠️ Disclaimer

Educational Purposes Only. This project is deliberately vulnerable and is
intended only for educational purposes, security awareness training, and local
testing.

  - Do NOT deploy this application on a public-facing server or production
    environment.
  - The creator is not responsible for any misuse of the information or code
    provided in this repository.


