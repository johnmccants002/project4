const express = require('express');
const router = express.Router();
const eventsCtrl = require('../../controllers/api/events');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/', eventsCtrl.getEvents)
router.get('/:eventId/comments', eventsCtrl.getComments);
router.post('/new', eventsCtrl.createEvent);
router.post('/:eventId/attend', eventsCtrl.attendEvent);
router.post('/:eventId/comment', eventsCtrl.addComment);
router.delete('/:eventId', eventsCtrl.deleteEvent);

module.exports = router;