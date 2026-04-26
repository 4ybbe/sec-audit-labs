const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const db = new sqlite3.Database(':memory:');

app.use(express.json());
app.use(express.static('public'));

const REAL_FLAGS = {
    lab1: "FLAG{INVOICE_IDOR_EXPOSURE}",
    lab2: "FLAG{PROD_DEBUG_LEAK_2024}",
    lab3: "FLAG{USER_ENUMERATION_VULN}",
    lab4: "FLAG{INSECURE_COOKIE_STORAGE}"
};

db.serialize(() => {
    db.run("CREATE TABLE users (id INTEGER, username TEXT, role TEXT, password TEXT)");
    db.run("INSERT INTO users VALUES (1, 'alice', 'user', '12345'), (5, 'admin', 'admin', 'complex_pass_999')");
    
    db.run("CREATE TABLE invoices (id INTEGER, user_id INTEGER, amount TEXT, description TEXT)");
    db.run("INSERT INTO invoices VALUES (1001, 1, '$250.00', 'Cloud Services - Nov'), (1005, 5, '$15,000.00', 'Internal Audit - FLAG{INVOICE_IDOR_EXPOSURE}')");
});

// LAB 1: IDOR (Realista: API de faturamento)
app.get('/api/v1/billing/invoice/:id', (req, res) => {
    db.get("SELECT * FROM invoices WHERE id = ?", [req.params.id], (err, row) => {
        if (row) res.json(row);
        else res.status(404).json({ error: "Invoice not found" });
    });
});

// LAB 2: Misconfig (Realista: Header de Debug e rota Actuator)
app.get('/api/v1/system/health', (req, res) => {
    res.set('X-Debug-Mode', 'Enabled');
    res.set('X-Server-Path', '/var/www/nodesrv/prod');
    res.json({ status: "UP", database: "Connected" });
});

app.get('/api/v1/system/debug/vars', (req, res) => {
    res.json({
        env: "production",
        debug_token: REAL_FLAGS.lab2,
        maintenance_mode: false
    });
});

// LAB 3: Auth Failures (Realista: Mensagens de erro diferentes)
app.post('/api/v1/auth/login', (req, res) => {
    const { username } = req.body;

    db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
        // 1. Usuário não existe (Erro Genérico)
        if (!user) {
            return res.status(404).json({ 
                status: "error", 
                message: "Account name not found in database." 
            });
        }

        // 2. Usuário existe (A falha de enumeração)
        // Se for o admin, retornamos a flag como parte dos metadados de debug do erro
        if (username === 'admin') {
            return res.status(401).json({ 
                status: "unauthorized", 
                message: `Password incorrect for administrative account. [System_Trace: ${REAL_FLAGS.lab3}]` 
            });
        }

        // Para outros usuários válidos (ex: alice), retorna erro comum
        res.status(401).json({ 
            status: "unauthorized", 
            message: "Password incorrect for user: " + username 
        });
    });
});

// LAB 4: Crypto Failures (Realista: Cookie de Sessão Manipulável)
app.get('/api/v1/user/me', (req, res) => {
    // Simulando leitura de um Cookie (role=user encoded em base64)
    const sessionCookie = req.headers['x-session-data'];
    if (!sessionCookie) return res.json({ role: "guest", permissions: "read-only" });

    const decoded = Buffer.from(sessionCookie, 'base64').toString();
    if (decoded.includes('role=admin')) {
        res.json({ user: "admin", secret_flag: REAL_FLAGS.lab4 });
    } else {
        res.json({ user: "alice", role: "user", access: "denied_to_admin_vault" });
    }
});

// Flag Verification
app.post('/api/verify-flag', (req, res) => {
    const { flag } = req.body;
    const foundLab = Object.keys(REAL_FLAGS).find(key => REAL_FLAGS[key] === flag);
    if (foundLab) res.json({ success: true, lab: foundLab });
    else res.status(403).json({ success: false });
});

app.listen(3000);