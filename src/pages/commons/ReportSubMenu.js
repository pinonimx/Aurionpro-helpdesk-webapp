import React from 'react';
import './user.css';
import { userService } from '../../_services/user.service';

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
                    <table id={'tbl'.concat(props.keycount)} cellPadding={7} cellSpacing={0}>
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

export default function ReportSubMenu(props) {
    const inittblarr = (keycount) => {
        const arr = [];
        for (let e = 0; e < keycount; e++) {
            arr[e] = 'tbl'.concat(e);
        }
        return arr;
    }
    const [report, setReport] = React.useState(null);
    const [reportkeys, setReportkeys] = React.useState([]);
    const [tblarr, setTblarr] = React.useState([]);
    const tablesToExcel = (function () {
        var uri = 'data:application/vnd.ms-excel;base64,',
            tmplWorkbookXML = '<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">' +
                '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author>Axel Richter</Author><Created>{created}</Created></DocumentProperties>' +
                '<Styles>' +
                '<Style ss:ID="Currency"><NumberFormat ss:Format="Currency"></NumberFormat></Style>' +
                '<Style ss:ID="Date"><NumberFormat ss:Format="Medium Date"></NumberFormat></Style>' +
                '</Styles>' +
                '{worksheets}</Workbook>',
            tmplWorksheetXML = '<Worksheet ss:Name="{nameWS}"><Table>{rows}</Table></Worksheet>',
            tmplCellXML = '<Cell{attributeStyleID}{attributeFormula}><Data ss:Type="{nameType}">{data}</Data></Cell>',
            base64 = function (s) {
                return window.btoa(unescape(encodeURIComponent(s)))
            },
            format = function (s, c) {
                return s.replace(/{(\w+)}/g, function (m, p) {
                    return c[p];
                })
            }
        return function (tables, wsnames, wbname, appname) {
            var ctx = "";
            var workbookXML = "";
            var worksheetsXML = "";
            var rowsXML = "";

            for (var i = 0; i < tables.length; i++) {
                if (!tables[i].nodeType) tables[i] = document.getElementById(tables[i]);
                for (var j = 0; j < tables[i].rows.length; j++) {
                    rowsXML += '<Row>'
                    for (var k = 0; k < tables[i].rows[j].cells.length; k++) {
                        var dataType = tables[i].rows[j].cells[k].getAttribute("data-type");
                        var dataStyle = tables[i].rows[j].cells[k].getAttribute("data-style");
                        var dataValue = tables[i].rows[j].cells[k].getAttribute("data-value");
                        dataValue = (dataValue) ? dataValue : tables[i].rows[j].cells[k].innerHTML;
                        var dataFormula = tables[i].rows[j].cells[k].getAttribute("data-formula");
                        dataFormula = (dataFormula) ? dataFormula : (appname === 'Calc' && dataType === 'DateTime') ? dataValue : null;
                        ctx = {
                            attributeStyleID: (dataStyle === 'Currency' || dataStyle === 'Date') ? ' ss:StyleID="' + dataStyle + '"' : '',
                            nameType: (dataType === 'Number' || dataType === 'DateTime' || dataType === 'Boolean' || dataType === 'Error') ? dataType : 'String',
                            data: (dataFormula) ? '' : dataValue,
                            attributeFormula: (dataFormula) ? ' ss:Formula="' + dataFormula + '"' : ''
                        };
                        rowsXML += format(tmplCellXML, ctx);
                    }
                    rowsXML += '</Row>'
                }
                ctx = {
                    rows: rowsXML,
                    nameWS: wsnames[i] || 'Sheet' + i
                };
                worksheetsXML += format(tmplWorksheetXML, ctx);
                rowsXML = "";
            }

            ctx = {
                created: (new Date()).getTime(),
                worksheets: worksheetsXML
            };
            workbookXML = format(tmplWorkbookXML, ctx);


            var link = document.createElement("A");
            link.href = uri + base64(workbookXML);
            link.download = wbname || 'Workbook.xls';
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    })();

    React.useEffect(() => {
        userService.reportSubMenu().then(report => {
            setReport(report);
            const keys = Object.keys(report);
            setReportkeys(keys);
            const keycount = keys.length;
            setTblarr(inittblarr(keycount));
        });
    }, []);
    if (!report) {
        // Render a loading state or return null while the report is being fetched
        return <div>Loading...</div>;
    }
    return(
        <div className='main--home'>
            <div className='card--top--bar card--top--bar--details card--top--bar--margin'>
                <h3>Reports</h3>
                <button onClick={() => tablesToExcel(tblarr, reportkeys, 'report.xls', 'Excel')} className='button-2 '>Export to Excel</button>
            </div>
            <div className='detailview report'>
                <div className='page--table'>
                    {reportkeys.map(
                        (val, key) => {
                            return(
                                <div className='page--table--column spcl--width'>
                                <Card title={val} report={report} keycount={key} key={key}/>
                                </div>
                            )
                        }
                        )}
                </div>
            </div>
        </div>
    );
}