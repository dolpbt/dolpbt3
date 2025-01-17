const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Сервер работает');
});

app.post('/get-ip', (req, res) => {
    const userIp = req.connection.remoteAddress;  // Получаем IP пользователя
    console.log('IP:', userIp);

    // Записываем IP-адрес в файл
    fs.appendFile('ip_addresses.txt', `IP адрес: ${userIp}\n`, (err) => {
        if (err) {
            console.error('Ошибка записи в файл:', err);
            return res.status(500).send({ message: 'Ошибка сервера' });
        }
        res.json({ message: 'Ваш IP адрес записан' });
    });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});