import React, { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import "../styles/SideBar.css";
import qs from "qs";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideBar = () => {
  const history = useHistory();
  const [query, setQuery] = useState("");
  const { search } = useLocation();

  const buildQueryingString = (operation, valueObj) => {
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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(event);
    }
  };

  return (
    <div className="side-bar">
      <div className="wrapper">
        <form className="search">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <a className="search-button" href="#" onClick={handleSearch}>
            <FontAwesomeIcon className="search" icon={faSearch} />
          </a>
        </form>
        <div className="filter-by-city">
          <h1>Filter by city</h1>
          <ul className="cities">
            <Link className="sidebar-link" to="/view-properties">
              All
            </Link>
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
          </ul>
        </div>

        <div className="sort-by">
          <h1>Sort by</h1>
          <ul className="price">
            <Link
              className="sidebar-link"
              to={buildQueryingString("sort", { price: 1 })}
            >
              Price ascending
            </Link>
            <Link
              className="sidebar-link"
              to={buildQueryingString("sort", { price: -1 })}
            >
              Price descending
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
