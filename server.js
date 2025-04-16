const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(bodyParser.json());

const JWT_SECRET = 'your_jwt_secret_key';

const users = [
    {
        id: 1,
        username: 'user1',
        password: bcrypt.hashSync('pass123', 8),
    }
];

const companies = [
    { id: 1, name: 'TechCorp', matchScore: 86, status: 'Target' },
    { id: 2, name: 'DataSystems', matchScore: 72, status: 'Not Target' },
    { id: 3, name: 'CloudNine', matchScore: 95, status: 'Target' },
    { id: 4, name: 'ByteSolutions', matchScore: 64, status: 'Not Target' },
    { id: 5, name: 'Innovatech', matchScore: 88, status: 'Target' },
];

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.sendStatus(401);
    
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    
    res.json({
        message: 'Login successful',
        token: token
    });
});

app.get('/accounts', authenticateToken, (req, res) => {
    res.json(companies.map(company => ({
        id: company.id,
        name: company.name,
        matchScore: company.matchScore,
        status: company.status
    })));
});

app.post('/accounts/:id/status', authenticateToken, (req, res) => {
    const companyId = parseInt(req.params.id);
    const { status } = req.body;
    
    if (!['Target', 'Not Target'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }
    
    const companyIndex = companies.findIndex(c => c.id === companyId);
    if (companyIndex === -1) {
        return res.status(404).json({ message: 'Company not found' });
    }
    
    companies[companyIndex].status = status;
    
    res.json({
        message: 'Status updated successfully',
        company: {
            id: companies[companyIndex].id,
            name: companies[companyIndex].name,
            matchScore: companies[companyIndex].matchScore,
            status: companies[companyIndex].status
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});