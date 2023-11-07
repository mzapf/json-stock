const CategoryButton = ({ category, isSelected, onClick, isSubcategory }) => {
    const baseStyle = "p-2 rounded m-1 transition-colors duration-300";
    const selectedStyle = isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700';
    const subcategoryStyle = isSubcategory ? 'ml-4' : '';
    const subcategorySelectedStyle = isSelected && isSubcategory ? 'bg-orange-500' : '';

    return (
        <button
            className={`${baseStyle} ${selectedStyle} ${subcategoryStyle} ${subcategorySelectedStyle}`}
            onClick={onClick}
        >
            {category}
        </button>
    );
};

export default CategoryButton;

