import React from 'react';
import nothingtosee from '../../assets/2903540.webp';
import './user.css';

function Nothing(){
  return(
    <div className='table--data table--nothinghere'>
      <img src={nothingtosee} alt='nothing to see here' />
      <p>Nothing to see here...</p>
    </div>
  );
}
function Table(props) {
const  padTo2Digits = function (num) {
  return num.toString().padStart(2, '0');
}

 const formatDate = function (date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}
  if(props.tabledata[0]){
  return(
    <div className='table--data'>
      <table cellPadding={7} cellSpacing={0} >
        <thead>
          <tr>
            <th></th>
            <th>Ticket No.</th>
            <th>Project Name</th>
            <th>State</th>
            <th>Mob No./Email</th>
            <th>Bank Name</th>
            <th>Title</th>
            <th>Status</th>
            <th>Date/Time</th>
          </tr>
        </thead>
        <tbody>
          {props.tabledata.map((val, key) => {
            const date = new Date(val.created);
            return(
              <tr key={key}>
                <td>{key+1}</td>
                <td>{val.id}</td>
                <td>{val.type}</td>
                <td>{val.state}</td>
                <td>{val.mobilenum ? val.mobilenum : ''}<br />{val.assigneeemail ? val.assigneeemail : ''}</td>
                <td>{val.bankname}</td>
                <td><button className='button-48' onClick={() => props.handleClick(key)}><span className='text'>{val.title}</span></button></td>
                <td>
                  <div className={val.status.trim() === 'Waiting for support' ? 'waiting' : val.status.trim() === 'On Hold' ? 'onhold' : val.status.trim() === 'Resolved' ? 'resol' : 'inprog'}>
                    <p>{val.status.trim() === 'Waiting for support' ? <i className="ri-hourglass-2-fill"></i> : val.status.trim() === 'Resolved' ? <i className="ri-checkbox-circle-line"></i> : val.status.trim() === 'On Hold' ? <i className="ri-timer-line"></i> : <i className="ri-contrast-fill"></i>} {val.status}</p>
                  </div>
                  
                </td>
                <td>{formatDate(date)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
  } else {
    return(<Nothing />);
  }
}
export default Table;