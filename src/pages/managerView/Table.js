import React from 'react';


function Table(props) {
  return(
    <div className='table--data'>
      <table cellPadding={7} cellSpacing={0} >
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Priority</th>
            <th>Title</th>
            <th>State</th>
            <th>Bank Name</th>
            <th>Person Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Category</th>
            <th>Type</th>
            <th>Assigned to</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {props.tabledata.map((val, key) => {
            return(
              <tr key={key}>
                <td>{key+1}</td>
                <td>{val.id}</td>
                <td>
                  <ul className='priority'>
                    <li className={val.priority === 'Urgent' ? 'urg' : val.priority === 'Important' ? 'imp' : 'nor'}>
                      <span>{val.priority.trim() === '' ? 'Normal' : val.priority}</span>
                    </li>
                  </ul>
                </td>
                <td><button className='button-48' onClick={() => props.handleClick(key)}><span className='text'>{val.title}</span></button></td>
                <td>{val.state}</td>
                <td>{val.bankName}</td>
                <td>{val.personName}</td>
                <td>{val.mob}</td>
                <td>{val.email}</td>
                <td>{val.category}</td>
                <td>{val.type}</td>
                <td className={val.assignto.trim() === '' ? 'emptyassign' : null}>
                  {val.assignto.trim() === '' ? 'Not Assigned' : val.assignto}
                </td>
                <td>
                  <div className={val.stat.trim() === 'On Hold' ? 'onhold' : val.stat.trim() === 'Resolved' ? 'resol' : 'inprog'}>
                    <p>{val.stat.trim() === 'Resolved' ? <i className="ri-checkbox-circle-line"></i> : val.stat.trim() === 'On Hold' ? <i className="ri-timer-line"></i> : <i className="ri-contrast-fill"></i>} {val.stat}</p>
                  </div>
                  
                </td>
                <td>{val.created}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}
export default Table;