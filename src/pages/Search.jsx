import React, { useEffect, useState } from "react";
import Listingitem from "../components/Listingitem";
// This dataArray is the temprary data which is coming from data.js the data.js is also a temprary file which is use to store temprary data.
import dataArray from "./data";
// NOTE: you have to set the data in the place of dataArray.
// Then you will all the hotel in the website.
export default function Search() {
  const [listings, setListings] = useState(null);
  // This firstTimeLoad is the variable which is use like a flag, which shows that the page is loaded first time.
  const [firstTimeLoad, setFirstTimeLoad] = useState(true);
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "desc",
    order: "desc",
  });
  // let [searchData, setSearchData] = useState([]);
  function handleChange(e) {
    e.preventDefault();
    const { currentTarget: input } = e;
    setSidebarData({ ...sidebarData, [input.id]: input.value });
  }
  function handleCheckbox(e) {
    const { currentTarget: input } = e;
    if (input.name === "type") {
      setSidebarData({ ...sidebarData, [input.name]: input.value });
    } else {
      setSidebarData({ ...sidebarData, [input.id]: input.checked });
    }
  }
  // This function run once when the search page will load
  // and show the data whose type is all.
  
  function handleSearch(e) {
    e?.preventDefault();
    const tempData = dataArray.filter((elem) => {
      return elem.data.type===sidebarData.type && elem.data.parking===sidebarData.parking && elem.data.furnished===sidebarData.furnished && elem.data.address.includes(sidebarData.searchTerm);
    });
    tempData.sort((a,b)=>{
      if(sidebarData.sort==="desc"){
        return +a.data.discountedPrice - +b.data.discountedPrice;
      }else{
        return +b.data.discountedPrice - +a.data.discountedPrice;
      }
    })
    setListings(tempData);
    setFirstTimeLoad(false);
  }
  return (
    <>
     {firstTimeLoad === true ? handleSearch() : ""} {/* this line aslo written to see the data when the page load first time */}
      <div className="flex flex-col md:flex-row">
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
          <form className="flex flex-col gap-8">
            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap font-semibold">
                Search Term:{" "}
              </label>
              <input
                type="text"
                name=""
                id="searchTerm"
                placeholder="Search..."
                className="border rounded-lg p-3 w-full"
                value={sidebarData.searchTerm}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-2 flex-wrap items-center ">
              <label className="font-semibold">Type: </label>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="type"
                  id="all"
                  value="all"
                  className="w-5 "
                  checked={sidebarData.type === "all"}
                  onChange={handleCheckbox}
                />
                <span>Rent & Sale</span>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="type"
                  id="rent"
                  value="rent"
                  className="w-5 "
                  checked={sidebarData.type === "rent"}
                  onChange={handleCheckbox}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="type"
                  id="sale"
                  value="sale"
                  className="w-5 "
                  checked={sidebarData.type === "sale"}
                  onChange={handleCheckbox}
                />
                <span>Sale</span>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap items-center ">
              <label className="font-semibold">Amenities: </label>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="parking"
                  id="parking"
                  value={sidebarData.parking}
                  className="w-5 "
                  checked={sidebarData.parking}
                  onChange={handleCheckbox}
                />
                <span>Parking</span>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="furnished"
                  id="furnished"
                  value={sidebarData.furnished}
                  className="w-5 "
                  checked={sidebarData.furnished}
                  onChange={handleCheckbox}
                />
                <span>Furnished</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <label className="font-semibold">Sort: </label>
              <select
                onChange={handleChange}
                defaultChecked={"created_at_desc"}
                id="sort"
                className="border rounded-lg">
                <option value="desc">Price high to low</option>
                <option value="asc">Price low to high</option>
              </select>
            </div>
            <button className="bg-slate-700 p-3 rounded-lg uppercase text-white hover:opacity-95" onClick={handleSearch}>
              Search
            </button>
          </form>
        </div>
        <div className="">
          <h1 className="text-3xl font-semibold p-3 border-b text-slate-700 mt-5">
            Listing Results...
            <main>
              <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                {listings?.map((listing) => (
                  <Listingitem
                    key={listing.id}
                    id={listing.id}
                    listing={listing.data}
                  />
                ))}
              </ul>
            </main>
          </h1>
        </div>
      </div>
    </>
  );
}
