import React from 'react';
import Sidebar from '../commons/Sidebar';
import logo from '../../assets/siddharth.jpg';
import '../commons/user.css';
import MainHome from '../commons/MainHome';
import RaiseARequest from '../commons/RaiseARequest';
import Reports from '../commons/Reports';
import sampletabledata from '../../assets/Data.json'

export default function ManagerView() {

  const menudata = [
    {msg: 'Reports', iconclass: "ri-file-chart-line"},
    {msg: 'Queues', iconclass: "ri-dashboard-line"},
    {msg: 'Raise a request', iconclass: "ri-inbox-unarchive-line"},
  ];

  const profiledata = [
    {name: "Developer", stat: "Manager", img: logo}
  ];

  const menupopqueue = [
    {msg: 'Waiting for support'},
    {msg: 'All issues in progress'},
    {msg: 'All unassigned issues'},
    {msg: 'Assigned to me'},
    {msg: 'All issues on hold'},
    {msg: 'All resolved issues'},
    {msg: 'View entire queue'},
  ];


  const [filteredIssues, setFilteredIssues] = React.useState(
    sampletabledata.reduce(function (val, key){
      if(key.stat.trim() === 'In Progress'){
        val.push(key)
      }
      return val;
    }, [])
  );
  const [mainPageState, setMainPageState] = React.useState('In Progress');
  const [mainPageState2, setMainPageState2] = React.useState('Reports');
  const handleMainPageState = (e) => {
    if(e === 'Queues'){
      setMainPageState2(e);
      e = 'Waiting for support';
      setMainPageState(e);
    } else if( e === 'Reports' || e === 'Raise a request') {
      setMainPageState2(e);
      setMainPageState('');
    } else {
      setMainPageState(e);
    }
    if(e === 'All unassigned issues'){
      setFilteredIssues(sampletabledata.reduce(function (val, key){
        if(key.assignto.trim() === ''){
          val.push(key)
        }
        return val;
      }, [])
      );
    }
    else if(e === 'Assigned to me'){
      setFilteredIssues(sampletabledata.reduce(function (val, key){
        if(key.assignto.trim() === profiledata[0].name && (key.stat.trim() === 'Waiting for support' || key.stat.trim() === 'In Progress')){
          val.push(key)
        }
        return val;
      }, [])
      );
    }
    else {
      setFilteredIssues(sampletabledata.reduce(function (val, key){
          if(key.stat.trim() === e){
            val.push(key)
          }
          return val;
        }, [])
      );
    }
  }
  return (
    <div className="container-new">
      <Sidebar menudata={menudata} profiledata={profiledata} handleClick={handleMainPageState} menupopqueue={menupopqueue}/>
      {mainPageState2 === 'Raise a request' ? <RaiseARequest /> : mainPageState2 === 'Queues' ? <MainHome tabledata={mainPageState.trim() === 'View entire queue' ? sampletabledata : filteredIssues} title={mainPageState} unFilteredData={sampletabledata} pageState={mainPageState2} /> : <Reports data={sampletabledata} />}
    </div>
  );

}