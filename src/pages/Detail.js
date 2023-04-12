import React, { useEffect, useState } from 'react'
import {  useParams, useSearchParams } from 'react-router-dom'
import img from '../asset/img/download.png'
import swal from 'sweetalert'
import axios from 'axios'





const Detail = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [busData,setbusData] = useState([])
  const [busPhotos,setBusPhotos] = useState([]);
  const [image, setImage] = useState('')
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const {id} = useParams()
  const resname = searchParams.get('business_name');
  const resturant_desc = searchParams.get('business_desc');
  const tel = searchParams.get('tel');
  // const URL = `http://localhost:1337`



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

  const submitEnquiry  = () => {
    
    const payload = {
      "data": {
        "fname": window.localStorage.getItem('fname'),
        "mname": window.localStorage.getItem('mname'),
        "lname": window.localStorage.getItem('lname'),
        "mobno": window.localStorage.getItem('mobno'),
        "email": window.localStorage.getItem('email'),
        "business": id,
        "users_permissions_user": window.localStorage.getItem("user_id"),
        "locale": "en"
      }
    }
        fetch(`http://localhost:1337/api/enquiries`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(payload)

        }).then((res) => {
          return res.json();
        }).then((data) => {
          console.log("enquiry-data",data);
        }).catch((err) => {
          console.log(err);
        })
  }
  const readURL = (file) => {
    const img = document.getElementById("imgprev")
    if(file.type === 'image/jpeg' || file.type === 'image/png'){
      img.src = URL.createObjectURL(file)
    }else {
      swal("please upload image only")
    }
   
    setImage(file)
    // let fileData = new FileReader();
    // fileData.onloadend = handleFile;
    // fileData.readAsText(file)
    // alert("okok")

    

  }
  const uploadImage = async() => {
    const formdata  = new FormData();
    formdata.append('files',image);
    axios.post(`http://localhost:1337/api/upload`,formdata,{
      headers:{
          "Content-Type":'multipart/form-data'
      },
      onUploadProgress : (ProgressEvent) => {
        var  progress = parseInt(Math.round((ProgressEvent.loaded * 100)/ ProgressEvent.total))
        setUploadPercentage(progress);
          // Update state here
        // onUploadProgress(progress);
        if(progress===100){
          setUploadPercentage(0);
          swal("Good job!", "Image uploaded successfully!", "success");
        } 
      }
    })
    // const response = await fetch(`http://localhost:1337/api/upload`,{
    //   method:'POST',
    //   body:form,
    // })
    // if(response){
    // swal("Image uploaded SuccessFully!","!","success")
    // }
      
  }
  return (
    <div className='m-8 border rounded-md flex flex-col  hover:shadow-md h-96 '>
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
      <div className='flex justify-between w-full '>

      <span className='mt-5'>
        <a href={"tel:"+tel} onClick={(e) => e.stopPropagation()} >
              <span className='text-lg  rounded-md text-white bg-green-700 p-5'>{'+91 '+tel}</span>
          </a>
        </span>

        <span className='mt-5 '>
        <span data-te-toggle="modal" data-te-target="#exampleModalCenter" data-te-ripple-init data-te-ripple-color="light" className='text-lg  rounded-md text-white bg-green-700 p-5'>Enquire Now</span> 
        </span>
       <div>
  </div>

      </div>
      <span className='mt-10 '>
        <span data-te-toggle="modal" data-te-target="#exampleModalCenters" data-te-ripple-init data-te-ripple-color="light" className='text-lg  rounded-md text-white bg-green-700 p-5'>Upload Photo</span> 
      </span>
      <div class="space-y-2">   {/*Verically centered modal*/}
        <div data-te-modal-init className="fixed left-1/4 top-0 z-[1055] hidden h-full w-1/2 overflow-y-auto overflow-x-hidden outline-none" id="exampleModalCenter" tabIndex={-1} aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog">
          <div data-te-modal-dialog-ref className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
            <div className="pointer-events-auto relative flex w-full p-4  rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
              <div className=' w-2/3'>
                <div className="block max-w-sm rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                  <form>
                      <h2 className='font-bold'>Are you loking for ?</h2>
                      <span>Name</span>
                      <input type='text' value={window.localStorage.getItem('fname')+" "+window.localStorage.getItem('mname')+" "+window.localStorage.getItem('lname')} placeholder='name' className='border-2 mb-2 border-[#000]  p-2 rounded-md w-full '/>
                      <span>Number</span>
                      <input type='number'  value={window.localStorage.getItem('mobno')} placeholder='number' className='border-2 mb-2 border-[#000]  p-2 rounded-md w-full'/>
                      <span>Email</span>
                      <input type='email' value={window.localStorage.getItem('email')} placeholder='email' className='border-2 mb-2 border-[#000]  p-2 rounded-md w-full'/>

                      <button type="button" onClick={() => submitEnquiry()} className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]" data-te-ripple-init data-te-ripple-color="light">
                      Submit
                    </button>
                  </form>
                  </div>


              </div>
              <div className='w-1/3'>
            <button type="button" className="box-content float-right rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none" data-te-modal-dismiss aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          </button>
              </div>
            </div>
          </div>
        </div>
      </div>  
      <div class="space-y-2">   {/*Verically centered modal*/}
        <div data-te-modal-init className="fixed left-1/4 top-0 z-[1055] hidden h-full w-1/2 overflow-y-auto overflow-x-hidden outline-none" id="exampleModalCenters" tabIndex={-1} aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog">
          <div data-te-modal-dialog-ref className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
            <div className="pointer-events-auto relative flex flex-col w-full p-4  rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
             <div>
             <button type="button" className="box-content float-right rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none" data-te-modal-dismiss aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          </button>
             </div>
             <div>
              <form className=''>
              <div className="max-w-xl">
                <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                  <span className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="font-medium text-gray-600">
                      Drop files to Attach, or
                      <span className="text-blue-600 underline">browse</span>
                    </span>
                  </span>
                  <input type="file" accept='image/*' id="imgInp" name="file_upload" className="" onChange={(e) => {readURL(e.target.files[0])}} />
                  <img id="imgprev" src="" alt="your image"/>
                </label>
              </div>
              <textarea id="w3review" name="w3review" rows="4" cols="50" className='border-2 w-2/5 mb-4 mt-4' placeholder='Captions help other identify whats in the photos'></textarea>
              <input type='button' value="upload" className='bg-gray-700 text-white rounded-md p-2 ' onClick={() => {uploadImage()}}/>
              </form>
            
             </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  )
}

export default Detail
