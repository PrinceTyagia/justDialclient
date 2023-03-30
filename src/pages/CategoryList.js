import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CategoryList = () => {
    const BASE_URL = 'http://localhost:1337'
    const [categorylist,setCategoryList] = useState([])
    const loaction= window.localStorage.getItem("loaction")
    useEffect(() => {
        fetch(`${BASE_URL}/api/business-categories?locale=en&populate=*`,{
            method:'GET',
            headers:{
                "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzcsImlhdCI6MTY3OTI0MDcxMiwiZXhwIjoxNjgxODMyNzEyfQ.3wDHLZyyf68THE1Etn60K9jUZ6jgzPfrj-b15NG8PYg"
            }
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            setCategoryList(data.data)
        }).catch((err) => {
            console.log(err);
        })
    },[])
  return (
    <div className='grid grid-cols-10  h-96 '>
        {
            categorylist.map((item,idx) => (
               
                <Link key={idx}  to={`/sub-cat/${loaction}/${item.attributes.name}/${item.id}`} >
                <div className='grid gap-2 w-20 h-16  text-center  '>
                <div  className=" flex justify-center border hover:shadow-md rounded-xl py-5 px-2 ">
                    <img src={`${BASE_URL}`+item.attributes.image.data.attributes.url}  style={{height:45}} alt={item.attributes.name}/>
                </div>
                <span>{item.attributes.name}</span> 
               
                </div>
                
                </Link>
            ))
        }
    </div>
  )
}

export default CategoryList
// {`/sub-cat/${loaction}/${item.attributes.name}/${item.id}`} 