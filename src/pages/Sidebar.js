import React from 'react';
import cimg from './aurionpro-Logo_Color-1-01_Aurionpro-Logo-2022-color-black.svg';

function Menuitems(props){
  return(
    <div>
      {props.data.map((val, key) => {
        return(
          <a href="#" key={key}>
            <span className='icon'>
              <i className={val.iconclass}></i>
            </span>
            {val.msg}
          </a>
        )
      })}
    </div>
  );
}

function PopUpMenuitems(props) {
  return (
    <a href="#">
      <span className='icon'>
        <i className={props.data.iconclass}></i>
      </span>
      {props.data.msg}
    </a>
  );
}
function Menu(props) {
  return(
    <div className="menu">
      <Menuitems data={props.menudata} />
    </div>
  );
}

function PopUpMenu(){
  const menudata = [
    {msg: "logout", iconclass: "ri-logout-box-r-line"},
    {msg: "Profile Settings", iconclass: "ri-user-settings-line"},
  ];
  return(
    <ul className="drop--down">
      <li>
        <PopUpMenuitems data={menudata[0]} />
      </li>
      <li>
        <PopUpMenuitems data={menudata[1]} />
      </li>
    </ul>
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
      <Menu menudata={props.menudata} />
      <Profile profiledata={props.profiledata[0]} />
    </div>
  );
}
export default Sidebar;