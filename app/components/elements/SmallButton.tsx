"use client";

export const SmallButton = ({text, color = "blue"}) => {
  const buttonClasses = (color) => {
    switch (color) {
      case "blue": 
        return "min-w-9 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-small rounded-xl text-sm px-2 py-1 text-center me-1 mb-1 ";
      case "green":
        return "min-w-9 text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-small rounded-xl text-sm px-2 py-1 text-center me-1 mb-1 ";
      case "red":
        return "min-w-9 text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-small rounded-xl text-sm px-2 py-1 text-center me-1 mb-1 ";
      case "yellow":
        return "min-w-9 text-white bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 shadow-lg shadow-yellow-500/50 dark:shadow-lg dark:shadow-yellow-800/80 font-small rounded-xl text-sm px-2 py-1 text-center me-1 mb-1 "; 
      case "purple":
        return "min-w-9 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-small rounded-xl text-sm px-2 py-1 text-center me-1 mb-1 ";
      default:
        return "min-w-9 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-small rounded-xl text-sm px-2 py-1 text-center me-1 mb-1 ";
      }
  }
  return (
    <button type="submit" className={buttonClasses(color)}>{text}</button>
  );
};
