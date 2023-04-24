import React from 'react';
import cimg from '../../assets/aurionpro-Logo_Color-1-01_Aurionpro-Logo-2022-color-black.svg';

function PopUpSubMenu(props){
  return(
    <div className=''>
      <ul className="">
        {props.menudata.map((val, key) => {
          return(
            <li key={key}>
              <PopUpMenuitems data={val} handleClick={props.handleClick}/>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
function Menuitems(props){
  const [popUpMenu, setPopUpMenu] = React.useState(false);
  const [popUpReport, setPopUpReport] = React.useState(false);
  const _onClick = (e, val) => {
    e.preventDefault();
    props.handleClick(val);
    {val === 'Reports & Dashboard' ? setPopUpReport(!popUpReport) || setPopUpMenu(false) : val === 'Queues' ? setPopUpMenu(!popUpMenu) || setPopUpReport(false) : setPopUpMenu(false) || setPopUpReport(false)};
  }
  return(
    <div>
      {props.data.map((val, key) => {
        return(
          <div key={key}>
            <a href="#" key={key} onClick={e => _onClick(e, val.msg)}>
              <span className='icon'>
                <i className={val.iconclass}></i>
              </span>
              {val.msg}
            </a>
            {val.msg === 'Reports & Dashboard' ? props.reportpopqueue && popUpReport && <PopUpSubMenu menudata={props.reportpopqueue} handleClick={props.handleClick}/> : val.msg === 'Queues' ? popUpMenu && <PopUpSubMenu menudata={props.menupopqueue} handleClick={props.handleClick}/> : <div>{undefined}</div>}
          </div>
        )
      })}
    </div>
  );
}

function PopUpMenuitems(props) {
  const _onClick = (e, val) => {
    e.preventDefault();
    if(val === 'All issues in progress'){
      props.handleClick('In Progress');
    }
    else if(val === 'All resolved issues'){
      props.handleClick('Resolved');
    }
    else if(val === 'All issues on hold'){
      props.handleClick('On Hold');
    }
    else {
      props.handleClick(val);
    }
  }
  return (
    <a href="#" onClick={e => _onClick(e, props.data.msg)}>
      {props.data.iconclass ? <span className='icon'>
        <i className={props.data.iconclass}></i>
      </span> : <span>{undefined}</span>}
      {props.data.msg}
    </a>
  );
}
function Menu(props) {
  return(
    <div className="menu">
      <Menuitems data={props.menudata} handleClick={props.handleClick} menupopqueue={props.menupopqueue} reportpopqueue={props.reportpopqueue}/>
    </div>
  );
}

function PopUpMenu(){
  const menudata = [
    {msg: "logout", iconclass: "ri-logout-box-r-line"},
    {msg: "Profile Settings", iconclass: "ri-user-settings-line"},
  ];
  return(
    <div className='drop--down--div'>
      <ul className="drop--down">
        <li>
          <PopUpMenuitems data={menudata[0]} />
        </li>
        <li>
          <PopUpMenuitems data={menudata[1]} />
        </li>
      </ul>
    </div>
  );
}

function Profile(props){
  const [popUpMenu, setPopUpMenu] = React.useState(false);
  return(
    <div>
      {popUpMenu && PopUpMenu()}
      <button className="profile" onClick={ () => setPopUpMenu(!popUpMenu) } >
          <div className="profile-img">
              <img src={props.profiledata.img} alt="profile" />
          </div>
          <div className="name">
              <h1>{props.profiledata.name}</h1>
              <p>{props.profiledata.stat}</p>
          </div>
      </button>
    </div>
  );
}
function Sidebar(props) {
  return(
    <div className="sidebar">
      <a href="#" className="logo">
        <img src={cimg} alt="logo"></img>
      </a>
      <Menu menudata={props.menudata} handleClick={props.handleClick} menupopqueue={props.menupopqueue} reportpopqueue={props.reportpopqueue}/>
      <Profile profiledata={props.profiledata[0]} />
    </div>
  );
}
export default Sidebar;