import React, { useEffect, useState } from 'react'
import {  useParams, useSearchParams } from 'react-router-dom'
import img from '../asset/img/download.png'

const Detail = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [busData,setbusData] = useState([])
  const [busPhotos,setBusPhotos] = useState([]);
  const {id} = useParams()
 
  const resname = searchParams.get('business_name');
  const resturant_desc = searchParams.get('business_desc');
  const tel = searchParams.get('tel');
  const URL = `http://localhost:1337`
  useEffect(() => {
    fetch(`http://localhost:1337/api/businesses?populate=*&filters[id][$eq]=${id}`,{
      method:'GET',
      headers:{
          "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzcsImlhdCI6MTY3OTI0MDcxMiwiZXhwIjoxNjgxODMyNzEyfQ.3wDHLZyyf68THE1Etn60K9jUZ6jgzPfrj-b15NG8PYg"
      }
    }).then((res) => {
      return res.json()
    }).then((data) => {
      console.log(data.data);
      if(data.data.length > 0){
          setbusData(data.data)

          console.log(data.data);
          // setBusPhotos(data.data[0].attributes.image.data)
          setBusPhotos(data.data)
      }else{

      }
    }).catch((err) => {
      console.log(err);
    })
  },[])
  return (
    <div className='m-8 border rounded-md flex flex-col hover:shadow-md h-4/5'>
      <div className='flex justify-between m-1 gap-2'>
        {
          busPhotos && busPhotos.map((item,idx) =>{
          
            return (
              
              <div key={item.id}>
               
                <img className="w-64" src={(item.attributes.image.data !== null)?URL+item.attributes.image.data.map((item) => {
                  return item.attributes.url
                }):img} alt="First slide"/>
              </div>
            )
          })
        }
      </div>
      <div className='w-2/3 '>
        <h1>{resname }</h1>
        <span>{resturant_desc}</span>
      </div>
      <span className='mt-5'>
        <a href={"tel:"+tel} onClick={(e) => e.stopPropagation()} >
              <span className='text-lg  rounded-md text-white bg-green-700 p-5'>{'+91 '+tel}</span>
          </a>
        </span>
    </div>
  )
}

export default Detail