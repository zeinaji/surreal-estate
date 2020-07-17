import React, { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import "../styles/SideBar.css";
import qs, { stringify } from "qs";

const SideBar = () => {
  const location = useLocation();
  const history = useHistory();
  const [query, setQuery] = useState("");

  const buildQueryingString = (operation, valueObj) => {
    const { search } = location;
    const currentQueryParams = qs.parse(search, { ignoreQueryPrefix: true });

    const newQueryParams = {
      ...currentQueryParams,
      [operation]: JSON.stringify({
        ...JSON.parse(currentQueryParams[operation] || "{}"),
        ...valueObj,
      }),
    };
    return qs.stringify(newQueryParams, {
      addQueryPrefix: true,
      encode: false,
    });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const newQueryString = buildQueryingString("query", {
      title: { $regex: query.charAt(0).toUpperCase() + query.slice(1) },
    });
    history.push(newQueryString);
  };
  return (
    <div className="side-bar">
      {/* <form onSubmit={handleSearch}>*/}
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search-button" type="submit" onClick={handleSearch}>
        Search
      </button>
      {/* </form> */}
      <h1>Filter by city</h1>
      <Link
        className="sidebar-link"
        to={buildQueryingString("query", { city: "Manchester" })}
      >
        Manchester
      </Link>
      <Link
        className="sidebar-link"
        to={buildQueryingString("query", { city: "Sheffield" })}
      >
        Sheffield
      </Link>
      <Link
        className="sidebar-link"
        to={buildQueryingString("query", { city: "Leeds" })}
      >
        Leeds
      </Link>
      <Link
        className="sidebar-link"
        to={buildQueryingString("query", { city: "Liverpool" })}
      >
        Liverpool
      </Link>
      <h1>Sort by</h1>
      <Link
        className="sidebar-link"
        to={buildQueryingString("sort", { price: 1 })}
      >
        Price Ascending
      </Link>
      <Link
        className="sidebar-link"
        to={buildQueryingString("sort", { price: -1 })}
      >
        Price descending
      </Link>
    </div>
  );
};

export default SideBar;
