import React from 'react';
import Sidebar from './Sidebar';
import logo from '../../assets/siddharth.jpg';
import './user.css';
import MainHome from './MainHome';

function User() {

  const menudata = [
    {msg: 'Queues', iconclass: "ri-dashboard-line"},
    {msg: 'Customers', iconclass: "ri-team-fill"},
    {msg: 'Reports', iconclass: "ri-file-chart-line"},
    {msg: 'Raise a request', iconclass: "ri-inbox-unarchive-line"},
  ];

  const profiledata = [
    {name: "Siddharth Kumar Jha", stat: "Employee", img: logo}
  ];

  const sampletabledata = [
    {id: "A00040", state: "Madhya Pradesh", bankName: "Dhanlakshmi bank", personName: "Pavitran", mob: "XXXXXX8867", email: "abc@XXX.com", title: "Error in Postman 404 not found", priority: "Urgent", category: "", type: "KCC-ISS", assignto: "Deepak", stat: "Resolved", created: "16/01/2023 00:00:00", link: [], description: ''},
    {id: "A00041", state: "Madhya Pradesh", bankName: "Dhanlakshmi bank", personName: "Pavitran", mob: "XXXXXX8867", email: "abc@XXX.com", title: "Payload error in Postman", priority: "Important", category: "", type: "KCC-ISS", assignto: "Ashish", stat: "Resolved", created: "17/01/2023 00:00:00", link: [], description: ''},
    {id: "A00042", state: "Chattisgarh", bankName: "Kerala Gramin Bank", personName: "Binu J Raj", mob: "XXXXXX9231", email: "abc@XXX.com", title: "Batch stuck in processing Batch ID- XXXXXXXXX00959", priority: "Important", category: "", type: "KCC-ISS", assignto: "Developer", stat: "Resolved", created: "17/01/2023 00:00:00", link: [], description: ''},
    {id: "A00043", state: "Kerala", bankName: "Dhanlakshmi bank", personName: "Pavitran", mob: "XXXXXX8867", email: "abc@XXX.com", title: "Deleted one application on portal using deletebyrecipientuniqueid API but still reflecting in batch status", priority: "Urgent", category: "", type: "KCC-ISS", assignto: "Ashish", stat: "Resolved", created: "20/01/2023 00:00:00", link: [], description: ''},
    {id: "A00044", state: "Karnatka", bankName: "Dhanlakshmi bank", personName: "Pavitran", mob: "XXXXXX8867", email: "abc@XXX.com", title: "total success cases are 627 sir for us, but dashboard shows only 471 for 21-22 HQ admin - XXXXXX1170", priority: "Normal", category: "", type: "KCC-ISS",  assignto: "Developer", stat: "In Progress", created: "20/01/2023 00:00:00", link: ["A00040", "A00041", "A00042", "A00043"], description: ''},
    {id: "A00046", state: "Rajasthan", bankName: "State Bank of India", personName: "Alok Kumar", mob: "XXXXXX9231", email: "abc@XXX.com", title: "If state has any objection in the data, State should be provided the option of revert/ reject instead of editing to gear up", priority: "", category: "Requirment from State", type: "PMFBY", assignto: "", stat: "In Progress", created: "02/11/22 11:20", link: [], description: ''},
    {id: "D00084", state: "Maharashtra", bankName: "State Bank of India", personName: "Alok Kumar", mob: "XXXXXX9231", email: "abc@XXX.com", title: "Insert proposal of  2 new villages & 1 Gram panchayat.", priority: "", category: "Master upload related cases", type: "PMFBY", assignto: "", stat: "In Progress", created: "14/11/22 17:58", link: [], description: ''},
    {id: "D00088", state: "Maharashtra", bankName: "State Bank of India", personName: "Alok Kumar", mob: "XXXXXX8867", email: "abc@XXX.com", title: "Some villages have duplicate names in the same village hierarchy, but out of that one hierarchy is correct and in another hierarchy the village name is incorrect", priority: "", category: "Master upload related cases", type: "PMFBY", assignto: "", stat: "In Progress", created: "29/11/22 14:16", link: [], description: ''},
    {id: "D00094", state: "Madhya Pradesh", bankName: "State Bank of India", personName: "Alok Kumar", mob: "XXXXXX8867", email: "abc@XXX.com", title: "Kindly refer attachment which need to be updated in village master for Rabi 2022-23 season.", priority: "", category: "Master upload related cases", assignto: "", stat: "In Progress", created: "01/12/22 16:24", link: [], description: ''},
    {id: "G00012", state: "Tamil Nadu", bankName: "Dhanklaskhmi Bank", personName: "Pavitran", mob: "XXXXXX8867", email: "abc@XXX.com", title: "In Thanjavur 1 and Thiruvarur 1 district -Enrolment report not able to download from the pmfby portal by using the district login I'd.The login ID are below mentioned two districts.", priority: "", category: "Technical issue", type: "PMFBY", assignto: "", stat: "In Progress", created: "09/12/22 11:27", link: [], description: 'Lorem ipsum dolor sit amet,  tortor non mattis. Etiam non imperdiet risus. Nunc imperdiet, ante in pulvinar feugiat, tortor magna facilisis sem, ut imperdiet purus sapien in orci.\n Aenean cursus imperdiet nulla. Ut eget molestie metus. Nullam malesuada tellus eu fermentum posuere. Cras tempus magna vel lacinia posuere. Donec at fringilla magna. Fusce dapibus sem id lorem semper tristique. Suspendisse laoreet porta auctor. Curabitur lacinia ex purus, non venenatis nunc gravida sed. In at mollis nisi, vel finibus orci.'},
    {id: "D00099", state: "Madhya Pradesh", bankName: "Dhanlakshmi Bank", personName: "Pavitran", mob: "XXXXXX9231", email: "abc@XXX.com", title: "Need to update Master location", priority: "", category: "Master upload related cases", type: "PMFBY", assignto: "", stat: "In Progress", created: "15/12/22 15:56", link: [], description: ''},
    {id: "D00090", state: "Assam", bankName: "State Bank of India", personName: "Alok Kumar", mob: "XXXXXX9231", email: "abc@XXX.com", title: "User getting issue “Please add at least one weighting image” while saving part 2 form, after filling the data in fertilizer/ irrigation details", priority: "Normal", category: "CCE app issue", type: "CCE", assignto: "Developer", stat: "On Hold", created: "29/11/2022 17:42:00", link: [], description: ''},
  ];

  const [filteredIssues, setFilteredIssues] = React.useState([]);
  const [mainPageState, setMainPageState] = React.useState('View all');
  const [mainPageState2, setMainPageState2] = React.useState('Queues');
  const handleMainPageState = (e) => {
  if(e === 'Queues' || e === 'Customers' || e === 'Reports' || e === 'Raise a request'){
    setMainPageState2(e);
  } else {
    setMainPageState(e);
  }
  if(e === 'In Progress' || e === 'Resolved' || e === 'On Hold'){
    setFilteredIssues(sampletabledata.reduce(function (val, key){
        if(key.stat.trim() === e){
          val.push(key)
        }
        return val;
      }, [])
    );
  }
  else if(e === 'NA'){
    setFilteredIssues(sampletabledata.reduce(function (val, key){
        if(key.assignto.trim() === ''){
          val.push(key)
        }
        return val;
      }, [])
    );
  }
  }
  return (
    <div className="container-new">
      <Sidebar menudata={menudata} profiledata={profiledata} handleClick={handleMainPageState}/>
      <MainHome tabledata={mainPageState.trim() === 'View all' ? sampletabledata : filteredIssues} title={mainPageState} unFilteredData={sampletabledata} pageState={mainPageState2}/>
    </div>
  );

}

export default User;
