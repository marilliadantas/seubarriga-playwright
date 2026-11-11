// Funções auxiliares e carga de dados por ambiente
const data = require('../variables/variables-data.json');
const { ENV } = require('./env');

const loadData = () => data[ENV];

const uniqueEmail = (prefix = 'qa') => `${prefix}.${Date.now()}@example.com`;

module.exports = { loadData, uniqueEmail };
