import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Table from './Table';
import DetailView from './DetailView';
import { Linked } from './DetailView';
import { DataEntryForm } from './RaiseARequest';
import { userService } from '../../_services/user.service';
import { authenticationService } from '../../_services/authentication.service';
import { Role } from '../../_helpers';

function ClosureComment(props){
  const [value, setValue] = React.useState("");
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ],
  };
  const _onSubmit = (e) => {
    e.preventDefault();
    props.callcloseticket(value);
    props.close();
  }
  return(
    <form className='drop--down--table spcl-height' onSubmit={e => _onSubmit(e)} >
          <div className='card'>
            <div className='card--top--bar'>
              <h3>Closure Comments (if any)</h3>
            </div>
            <ReactQuill modules={modules} onChange={setValue} theme='snow' placeholder='Write your closure comment if any...' />
            <div className='dataentry--footer'>
              <button className="button-26" type='submit' >Close this issue</button>
              <button className="button-6" type='button' onClick={() => props.close()}>Cancel</button>
            </div>
          </div>
    </form>
  );
}

function ListOfIssues(props){
  const [searchData, setSearchData] = React.useState(null);
  const [searchBasis, setSearchBasis] = React.useState('Ticket');
  const searchItem = (query) => {
    if (!query) {
      setSearchData(null);
      return;
    }
    query = query.toUpperCase();

    const finalResult = [];
    props.unFilteredData.forEach((item) => {
      if (searchBasis === 'Ticket' && item.id.toUpperCase().indexOf(query) !== -1) {
        finalResult.push(item);
      }
      else if(searchBasis === 'State' && item.state.toUpperCase().indexOf(query) !== -1){
        finalResult.push(item);
      }
      else if(searchBasis === 'Account' && (item.assigneeemail.toUpperCase().indexOf(query) !== -1 || item.mobilenum.indexOf(query) !== -1)){
        finalResult.push(item);
      }
    });
    setSearchData(finalResult);
  };
  const onChangeValue = (e) => {
    setSearchBasis(e.target.value);
  };
  return(
    <div className='drop--down--table'>
      <div className='card'>
        <div className='card--top--bar'>
          <div className='card--top--bar--details'>
          <h3>Select the Issues to Link</h3>
          <button className='button-2' onClick={() => props.linkIssue()}>
              <span><i className="ri-close-line"></i></span>
              Close
          </button></div>
          <Search searchItem={searchItem} onChangeValue={onChangeValue}/>
        </div>
          <Linked details={searchData == null ? props.unFilteredData : searchData}  handleClick={props.handleChange}/>
      </div>
    </div>
  );
}

function EditTicket(props) {
  return (
    <div className='drop--down--table width--control'>
      <div className='card'>
      <div className='main--home'>
        <div className='card--top--bar'>
          <div className='card--top--bar--details'>
            <h3>Edit this ticket</h3>
            <button className='button-2' onClick={() => props.edit()}>
              <span><i className="ri-close-line"></i></span>
              Close
            </button>
          </div>
        </div>
          <DataEntryForm close={props.edit} detailView={props.detailView} data={props.data} filteredData={props.filteredData} ticketno = {props.details.id} value={props.details.description} summary={props.details.title} name={props.details.personname} email={props.details.assigneeemail} mobNo={props.details.mobilenum} district={props.details.district} tehshil={props.details.tehshil} khasraNo={props.details.khasrano} village={props.details.village} assigntoemail={props.details.assigntoemail} category={props.details.category} projectName={props.details.type} stateName={props.details.state} priority={props.details.priority} status={props.details.status} stat={props.stat} bankName={props.details.bankname}/>
        </div>
      </div>
    </div>
  );
}

function CreateIncident(props) {
  return (
    <div className='drop--down--table width--control'>
      <div className='card'>
      <div className='main--home'>
        <div className='card--top--bar'>
          <div className='card--top--bar--details'>
            <h3>Create a major incident</h3>
            <button className='button-2' onClick={() => props.close()}>
              <span><i className="ri-close-line"></i></span>
              Close
            </button>
          </div>
        </div>
          <DataEntryForm priority={'Important'} status={'In Progress'} createIncident={true} close={props.close} data={props.data} filteredData={props.filteredData} id={props.id} stat={props.stat} link={props.link} />
        </div>
      </div>
    </div>
  );
}
function Search(props) {
  return (
    <div className='option--container--superdiv'>
      <input type='search' onChange={(e) => props.searchItem(e.target.value)} placeholder='Search the table below...' />
      <div className='options--container--div' onChange={e => props.onChangeValue(e)}>
        <label className="options--container">Ticket No.
          <input type="radio" name="radio" value='Ticket' defaultChecked={true} />
          <span className="checkmark"></span>
        </label>
        <label className="options--container">State
          <input type="radio" name="radio" value='State' />
          <span className="checkmark"></span>
        </label>
        <label className="options--container">Email ID/Mobile No.
          <input type="radio" name="radio" value='Account' />
          <span className="checkmark"></span>
        </label>
      </div>
    </div>
  );
}

function MainHome(props){
  const [detailView, setDetailView] = React.useState(false);
  const [parsedData, setParsedData] = React.useState([]);
  const [key, setKey] = React.useState(0);
  const [detailViewData, setDetailViewData] = React.useState(props.tabledata[key]);
  const [searchData, setSearchData] = React.useState(null);
  const [searchBasis, setSearchBasis] = React.useState('Ticket');
  const [linkIssueStatus, setLinkIssueStatus] = React.useState(false);
  const [editStatus, setEditStatus] = React.useState(false);
  const [closure, setClosure] = React.useState(false);
  const [createIncidentStatus, setCreateIncidentStatus] = React.useState(false);
  const profiledata = authenticationService.getCurrentUser();
  const handleChange = (e) => {
    if(searchData != null && detailView === true){
      setSearchData(null);
    }
    else{
      setDetailView(!detailView);
      setSearchData(null);
    }
    setKey(e);
    if (searchData == null && props.tabledata[e] !== undefined && props.tabledata[e] !== null && props.tabledata[e].link !== null && props.tabledata[e].link !== undefined && props.tabledata[e].link.length !== 0) {
      if (profiledata.role !== Role.Employee) {
        setParsedData(props.unFilteredData.reduce(function (array, element) {
          if (props.tabledata[e].link?.includes(element.id.trim())) {
            array.push(element);
          }
          return array;
        }, [])
        );
      } else {
        userService.getLinkedIssues({link: props.tabledata[e].link})
          .then(data => setParsedData(data))
          .catch(err => alert('Error occured fetching linked issues from DB', err));
      }
    }
    else if(searchData != null && searchData[e].link !== null && searchData[e].link.length !== 0){
      if(profiledata.role !== Role.Employee){
        setParsedData(props.unFilteredData.reduce(function (array, element){
            if(searchData[e].link.includes(element.id.trim())){
                array.push(element);
            }
            return array;
        }, [])
        );
      } else {
        userService.getLinkedIssues({link: searchData[e].link})
          .then(data => setParsedData(data))
          .catch(err => alert('Error occured fetching linked issues from DB', err));
      }
    }
    if(searchData == null){
        setDetailViewData(props.tabledata[e]);
    } else {
        setDetailViewData(searchData[e]);
    }
  };
  const searchItem = (query) => {
    if (!query) {
      setSearchData(null);
      return;
    }
    query = query.toUpperCase();

    const finalResult = [];
    props.tabledata.forEach((item) => {
      if (searchBasis === 'Ticket' && item.id.toUpperCase().indexOf(query) !== -1) {
        finalResult.push(item);
      }
      else if(searchBasis === 'State' && item.state.toUpperCase().indexOf(query) !== -1){
        finalResult.push(item);
      }
      else if(searchBasis === 'Account' && (item.assigneeemail.toUpperCase().indexOf(query) !== -1 || item.mobilenum.indexOf(query) !== -1)){
        finalResult.push(item);
      }
    });
    setSearchData(finalResult);
  };
  const onChangeValue = (e) => {
    setSearchBasis(e.target.value);
  };
  const linkIssue = () => {
    setLinkIssueStatus(!linkIssueStatus);
    setCreateIncidentStatus(false);
    setEditStatus(false);
    setClosure(false);
  }
  const createIncident = () => {
    setCreateIncidentStatus(!createIncidentStatus);
    setLinkIssueStatus(false);
    setEditStatus(false);
    setClosure(false);
  }
  const handleLink = (e) => {
    const id = e.trim();
    var newlink;
    if(props.tabledata[key].link !== null && props.tabledata[key].link !== undefined && props.tabledata[key].link.trim() !== ''){
      const update = props.tabledata[key].link.concat(e, ', ').trim();
      newlink = update;
    }
    else if(props.tabledata[key].link === null || props.tabledata[key].link === undefined || props.tabledata[key].link === '' ){
      const update = ''.concat(e, ', ').trim();
      newlink = update;
    }
    if (!props.tabledata[key].link?.includes(id)) {
      props.tabledata[key].link = newlink;
      const requestData = { id: props.tabledata[key].id, newlink: newlink };
      userService.linkedissues(requestData)
        .then(() => {
          console.log('Linked issues updated successfully');
          setParsedData(props.unFilteredData.reduce(function (array, element) {
            if (props.tabledata[key].link.includes(element.id.trim())) {
              array.push(element);
            }
            return array;
          }, [])
          );
        })
        .catch(err => {
          alert('Error updating linked issues:', err);
        });
    }
  }
  const edit = () => {
    setEditStatus(!editStatus);
    setCreateIncidentStatus(false);
    setLinkIssueStatus(false);
    setClosure(false);
  }
  const close = () => {
    setClosure(!closure);
    setCreateIncidentStatus(false);
    setEditStatus(false);
    setLinkIssueStatus(false);
  }
  const filter = ({data, e}) => {
    if(e === 'All unassigned issues'){
      props.filteredData(data.reduce(function (val, key){
        if(key.assignto?.trim() === ''){
          val.push(key)
        }
        return val;
      }, [])
      );
    }
    else if(e === 'Assigned to me'){
      props.filteredData(data.reduce(function (val, key){
        if(key.assigntoemail?.trim() === profiledata.useremail.trim() && (key.status.trim() === 'Waiting for support' || key.status.trim() === 'In Progress')){
          val.push(key)
        }
        return val;
      }, [])
      );
    }
    else {
      props.filteredData(data.reduce(function (val, key){
          if(key.status.trim() === e){
            val.push(key)
          }
          return val;
        }, [])
      );
    }
  }
  const updatefilter = (data) => {
    filter({data: data, e: props.title});
  }
  const updatelocal = (data) => {
    let items = [...props.unFilteredData];
    let i = 0;
    for (i in props.unFilteredData) {
      if (data[0].id === props.unFilteredData[i].id) {
        break;
      }
    }
    let item = { ...items[i] };
    item.assigntoemail = data[0].assigntoemail;
    item.assignto = data[0].assignto;
    item.status = data[0].status;
    items[i] = item;
    props.data(items);
    if (props.filteredData !== null || props.filteredData !== undefined || props.filteredData !== undefined) {
      updatefilter(items);
    }
    setDetailViewData(data[0]);
  }
  const assigntoself = () => {
    const currentUser = authenticationService.getCurrentUser();
    const ticketData = {
      ticketno: detailViewData.id,
      assigntoemail: currentUser.useremail,
    }
    // to call assign to self
    userService.assigntoself(ticketData)
      .then(data => {
        updatelocal(data);
        alert('Assigned to self successfully');
      })
      .catch(err => {
        alert('Error encounterd updating DB, please try again: ', err);
      });
  }

  const closeticket = (e) => {
    const ticketData = {
      ticketno: detailViewData.id,
      value: e
    }
    userService.closeTicket(ticketData)
      .then(data => {
        updatelocal(data);
        alert('Closed issue successfully');
      })
      .catch(err => {
        alert('Error encounterd updating DB, please try again: ', err);
      });
  }

  const resume = () => {
    let status = 'Waiting for support';
    if(detailViewData.assignto){
      status = 'In Progress';
    }
    const ticketData = {
      ticketno: detailViewData.id,
      status: status,
      work: 'resume'
    };
    userService.resumereopen(ticketData)
      .then(data =>{
        updatelocal(data);
        alert('Ticket resumed');
      })
      .catch(err => {
        alert('Error updating the db ', err);
      });
  }

  const reopen = () => {
    let status = 'Waiting for support';
    if(detailViewData.assignto){
      status = 'In Progress';
    }
    const ticketData = {
      ticketno: detailViewData.id,
      status: status,
      work: 'reopen'
    };
    userService.resumereopen(ticketData)
      .then(data =>{
        updatelocal(data);
        alert('Ticket reopened');
      })
      .catch(err => {
        alert('Error updating the db ', err);
      });
  }
  return(
    <div className='main--home'>
      {closure && <ClosureComment callcloseticket={closeticket} close={close}/>}
      {editStatus && <EditTicket detailView={setDetailViewData} data={props.data} filteredData={updatefilter} details={detailViewData} edit={edit} stat={props.stat}/>}
      {linkIssueStatus && <ListOfIssues unFilteredData={props.unFilteredData} handleChange={handleLink} linkIssue={linkIssue}/>}
      {createIncidentStatus && <CreateIncident link={detailViewData.link} data={props.data} filteredData={updatefilter} close={createIncident} stat={props.stat} id={detailViewData.id}/>}
      <div className={detailView ? 'card--top--bar card--top--bar--margin' : 'card--top--bar'}>
        <div className='card--top--bar--details'>
          {searchData == null ? <h3>{props.pageState} {props.title.trim() === '' ? '' : <>&gt;</>} {props.title}</h3> : <h3>Search {props.title.trim() === '' ? '' : <>&gt;</>} {props.title}</h3> }
          <Search searchItem={searchItem} onChangeValue={onChangeValue}/>
        </div>
      </div>
      {searchData == null ? detailView ? <DetailView createIncident={createIncident} assigntoself={assigntoself} details={detailViewData} link={parsedData} handleClick={handleChange} linkIssue={linkIssue} edit={edit} stat={props.stat} close={close} reopen={reopen} resume={resume}/> : <Table tabledata={props.tabledata} handleClick={handleChange} /> : <Table tabledata={searchData} handleClick={handleChange}/>}
    </div>
  );
}
export default MainHome;