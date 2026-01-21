import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Trophy, Network, AlertCircle, Target } from 'lucide-react';
import './Header.css';

const Header: React.FC = () => {
    const location = useLocation();

    const navLinks = [
        { path: '/factos', label: 'Factos', icon: BookOpen },
        { path: '/ranking', label: 'Ranking', icon: Trophy },
        { path: '/modelo-seiz', label: 'Modelo SEIZ', icon: Network },
        { path: '/sobre-fakenews', label: 'Sobre Fakenews', icon: AlertCircle },
        { path: '/proyecto-polarizor', label: 'Proyecto Polarizor', icon: Target },
    ];

    return (
        <header className="header">
            <div className="header-content">
                {/* Logo izquierdo */}
                <div className="header-logo">
                    <Link to="/">
                        <span className="logo-text">FACTO<span className="logo-highlight">WAR</span></span>
                    </Link>
                </div>

                {/* Navegación central - CAPSULA */}
                <nav className="header-nav">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                            >
                                <Icon size={14} className="nav-icon" />
                                <span>{link.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Logo derecho - Fundación Igualdad */}
                <div className="header-logo-right">
                    <img
                        src="/imgs/isologo_igualdad.png"
                        alt="Fundación Igualdad"
                        className="logo-igualdad"
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
