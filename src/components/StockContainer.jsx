import React, { useState, useEffect } from 'react';
import CategoryButton from './CategoryButton';
import ItemControls from './ItemControls';

const StockContainer = ({ data }) => {
    const [stock, setStock] = useState(data);
    const [adjustedStock, setAdjustedStock] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);

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

    return (
        <div>
            {Object.keys(stock).map((category) => (
                <div key={category}>
                    <CategoryButton
                        category={category}
                        isSelected={selectedCategory === category}
                        onClick={() => setSelectedCategory(category)}
                    />
                    {selectedCategory === category && (
                        <div>
                            {Object.keys(stock[category]).map((subcategory) => (
                                <div key={subcategory}>
                                    <CategoryButton
                                        category={subcategory}
                                        isSelected={selectedSubcategory === subcategory}
                                        onClick={() => setSelectedSubcategory(subcategory)}
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
    );
};

export default StockContainer;