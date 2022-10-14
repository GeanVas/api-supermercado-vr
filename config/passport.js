const LocalStrategy = require('passport-local').Strategy;

const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const dbconfig = require('./database');
const conn = mysql.createConnection(dbconfig.connection);

conn.query('USE ' + dbconfig.database);

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        conn.query('SELECT * FROM cuentas WHERE id = ? ',[id], (err, rows) => {
            done(err, rows[0]);
        });
    });

    passport.use(
        'local-singup',
        new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        (req, username, password, done) => {
            conn.query('SELECT * FROM cuentas WHERE username = ?',
            [username], (err, rows) => {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, 
                        req.flash('signupMessage', 'Usuario ya esta en uso'));
                } else {
                    const newUser = {
                        username: username,
                        passport: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
                    };

                    const insertQuery = 'INSERT INTO cuentas (username, password) VALUES (?,?)';

                    conn.query(insertQuery,[newUser.username, newUser.password], (err, rows) => {
                        newUser.id = rows.insertId;

                        return done(null, newUser);
                    });
                }
            });
        })
    );

    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        (req, username, password, done) => {
            conn.query('SELECT * FROM cuentas WHERE username = ?',
            [username], (err, rows) => {
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'Usuario o contraseña equivocados'));
                }

                if (!bcrypt.compareSync(password, rows[0].password))
                    return done(null, false, req.flash('loginMessage', 'Usuario o contraseña equivocados'))

                return done(null, rows[0]);
            });
        })
    );
}