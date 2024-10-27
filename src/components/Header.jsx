import React from 'react';
import { useNavigate } from 'react-router-dom'; // 引入 useNavigate
import '../styles/style.scss'; // 確保引入樣式
import Logo from '../assets/logo.svg';

function Header() {
    const navigate = useNavigate(); // 使用 useNavigate Hook

    const handleLogoClick = () => {
        navigate('/'); // 返回首頁
    };

    return (
        <header className="navbar">
            <img src={Logo} alt="Logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }} />
        </header>
    );
}

export default Header;
