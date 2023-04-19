import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import nothingtosee from '../../assets/2903540.webp';
import userpic from '../../assets/user.svg';
function TopRightBar(){
  return(
    <div className='top--bar--right'>
      <button className='button-4'>
        <span><i className="ri-time-line"></i></span>
        Put on hold
      </button>
      <button className='button-4 button4--specials'>
        <span><i className="ri-check-double-line"></i></span>
          Mark as done
      </button>
    </div>
  );
}

function Reopen(){
  return(
    <button className='button-4 button4--specials'>
      <span><i className="ri-inbox-unarchive-line"></i></span>
      Reopen Issue
    </button>
  );
}

function Resume(){
  return(
    <button className='button-4 button4--specials'>
      <span><i className="ri-timer-flash-line"></i></span>
      Resume the task
    </button>
  );
}

function Card(props){
  const description = props.details.description.trim() === '' ? 'project desctiption' : props.details.description;
  return(
    <div className='card'>
      <div className='card--top--bar'>
        <h3>{props.details.title}</h3>
        <div className='sudopara'>
          {description.split('\n').map((i,key) => {
            return (
              <div key={key}>{i}</div>
            );
          })}
        </div>
      </div>
      <div className='card--bottom'>
        <div className='page--table'>
          <div className='page--table--column'>
            <div className='card--bottom--border'>
              <h4>Status</h4>
              <div className={props.details.stat.trim() === 'Waiting for support' ? 'waiting' : props.details.stat.trim() === 'On Hold' ? 'onhold' : props.details.stat.trim() === 'Resolved' ? 'resol' : 'inprog'}>
                <p>{props.details.stat.trim() === 'Waiting for support' ? <i className="ri-hourglass-2-fill"></i> : props.details.stat.trim() === 'Resolved' ? <i className="ri-checkbox-circle-line"></i> : props.details.stat.trim() === 'On Hold' ? <i className="ri-timer-line"></i> : <i className="ri-contrast-fill"></i>} {props.details.stat}</p>
              </div>
            </div>
            <div className='card--bottom--border'>
              <h4>Priority</h4>
              <ul className='priority'>
                <li className={props.details.priority === 'Urgent' ? 'urg' : props.details.priority === 'Important' ? 'imp' : 'nor'}>
                <span>{props.details.priority.trim() === '' ? 'Normal' : props.details.priority}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className='page--table--column'>
            <div className='card--bottom--border'>
              <h4>Assigned To</h4>
              <span className={props.details.assignto.trim() === '' ? 'emptyassign' : null}>
                {props.details.assignto.trim() === '' ? 'Not Assigned' : props.details.assignto}
              </span>
            </div>
            <div className='card--bottom--border'>
              <h4>Type</h4>
              <p>{props.details.type}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactCard(props){
  return(
    <div className='card'>
      <div className='card--top--bar'>
        <h3>{props.details.personName}</h3>
        <div className='card--top--bar--details'>
          <p><i className="ri-phone-fill"></i> {props.details.mob}</p>
          <p><i className="ri-mail-line"></i> {props.details.email}</p>
        </div>
      </div>
      <div className='card--bottom'>
        <div className='page--table'>
          <div className='page--table--column'>
            <div className='card--bottom--border'>
              <h4>State</h4>
              <p><i className="ri-map-pin-user-line"></i> {props.details.state}</p>
            </div>
          </div>
          <div className='page--table--column'>
            <div className='card--bottom--border'>
              <h4>Bank</h4>
              <p><i className="ri-government-fill"></i> {props.details.bankName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Nothing(){
  return(
    <div className='nothinghere'>
      <img src={nothingtosee} alt='nothing to see here' />
      <p>You haven't Linked any Issues here...</p>
    </div>
  );
}

export function Linked(props){
  return(
    <div className='page--table'>
      <div className='card--bottom--border'>
      <div className='table--data'>
        <table cellPadding={7} cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Title</th>
              <th>Person Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {props.details.map((val, key) => {
            return(
              <tr key={key}>
                <td>{key+1}</td>
                <td>{val.id}</td>
                <td>{props.handleClick ? <button className='button-48' onClick={() => props.handleClick(key)}><span className='text'>{val.title}</span></button> : val.title}</td>
                <td>{val.personName}</td>
                <td>
                  <div className={val.stat.trim() === 'Waiting for support' ? 'waiting' : val.stat.trim() === 'On Hold' ? 'onhold' : val.stat.trim() === 'Resolved' ? 'resol' : 'inprog'}>
                    <p>{val.stat.trim() === 'Resolved' ? <i className="ri-checkbox-circle-line"></i> : val.stat.trim() === 'On Hold' ? <i className="ri-timer-line"></i> : <i className="ri-contrast-fill"></i>} {val.stat}</p>
                  </div>
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}

function LinkedIssues(props){
  return(
    <div className='card'>
      <div className='card--top--bar'>
        <h3>Linked Issues</h3>
        <div className='card--top--bar--details'>
            <button className='button-2'>
                <span><img src={userpic} alt=''></img></span>
                Create incident
            </button>
            <button className='button-2'>
                <span><i className="ri-link-m"></i></span>
                Link issue
            </button>
        </div>
      </div>
      <div className='card--bottom'>
        {props.details.length === 0 ? <Nothing /> : <Linked details={props.link} />}
      </div>
    </div>
  );
}

function DetailView(props){
  const category = props.details.category.trim() === '' ? '' : ' -- '.concat(props.details.category);
  const out = props.details.id.concat(category);
  const [value, setValue] = React.useState("");
  console.log(value);
  const  modules  = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ script:  "sub" }, { script:  "super" }],
        ["blockquote", "code-block"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
    ],
  };
  return(
    <div className='detailview'>
      <div className='top--bar'>
        <button className='button-4' onClick={() => props.handleClick(0)}>
          <span>
            &#x2190; 
          </span>
          Exit Task Flow
        </button>
        <p>{out}</p>
        <p>{props.details.created}</p>
        {props.details.stat.trim() === 'Resolved' ? <Reopen /> : props.details.stat.trim() === 'On Hold' ? <Resume /> : <TopRightBar />}
      </div>
      <div className='page--table'>
        <div className='page--table--column'>
          <Card details={props.details}/>
          <ContactCard details={props.details} />
        </div>
        <div className='page--table--column'>
          <div className='card'>
            <div className='card--top--bar'>
                <h3>Closure Comments (if any)</h3>
            </div>
            <ReactQuill modules={modules} onChange={setValue} theme='snow' placeholder='Write your closure comment if any...' />
          </div>
          <LinkedIssues details={props.details.link} link={props.link} />
        </div>
      </div>
    </div>
  );
}
export default DetailView;