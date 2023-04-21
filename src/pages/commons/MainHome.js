import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Table from './Table';
import DetailView from './DetailView';
import { Linked } from './DetailView';
import { DataEntryForm } from './RaiseARequest';

function ClosureComment(props){
  const [value, setValue] = React.useState("");
  console.log(value);
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
  return(
    <div className='drop--down--table spcl-height' >
          <div className='card'>
            <div className='card--top--bar'>
              <h3>Closure Comments (if any)</h3>
            </div>
            <ReactQuill modules={modules} onChange={setValue} theme='snow' placeholder='Write your closure comment if any...' />
            <div className='dataentry--footer'>
              <button className="button-26" >Close this issue</button>
              <button className="button-6" onClick={() => props.close()}>Cancel</button>
            </div>
          </div>
    </div>
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
      else if(searchBasis === 'Account' && (item.email.toUpperCase().indexOf(query) !== -1 || item.mob.indexOf(query) !== -1)){
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
          <DataEntryForm stat={props.stat}/>
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
  const handleChange = (e) => {
    if(searchData != null && detailView === true){
      setSearchData(null);
    }
    else{
      setDetailView(!detailView);
      setSearchData(null);
    }
    setKey(e);
    if(searchData == null && props.tabledata[e].link.length !== 0){
        setParsedData(props.unFilteredData.reduce(function (array, element){
            if(props.tabledata[e].link.includes(element.id.trim())){
                array.push(element);
            }
            return array;
        }, [])
        );
    }
    else if(searchData != null && searchData[e].link.length !== 0){
        setParsedData(props.unFilteredData.reduce(function (array, element){
            if(searchData[e].link.includes(element.id.trim())){
                array.push(element);
            }
            return array;
        }, [])
        );
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
      else if(searchBasis === 'Account' && (item.email.toUpperCase().indexOf(query) !== -1 || item.mob.indexOf(query) !== -1)){
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
    setEditStatus(false);
    setClosure(false);
  }
  const handleLink = (e) =>{
    console.log(e);
  }
  const edit = () => {
    setEditStatus(!editStatus);
    setLinkIssueStatus(false);
    setClosure(false);
  }
  const close = () => {
    setClosure(!closure);
    setEditStatus(false);
    setLinkIssueStatus(false);
  }
  return(
    <div className='main--home'>
      {closure && <ClosureComment close={close}/>}
      {editStatus && <EditTicket edit={edit} stat={props.stat}/>}
      {linkIssueStatus && <ListOfIssues unFilteredData={props.unFilteredData} handleChange={handleLink} linkIssue={linkIssue}/>}
      <div className={detailView ? 'card--top--bar card--top--bar--margin' : 'card--top--bar'}>
        <div className='card--top--bar--details'>
          {searchData == null ? <h3>{props.pageState} {props.title.trim() === '' ? '' : <>&gt;</>} {props.title}</h3> : <h3>Search {props.title.trim() === '' ? '' : <>&gt;</>} {props.title}</h3> }
          <Search searchItem={searchItem} onChangeValue={onChangeValue}/>
        </div>
            {/* <div className={searchData == null ? 'div--hidden' : 'drop--down--table'}>
                {searchData == null ? <div>{undefined}</div> : <Linked details={searchData} handleClick={handleChange} />}
            </div> */}
      </div>
      {searchData == null ? detailView ? <DetailView details={detailViewData} link={parsedData} handleClick={handleChange} linkIssue={linkIssue} edit={edit} stat={props.stat} close={close}/> : <Table tabledata={props.tabledata} handleClick={handleChange} /> : <Table tabledata={searchData} handleClick={handleChange}/>}
    </div>
  );
}
export default MainHome;