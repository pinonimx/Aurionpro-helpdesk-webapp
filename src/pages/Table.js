import React from 'react';


function Table(props) {
  return(
    <div className='table--data'>
      <table cellPadding={7} cellSpacing={0} >
        <tr>
          <th></th>
          <th>Title</th>
          <th>Priority</th>
          <th>Category</th>
          <th>Type</th>
          <th>Assigned to</th>
          <th>Status</th>
          <th>Created</th>
        </tr>
        {props.tabledata.map((val, key) => {
          return(
            <tr key={key}>
              <td>{key+1}</td>
              <td>{val.title}</td>
              <td>
                <ul className='priority'>
                  <li className={val.priority === 'Urgent' ? 'urg' : val.priority === 'Important' ? 'imp' : 'nor'}>
                    <span>{val.priority}</span>
                  </li>
                </ul>
              </td>
              <td>{val.category}</td>
              <td>{val.type}</td>
              <td className={val.assignto.trim() === '' ? 'emptyassign' : null}>
                {val.assignto.trim() === '' ? 'Not Assigned' : val.assignto}
              </td>
              <td>{val.stat}</td>
              <td>{val.created}</td>
            </tr>
          )
        })}
      </table>
    </div>
  );
}
export default Table;