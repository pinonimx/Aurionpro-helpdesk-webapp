import React from 'react';
import './user.css';

function Card(props){
    const stateName = {
        "Andhra Pradesh": "AP",
        "Andaman & Nicobar Islands": "AN",
        "Arunachal Pradesh": "AR",
        "Assam": "AS",
        "Bihar": "BR",
        "Chandigarh": "CH",
        "Chhattisgarh": "CG",
        "Delhi NCT": "DL",
        "Dadra and Nagar Haveli and Daman and Diu": "DH & DD",
        "Goa": "GA",
        "Gujrat": "GJ",
        "Haryana": "HR",
        "Himachal Pradesh": "HP",
        "Jammu & Kashmir": "JK",
        "Jharkhand": "JH",
        "Karnataka": "KA",
        "Kerala": "KL",
        "Lakshadweep": "LD",
        "Madhya Pradesh": "MP",
        "Maharashtra": "MH",
        "Manipur": "MN",
        "Meghalaya": "ML",
        "Mizoram": "MZ",
        "Nagaland": "NL",
        "Odisha": "OR",
        "Pondicherry": "PY",
        "Punjab": "PB",
        "Rajasthan": "RJ",
        "Sikkim": "SK",
        "Tamil Nadu": "TN",
        "Telangana": "TS",
        "Tripura": "TR",
        "Uttar Pradesh": "UP",
        "Uttarakhand": "UK",
        "West Bengal": "WB",
    };
    const key = props.title;
    const categorykeys = Object.keys(props.report[key]);
    return(
        <div className='card'>
            <div className='card--top--bar'>
                <h3>{key}</h3>
            </div>
            <div className='card--bottom'>
                <div className='table--data'>
                    <table cellPadding={7} cellSpacing={0}>
                        <thead>
                            <tr>
                                <th></th>
                                <th>State</th>
                                <th>Total issues received</th>
                                <th>Pending / Reopen</th>
                                <th>Resolved</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categorykeys.map((val, keys) => {
                                    return(
                                        <tr key={keys}>
                                            <td>{keys+1}</td>
                                            <td>{stateName[val]}</td>
                                            <td>{props.report[key][val][0]}</td>
                                            <td>{props.report[key][val][1]}</td>
                                            <td>{props.report[key][val][2]}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default function ReportSubMenu(props){
    const report = {'summary' : {}};
    for(const e of props.data){
        if(e.category.trim() === '') e.category='undefined';
        if(report['summary'][e.state]) report['summary'][e.state][0] += 1;
        else report['summary'][e.state] = [1, 0, 0];
        if(report[e.category]){
            if(report[e.category][e.state]) report[e.category][e.state][0] += 1;
            else report[e.category][e.state] = [1, 0, 0];
        }
        else {
            report[e.category] = {};
            report[e.category][e.state] = [1, 0, 0];
        }
        if(e.stat === 'Resolved') {
            report['summary'][e.state][2] += 1;
            report[e.category][e.state][2] += 1;
        }
        else {
            report['summary'][e.state][1] += 1;
            report[e.category][e.state][1] += 1;
        }
    }
    const reportkeys = Object.keys(report);
    return(
        <div className='main--home'>
            <div className='card--top--bar card--top--bar--margin'>
                <h3>Reports</h3>
            </div>
            <div className='detailview report'>
                <div className='page--table'>
                    {reportkeys.map(
                        (val, key) => {
                            return(
                                <div className='page--table--column spcl--width'>
                                <Card title={val} report={report} key={key}/>
                                </div>
                            )
                        }
                    )}
                </div>
            </div>
        </div>
    );
}