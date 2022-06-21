import sendRequest from './send-request';

const BASE_URL = '/api/events';

export function getEvents() {
    return sendRequest(`${BASE_URL}`)
}

export function createEvent(formData) {
    return sendRequest(`${BASE_URL}/new`, 'POST', {formData});
}

export function attendEvent(eventId, type) {
    return sendRequest(`${BASE_URL}/${eventId}/attend`, 'POST', {type})
}

export function deleteEvent(eventId, type) {
    return sendRequest(`${BASE_URL}/${eventId}`, 'DELETE', {type})
}

export function addComment(eventId, commentData, type) {
    return sendRequest(`${BASE_URL}/${eventId}/comment`, 'POST', {commentData, type});
}