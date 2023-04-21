import React from "react";
import Sidebar from "../commons/Sidebar";
import logo from '../../assets/siddharth.jpg';
import '../commons/user.css';
import MainHome from "../commons/MainHome";
import RaiseARequest from "../commons/RaiseARequest";
import Reports from "../commons/Reports";
import data from '../../assets/Data.json';

export default function UserView(){
  const menudata = [
    {msg: 'Reports', iconclass: "ri-file-chart-line"},
    {msg: 'Queues', iconclass: "ri-dashboard-line"},
    {msg: 'Raise a request', iconclass: "ri-inbox-unarchive-line"},
  ];
  const profiledata = [
    {name: "Pavitran", stat: "Customer", img: logo}
  ];
  const menupopqueue = [
    {msg: 'All issues in progress'},
    {msg: 'Waiting for support'},
    {msg: 'All issues on hold'},
    {msg: 'All resolved issues'},
    {msg: 'View entire queue'},
  ];
  const sampletabledata = data.reduce(function (val, key){
          if(key.personName.trim() === profiledata[0].name){
            val.push(key)
          }
          return val;
        }, []);

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
      e = 'In Progress';
      setMainPageState(e);
    } else if( e === 'Reports' || e === 'Raise a request') {
      setMainPageState2(e);
      setMainPageState('');
    } else {
      setMainPageState(e);
    }
    
    setFilteredIssues(sampletabledata.reduce(function (val, key){
        if(key.stat.trim() === e){
        val.push(key)
        }
        return val;
    }, [])
    );
    
  }
  return (
    <div className="container-new">
      <Sidebar menudata={menudata} profiledata={profiledata} handleClick={handleMainPageState} menupopqueue={menupopqueue}/>
      {mainPageState2 === 'Raise a request' ? <RaiseARequest stat={profiledata[0].stat}/> : mainPageState2 === 'Queues' ? <MainHome tabledata={mainPageState.trim() === 'View entire queue' ? sampletabledata : filteredIssues} title={mainPageState} unFilteredData={sampletabledata} pageState={mainPageState2} stat={profiledata[0].stat} /> : <Reports data={sampletabledata} stat={true} />}
    </div>
  );
}