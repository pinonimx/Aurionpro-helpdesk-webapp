import React, {useEffect, useState} from "react";
import './user.css';
import Graph from "./Graph";
import { userService } from "../../_services/user.service";
import { authenticationService } from "../../_services/authentication.service";
import { Role } from "../../_helpers";

function Reports(props) {
    const [reportData, setreportData] = useState(null);
    const currentUser = authenticationService.getCurrentUser();
    
    useEffect(() => {
        userService.reportData(currentUser.id).then(reportData => setreportData(reportData));
    }, []);
    return(
        <div className="main--home">
            <div className='card--top--bar card--top--bar--margin'>
                <h3>Reports & dashboard</h3>
            </div>
            {reportData &&
            <div className="detailview report">
            <div className="page--table">
                <div className="page--table--column">
                    <div className="card">
                        <div className="card--top--bar">
                            <h3>Total Tickets</h3>
                            <div className="card--top--bar--details">
                                <p>{reportData.totalTickets}</p>
                            </div>
                        </div>
                        <div className="card--bottom">
                            <Graph data={reportData.prio} labels={['Urgent', 'Important', 'Normal']} header='Tickets by priority level' />
                        </div>
                    </div>
                </div>
                <div className="page--table--column">
                    <div className="card">
                        <div className="card--top--bar">
                            <h3>Closed Tickets</h3>
                            <div className="card--top--bar--details">
                                <p>{reportData.closedTickets}</p>
                            </div>
                        </div>
                        <div className="card--bottom">
                            <Graph data={reportData.count} labels={['Email', 'Phone', 'Website']} header='Ticket by channels' />
                        </div>
                    </div>
                </div>
                <div className="page--table--column">
                    <div className="card">
                        <div className="card--top--bar">
                            <h3>Open Tickets</h3>
                            <div className="card--top--bar--details">
                                <p>{reportData.openTickets}</p>
                            </div>
                        </div>
                        <div className="card--bottom">
                            <Graph data={Object.values(reportData.category)} labels={Object.keys(reportData.category)} header='Tickets by category' axis='y' />
                        </div>
                    </div>
                </div>
                <div className="page--table--column">
                    <div className="card">
                        <div className="card--top--bar">
                            <h3>Avg. resolution time</h3>
                            <div className="card--top--bar--details">
                                <p>{reportData.avgResolTime?.toFixed(2)} Days</p>
                            </div>
                        </div>
                        <div className="card--bottom">
                            <Graph data={Object.values(reportData.avgResolTimePP)} labels={Object.keys(reportData.avgResolTimePP)} header='Tickets by assignee' axis='y' />
                        </div>
                    </div>
                </div>
            {currentUser.role === Role.User ? <div>{null}</div> : <div className="card">
                <div className="card--top--bar">
                    <h3>Tickets by assignee and status</h3>
                </div>
                <div className="card--bottom">
                    <Graph data={Object.values(reportData.cust)} labels={Object.keys(reportData.cust)} header='Tickets by assignee and status' axis='y' stacked={true} />
                </div>
            </div>}
            </div>
            </div>
            }
        </div>
    );
}

export default Reports;