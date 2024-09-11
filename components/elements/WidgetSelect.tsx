export const WidgetSelect = ({onChangeHandler, value, children}) => {
    return (
        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm leading-normal rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 pt-1.6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={onChangeHandler} value={value}>
            {children}
        </select>
    );
};
  