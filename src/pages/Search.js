import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import img from '../asset/img/download.png'
import {AiTwotoneStar} from 'react-icons/ai'


const Search = () => {
    const [searchData,setSearchData] = useState([])
    // const [start,setStart] = useState([<AiTwotoneStar/>,<AiTwotoneStar/>])
    const {name} = useParams();
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
            // console.log(data.data);
            setSearchData(data.data)
        }).catch((err) => {
            console.log(err);
        })
    },[])

    const ratingFilter = (e) => {
        // console.log(e.target);
        const star = e.target.getAttribute("data-star")
        // console.log(num);
        fetch(`http://localhost:1337/api/businesses?locale=en&filters[sub_category][name][$containsi]=${name}&filters[star][$eq]=${star}&populate=*`,{
            method:'GET',
            headers:{
                "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzcsImlhdCI6MTY3OTI0MDcxMiwiZXhwIjoxNjgxODMyNzEyfQ.3wDHLZyyf68THE1Etn60K9jUZ6jgzPfrj-b15NG8PYg"
           }
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            // console.log("---Filterdata",data.data);
            setSearchData(data.data)
        })
        .catch((err) => {
            console.log(err);
        })
    }



  return (
    <>
        {/* filter section */}
             <div className='h-14  border-t-2 mt-4  '>
        <div className="flex gap-4 mx-8 my-2 ">
            <div className="relative" data-te-dropdown-ref>
            <button
            className="flex items-center whitespace-nowrap rounded bg-neutral-50 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#fbfbfb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] motion-reduce:transition-none"
            type="button"
            id="dropdownMenuButton9"
            data-te-dropdown-toggle-ref
            aria-expanded="false"
            data-te-ripple-init>
            Rating
            <span className="ml-2 w-2">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5">
                <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd" />
                </svg>
            </span>
            </button>
        <ul className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block" aria-labelledby="dropdownMenuButton1" data-te-dropdown-menu-ref>
            <li>
            <Link data-star="5" onClick={(e) => ratingFilter(e)} className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600" to="" data-te-dropdown-item-ref>5 Rating</Link>
            </li>
            <li>
            <Link data-star="4" onClick={(e) => ratingFilter(e)} className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600" to="" data-te-dropdown-item-ref>4 Rating</Link>
            </li>
            <li>
            <Link data-star="3" onClick={(e) => ratingFilter(e)} className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600" to="" data-te-dropdown-item-ref>3 Rating</Link>
            </li>
            <li>
            <Link data-star="2" onClick={(e) => ratingFilter(e)} className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600" to="" data-te-dropdown-item-ref>2 Rating</Link>
            </li>
            <li>
            <Link data-star="1"  onClick={(e) => ratingFilter(e)} className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600" to="" data-te-dropdown-item-ref>1 Rating</Link>
            </li>
        </ul>
            </div>
            <div className="relative" data-te-dropdown-ref>
            <button
            className="flex items-center whitespace-nowrap rounded bg-neutral-50 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#fbfbfb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] motion-reduce:transition-none"
            type="button"
            id="dropdownMenuButton9"
            data-te-dropdown-toggle-ref
            aria-expanded="false"
            data-te-ripple-init>
            Price
            <span className="ml-2 w-2">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5">
                <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd" />
                </svg>
            </span>
            </button>
        <ul className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block" aria-labelledby="dropdownMenuButton1" data-te-dropdown-menu-ref>
            <li>
            <a className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600" href="#" data-te-dropdown-item-ref>High to Low</a>
            </li>
            <li>
            <a className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600" href="#" data-te-dropdown-item-ref>Low to High</a>
            </li> 
        </ul>
            </div>
            <button
            type="button"
            className="inline-block rounded bg-neutral-50 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#fbfbfb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] motion-reduce:transition-none"
            data-te-toggle="modal"
            data-te-target="#rightTopModal"
            data-te-ripple-init
            data-te-ripple-color="light">
           All filters
             </button>
        </div>
            </div>
            {/* modal section */}
            <div>
        <div data-te-modal-init className="fixed top-0 right-0 z-[1055] hidden h-full w-1/4 overflow-y-auto overflow-x-hidden outline-none" id="rightTopModal" tabIndex={-1} aria-labelledby="rightTopModalLabel" aria-hidden="true">
         <div data-te-modal-dialog-ref className="pointer-events-none absolute right-0 h-full w-full translate-x-[100%] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]">
      <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
        <div className="flex flex-shrink-0 items-center  gap-40  rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
          
          <button type="button" className="box-content  rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none" data-te-modal-dismiss aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h5 className="text-xl  text-center  font-medium leading-normal text-neutral-800 dark:text-neutral-200" id="exampleModalLabel">
            All Filter
          </h5>
        </div>
        <div className="relative flex-auto p-4 space-x-2 space-y-2 " data-te-modal-body-ref>
      
    <button data-star="5" onClick={(e) => ratingFilter(e)} type="button" className="inline-block rounded bg-neutral-50 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#fbfbfb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)]">
        5 star
    </button>
    <button data-star="4" onClick={(e) => ratingFilter(e)} type="button" className="inline-block rounded bg-neutral-50 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#fbfbfb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)]">
    4 star
    </button>
    <button data-star="3" onClick={(e) => ratingFilter(e)} type="button" className="inline-block rounded bg-neutral-50 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#fbfbfb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)]">
    3 star
    </button>
    <button data-star="2" onClick={(e) => ratingFilter(e)} type="button" className="inline-block rounded bg-neutral-50 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#fbfbfb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)]">
    2 star
    </button>
    <button data-star="1" onClick={(e) => ratingFilter(e)} type="button" className="inline-block rounded bg-neutral-50 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#fbfbfb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)]">
    1 star
    </button>


  
        </div>
        <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
          <button type="button" className="inline-block rounded bg-primary-100 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200" data-te-modal-dismiss data-te-ripple-init data-te-ripple-color="light">
            Close
          </button>
          <button type="button" className="ml-1 inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]" data-te-ripple-init data-te-ripple-color="light">
            Save changes
          </button>
        </div>
      </div>
    </div>
        </div>
            </div>
        {/* List Data section */}
            <div>   
            {
                searchData.map((item,idx) =>(
                    <Link key={item.id} to={`/detail/${item.attributes.name}/${item.id}?business_name=${item.attributes.name} &business_desc=${item.attributes.desc} &tel=${item.attributes.phone}`} >
                        <div  className="flex border p-8 gap-2 hover:shadow-md m-4  rounded-md w-4/5 mb-4" >
                        <div className='w-1/4'>
                        <img className='w-full' src={(item.attributes.image.data !== null)?URL+item.attributes.image.data[0].attributes.url:img}  alt="name"/>
                        </div>
                        <div className='w-3/4'>
                        <h1 className='text-5xl font-semibold'>{item.attributes.name}</h1>
                        <span className='text-gray-500 flex'>
                            <span className='rounded-md text-white bg-green-700 px-2'>{item.attributes.star}</span>
                            <AiTwotoneStar/>
                            <AiTwotoneStar/>
                            <AiTwotoneStar/>
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
    </>
  )
}

export default Search