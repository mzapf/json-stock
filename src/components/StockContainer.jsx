import React, { useState, useEffect } from 'react';
import CategoryButton from './CategoryButton';
import ItemControls from './ItemControls';

const StockContainer = ({ data }) => {
    const [stock, setStock] = useState(data);
    const [adjustedStock, setAdjustedStock] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [showDifferences, setShowDifferences] = useState(false);

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
                initializedData[category][subcategory] = {};
                for (const item in data[category][subcategory]) {
                    initializedData[category][subcategory][item] = 0;
                }
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
            <div>
                {Object.keys(stock).map((category) => (
                    <div key={category}>
                        <CategoryButton
                            category={category}
                            isSelected={selectedCategory === category}
                            onClick={() => setSelectedCategory(selectedCategory !== category ? category : null)}
                        />
                        {selectedCategory === category && (
                            <div>
                                {Object.keys(stock[category]).map((subcategory) => (
                                    <div key={subcategory}>
                                        <CategoryButton
                                            category={subcategory}
                                            isSelected={selectedSubcategory === subcategory}
                                            onClick={() => setSelectedSubcategory(selectedSubcategory !== subcategory ? subcategory : null)}
                                            isSubcategory={true}
                                        />
                                        {selectedSubcategory === subcategory && (
                                            <div>
                                                {Object.entries(stock[category][subcategory]).map(([itemName, value]) => (
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
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                onClick={toggleDifferences}
            >
                {showDifferences ? 'Ocultar Diferencias de Stock' : 'Ver Diferencias de Stock'}
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
                                                {`${item.item}: debería haber ${item.originalValue} y hay ${item.adjustedValue}`}
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
        </div>
    );
};

export default StockContainer;