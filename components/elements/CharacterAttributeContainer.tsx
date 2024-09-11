export const CharacterAttributeContainer = ({title, children}) => {
    return (
        <div className="px-8 py-4 rounded-xl shadow-lg bg-white">
            <h2 className="text-2xl mb-2 mt-0">{title}</h2>
            {children}
        </div>
    );
};
  