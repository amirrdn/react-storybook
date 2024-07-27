import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FaTimes } from 'react-icons/fa';

const Dropdown = ({
  label,
  options,
  multiple = false,
  searchable = false,
  renderOption,
  zIndex = 1000,
  onChange,
  usePortal = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const portalRef = useRef(document.createElement('div'));

  useEffect(() => {
    if (usePortal) {
      document.body.appendChild(portalRef.current);
      const currentPortal = portalRef.current; // Simpan nilai ref ke variabel
      return () => {
        document.body.removeChild(currentPortal); // Gunakan variabel di sini
      };
    }
  }, [usePortal]);

  const toggleDropdown = () => setIsOpen(!isOpen);

//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//     }
// };
// useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);

//     // Cleanup the event listener on component unmount
//     return () => {
//         document.removeEventListener('mousedown', handleClickOutside);
//     };
// }, []);
  const handleOptionClick = (option) => {
    let updatedSelectedOptions;
    if (multiple) {
      updatedSelectedOptions = selectedOptions.includes(option)
        ? selectedOptions.filter((o) => o !== option)
        : [...selectedOptions, option];
    } else {
      updatedSelectedOptions = [option];
      setIsOpen(false);
    }
    setSelectedOptions(updatedSelectedOptions);
    if (onChange) onChange(multiple ? updatedSelectedOptions : option);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const highlightMatch = (option) => {
    if (!searchTerm) return option;
    const parts = option.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) => (
      <span
        key={index}
        className={part.toLowerCase() === searchTerm.toLowerCase() ? 'text-blue-500 font-bold' : ''}
      >
        {part}
      </span>
    ));
  };

  const renderDefaultOption = (option) => (
    <div
      key={option}
      className={`p-2 hover:bg-gray-200 cursor-pointer ${selectedOptions.includes(option) ? 'bg-gray-300' : ''}`}
      onClick={() => handleOptionClick(option)}
    >
      {highlightMatch(option)}
    </div>
  );

  const renderSelectedOptions = () => {
    return selectedOptions.map((option) => (
      <span key={option} className="p-1 bg-gray-200 rounded m-1 flex items-center">
        {option}
        <FaTimes
          className="ml-2 cursor-pointer"
          onClick={() => handleOptionClick(option)}
        />
      </span>
    ));
  };

  const dropdownMenu = (
    <div
      className="absolute left-0 w-full mt-2 bg-white border border-gray-300 rounded shadow-lg"
      style={{ zIndex }}
    >
      {searchable && (
        <input
          type="text"
          className="w-full p-2 border-b border-gray-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
      )}
      <div className="divide-y divide-gray-100">{filteredOptions.map(renderOption || renderDefaultOption)}</div>
    </div>
  );

  return (
    
    <div className="relative" ref={dropdownRef}>
      {label && <label className="block mb-2 text-gray-700">{label}</label>}
      <div
        className="p-2 border border-gray-300 rounded cursor-pointer flex flex-wrap"
        onClick={toggleDropdown}
      >
        {selectedOptions.length > 0 ? renderSelectedOptions() : 'Select options'}
      </div>
      {isOpen && (usePortal ? ReactDOM.createPortal(dropdownMenu, portalRef.current) : dropdownMenu)}
      
    </div>
  );
};

export default Dropdown;