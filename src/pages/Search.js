import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import img from '../asset/img/download.png'
import {AiTwotoneStar} from 'react-icons/ai'
const Search = () => {
    const [searchData,setSearchData] = useState([])
    const [start,setStart] = useState([<AiTwotoneStar/>,<AiTwotoneStar/>])
    const {name} = useParams() 
    const URL = `http://localhost:1337`
    useEffect(() => {
        fetch(`http://localhost:1337/api/businesses?filters[sub_category][name][$containsi]=${name}&populate=*`,{
            method:'GET',
             headers:{
                 "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzcsImlhdCI6MTY3OTI0MDcxMiwiZXhwIjoxNjgxODMyNzEyfQ.3wDHLZyyf68THE1Etn60K9jUZ6jgzPfrj-b15NG8PYg"
            }

        }).then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data.data);
            setSearchData(data.data)
        }).catch((err) => {
            console.log(err);
        })
    },[])

  return (
    <div>
        {
            searchData && searchData.map((item,idx) =>(
                <Link key={item.id} to={`/detail/${item.attributes.name}/${item.id}?business_name=${item.attributes.name} &business_desc=${item.attributes.desc} &tel=${item.attributes.phone}`} >
                    <div  className="flex border p-8 gap-2 hover:shadow-md m-4  rounded-md w-4/5 mb-4" >
                    <div className='w-1/4'>
                    <img className='w-full' src={(item.attributes.image.data !== null)?URL+item.attributes.image.data[0].attributes.url:img}  alt="name"/>
                    </div>
                    <div className='w-3/4'>
                    <h1 className='text-5xl font-semibold'>{item.attributes.name}</h1>
                    <span className='text-gray-500 flex'>
                        <span className='rounded-md text-white bg-green-700 px-2'>{item.attributes.star}</span>
                        {
                            start.map((items) => {
                                return items
                            })
                        }
                        </span>
                    <h6 className='text-xl mb-3'>{`${item.attributes.cities.data[0].attributes.name} ${item.attributes.state.data.attributes.name} ${item.attributes.country.data.attributes.name}`}</h6>
                    <span className='text-lg mb-3'>{item.attributes.createdAt}</span>
                    <h6 className='text-lg mb-4'>{item.attributes.desc}</h6>
                    <a href={"tel:"+item.attributes.phone} onClick={(e) => e.stopPropagation()} >
                    <span className='text-lg mb-3 rounded-md text-white bg-green-700 p-5'>{'+91 '+item.attributes.phone}</span>
                    </a>
                   
                    </div>
                </div>
                </Link>
            ))
        }
        </div>
  )
}

export default Search