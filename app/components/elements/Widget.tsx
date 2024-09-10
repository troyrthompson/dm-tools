export const Widget = ({title, children}) => {
    return (
        <div className="flex flex-wrap justify-center">
            <div className="flex flex-col gap-2 py-4 px-5 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 no-underline">
            <h2 className="block text-md font-semibold mb-1">{title}</h2>
                {children}
            </div>
        </div>
    );
};
  