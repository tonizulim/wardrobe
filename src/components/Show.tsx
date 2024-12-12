import { useState, useEffect } from 'react'
import { clothes, type_of_clothes } from '../interface'
import axios from 'axios'
import './Show.css'

function Show({clothes, setClothes, types}: {clothes: clothes[], types: type_of_clothes[], setClothes: React.Dispatch<React.SetStateAction<clothes[]>>}) {
    const [selectedType, setSelectedType] = useState<string>('')
    const [ShowClothes, setShowClothes] = useState<clothes[]>(clothes)
    const [customize, setCostumize] = useState(false)
    
    useEffect(()=>{
        filterClothes()
    }, [clothes])

    useEffect(()=>{
        filterClothes()
    }, [selectedType])

    const filterClothes = () => {
        if(selectedType === ''){
            setShowClothes(clothes)
        }
        else{
            setShowClothes(clothes.filter((clothes) => clothes.type_of === selectedType))
        }
    }

    const handleChangeFilter = (event: any) => {
        setSelectedType(event.target.value);
    }

    const showItems = () => {
        return(
            <>
            {ShowClothes.map((item : clothes )=>(
                <div className='item_list_div' key={item.id}>
                    <p className='item_list'>{item.id}</p>
                    <p className='item_list'>{item.type_of}</p>
                    <p className='item_list'>{item.size}</p>
                    <div style={{ backgroundColor : item.color}}><p className='item_list'></p></div>
                    <p className='item_list_date'>{item.date}</p>
                    <img src={item.image} alt={item.type_of} height={50} />

                </div>
            ))}
            </>
        )
    }

    const del = (event : any) => {
        const id = event.target.value;
        if(!window.confirm(`You sure to delete this item ${id}?`)){
            return;
        }
        axios.delete(`http://localhost:3001/clothes/${id}`)
        .then(() => {
            setClothes(clothes.filter(clothes => clothes.id !== id));
        });

    }

    const manageType_of = ({event, item} : {event:any; item:string}) =>{
        axios.patch(`http://localhost:3001/clothes/${item}`, {type_of: event.target.value})
        .then(res => {
            setClothes(clothes.map(item => item.id === res.data.id ? res.data : item))
        });
    }

    const manageSize = ({event, item} : {event:any; item:string}) =>{
        axios.patch(`http://localhost:3001/clothes/${item}`, {size: event.target.value})
        .then(res => {
            setClothes(clothes.map(item => item.id === res.data.id ? res.data : item))
        });
    }

    const handleColorChange = ({event, item} : {event:any; item:string})=> {
        axios.patch(`http://localhost:3001/clothes/${item}`, {color: event.target.value})
        .then(res => {
            setClothes(clothes.map(item => item.id === res.data.id ? res.data : item))
        });
    }

    const handleDateChange = ({event, item} : {event:any; item:string}) => {
        axios.patch(`http://localhost:3001/clothes/${item}`, {date: event.target.value})
        .then(res => {
            setClothes(clothes.map(item => item.id === res.data.id ? res.data : item))
        });
    }

    const handleImgChange = ({event, item} : {event:any; item:string}) => {
        axios.patch(`http://localhost:3001/clothes/${item}`, {image: event.target.value})
        .then(res => {
            setClothes(clothes.map(item => item.id === res.data.id ? res.data : item))
        });
    }

    const CostumizeItems = () => {
        
        return(
            <>
            {ShowClothes.map((item : clothes )=>(
                <div className='item_list_div' key={item.id}>
                    <p className='item_list'>{item.id}</p>

                    <div className='item_list_costumize'>
                    <select required value={item.type_of} onChange={()=>manageType_of({ event, item: item.id })}>
                        {types.map((type:type_of_clothes)=>(
                            <option key={type.id} value={type.type_of}>{type.type_of}</option>
                        ))}
                    </select>
                    </div>

                    <div className='item_list_costumize'>
                    <select required value={item.size} onChange={()=>manageSize({ event, item: item.id })}>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                    </select>
                    </div>

                    <div className='item_list_costumize'>
                        <input type='color' value={item.color} onChange={()=>handleColorChange({ event, item: item.id })}/>
                    </div>

                    <div className='item_list_costumize'>
                        <input className='item_list_input' required type="text" value={item.date} onChange={()=>handleDateChange({ event, item: item.id })}/>
                    </div>

                    <div className='item_list_costumize'>
                        <input className='item_list_input' required type="text" value={item.image} onChange={()=>handleImgChange({ event, item: item.id })}/>
                    </div>


                    <button value={item.id} onClick={del}>delete</button>
                    
                </div>
            ))}
            </>
        )
    }

    return (
    <div id='show_div'>
        <div id='selelct_type'>
            <h2>Filter</h2>
            <label key='1' ><input name='filter_btn' type='radio' value='' defaultChecked={true} onChange={handleChangeFilter}/>All</label>

            {types.map(type => (
                <label key={type.id}><input name='filter_btn' key={type.id} type='radio' value={type.type_of} onChange={handleChangeFilter}/>{type.type_of}</label>
            ))}
        </div>

        <div id='item_list'>
            <h2>Item list</h2>
            <button id='costumize_btn' onClick={()=> setCostumize(!customize)}>customize</button>
            <div className='item_list_div'>
                <p className='item_list'>id</p>
                <p className='item_list'>type</p>
                <p className='item_list'>size</p>
                <p className='item_list'>colour</p>
                <p className='item_list_date'>date</p>
                <p className='item_list'>picture</p>
            </div>
            {!customize ? showItems() : CostumizeItems() }

        </div>
      
    </div>
  )
}

export default Show