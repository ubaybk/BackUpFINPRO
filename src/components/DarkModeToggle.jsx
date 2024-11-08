import React from 'react';

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={darkMode}
        onChange={toggleDarkMode}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer  peer-checked:bg-blue-600 peer-focus:outline-none">
        <div
          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
            darkMode ? 'translate-x-5' : ''
          }`}
        ></div>
      </div>
    </label>
  );
};

export default DarkModeToggle;
