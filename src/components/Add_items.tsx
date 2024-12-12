import { useEffect, useState } from 'react'
import { clothes, type_of_clothes } from '../interface'
import './Add_items.css'
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';



function Add_items(props : any) {  
    const [newitem, setNewItem] = useState({type_of: '', size: '', color: '#000000', date: 'Wed Mar 27 2024', image: 'https://'});

    const SendData = (event:any) => {
        event.preventDefault();

        axios.post('http://localhost:3001/clothes/', newitem)
            .then(res => {
                props.setClothes((items: clothes[])=>[...items, res.data]);
            })
    }

    const HandleType = (event:any) => {
        setNewItem({...newitem, type_of: event.target.value});
    }

    const HandleSize = (event:any) => {
        setNewItem({...newitem, size: event.target.value});
    }

    const handleColor = (event:any) => {
        setNewItem({...newitem, color: event.target.value});
    }

    const [calDate, setCalDate] = useState(new Date())
    useEffect(()=>{
    setNewItem({...newitem, date: calDate.toDateString()});
    }, [])


    const [changeDate , setchangeDate] = useState(false);


    function handleDate (calDate:any ) {
        // change results based on calendar date click
        setCalDate(calDate)
        setNewItem({...newitem, date: calDate.toDateString()});

    }

    const handleTextInputChange = (event:any) => {
        setNewItem({...newitem, image: event.target.value});
      };

    return(
        <div id='Add_items_divv'>
           <h2>Add new</h2>
            <form onSubmit={SendData} >

                <div id='form_div'>
                <select required onChange={HandleType}>
                    <option value="">type</option>
                    {props.types.map((type:type_of_clothes)=>(
                        <option key={type.id} value={type.type_of}>{type.type_of}</option>
                    ))}
                </select>
                

                
                <select required onChange={HandleSize}>
                    <option value="">Size</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                </select>
                
                
                
                    <input type='color' value={newitem.color} onChange={handleColor}/>
              

                
                    <button className='Add_items_btn' type='button' onClick={()=>setchangeDate(!changeDate)}>{changeDate ? 'done' : 'changeDate'}</button>
                    {!changeDate ? <p>{calDate.toDateString()}</p> 
                    : 
                    <div className="result-calendar">
                        <Calendar onChange={handleDate} value={calDate} />
                    </div>}
                 

                <label htmlFor="img_input">Image url:</label>
                <input id='img_input' required type="text" value={newitem.image}  onChange={handleTextInputChange}/>
               

            <button className='Add_items_btn' type="submit">Add</button>
            </div>
            </form>
        </div>
    )


}

export default Add_items