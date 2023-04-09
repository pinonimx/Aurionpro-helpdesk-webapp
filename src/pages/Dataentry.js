import ReactQuill from 'react-quill';
import React from 'react';
import 'react-quill/dist/quill.snow.css';
import './dataentry.css';
function Dataentry(){
    const [value, setValue] = React.useState("");
    const [summary, setSummary] = React.useState('');
    console.log(value);
    const handleChange = event => {
        setSummary(event.target.value);
        console.log('summary is: ', event.target.value);
    }
    const  modules  = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ script:  "sub" }, { script:  "super" }],
            ["blockquote", "code-block"],
            [{ list:  "ordered" }, { list:  "bullet" }],
            [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
            ["link", "image"],
            ["clean"],
        ],
    };
    
    const issuetype = [
        {data: 'Technical issue'},
        {data: 'Installation/Configuration'},
        {data: 'Billing inquiry'},
        {data: 'Account access'},
        {data: 'General inquiry'},
        {data: 'Feature request'},
        {data: 'Product feedback'},
    ];
    
    const onOptionChangeHandler = (event) => {
        console.log("User Selected Value - ", event.target.value)
    }

    return (
        <div className='dataentry--container'>
            <div className='dataentry--css'>
                <h4>Create Issue</h4>
                <div className='dataentry--issue--type'>
                    <label htmlFor="id_select"> Issue type <em>*</em> </label><br/>
                    <select id='id_select' onChange={onOptionChangeHandler}>
                        <option value='' disabled='disabled' selected>Please choose one option</option>
                        {issuetype.map((option, index) => {
                            return <option key={index} >
                                {option.data}
                            </option>
                        })}
                    </select>
                </div>
                <div className='dataentry--summary'>
                    <p>Summary <em>*</em></p>
                    <input
                        type="text"
                        id="summary"
                        name="summary"
                        onChange={handleChange}
                        value={summary}
                        placeholder='Write a summary of your issue here...'
                    />
                </div>
                <ReactQuill modules={modules} onChange={setValue} theme='snow' placeholder='Describe your issue in detail here...' />
                <div className='dataentry--footer'>
                    <button className="button-26" >Create</button>
                    <button className="button-6" >Cancel</button>
                </div>
            </div>
        </div>
    );
}
export default Dataentry;