import React, { useState, useEffect } from 'react';
import CategoryButton from './CategoryButton';
import ItemControls from './ItemControls';
import SaveToPDF from './SaveToPDF';

const StockContainer = ({ data }) => {
    const [stock, setStock] = useState(data);
    const [adjustedStock, setAdjustedStock] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [showDifferences, setShowDifferences] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filterItems = (items) => {
        return Object.entries(items).reduce((acc, [key, value]) => {
            if (key.toLowerCase().includes(searchTerm)) {
                acc[key] = value;
            }
            return acc;
        }, {});
    };

    const getFilteredStock = () => {
        if (!searchTerm) return stock;
        return Object.keys(stock).reduce((filteredCategories, category) => {
            const subcategories = Object.keys(stock[category]).reduce((filteredSubcategories, subcategory) => {
                const filteredItems = filterItems(stock[category][subcategory]);
                if (Object.keys(filteredItems).length > 0) {
                    filteredSubcategories[subcategory] = filteredItems;
                }
                return filteredSubcategories;
            }, {});

            if (Object.keys(subcategories).length > 0) {
                filteredCategories[category] = subcategories;
            }
            return filteredCategories;
        }, {});
    };

    const filteredStock = getFilteredStock();

    const toggleDifferences = () => {
        setShowDifferences(!showDifferences);
    };

    useEffect(() => {
        initializeAdjustedStock(data);
    }, [data]);

    const initializeAdjustedStock = (data) => {
        let initializedData = {};
        for (const category in data) {
            initializedData[category] = {};
            for (const subcategory in data[category]) {
                const sortedItemKeys = Object.keys(data[category][subcategory]).sort();
                initializedData[category][subcategory] = sortedItemKeys.reduce((obj, key) => {
                    obj[key] = 0;
                    return obj;
                }, {});
            }
        }
        setAdjustedStock(initializedData);
    };



    const handleIncrement = (category, subcategory, itemName, amount) => {
        setAdjustedStock(prevAdjustedStock => {
            const newAdjustedStock = JSON.parse(JSON.stringify(prevAdjustedStock));
            newAdjustedStock[category][subcategory][itemName] =
                (newAdjustedStock[category][subcategory][itemName] || 0) + amount;
            return newAdjustedStock;
        });
    };

    const handleDecrement = (category, subcategory, itemName, amount) => {
        setAdjustedStock(prevAdjustedStock => {
            const newAdjustedStock = JSON.parse(JSON.stringify(prevAdjustedStock));
            newAdjustedStock[category][subcategory][itemName] =
                (newAdjustedStock[category][subcategory][itemName] || 0) - amount;
            if (newAdjustedStock[category][subcategory][itemName] < 0) {
                newAdjustedStock[category][subcategory][itemName] = 0;
            }
            return newAdjustedStock;
        });
    };

    const findDifferences = (adjustedStock, originalStock) => {
        let differences = {};

        for (const category of Object.keys(adjustedStock)) {
            for (const subcategory of Object.keys(adjustedStock[category])) {
                for (const item of Object.keys(adjustedStock[category][subcategory])) {
                    let adjustedValue = adjustedStock[category][subcategory][item];
                    let originalValue = originalStock[category][subcategory][item];

                    if (adjustedValue !== originalValue) {
                        if (!differences[category]) differences[category] = {};
                        if (!differences[category][subcategory]) differences[category][subcategory] = [];

                        differences[category][subcategory].push({
                            item,
                            adjustedValue,
                            originalValue,
                        });
                    }
                }
            }
        }

        return differences;
    };

    const differences = findDifferences(adjustedStock, data);

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar item..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="mb-4 p-2 border rounded"
            />
            <div>
                {Object.keys(filteredStock).map((category) => (
                    <div key={category}>
                        <CategoryButton
                            category={category}
                            isSelected={selectedCategory === category}
                            onClick={() => setSelectedCategory(selectedCategory !== category ? category : null)}
                        />
                        {selectedCategory === category && (
                            <div>
                                {Object.keys(filteredStock[category]).map((subcategory) => (
                                    <div key={subcategory}>
                                        <CategoryButton
                                            category={subcategory}
                                            isSelected={selectedSubcategory === subcategory}
                                            onClick={() => setSelectedSubcategory(selectedSubcategory !== subcategory ? subcategory : null)}
                                            isSubcategory={true}
                                        />
                                        {selectedSubcategory === subcategory && (
                                            <div>
                                                {Object.entries(filteredStock[category][subcategory])
                                                    .sort(([itemNameA], [itemNameB]) => itemNameA.localeCompare(itemNameB))
                                                    .map(([itemName, value]) => (
                                                        <ItemControls
                                                            key={itemName}
                                                            itemName={itemName}
                                                            originalValue={value}
                                                            adjustedValue={adjustedStock[category]?.[subcategory]?.[itemName] || 0}
                                                            onIncrement={(amount) => handleIncrement(category, subcategory, itemName, amount)}
                                                            onDecrement={(amount) => handleDecrement(category, subcategory, itemName, amount)}
                                                        />
                                                    ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="flex flex-col">
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                    onClick={toggleDifferences}
                >
                    {showDifferences ? 'Ocultar Diferencias' : 'Ver Diferencias'}
                </button>
                {showDifferences && (
                    <div className="my-2">
                        {Object.keys(differences).length > 0 ? (
                            Object.entries(differences).map(([category, subcategories]) => (
                                <div key={category}>
                                    <h1 className="text-xl font-semibold">{category}</h1>
                                    {Object.entries(subcategories).map(([subcategory, items]) => (
                                        <div key={subcategory}>
                                            <h2 className="text-lg font-semibold ml-4">{subcategory}</h2>
                                            {items.map((item) => (
                                                <div key={item.item} className="ml-8">
                                                    {`${item.item}: debería haber ${item.originalValue} y hay ${item.adjustedValue}, ${item.adjustedValue > item.originalValue ? 'sobran' : 'faltan'} ${Math.abs(item.adjustedValue - item.originalValue)}.`}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ))
                        ) : (
                            <p>No hay diferencias.</p>
                        )}
                    </div>
                )}
                <SaveToPDF differences={differences} />
            </div>
        </div>
    );
};

export default StockContainer;