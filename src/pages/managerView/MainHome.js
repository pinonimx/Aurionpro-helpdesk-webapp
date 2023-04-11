import React from 'react';
import Table from './Table';
import DetailView from './DetailView';
import { Linked } from './DetailView';

function MainHome(props){
  const [detailView, setDetailView] = React.useState(false);
  const [parsedData, setParsedData] = React.useState([]);
  const [key, setKey] = React.useState(0);
  const [detailViewData, setDetailViewData] = React.useState(props.tabledata[key]);
  const handleChange = (e) => {
    setDetailView(!detailView);
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
  const [searchData, setSearchData] = React.useState(null);
  const searchItem = (query) => {
    if (!query) {
      setSearchData(null);
      return;
    }
    query = query.toUpperCase();

    const finalResult = [];
    props.tabledata.forEach((item) => {
      if (
        item.id.toUpperCase().indexOf(query) !== -1) {
        finalResult.push(item);
      }
    });
    setSearchData(finalResult);
  };
  return(
    <div className='main--home'>
      <div className='card--top--bar'>
        <div className='card--top--bar--details'>
            <h3>{props.title}</h3>
            <input type='search' onChange={(e) => searchItem(e.target.value)} placeholder='Search the table below...' />
        </div>
            <div className={searchData == null ? 'div--hidden' : 'drop--down--table'}>
                {searchData == null ? <div>{undefined}</div> : <Linked details={searchData} handleClick={handleChange} />}
            </div>
      </div>
      {detailView ? <DetailView details={detailViewData} link={parsedData} handleClick={handleChange} /> : <Table tabledata={props.tabledata} handleClick={handleChange} /> }
    </div>
  );
}
export default MainHome;