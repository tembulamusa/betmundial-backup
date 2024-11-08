import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchInput = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSearch = () => {
        console.log("Search clicked for term:", searchTerm);
        if (onSearch) {
            onSearch(searchTerm);
        }
        setSearchTerm('');
    };
    
    //Awaiting Backend Completion

    return (
        <div className="flex items-center justify-center mr-4">           
           
            <div
                onMouseEnter={() => setIsFocused(true)}
                onMouseLeave={() => setIsFocused(false)}
                onClick={handleSearch}
                className={`flex items-center justify-center p-2 ml-2 rounded transition-colors duration-300 cursor-pointer 
                    ${isFocused ? 'bg-gray-200' : 'bg-transparent'}
                    hover:bg-gray-200`}
            >
                <FaSearch className="text-white text-lg" />
            </div>
        </div>
    );
};

export default SearchInput;
