const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');

// routes
router.post('/authenticate', authenticate);     // public route
router.post('/create', register);
router.get('/formdata', authorize([Role.User, Role.Employee, Role.Manager]), formData);
router.get('/reportData/:id', authorize([Role.User, Role.Employee, Role.Manager]), reportData);
router.get('/reportsubmenu', authorize([Role.Employee, Role.Manager]), reportSubMenu);
router.post('/linkedissues', authorize([Role.Manager]), linkedissues);
router.post('/createorupdateticket', authorize([Role.User, Role.Employee, Role.Manager]), createorupdateticket);
router.post('/assigntoself', authorize([Role.User, Role.Employee, Role.Manager]), assigntoself);
router.post('/closeticket', authorize([Role.User, Role.Employee, Role.Manager]), closeTicket)
router.post('/resumereopen', authorize([Role.Manager]), resumereopen)
router.post('/getlinkedissues', authorize([Role.Employee, Role.Manager]), getLinkedIssues)
router.get('/', authorize([Role.Manager]), getAll); // admin only
router.get('/:id', authorize([Role.User, Role.Employee]), getById);       // all authenticated users
module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.register(req.body)
        .then(() => res.json({message: 'User registration successful'}))
        .catch(err => next(err));
}

function reportData(req, res, next){
    userService.reportData(req.params.id)
        .then(users => users ? res.json(users) : res.sendStatus(404))
        .catch(err => next(err))
}

function reportSubMenu(req, res, next){
    userService.reportSubMenu()
        .then(users => users ? res.json(users) : res.sendStatus(404))
        .catch(err => next(err))
}

function linkedissues(req, res, next){
    userService.linkedissues(req.body)
        .then(() => res.json({message: 'Linked issues updated successfully'}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}
function formData(req, res, next){
    userService.formData()
        .then(users => users ? res.json(users) : res.sendStatus(404))
        .catch(err => next(err));
}

function createorupdateticket(req, res, next) {
    const currentUser = req.user;
    if (!req.body.link?.trim()) {
        if (currentUser.role === Role.Manager) {
            userService.createorupdateticket(req.body)
                .then(ticketId => res.json({ message: 'Ticket created/updated successfully', ticketId }))
                .catch(err => next(err));
        }
        else if (currentUser.role === Role.Employee || currentUser.role === Role.User) {
            userService.createticket(req.body)
                .then(ticketId => res.json({ message: 'Ticket created successfully', ticketId }))
                .catch(err => next(err));
        }
        else{
            return res.status(401).json({ message: 'Unauthorized'})
        }
    } else if(currentUser.role !== Role.User) {
        userService.createIncident(req.body)
                .then(ticketId => res.json({ message: 'Incident created successfully', ticketId }))
                .catch(err => next(err));
    }
    else {
        return res.status(401).json({ message: 'Unauthorized' })
    }
}

function assigntoself(req, res, next){
    userService.assigntoself(req.body)
        .then(ticketdata => ticketdata ? res.json(ticketdata) : res.sendStatus(404))
        .catch(e => next(e));
}

function closeTicket(req, res, next){
    userService.closeTicket(req.body)
        .then(ticketdata => ticketdata ? res.json(ticketdata) : res.sendStatus(404))
        .catch(e => next(e));
}

function resumereopen(req, res, next){
    userService.resumereopen(req.body)
        .then(ticketdata => ticketdata ? res.json(ticketdata) : res.sendStatus(404))
        .catch(e => next(e));
}

function getLinkedIssues(req, res, next) {
    userService.getLinkedIssues(req.body.link)
        .then(ticketdata => ticketdata ? res.json(ticketdata) : res.sendStatus(404))
        .catch(e => next(e));
}