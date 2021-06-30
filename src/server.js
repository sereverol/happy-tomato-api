const express = require('express');
const connectDB = require('./config/db');
const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/profile', require('./routes/profile'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server initialized on port ${PORT}`));
