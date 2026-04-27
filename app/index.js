const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const db = new sqlite3.Database(':memory:');

// Configurações base
app.use(express.json());
app.use(express.static('public'));

const REAL_FLAGS = {
    lab1: "FLAG{INVOICE_IDOR_EXPOSURE}",
    lab1b: "FLAG{COOKIE_BASED_PRIV_ESC}", // Nova flag do lab de cookie
    lab2: "FLAG{PROD_DEBUG_LEAK_2024}",
    lab3: "FLAG{USER_ENUMERATION_VULN}",
    lab4: "FLAG{INSECURE_COOKIE_STORAGE}"
};

// Banco de dados em memória
db.serialize(() => {
    db.run("CREATE TABLE users (id INTEGER, username TEXT, role TEXT, password TEXT)");
    db.run("INSERT INTO users VALUES (1, 'alice', 'user', '12345'), (5, 'admin', 'admin', 'complex_pass_999')");
    
    db.run("CREATE TABLE invoices (id INTEGER, user_id INTEGER, amount TEXT, description TEXT)");
    db.run("INSERT INTO invoices VALUES (1001, 1, '$250.00', 'Cloud Services - Nov'), (1005, 5, '$15,000.00', 'Internal Audit - FLAG{INVOICE_IDOR_EXPOSURE}')");
});


// LAB 1: IDOR
app.get('/api/v1/billing/invoice/:id', (req, res) => {
    db.get("SELECT * FROM invoices WHERE id = ?", [req.params.id], (err, row) => {
        if (row) res.json(row);
        else res.status(404).json({ error: "Invoice not found" });
    });
});

// LAB 1B: Cookie Privilege Escalation (NOVO)
app.get('/api/v1/admin/dashboard', (req, res) => {
    const cookieHeader = req.headers.cookie || '';
    
    if (cookieHeader.includes('role=admin')) {
        res.status(200).json({ 
            status: 200, 
            message: "Access Granted: Administrative Privilege Active.", 
            flag: REAL_FLAGS.lab1b 
        });
    } else {
        res.status(403).json({ 
            status: 403, 
            error: "Access Denied: Role 'user' is not authorized to view the admin dashboard.", 
            hint: "The server trusts your local cookie for authorization." 
        });
    }
});

// LAB 2: Misconfig (Vazamento de rotas e dados de debug)
app.get('/api/v1/system/health', (req, res) => {
    res.set('X-Debug-Mode', 'Enabled');
    res.set('X-Server-Path', '/var/www/nodesrv/prod');
    res.set('X-Route-Leaked', '/api/v1/system/debug/vars'); 
    res.json({ status: "UP", database: "Connected" });
});

app.get('/api/v1/system/debug/vars', (req, res) => {
    res.json({
        env: "production",
        debug_token: REAL_FLAGS.lab2,
        maintenance_mode: false
    });
});

// LAB 3: Auth Failures (Enumeração de Usuário)
app.post('/api/v1/auth/login', (req, res) => {
    const { username } = req.body;

    db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
        // Usuário não existe
        if (!user) {
            return res.status(404).json({ 
                status: "error", 
                message: "Account name not found in database." 
            });
        }
        // Usuário existe
        if (username === 'admin') {
            return res.status(401).json({ 
                status: "unauthorized", 
                message: `Password incorrect for administrative account. [System_Trace: ${REAL_FLAGS.lab3}]` 
            });
        }

        res.status(401).json({ 
            status: "unauthorized", 
            message: "Password incorrect for user: " + username 
        });
    });
});

// LAB 4: Crypto Failures (Session Header manipulável)
app.get('/api/v1/user/me', (req, res) => {
    const sessionCookie = req.headers['x-session-data'];
    if (!sessionCookie) return res.json({ role: "guest", permissions: "read-only" });

    try {
        const decoded = Buffer.from(sessionCookie, 'base64').toString();
        if (decoded.includes('role=admin')) {
            res.json({ user: "admin", secret_flag: REAL_FLAGS.lab4 });
        } else {
            res.json({ user: "alice", role: "user", access: "denied_to_admin_vault" });
        }
    } catch(err) {
        res.status(400).json({ error: "Invalid encoding" });
    }
});

app.post('/api/verify-flag', (req, res) => {
    const { flag } = req.body;
    const foundLab = Object.keys(REAL_FLAGS).find(key => REAL_FLAGS[key] === flag);
    
    if (foundLab) {
        res.json({ success: true, lab: foundLab });
    } else {
        res.status(403).json({ success: false });
    }
});

app.listen(3000, () => {
    console.log("AuditLabs Server is running on port 3000");
});