import React from "react";
import Sidebar from "../commons/Sidebar";
import '../commons/user.css';
import MainHome from "../commons/MainHome";
import RaiseARequest from "../commons/RaiseARequest";
import Reports from "../commons/Reports";
import { authenticationService } from "../../_services/authentication.service";
import { userService } from '../../_services/user.service';

export default function UserView( props ){
  const menudata = [
    {msg: 'Reports & Dashboard', iconclass: "ri-file-chart-line"},
    {msg: 'Queues', iconclass: "ri-dashboard-line"},
    {msg: 'Raise a request', iconclass: "ri-inbox-unarchive-line"},
  ];
  const profiledata = authenticationService.getCurrentUser();
  const menupopqueue = [
    {msg: 'All issues in progress'},
    {msg: 'Waiting for support'},
    {msg: 'All issues on hold'},
    {msg: 'All resolved issues'},
    {msg: 'View entire queue'},
  ];

  const [filteredIssues, setFilteredIssues] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [mainPageState, setMainPageState] = React.useState('In Progress');
  const [mainPageState2, setMainPageState2] = React.useState('Reports & Dashboard');
  const handleMainPageState = (e) => {
    userService.getById(profiledata.id)
      .then(data => {
        setData(data);
        if(e === 'Queues'){
          setMainPageState2(e);
      e = 'In Progress';
      setMainPageState(e);
    } else if( e === 'Reports & Dashboard' || e === 'Raise a request') {
      setMainPageState2(e);
      setMainPageState('');
    } else {
      setMainPageState(e);
      setMainPageState2('Queues');
    }
    
    setFilteredIssues(data.reduce(function (val, key){
      if(key.status.trim() === e){
        val.push(key)
      }
      return val;
    }, [])
    );
  })
  .catch(e => {
    alert('Error fetching the ticket database: ', e);
  });
    
  }

  React.useEffect(() => {
    userService.getById(profiledata.id).then(data => {
      setData(data);
      setFilteredIssues(data.reduce(function (val, key) {
        if (key.status.trim() === 'In Progress') {
          val.push(key)
        }
        return val;
      }, []));
    })
  }, []);
  if(!data){
    return <div>Loading...</div>;
  }

  return (
    <div className="container-new">
      <Sidebar menudata={menudata} profiledata={profiledata} handleClick={handleMainPageState} menupopqueue={menupopqueue} logout={props.logout} />
      {mainPageState2 === 'Raise a request' ? <RaiseARequest data={setData} stat={profiledata.role} handleClick={handleMainPageState}/> : mainPageState2 === 'Queues' ? <MainHome data={setData} filteredData={setFilteredIssues} tabledata={mainPageState.trim() === 'View entire queue' ? data : filteredIssues} title={mainPageState} unFilteredData={data} pageState={mainPageState2} stat={profiledata.role} /> : <Reports data={data} stat={profiledata.status} />}
    </div>
  );
}