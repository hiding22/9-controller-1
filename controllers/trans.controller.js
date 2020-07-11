var db = require('../db');
const shortid = require('shortid');

module.exports.index = (req, res) => {
	res.render('trans/index', {
		transactions: db.get('transactions').value()
	});
};

module.exports.delete = (req, res) => {
	var id = req.params.id;

	var trans = db.get('transactions').find({ id: id }).value();

	db.get('transactions')
	.remove({ id: trans.id })
	.write();
	res.redirect('/transactions');
};

module.exports.create = (req, res) => {
	res.render('trans/create', {
		users: db.get('users').value(),
		books: db.get('books').value()
	});
};

module.exports.postCreate = (req, res) => {
	req.body.id = shortid.generate();
	db.get('transactions').push(req.body).write();
	res.redirect('/transactions');
};