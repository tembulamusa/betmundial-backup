import React, { useState, useContext, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Context } from "../../context/store";

const SearchInput = ({ onSearch }) => {
    const [state] = useContext(Context);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [categories, setCategories] = useState([]); 
    const [competitions, setCompetitions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const categoriesData = state?.categories || [];
        setCategories(categoriesData);

        const competitionsData = categoriesData?.flatMap(category => category.competitions || []);
        setCompetitions(competitionsData);
    }, [state?.categories]); 

    const handleSearch = () => {
        const filteredCategories = categories.filter(category =>
            category.sport_name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const filteredCompetitions = competitions.filter(competition =>
            competition.competition_name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const results = [...filteredCategories, ...filteredCompetitions];

        if (results.length === 0) {
            alert('No results found for your search!');
        } else {
            console.log('Filtered Results:', results);
        }

        if (onSearch) {
            onSearch(results);
        }

        setSearchTerm('');
        setIsOpen(false);
    };

    return (
        <div className="flex items-center justify-center mr-4">
            {isOpen && (
                <input
                    type="text"
                    placeholder="Search ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 rounded-l-md text-gray-800"
                />
            )}
            
            <div
                onMouseEnter={() => setIsFocused(true)}
                onMouseLeave={() => setIsFocused(false)}
                onClick={() => {
                    if (!isOpen) {
                        setIsOpen(true);
                    } else {
                        handleSearch();
                    }
                }}
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
