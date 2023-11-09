import React, { useState } from 'react';
import StockContainer from './components/StockContainer';
import UploadButton from './components/UploadButton';
import Footer from './components/Footer';
import './index.css';

function App() {
    const [stockData, setStockData] = useState(null);

    const handleFileLoaded = (jsonData) => {
        setStockData(jsonData);
    };

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <div className="flex flex-grow justify-center items-center p-4">
                    {!stockData && (
                        <div className="my-4">
                            <UploadButton onFileLoaded={handleFileLoaded} />
                        </div>
                    )}
                    {stockData && (
                        <StockContainer data={stockData} />
                    )}
                </div>
                <Footer />
            </div>
        </>
    );
}

export default App;