import { useEffect, useState } from 'react'
import './App.css'
import { clothes, type_of_clothes } from './interface'
import axios from 'axios'

import Show from './components/Show'
import Add_items from './components/Add_items'

function App() {
  let [types, setTypes] = useState<type_of_clothes[]>([])
  let [clothes, setClothes] = useState<clothes[]>([])

  useEffect(()=>{
    axios
      .get<clothes[]>('http://localhost:3001/clothes')
      .then((res) => {
        setClothes(res.data)
      })
  }, [])

  useEffect(()=>{
    axios
      .get<type_of_clothes[]>('http://localhost:3001/types')
      .then((res) => {
        setTypes(res.data)

      })
  }, [])

  return (
    <>
    <div id='main_div'>
      <div id='Hedding'>
      <h1 >Wardrobe</h1>
      </div>

      <div id='Add_items_div'>
      <Add_items clothes={clothes} setClothes={setClothes} types={types}/>
      </div>
      
      <div id='show_div'>
      <Show clothes={clothes} setClothes={setClothes} types={types}/>
      </div>
      
    </div>
    </>
  )
}

export default App
