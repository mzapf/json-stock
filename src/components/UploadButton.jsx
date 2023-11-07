const UploadButton = ({ onFileLoaded }) => {
    const handleFileChange = (event) => {
        const fileReader = new FileReader();
        fileReader.readAsText(event.target.files[0], "UTF-8");
        fileReader.onload = e => {
            const content = JSON.parse(e.target.result);
            onFileLoaded(content);
        };
    };

    return (
        <label className="block">
            <span className="sr-only">Cargar archivo de stock</span>
            <input
                type="file"
                className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100"
                onChange={handleFileChange}
                accept=".json"
            />
        </label>
    );
};

export default UploadButton;
