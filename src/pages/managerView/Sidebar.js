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
  const menupopqueue = [
    {msg: 'All open issues'},
    {msg: 'All unassigned issues'},
    {msg: 'Assigned to me'},
    {msg: 'All issues on hold'},
    {msg: 'All resolved issues'},
    {msg: 'View entire queue'},
  ];

  const [popUpMenu, setPopUpMenu] = React.useState(false);
  const _onClick = (e, val) => {
    e.preventDefault();
    props.handleClick(val);
    {val === 'Queues' ? setPopUpMenu(!popUpMenu) : setPopUpMenu(false)};
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
            {val.msg === 'Queues' ? popUpMenu && <PopUpSubMenu menudata={menupopqueue} handleClick={props.handleClick}/> : <div>{undefined}</div>}
          </div>
        )
      })}
    </div>
  );
}

function PopUpMenuitems(props) {
  const _onClick = (e, val) => {
    e.preventDefault();
    if(val === 'View entire queue' || val === 'All unassigned issues' || val === 'Assigned to me'){
      props.handleClick(val);
    }
    else if(val === 'All open issues'){
      props.handleClick('In Progress');
    }
    else if(val === 'All resolved issues'){
      props.handleClick('Resolved');
    }
    else{
      props.handleClick('On Hold');
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
      <Menuitems data={props.menudata} handleClick={props.handleClick} />
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
      <Menu menudata={props.menudata} handleClick={props.handleClick}/>
      <Profile profiledata={props.profiledata[0]} />
    </div>
  );
}
export default Sidebar;