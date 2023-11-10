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

    const showMessage = () => {
        const difference = adjustedValue - originalValue;
        alert(`${itemName}: debería haber ${originalValue}, ${difference > 0 ? 'sobra' : 'falta'}${Math.abs(difference) > 1 ? 'n' : ''} ${Math.abs(difference)}.`);
    };

    const valuesMatch = adjustedValue === originalValue;

    return (
        <div className="pl-16 flex flex-row items-center">
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
            <span className="mr-2">{itemName}: {adjustedValue}</span>
            {valuesMatch ? (
                <span className="text-green-500 text-2xl">✓</span>
            ) : (
                <button className="text-red-500 text-2xl" onClick={showMessage} title={`Hay ${originalValue} en sistema`}>
                    ✕
                </button>
            )}
        </div>
    );

};

export default ItemControls;