const dayjs = require('dayjs');

function getDataHoraAtual() {
  return dayjs().format('YYYY-MM-DD HH:mm:ss');
}

module.exports = getDataHoraAtual;