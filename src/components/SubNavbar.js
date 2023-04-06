import React, { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { TbCurrentLocation } from "react-icons/tb";
// import {IPinfoWrapper } from 'node-ipinfo'
const SubNavbar = () => {
  const [show, setShow] = useState(false);
  const [showLoctaion, setShowLoaction] = useState("");
  const [sliderData, setSliderData] = useState([]);

  const URL = "http://localhost:1337";
  useEffect(() => {
    const loaction = window.localStorage.getItem("loaction");
    setShowLoaction(loaction);

    fetch(
      `http://localhost:1337/api/website-frontend?populate[mainslidercom][populate]=*`,
      {}
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data.data.attributes.mainslidercom);
        setSliderData(data.data.attributes.mainslidercom);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  const showGetlocation = () => {
    fetch(`https://ipinfo.io/json?token=8519796055d440`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        window.localStorage.setItem("loaction", data.city);
        const loaction = window.localStorage.getItem("loaction");
        setShowLoaction(loaction);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="pt-8 px-12 ">
        <h1>Search across 3.4 Crore Businesses</h1>
        <div className="flex gap-4 ">
          <div className="flex flex-col gap-2">
            <input
              readOnly
              className="border-2 relative border-[#000]   h-12 w-64 px-6 py-2 rounded-md"
              placeholder="Select Location"
              value={showLoctaion}
              type="text"
              onFocus={() => {
                setShow(true);
              }}
            />
            <IoLocationOutline className="absolute top-[150px] left-14 " />
            {show ? (
              <div
                onClick={() => {
                  showGetlocation();
                  setShow(false);
                }}
                className="border-2 py-3 px-6 border-[#000] h-12 w-64 cursor-pointer rounded-md"
              >
                <span className=" relative">Detect Location</span>
                <TbCurrentLocation className="absolute top-[210px] left-14  " />
              </div>
            ) : (
              ""
            )}
          </div>
          <input
            className="border-2 border-[#000] h-12 w-96  rounded-md"
            type="text"
            placeholder="Search for services"
          />
        </div>
      </div>

      
    </>
  );
};

export default SubNavbar;
