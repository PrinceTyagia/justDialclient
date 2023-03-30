import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const SubCategory = () => {
  const [subCat,setSubCat] = useState([])
  const {id} = useParams();
  const loaction = window.localStorage.getItem("loaction")
  useEffect(() => {
    fetch(`http://localhost:1337/api/sub-categories?filters[business_category][id][$eq]=${id}&populate=*`,{
      method:'GET',
      headers:{
          "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzcsImlhdCI6MTY3OTI0MDcxMiwiZXhwIjoxNjgxODMyNzEyfQ.3wDHLZyyf68THE1Etn60K9jUZ6jgzPfrj-b15NG8PYg"
      }
  })
  .then((res) => res.json())
  .then((data) => {
      // console.log(data);
      setSubCat(data.data)
  }).catch((err) => {
      console.log(err);
  })
  },[])
  return (
    <div className='flex justify-between px-4 gap-2'>
      {
        subCat.map((item) => (
          <Link key={item.id}  to={`/search/${loaction}/${item.attributes.name}`}>
          <div className="border rounded-md text-center h-48 hover:shadow-md">
          <img src={`http://localhost:1337`+item.attributes.image.data.attributes.url} className="rounded-t-md w-full hover:scale-105"  style={{height:100}} alt={item.attributes.name}/>
            {item.attributes.name}
          </div>
          </Link>
        ))
      }
    </div>
  )
}

export default SubCategory