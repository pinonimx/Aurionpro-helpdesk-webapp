const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const Role = require('_helpers/role');
require('dotenv').config();
const logo = 'logos/siddharth.jpg'
const nodemailer = require('nodemailer');

// create a MySQL connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'aurionpro',
});

// users hardcoded for simplicity, store in a db for production applications

module.exports = {
    authenticate,
    register,
    reportData,
    reportSubMenu,
    linkedissues,
    getAll,
    getById,
    formData,
    createorupdateticket,
    createticket,
    createIncident,
    assigntoself,
    closeTicket,
    resumereopen,
    getLinkedIssues
};
const globalfrom = "from-example@aurionpro.com";
function emailjs(message) {
    try {

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "4bd798b2a555c1",
                pass: "ff465583422ba3"
            }
        });
        transporter.sendMail(message)
            .then(info => console.log(info))
            .catch(e => console.error(e));
    } catch (e){
        console.error(e);
    }
}
async function authenticate({ username, password }) {
    try{
        const [rows] = await pool.query('select * from users where useremail = ?', [username]);
        if(rows.length === 1){
            const user = rows[0];
            if(await bcrypt.compare(password, user.password)){
                const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET);
                const { password, ...userWithoutPassword } = user;
                return {
                    ...userWithoutPassword,
                    logo,
                    token
                };
            }
        }
    }catch(error){
        console.log(error);
        throw error;
    }
}

async function register({ name, email, phone, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
        useremail: email,
        mobilenum: phone,
        username: name,
        password: hashedPassword,
        role: Role.User
    };
    const query = 'INSERT INTO users SET ?';
    try {
        const connection = await pool.getConnection();
        const [results] = await connection.query(query, userData);
        connection.release();
        const message = {
            from: globalfrom,
            to: [email],
            subject: "Registration Successful",
            text: "Hey ".concat(name, " we recieved your request to register with us\nWe have done the needful.\nHowever, if you are an employee or manager of this organization then please contact your database administrator to give you the required permissions to view the entire application.")
        }
        emailjs(message);
        return results;
    } catch (error) {
        console.log(error);
        throw error;
    }
    
}

async function reportData(id) {
    try {
        const user = await getUsersById(id);
        let data;
        if (user.role === Role.User) {
            const [rows] = await pool.query('Select * from ticketdata where assigneeemail = ? OR mobilenum = ?', [user.useremail, user.mobilenum]);
            data = rows;        
        }
        else {
            const [rows] = await pool.query('SELECT * FROM ticketdata');
            data = rows;
        }
        const totalTickets = Object.keys(data).length;
        const resolved = data.reduce(function (val, key) {
            if (key.status.trim() === 'Resolved') {
                val.push(key)
            }
            return val;
        }, []);
        const closedTickets = Object.keys(resolved).length;
        const open = data.reduce(function (val, key) {
            if (key.status.trim() === 'In Progress' || key.status.trim() === 'Waiting for support') {
                val.push(key)
            }
            return val;
        }, []);
        const openTickets = Object.keys(open).length;
        const resolTime = resolved.map((val, key) => {
            var d1 = new Date(val.created);
            var d2 = new Date(val.closed);
            var diff = d2.getTime() - d1.getTime();
            var daydiff = diff / (1000 * 60 * 60 * 24);
            return parseInt(daydiff.toFixed(0));
        });
        const avgResolTime = resolTime.reduce((a, b) => a + b, 0) / Object.keys(resolved).length;
        var prio = [0, 0, 0];
        for (let key in data) {
            if (data[key].priority === 'Urgent') ++prio[0];
            else if (data[key].priority === 'Important') ++prio[1];
            else ++prio[2];
        }
        const category = {};
        for (const e of data) {
            if (e.status.trim() === 'Waiting for support' || e.status.trim() === 'In Progress') {
                if (e.category.trim() !== '' && category[e.category]) category[e.category] += 1;
                else if (e.category.trim() === '' && category['Undefined']) category['Undefined'] += 1;
                else if (e.category.trim() === '') category['Undefined'] = 1;
                else category[e.category] = 1;
            }
        }
        const avgResolTimePP = {};
        for (const e of resolved) {
            if (e.assigntoemail.trim() !== '' && avgResolTimePP[e.assigntoemail]) avgResolTimePP[e.assigntoemail] += 1;
            else if (e.assigntoemail.trim() === '' && avgResolTimePP['Undefined']) avgResolTimePP['Undefined'] += 1;
            else if (e.assigntoemail.trim() === '') avgResolTimePP['Undefined'] = 1;
            else avgResolTimePP[e.assigntoemail] = 1;
        }
        const cust = {};

        for (const e of data) {
            if (e.status.trim() === 'Resolved') {
                if (e.assigneeemail?.trim()) {
                    if (cust[e.assigneeemail]) cust[e.assigneeemail][1] += 1;
                    else cust[e.assigneeemail] = [0, 1];
                } else if (e.mobilenum?.trim()) {
                    if (cust[e.mobilenum]) cust[e.mobilenum][1] += 1;
                    else cust[e.mobilenum] = [0, 1];
                } else {
                    if (cust['incident']) cust['incident'][1] += 1;
                    else cust['incident'] = [0, 1];
                }
            }
            else {
                if (e.assigneeemail?.trim()) {
                    if (cust[e.assigneeemail]) cust[e.assigneeemail][0] += 1;
                    else cust[e.assigneeemail] = [1, 0];
                } else if (e.mobilenum?.trim()) {
                    if (cust[e.mobilenum]) cust[e.mobilenum][0] += 1;
                    else cust[e.mobilenum] = [1, 0];
                } else {
                    if (cust['incident']) cust['incident'][0] += 1;
                    else cust['incident'] = [1, 0];
                }
            }
        }
        let count = [0, 0, 0];
        for(const e of data){
            if(e.assigneeemail?.trim() && e.mobilenum?.trim()) ++count[2];
            else if(e.assigneeemail?.trim() && !e.mobilenum?.trim()) ++count[0];
            else if(!e.assigneeemail?.trim() && e.mobilenum?.trim()) ++count[1]
        }
        const result = { totalTickets: totalTickets, prio: prio, closedTickets: closedTickets, openTickets: openTickets, category: category, avgResolTime: avgResolTime, avgResolTimePP: avgResolTimePP, cust: cust, count: count };
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function reportSubMenu() {
    try {
        const [rows] = await pool.query('SELECT * FROM ticketdata');

        const report = { 'summary': {} };
        for (const e of rows) {
            if (e.assigneeemail?.trim() || e.mobilenum?.trim()) {
                if (!e.category?.trim()) e.category = 'undefined';
                if (report['summary'][e.state]) report['summary'][e.state][0] += 1;
                else report['summary'][e.state] = [1, 0, 0];
                if (report[e.category]) {
                    if (report[e.category][e.state]) report[e.category][e.state][0] += 1;
                    else report[e.category][e.state] = [1, 0, 0];
                }
                else {
                    report[e.category] = {};
                    report[e.category][e.state] = [1, 0, 0];
                }
                if (e.status === 'Resolved') {
                    report['summary'][e.state][2] += 1;
                    report[e.category][e.state][2] += 1;
                }
                else {
                    report['summary'][e.state][1] += 1;
                    report[e.category][e.state][1] += 1;
                }
            }
        }
        return report;
    } catch(error){
        console.error(error);
        throw error;
    }
}

async function linkedissues({ id, newlink }) {
    try {
        const connection = await pool.getConnection();
        const updateQuery = 'UPDATE ticketdata SET link = ? WHERE id = ?';
        const [result] = await connection.query(updateQuery, [newlink, id]);
        connection.release();
        console.log(`Updated link for ticket with id ${id}`);
        return result;
    } catch (error) {
        console.error('Error updating link:', error);
        throw error;
    }
}

async function getAll() {
    try{
        const [rows] = await pool.query('SELECT * FROM ticketdata order by created desc');
        return rows;
    } catch(error){
        console.error(error);
        throw error;
    }
}

async function getUsersById(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);

        if (rows.length === 1) {
            const user = rows[0];
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }

        return null; // Return null if the user is not found
    } catch (error) {
        // Handle any potential errors
        throw error;
    }
}
async function getById(id){
    try{
        const user = await getUsersById(id);
        let data;
        if (user.role === Role.User) {
            const [rows] = await pool.query('Select * from ticketdata where assigneeemail = ? OR mobilenum = ? order by created desc', [user.useremail, user.mobilenum]);
            data = rows;        
        }
        else {
            const [rows] = await pool.query('SELECT * FROM ticketdata WHERE assigntoemail = ? OR assigntoemail IS NULL OR assigntoemail = "" order by created desc', [user.useremail]);
            data = rows;
        }
        return data;
    }catch(e){
        console.error(e);
        throw e;
    }
}

async function formData(){
    try{
        const [category] = await pool.query('Select * from category');
        const [projecttype] = await pool.query('select * from projecttype');
        const out = category.concat(projecttype);
        return out;
    } catch(e){
        console.error(e);
        throw e;
    }
}

function generateNextTicketId(lastTicketId) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // Extract the first character of the last ticket ID
  const firstChar = lastTicketId.charAt(0);

  // Extract the numeric portion of the last ticket ID
  const numericPart = parseInt(lastTicketId.substring(1));

  let nextNumericPart, nextFirstChar;

  if (numericPart === 99999) {
    // If the numeric part is 99999, incrementing it would exceed the limit
    // Move to the next character and reset the numeric part to 1
    const firstCharIndex = characters.indexOf(firstChar);
    nextFirstChar = characters[firstCharIndex + 1];
    nextNumericPart = 1;
  } else {
    // Increment the numeric part by 1
    nextNumericPart = numericPart + 1;
    nextFirstChar = firstChar;
  }

  // Pad the numeric part with leading zeroes to match the desired format
  const paddedNumericPart = String(nextNumericPart).padStart(5, '0');

  // Combine the first character with the padded numeric part to form the next ticket ID
  const nextTicketId = nextFirstChar + paddedNumericPart;

  return nextTicketId;
}

async function createorupdateticket(ticketData) {
    try {
        const { ticketno, value, summary, name, email, mobNo, district, tehshil, khasraNo, village, assigntoemail, projectNameOption, categoryOption, stateNameOption, bankName, priorityOption, statusOption } = ticketData;
        const assigneeQuery = 'SELECT username FROM users WHERE useremail = ?';
        const [assigneeRows] = await pool.query(assigneeQuery, [assigntoemail]);
        const assignto = assigneeRows[0]?.username || null;

        let ticketId;
        if (ticketno) {
            ticketId = null;
        } else {
            // Generate the next ticketId
            const [lastTicket] = await pool.query('SELECT id FROM ticketdata ORDER BY id DESC LIMIT 1');
            const lastTicketId = lastTicket[0]?.id || 'A00000';
            ticketId = generateNextTicketId(lastTicketId);
        }

        // Insert or update the ticket in the database
        const query = ticketno ? `
        UPDATE ticketdata 
        SET state=?, bankname=?, personname=?, assigneeemail=?, mobilenum=?, title=?, priority=?, category=?, type=?, assignto=?, assigntoemail=?, status=?, description=?, district=?, tehshil=?, khasrano=?, village=?
        WHERE id=?
        ` : `
        INSERT INTO ticketdata (id, state, bankname, personname, assigneeemail, mobilenum, title, priority, category, type, assignto, assigntoemail, status, created, closed, link, description, district, tehshil, khasrano, village)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NULL, NULL, ?, ?, ?, ?, ?)
      `;
    //   console.log('value: ', value);
        const params = [stateNameOption, bankName, name, email, mobNo, summary, priorityOption, categoryOption, projectNameOption, assignto, assigntoemail, statusOption, value, district, tehshil, khasraNo, village];
        if(ticketId?.trim()){
            params.unshift(ticketId);
        }
        else{
            params.push(ticketno);
        }
        
        // console.log('params: ', params);
        // console.log('query: ', query);
        await pool.query(query, params);
        let tid;
        if(ticketId){
            tid = ticketId;
        } else {
            tid = ticketno;
        }
        let strend;
        if(assignto){
            strend = '\nand has been assigned to '.concat(assignto);
        } else {
            strend = '\nWe will shortly assign the issue to someone.\n\nThankyou for your paitence'
        }
        const message = {
            from: globalfrom,
            to: [email, assigntoemail],
            subject: "Ticket with id ".concat(tid, " generation/updation successfull"),
            text: "Hey ".concat(name, " we just wanted to let you know your ticket with id: ", tid, " has been successfully generated/updated\n\nIt's current status is ", statusOption, strend)
        }
        emailjs(message);
        if(ticketId){
            return ticketId; // Return the ticketId after successful creation/update
        } else {
            return ticketno;
        }

    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function createticket(ticketData) {
    try {
        const { value, summary, name, email, mobNo, district, tehshil, khasraNo, village, assigntoemail, projectNameOption, categoryOption, stateNameOption, bankName, priorityOption, statusOption } = ticketData;
        const assigneeQuery = 'SELECT username FROM users WHERE useremail = ?';
        const [assigneeRows] = await pool.query(assigneeQuery, [assigntoemail]);
        const assignto = assigneeRows[0]?.username || null;


        // Generate the next ticketId
        const [lastTicket] = await pool.query('SELECT id FROM ticketdata ORDER BY id DESC LIMIT 1');
        const lastTicketId = lastTicket[0]?.id || 'A00000';
        const ticketId = generateNextTicketId(lastTicketId);

        // Insert the new ticket in the database
        const query = `
        INSERT INTO ticketdata (id, state, bankname, personname, assigneeemail, mobilenum, title, priority, category, type, assignto, assigntoemail, status, created, closed, link, description, district, tehshil, khasrano, village)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NULL, NULL, ?, ?, ?, ?, ?)
      `;
        const params = [ticketId, stateNameOption, bankName, name, email, mobNo, summary, priorityOption, categoryOption, projectNameOption, assignto, assigntoemail, statusOption, value, district, tehshil, khasraNo, village];
        await pool.query(query, params);
        let strend;
        if(assignto){
            strend = '\nand has been assigned to '.concat(assignto);
        } else {
            strend = '\nWe will shortly assign the issue to someone.\n\nThankyou for your paitence'
        }
        const message = {
            from: globalfrom,
            to: [email, assigntoemail],
            subject: "Ticket with id ".concat(ticketId, " generation successfull"),
            text: "Hey ".concat(name, " we just wanted to let you know your ticket with id: ", ticketId, " has been successfully generated\n\nIt's current status is ", statusOption, strend)
        }
        emailjs(message);
        return ticketId; // Return the ticketId after successful creation/update
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function createIncident(ticketData) {
    try {
        const { value, summary, assigntoemail, projectNameOption, categoryOption, priorityOption, statusOption, link, creator } = ticketData;
        const assigneeQuery = 'SELECT username FROM users WHERE useremail = ?';
        const [assigneeRows] = await pool.query(assigneeQuery, [assigntoemail]);
        const assignto = assigneeRows[0]?.username || null;


        // Generate the next ticketId
        const [lastTicket] = await pool.query('SELECT id FROM ticketdata ORDER BY id DESC LIMIT 1');
        const lastTicketId = lastTicket[0]?.id || 'A00000';
        const ticketId = generateNextTicketId(lastTicketId);

        // Insert the new ticket in the database
        const query = `
        INSERT INTO ticketdata (id, title, priority, category, type, assignto, assigntoemail, status, created, closed, link, description)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NULL, ?, ?)
      `;
        const params = [ticketId, summary, priorityOption, categoryOption, projectNameOption, assignto, assigntoemail, statusOption, link, value];
        await pool.query(query, params);
        let strend;
        if(assignto){
            strend = '\nand has been assigned to '.concat(assignto);
        } else {
            strend = '\nhowever it hasn\'t been assigned to anyone yet.'
        }
        const message = {
            from: globalfrom,
            to: [creator, assigntoemail],
            subject: "Major incident with Ticket with id ".concat(ticketId, " generated"),
            text: "A major incident has been created\n\nThe ticket ID of this major incident is: ".concat(ticketId, strend)
        }
        emailjs(message);
        return ticketId; // Return the ticketId after successful creation/update
    } catch (error) {
        console.error(error);
        throw error;
    }
}
async function assigntoself({ticketno, assigntoemail}){
    try{
        const assigneeQuery = 'SELECT username FROM users WHERE useremail = ?';
        const [assigneeRows] = await pool.query(assigneeQuery, [assigntoemail]);
        const assignto = assigneeRows[0]?.username || null;

        const connection = await pool.getConnection();
        const updateQuery = 'UPDATE ticketdata SET assignto=?, assigntoemail=?, status=? WHERE id=?';
        const [result] = await connection.query(updateQuery, [assignto, assigntoemail, 'In Progress', ticketno]);
        connection.release();
        console.log(`Updated assignee for ticket with id ${ticketno}`);
        
        const query = 'SELECT * from ticketdata where id = ?'
        const [rows] = await pool.query(query, [ticketno]);
        console.log(rows);
        const message = {
            from: globalfrom,
            to: [rows[0].assigneeemail, assigntoemail],
            subject: "Ticket with id ".concat(ticketno, " has been assigned to ", assignto),
            text: "Great news!!\n\nYour ticket with ID ".concat(ticketno, ' has been assigned to ', assignto,'\nThey will get in touch with you shortly')
        }
        emailjs(message);
        return rows;
    }
    catch(error){
        console.error('Error assigning the issue to self: ', error);
        throw error;
    }
}
async function closeTicket({ticketno, value}){
    try{
        const connection = await pool.getConnection();
        const query = `UPDATE ticketdata SET closed = NOW(), status=?, closurecomment=? where id=?`;
        const [result] = await connection.query(query, ['Resolved', value, ticketno]);
        connection.release();
        console.log('Closed issue with ticket id: ', ticketno);
        
        const retquery = 'SELECT * from ticketdata where id = ?'
        const [rows] = await pool.query(retquery, [ticketno]);
        const mailto = [rows[0].assigneeemail, rows[0].assigntoemail];
        const message = {
            from: globalfrom,
            to: mailto,
            subject: "Ticket with id ".concat(ticketno, " has been successfully resolved"),
            html: "<p>Great news!!<br><br>Your ticket with ID ".concat(ticketno, ' has been successfully resolved and closed on ', rows[0].closed, "closure comments</p>", value)
        }
        emailjs(message);
        return rows;
    } catch(error){
        console.error('Error closing the ticket: ', error);
        throw error;
    }
}

async function resumereopen({ticketno, status, work}){
    try{
        const connection = await pool.getConnection();
        const query = `UPDATE ticketdata SET closed = NULL, status=? where id=?`;
        const [result] = await connection.query(query, [status, ticketno]);
        connection.release();
        console.log('Resume/reopen issue with ticket id: ', ticketno);
        
        const retquery = 'SELECT * from ticketdata where id = ?'
        const [rows] = await pool.query(retquery, [ticketno]);
        const mailto = [rows[0].assigneeemail, rows[0].assigntoemail];
        const message = {
            from: globalfrom,
            to: mailto,
            subject: "Ticket with id ".concat(ticketno, " has been successfully reopened"),
            text: "Your ticket with ID ".concat(ticketno, ' and title ', rows[0].title, ' has been successfully reopened')
        }
        emailjs(message);
        return rows;
    } catch(error){
        console.error('Error closing the ticket: ', error);
        throw error;
    }
}

async function getLinkedIssues(link) {
    try {
        const query = 'select id, title, personname, assigneeemail, mobilenum, status from ticketdata where id=?';
        newlink = link.split(',');
        let tabledata = [];
        for (const i of newlink) {
            let [rows] = await pool.query(query, [i]);
            if (rows[0]) {
                tabledata.push(rows[0]);
            }
        }
        return tabledata;
    } catch (e) {
        console.error('Error fetching linked issues', e);
        throw e;
    }
}