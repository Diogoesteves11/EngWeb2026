const pug = require('pug');

function renderPug(fileName, data) {
    return pug.renderFile(`../views/${fileName}.pug`, data);
}

exports.emdListPage = (emdlist, d) => renderPug('index', { list: emdlist, date: d });
exports.emdPage = (emd,d) => renderPug('emd', {emd:emd, date: d});
exports.emdRegisterPage = (d) => renderPug('emdRegisterForm', {date: d});
exports.emdEditPage = (emd, d) => renderPug('emdEditForm', {emd: emd, date: d});
exports.emdStatPage = (stats, d) => renderPug('statPage', { stats: stats , date: d});
exports.errorPage = (msg, d) => renderPug('error', { message: msg, date: d });
