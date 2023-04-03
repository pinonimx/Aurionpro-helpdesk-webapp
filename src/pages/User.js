import React from 'react';
import Sidebar from './Sidebar';
import Table from './Table';
import logo from './logo.svg'
import './user.css';

function MainHome(props){
  return(
    <div className='main--home'>
      <Table tabledata={props.tabledata} />
    </div>
  );
}

function User() {

  const menudata = [
    {msg: 'Queues', iconclass: "ri-dashboard-line"},
    {msg: 'Customers', iconclass: "ri-team-fill"},
    {msg: 'Reports', iconclass: "ri-file-chart-line"},
    {msg: 'Raise a request', iconclass: "ri-inbox-unarchive-line"},
  ];

  const profiledata = [
    {name: "Siddharth Kumar Jha", stat: "Employee"}
  ];
  
  const tabledata = [
    {title: "Products are not working, pls help", priority: "Urgent", category: "Product", type: "Bug", assignto: "Peeves", stat: "In Progress", created: "23/Jul/23"},
    {title: "Users cannot login their account", priority: "Urgent", category: "system", type: "Bug", assignto: "", stat: "In Progress", created: "23/Jul/23"},
    {title: "Campaign emails are not receiving the users", priority: "Important", category: "Emails", type: "Bug", assignto: "House-elves teams", stat: "In Progress", created: "23/Jul/23"},
    {title: "Some Ideas to improve the new product", priority: "Nice to do", category: "Product", type: "Feedback", assignto: "Siddharth Kumar Jha (me)", stat: "In Progress", created: "22/Jul/23"},
  ];

  return (
    <div className="container-new">
      <Sidebar menudata={menudata} profiledata={profiledata} img={logo}/>
      <MainHome tabledata={tabledata}/>
    </div>
  );

}

export default User;
