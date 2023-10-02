const User = require('../models/user')
const UserBooks = require('../models/userBooks')
const passport = require('passport')

exports.registerNewUser = (req, res) => {
    if(req.body.password !== req.body.confirmPassword) {
        return res.render('register', {error: 'Password did not match', title: 'Register'})
    }
    User.register({email: req.body.email, name: req.body.name}, req.body.password, (err, user) => {
        if(err) {
            console.log(err)
            return res.render('register', {error: 'Registration failed', title: 'Register'})
        }

        // this i added to create a new document for new registred users
        const newUserBooks = new UserBooks({userId: user._id})
        newUserBooks.save()
        passport.authenticate('local')(req, res, () => {
            res.redirect('/auth/login')
        })
    })
}

    
exports.loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.render('login', {error: info.message, title: 'Login'})
        }
        req.logIn(user, function(err) {
            if (err) { 
                return next(err); 
            }
            return res.redirect('/books')
        })
    })(req, res, next)
}

exports.logout = (req, res, next) => {
    req.logout( err => {
        if (err) return next(err)
    })
    res.redirect('/auth/login');
  }

  exports.resetPassword = async(req, res) => {
    const { email, newPassword, confirmPassword } = req.body

    if(newPassword !== confirmPassword) {
        return res.render('forgotPassword', {error: 'Passwords dont match', title: 'Reset Password'})
    }

    try {
        const user = await User.findOne({email})

        if(!user) {
            return res.render('forgotPassword', {error: 'No account found', title: 'Reset Password'})
        }

         // it didnt wait to set new pass so i add passport setPassword in a promise
         const setPasswordPromise = new Promise((resolve, reject) => {
            user.setPassword(newPassword, function(err) {
                if(err) reject(err)
                resolve()
            })
        })

        await setPasswordPromise;

        await user.save()

        res.render('login', {error: 'Password reset success', title: 'Reset Password'})
    } catch(err) {
        console.log(err)
        res.status(500).send('Server error')
    }
  }


exports.renderLogin = (req, res) => {
    res.render('login', {error: req.query.error, title: 'Login'})
}

exports.renderRegister = (req, res) => {
    res.render('register', {error: req.query.error, title: 'Register'})

}

exports.renderResetPassword = (req, res) => {
    res.render('resetPassword', { error: null, title:'Reset Password' }); // change error null
}