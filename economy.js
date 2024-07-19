const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'economy.json');

// Read JSON data from file
const readData = () => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify({}));
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

// Write JSON data to file
const writeData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

// Get balance
const getBalance = (userId, callback) => {
    const data = readData();
    const balance = data[userId] || 0;
    callback(null, balance);
};

// Set balance
const setBalance = (userId, amount, callback) => {
    const data = readData();
    data[userId] = amount;
    writeData(data);
    callback(null);
};

// Add balance
const addBalance = (userId, amount, callback) => {
    getBalance(userId, (err, balance) => {
        if (err) {
            callback(err);
        } else {
            setBalance(userId, balance + amount, callback);
        }
    });
};

// Transfer balance
const transferBalance = (fromId, toId, amount, callback) => {
    getBalance(fromId, (err, fromBalance) => {
        if (err) {
            callback(err);
        } else if (fromBalance < amount) {
            callback(new Error('Insufficient funds'));
        } else {
            addBalance(fromId, -amount, (err) => {
                if (err) {
                    callback(err);
                } else {
                    addBalance(toId, amount, callback);
                }
            });
        }
    });
};

// Gamble
const gamble = (userId, amount, callback) => {
    getBalance(userId, (err, balance) => {
        if (err) {
            callback(err);
        } else if (balance < amount) {
            callback(new Error('Insufficient funds'));
        } else {
            const win = Math.random() < 0.5; // 50% chance to win
            const winAmount = amount * 2; // Win twice the amount
            if (win) {
                addBalance(userId, winAmount, (err) => {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, `You won ${winAmount} coins!`);
                    }
                });
            } else {
                addBalance(userId, -amount, (err) => {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, `You lost ${amount} coins.`);
                    }
                });
            }
        }
    });
};

module.exports = {
    getBalance,
    setBalance,
    addBalance,
    transferBalance,
    gamble,
};
