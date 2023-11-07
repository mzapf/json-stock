const ItemControls = ({ itemName, originalValue, adjustedValue, onIncrement, onDecrement }) => {

    const changeValue = (isIncrement) => {
        let amountStr = prompt(`¿Cuántas unidades desea ${isIncrement ? 'agregar' : 'quitar'}?`);
        let amount = parseInt(amountStr, 10);
        if (!isNaN(amount)) {
            isIncrement ? onIncrement(amount) : onDecrement(amount);
        } else {
            alert('Por favor, introduzca un número válido.');
        }
    };

    return (
        <div className="pl-8 flex flex-row">
            <div>
                <button
                    className="bg-green-500 text-white px-2 m-1 rounded"
                    onClick={() => changeValue(true)}
                >
                    +
                </button>
                <button
                    className="bg-red-500 text-white px-2 m-1 mr-4 rounded"
                    onClick={() => changeValue(false)}
                >
                    -
                </button>
            </div>
            <div>
                <span>{itemName}: {adjustedValue} </span>
                <span className="text-gray-500">({originalValue})</span>
            </div>
        </div>
    );

};

export default ItemControls;
