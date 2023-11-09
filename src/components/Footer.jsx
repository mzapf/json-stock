import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="p-4 bg-gray-100 border-t mt-8">
            <a
                href="https://github.com/mzapf/json-stock"
                className="text-gray-700 hover:text-black justify-center flex items-center font-bold"
                target="_blank"
                rel="noopener noreferrer"
                title="Ver el código fuente en GitHub"
            >
                <FaGithub className="inline-block text-xl mr-2" />
                Matias Zapf
            </a>
        </footer>
    );
};

export default Footer;