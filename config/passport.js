const passport = require('passport');
const LocalStrategy = require('passport-local');
const { PrismaClient } = require('@prisma/client');
const cookieSession = require('cookie-session');
const secret = 'secret';

const User = require('../models/user');
const prisma = new PrismaClient();


module.exports = function (app) {
    passport.serializeUser(function(user, done) {
        // console.info('serializeUser');
        done(null, user.id);
    })
    passport.deserializeUser(async function (id, done) {
        // console.info('deserializeUser');
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });
    passport.use(new LocalStrategy({
        usernameField: 'name',
        passwordField: 'email',
    }, async function (username, password, done){
        const user = await prisma.user.findUnique({
            where: {
                email: password
            },
        });
        if (!user) {
            return done(null, false, { message: 'Invalid User'});
        } else {
            return done(null, user);
        }
    }
    ));

    app.use(cookieSession({
        name: 'session',
        keys: [secret],

        maxAge: 24 * 60 * 60 * 1000,
    })
    );

    app.use(passport.initialize());
    app.use(passport.session());
};