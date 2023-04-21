import React from "react";
import './user.css';
import Graph from "./Graph";

function Reports(props) {
    const totalTickets = Object.keys(props.data).length;
    const resolved = props.data.reduce(function (val, key) {
        if (key.stat.trim() === 'Resolved') {
            val.push(key)
        }
        return val;
    }, []);
    const closedTickets = Object.keys(resolved).length;
    const open = props.data.reduce(function (val, key) {
        if (key.stat.trim() === 'In Progress') {
            val.push(key)
        }
        return val;
    }, []);
    const openTickets = Object.keys(open).length;
    const resolTime = resolved.map((val, key) => {
        var d = val.created.split(' ');
        d[0] = d[0].split('/').reverse().join('-')
        var d1 = new Date(d.reverse().join(' '));
        d = val.closed.split(' ');
        d[0] = d[0].split('/').reverse().join('-');
        var d2 = new Date(d.reverse().join(' '));
        var diff = d2.getTime() - d1.getTime();
        var daydiff = diff/(1000*60*60*24);
        return parseInt(daydiff.toFixed(0));
    });
    const avgResolTime = resolTime.reduce((a, b) => a + b, 0)/Object.keys(resolved).length;
    var prio = [0, 0, 0];
    for (let key in props.data){
        if(props.data[key].priority === 'Urgent') ++prio[0];
        else if(props.data[key].priority === 'Important') ++prio[1];
        else ++prio[2];
    }
    const category = {};
    for(const e of props.data){
        if(e.stat.trim() === 'Waiting for support' || e.stat.trim()==='In Progress'){
            if(e.category.trim() !== '' && category[e.category]) category[e.category] += 1;
            else if(e.category.trim() === '' && category['Undefined']) category['Undefined'] += 1;
            else if(e.category.trim() === '') category['Undefined'] = 1;
            else category[e.category] = 1;
        }
    }
    const avgResolTimePP = {};
    for(const e of resolved){
        if(e.assignto.trim() !== '' && avgResolTimePP[e.assignto]) avgResolTimePP[e.assignto] += 1;
        else if(e.assignto.trim() === '' && avgResolTimePP['Undefined']) avgResolTimePP['Undefined'] += 1;
        else if(e.assignto.trim() === '') avgResolTimePP['Undefined'] = 1;
        else avgResolTimePP[e.assignto] = 1;
    }
    const cust = {};
    for(const e of props.data){
        if(e.stat.trim() === 'Waiting for support' || e.stat.trim() === 'In Progress'){
            if(cust[e.personName]) cust[e.personName][0] += 1;
            else cust[e.personName] = [1, 0];
        }
        else if(e.stat.trim() === 'Resolved'){
            if(cust[e.personName]) cust[e.personName][1] += 1;
            else cust[e.personName] = [0, 1];
        }
    }
    return(
        <div className="main--home">
            <div className='card--top--bar card--top--bar--margin'>
                <h3>Reports & dashboard</h3>
            </div>
            <div className="detailview report">
            <div className="page--table">
                <div className="page--table--column">
                    <div className="card">
                        <div className="card--top--bar">
                            <h3>Total Tickets</h3>
                            <div className="card--top--bar--details">
                                <p>{totalTickets}</p>
                            </div>
                        </div>
                        <div className="card--bottom">
                            <Graph data={prio} labels={['Urgent', 'Important', 'Normal']} header='Tickets by priority level' />
                        </div>
                    </div>
                </div>
                <div className="page--table--column">
                    <div className="card">
                        <div className="card--top--bar">
                            <h3>Closed Tickets</h3>
                            <div className="card--top--bar--details">
                                <p>{closedTickets}</p>
                            </div>
                        </div>
                        <div className="card--bottom">
                            <Graph data={[11, 7, 4]} labels={['Email', 'Phone', 'Website']} header='Ticket by channels' />
                        </div>
                    </div>
                </div>
                <div className="page--table--column">
                    <div className="card">
                        <div className="card--top--bar">
                            <h3>Open Tickets</h3>
                            <div className="card--top--bar--details">
                                <p>{openTickets}</p>
                            </div>
                        </div>
                        <div className="card--bottom">
                            <Graph data={Object.values(category)} labels={Object.keys(category)} header='Tickets by category' axis='y' />
                        </div>
                    </div>
                </div>
                <div className="page--table--column">
                    <div className="card">
                        <div className="card--top--bar">
                            <h3>Avg. resolution time</h3>
                            <div className="card--top--bar--details">
                                <p>{avgResolTime.toFixed(2)} Days</p>
                            </div>
                        </div>
                        <div className="card--bottom">
                            <Graph data={Object.values(avgResolTimePP)} labels={Object.keys(avgResolTimePP)} header='Tickets by assignee' axis='y' />
                        </div>
                    </div>
                </div>
            {props.stat ? <div>{null}</div> : <div className="card">
                <div className="card--top--bar">
                    <h3>Tickets by assignee and status</h3>
                </div>
                <div className="card--bottom">
                    <Graph data={Object.values(cust)} labels={Object.keys(cust)} header='Tickets by assignee and status' axis='y' stacked={true} />
                </div>
            </div>}
            </div>
            </div>
        </div>
    );
}

export default Reports;