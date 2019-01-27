const fs = require('fs');

module.exports = {
    addDebtorPage: (req, res) => {
        res.render('add-debtor.ejs', {
            title: "Welcome to Socka | Add a new player"
            ,message: ''
        });
    },
    addDebtor: (req, res) => {


        let message = '';
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let phone = req.body.phone;
        let email = req.body.email;
        let user_name = req.body.username;
        let amount_owed = req.body.amount_owed;
        let amount_borrowed = req.body.amount_borrowed

        let usernameQuery = "SELECT * FROM debtors WHERE user_name = '" + user_name + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Debtor still owes you, just increase his debt';
                res.render('add-debtor.ejs', {
                    message,
                    title: "Welcome to Socka | Add a new player"
                });
            } else {
                        // send the player's details to the database
                        let query = "INSERT INTO debtors (first_name, last_name, phone, email, user_name, amount_owed, amount_borrowed) VALUES ('" +
                            first_name + "', '" + last_name + "', '" + phone + "', '" + email + "', '" + user_name + "', '" + amount_owed + "', '" + amount_borrowed + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
                } 
            });
    },
    editDebtorPage: (req, res) => {
        let debtorId = req.params.id;
        let query = "SELECT * FROM debtors WHERE id = '" + debtorId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-debtor.ejs', {
                title: "Edit Debtor"
                ,debtor: result[0]
                ,message: ''
            });
        });
    },
    editDebtor: (req, res) => {
        let debtorId = req.params.id;
        let amount_owed = req.body.amount_owed;
        let amount_borrowed = req.body.amount_borrowed;


        let query = "UPDATE debtors SET amount_owed = '" + amount_owed + "', `amount_borrowed` = '" + amount_borrowed + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteDebtor: (req, res) => {
        let debtorId = req.params.id;
        let deleteUserQuery = 'DELETE FROM debtors WHERE id = "' + debtorId + '"';


            db.query(deleteUserQuery, (err, result) => {
                 if (err) {
                     return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
    }
};
