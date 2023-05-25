import { authHeader, handleResponse } from "../_helpers";
import { authenticationService } from "./authentication.service";
export const userService = {
    getAll,
    getById,
    reportData,
    reportSubMenu,
    createUser,
    formData,
    linkedissues,
    createorupdateticket,
    assigntoself,
    closeTicket,
    resumereopen,
    getLinkedIssues
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`http://localhost:4000/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`http://localhost:4000/users/${id}`, requestOptions).then(handleResponse);
}
async function reportData(id){
    const requestOptions = { method: 'GET', headers: authHeader() };
    try{
        return fetch(`http://localhost:4000/users/reportData/${id}`, requestOptions).then(handleResponse);
    } catch(err){
        console.log(err);
    }
}

function reportSubMenu(){
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`http://localhost:4000/users/reportsubmenu`, requestOptions).then(handleResponse);
}

function createUser(name, email, phone, password){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password })
    };
    return fetch(`http://localhost:4000/users/create`, requestOptions).then(handleResponse);
}

function formData(){
    const requestOptions = {method: 'GET', headers: authHeader() };
    return fetch('http://localhost:4000/users/formdata', requestOptions).then(handleResponse);
}

function linkedissues({ id, newlink }) {
    const currentUser = authenticationService.getCurrentUser();

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${currentUser.token}` },
        body: JSON.stringify({ id, newlink }),
    };
    return fetch(`http://localhost:4000/users/linkedissues`, requestOptions).then(handleResponse);
}

async function createorupdateticket(ticketData) {
    const currentUser = authenticationService.getCurrentUser();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${currentUser.token}` },
        body: JSON.stringify(ticketData),
    };
    return fetch('http://localhost:4000/users/createorupdateticket', requestOptions).then(handleResponse);
}

function assigntoself(ticketData) {
    const currentUser = authenticationService.getCurrentUser();

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${currentUser.token}` },
        body: JSON.stringify(ticketData),
    };
    return fetch(`http://localhost:4000/users/assigntoself`, requestOptions).then(handleResponse);
}

function closeTicket(ticketData) {
    const currentUser = authenticationService.getCurrentUser();

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${currentUser.token}` },
        body: JSON.stringify(ticketData),
    };
    return fetch(`http://localhost:4000/users/closeticket`, requestOptions).then(handleResponse);
}

function resumereopen(ticketData){
    const currentUser = authenticationService.getCurrentUser();

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${currentUser.token}` },
        body: JSON.stringify(ticketData),
    };
    return fetch(`http://localhost:4000/users/resumereopen`, requestOptions).then(handleResponse);
}

function getLinkedIssues(ticketData){
    const currentUser = authenticationService.getCurrentUser();

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${currentUser.token}` },
        body: JSON.stringify(ticketData),
    };
    return fetch(`http://localhost:4000/users/getlinkedissues`, requestOptions).then(handleResponse);
}