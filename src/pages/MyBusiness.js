import React, { useEffect, useState } from "react";
import { URL } from "../utils/Url";
const MyBusiness = () => {
  const [category, setCetgory] = useState([]);
  const [subcategory, setSubCetgory] = useState([]);
  const [city, setCity] = useState([]);
  const [country,setCountry]= useState([])
  const [state,setStates] = useState([])
  const [select,setSelect] = useState({
    businessName:"",
    subBusiness:"1",
    business:"1",
    city:"1",
    country:"1",
    state:"1"
  }) 
  // console.log(select);
  useEffect(() => {
    //category
    const token = window.localStorage.getItem("jwt_token")
    fetch(`${URL}/business-categories`,{
      method:"GET",
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
        "Authorization":"Bearer "+token
      }
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCetgory(data.data);
      
      })
      .catch((err) => {
        console.log(err);
      });

   
    //country
    fetch(`${URL}/countries`,{
      method:"GET",
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
        "Authorization":"Bearer "+token
      }
    }).then((res) => {
      return res.json()
    }).then((data) => {
      setCountry(data.data)
    }).catch((err) => {
      console.log(err);
    })
    
  }, [])

 

  const myBusinees_Register = (e) => { 
    const payload = {
      "data": {
        "name": select.businessName,
        "business_category": select.business,
        "cities": [
          select.city
        ],
        "sub_category": select.subBusiness,
        "country": select.country,
        "state": select.state
      }
    }
    
  
    
      console.log(payload);
      const token = window.localStorage.getItem("jwt_token")
      //api
      fetch(`${URL}/businesses`,{
        method:'POST',
        headers:{
          "Content-Type":'application/json',
          "Authorization":"Bearer "+token
        },
        body:JSON.stringify(payload)
      }).then((res) => {
        return res.json()
      }).then((data) => {
        // console.log(data);
      }).catch((err) => {
        console.log(err);
      })
   
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelect({ ...select, [name]: value }); 
  };
  const getstate = (e) => {
    const country_id =  e.target.value
    // console.log(country_id);
    const token = window.localStorage.getItem("jwt_token")
    fetch(`${URL}/states?filters[country][id][$eq]=${country_id}`,{
      method:'GET',
      headers:{
        "Authorization":"Bearer "+token
      }
    }).then((res) => {
      return res.json();
    }).then((data) => {
        // console.log(data);
        setStates(data.data)
    }).catch((err) => {
      console.log(err);
    })
  }
  const getCities = (e) =>{
    const state_id =  e.target.value
    // console.log(state_id);
    const token = window.localStorage.getItem("jwt_token")
    fetch(`${URL}/cities?filters[state][id][$eq]=${state_id}`,{
      method:'GET',
      headers:{
        "Authorization":"Bearer "+token
      }
    }).then((res) => {
      return res.json();
    }).then((data) => {
        // console.log(data);
        setCity(data.data)
    }).catch((err) => {
      console.log(err);
    })
  }
  const getSubBusiness = (e) => {
    const suBusiness_id =  e.target.value
    // console.log(state_id);
    const token = window.localStorage.getItem("jwt_token")
    fetch(`${URL}/sub-categories?filters[business_category][id][$eq]=${suBusiness_id}`,{
      method:'GET',
      headers:{
        "Authorization":"Bearer "+token
      }
      }).then((res) => {
      return res.json();
    }).then((data) => {
        // console.log(data);
        setSubCetgory(data.data)
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="flex justify-center  ">
      <div className="w-2/4 rounded-lg flex flex-col gap-2  font-extrabold  items-center justify-center bg-white p-6 shadow-lg dark:bg-neutral-700">
        <h1 className="text-4xl text-[#FF6C00]">Business Register</h1>
        <form>
          {/* business CAtegory */}
          <div className="flex justify-center flex-col">
            <h5>Business Category</h5>
            <div className="mb-3 w-full border-2">
              <select data-te-select-init className="w-full"  name="business"
                  value={select.business}
                  onChange={(e) => {handleChange(e); getSubBusiness(e) }}   >
                {category.map((cv, idx) => (
                  <option key={cv.id} value={cv.id}>
                    {cv.attributes.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* sub business Category */}
          <div className="flex justify-center flex-col">
            <h5>Business Sub-Category</h5>
            <div className="mb-3 w-full border-2">
              <select data-te-select-init className="w-full" name="subBusiness"
                  value={select.subBusiness}
                  onChange={(e) => handleChange(e)} >
              {subcategory.map((cv, idx) => (
                  <option key={cv.id} value={cv.id}>
                    {cv.attributes.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* country */}
          <div className="flex justify-center flex-col">
            <h5>country</h5>
            <div className="mb-3 w-full border-2">
              <select data-te-select-init className="w-full" name="country"
                  value={select.country}
                  onChange={(e) => {handleChange(e); getstate(e) }}>
                  {country.map((cv, idx) => (
                  <option key={cv.id} value={cv.id}>
                    {cv.attributes.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* state */}
          <div className="flex justify-center flex-col">
            <h5>state</h5>
            <div className="mb-3 w-full border-2">
              <select data-te-select-init className="w-full" name="state"
                  value={select.state}
                  onChange={(e) => {handleChange(e); getCities(e)}}>
              {state.map((cv, idx) => (
                  <option key={cv.id} value={cv.id}>
                    {cv.attributes.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-center flex-col">
            <h5>City</h5>
            <div className="mb-3 w-full border-2">
              <select data-te-select-init className="w-full" name="city"
                  value={select.city}
                  onChange={(e) => handleChange(e)}>
              {city.map((cv, idx) => (
                  <option key={cv.id} value={cv.id}>
                    {cv.attributes.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="relative mb-6">
            <h5>Business Name</h5>
            <input
              type="text"
              name="businessName"
              className="border-2 "
              placeholder="business Name"
              value={select.businessName}
              onChange={(e) => handleChange(e) }
            />
          </div>
          <div className="flex justify-center">
            <button
            onClick={(e) => myBusinees_Register(e)}
              type="button"
              className=" rounded bg-[#FF6C00] px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyBusiness;
