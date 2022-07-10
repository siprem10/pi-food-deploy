import React from "react";
import "./SearchBar.css";

function SearchBar({setFilter, search}) {

    function onSubmit(e){
        e.preventDefault();
    }

    // seteo el nuevo state en header
    function onSearch(e){
        setFilter(e.target.name, e.target.value);
    }

    return (
        <div className="seachBarContainer">
            <form onSubmit={onSubmit}>
                <div className="seachBarContainer">
                    <input
                        className="searchInput"
                        type="text"
                        placeholder="Search recipes..."
                        name="search"
                        value={search}
                        onChange={onSearch}>
                    </input>
                    <button className="searchBtn" type="submit" value="Search">
                        <div className="lupita"></div>
                    </button>                        
                </div>
            </form>
        </div>
    );
}

export default SearchBar;
