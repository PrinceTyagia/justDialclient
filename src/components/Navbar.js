import React, { useEffect, useState } from "react";
// import logo from "../asset/img/jdlogosvg.svg";
import trading from "../asset/img/nav_trading_icon.svg";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { BsBoxArrowInRight } from "react-icons/bs";
import { Link,  useNavigate } from "react-router-dom";
// import {URL} from '../utils/Url'
import img from '../asset/img/nav_language_icon.svg'

const Navbar = () => {
  const naviagte =  useNavigate();
  const [navData, setNavdata] = useState(true);
  const [logo, setLogo] = useState(true);
  const token = window.localStorage.getItem("jwt_token");
  useEffect(() => {
   
    if (token === null) {
      //  console.log("token nhi ha ");
      setNavdata(true);
      naviagte("/")
    } else {
      //  console.log("token ha ");
      setNavdata(false);
    }
  }, [token]);
  fetch(`http://localhost:1337/api/website-logo?populate=*`).then((res)=>{
    return res.json()
  }).then((data) => {
  
   
    setLogo(data.data.attributes.image.data.attributes.url)
  }).catch((err) => {
    console.log(err);
  })
  const Logout = () => {
    window.localStorage.removeItem("jwt_token")
 
  }
  const myLang = (e)=> {
    console.log(e.target);
    let x = e.target.innerHTML
    if(x == 'हिन्दी'){
    e.target.innerHTML = 'English'
    window.localStorage.setItem("lang","hi");
    }else{
    e.target.innerHTML = 'हिन्दी'
    window.localStorage.setItem("lang","en");
    
  }
}
 

  return (
    <nav className="flex-no-wrap relative flex w-full items-center justify-between sm:py-2 py-6 border-b sm:flex-wrap sm:justify-start">
      <div className="flex w-full flex-wrap items-center justify-between px-6 sm:px-2">
        <div className="justify-between flex  flex-grow basis-[100%] items-center lg:flex lg:basis-auto">
          <Link
            className="mt-2 mr-2 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mt-0"
            to="/"
          >
            <img src={`http://localhost:1337${logo}`} className=" sm:h-3 h-6" alt="logo" loading="lazy" />
          </Link>
           
         
           <ul className="list-style-none ml-auto items-center flex flex-row pl-0 ">
            <li>
            <img src={img} alt=""/>
            </li>
            <li className="sm:pr-1 pr-4">
              <Link onClick={(e) => {myLang(e)}} className=" sm:text-[9px] text-base flex items-center text-blue-600" to="">
                
                हिन्दी
              </Link>
            </li>
            <li className="sm:pr-1 pr-4">
              <Link className=" sm:text-[9px] text-base " to="">
                We are Hiring
              </Link>
            </li>
            <li className="sm:pr-2 pr-4">
              <Link className="sm:text-[9px] text-base" to="">
                investor Relation
              </Link>
            </li>
            <li className="sm:pr-2 pr-4">
              <Link
                className="sm:text-[9px] text-base flex items-center"
                to=""
              >
                <img src={trading} className="pr-1 sm:text-[8px] " alt="logo" />
                {navData ? (
                  <Link to="">Free Listing</Link>
                ) : (
                  <Link to="/mybusiness">MyBusiness</Link>
                )}
              </Link>
            </li>
            <li className="sm:pr-2 pr-4">
              <MdOutlineNotificationsActive className="sm:text-[10px] text-[25px] " />
            </li>
            {navData ? (
              <li className="sm:pr-2 pr-4 flex items-center">
                <Link
                  className="sm:text-[9px] text-base flex items-center"
                  to="/login"
                >
                  <BsBoxArrowInRight className="sm:text-[10px] text-[25px] pr-1 " />
                  Login
                </Link>
                <span className="pr-1 pl-1 text-xl sm:text-[10px]  flex items-center">
                  /
                </span>
                <Link
                  className="sm:text-[9px] text-base items-center"
                  to="/register"
                >
                  Sign up
                </Link>
              </li>
            ) : (
              <div className="flex justify-center">
                <div>
                  <div className="relative" data-te-dropdown-ref>
                    <div
                      id="dropdownMenuButton1"
                      data-te-dropdown-toggle-ref
                      aria-expanded="false"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      <img
                        src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
                        className="w-8 rounded-full"
                        alt="Avatar"
                      />
                    </div>

                    <ul
                      className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                      aria-labelledby="dropdownMenuButton1"
                      data-te-dropdown-menu-ref
                    >
                      <li>
                        <Link
                          className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                          to="/profile"
                          data-te-dropdown-item-ref
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/"
                          className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                          data-te-dropdown-item-ref
                          onClick={Logout} >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
