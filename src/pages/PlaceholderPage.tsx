import React from 'react';
import './PlaceholderPage.css';

interface PlaceholderPageProps {
    title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
    return (
        <div className="placeholder-page">
            <h1 className="placeholder-title">Hello {title}</h1>
            <p className="placeholder-subtitle">Contenido próximamente</p>
        </div>
    );
};

export default PlaceholderPage;
