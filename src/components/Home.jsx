import React, { useState, useEffect } from 'react';
import '../styles/style.scss';
import menu from '../assets/ic_menu.svg';
import Footer from './Footer';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/info');
    };

    // 搜尋關鍵字、當前頁數和實驗資料的狀態
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [experiments, setExperiments] = useState([]);

    // 收合面板、年齡範圍和性別選擇的狀態
    // 定義狀態來存儲多個面板的開合狀態
    const [filtersOpen, setFiltersOpen] = useState({
        demographics: false,
        disease: false,
        images: false,
        sequencing: false,
    });

    const [ageRange, setAgeRange] = useState(40);
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedethinicity, setSelectedEthinicity] = useState('');

    // 每頁顯示的最大列數
    const rowsPerPage = 10;

    // 使用 useEffect 來載入 JSON 檔案中的資料
    useEffect(() => {
        fetch('/experiments.json')
            .then((response) => response.json())
            .then((data) => setExperiments(data))
            .catch((error) => console.error('Error loading JSON:', error));
    }, []);

    // 搜尋後過濾的資料
    const filteredList = experiments.filter((experiment) =>
        experiment.tissue_id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 計算總頁數
    const totalPages = Math.ceil(filteredList.length / rowsPerPage);

    // 根據當前頁數來顯示的資料範圍
    const displayedExperiments = filteredList.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    // 處理搜尋輸入變更
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // 搜尋時重置為第一頁
    };

    // 處理頁數變更
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    // 處理收合面板切換
    // 通用的切換收合面板函數
    const toggleFilter = (filterName) => {
        setFiltersOpen((prevFiltersOpen) => ({
            ...prevFiltersOpen,
            [filterName]: !prevFiltersOpen[filterName],
        }));
    };


    // 處理年齡範圍變更
    const handleAgeChange = (e) => {
        setAgeRange(e.target.value);
    };

    // 處理性別選擇變更
    const handleGenderChange = (e) => {
        setSelectedGender(e.target.value);
    };
    // 處理語言選擇變更
    const handleEthinicityChange = (e) => {
        setSelectedEthinicity(e.target.value);
    };

    return (
        <div className="container">
            <Header />
            <main className="main-content">
                <div className="searching-area">
                    <p className="searching-title">Experiments</p>
                    <div className="searching-area-below">
                        {/* 收合面板區域 */}
                        <div className="searching-filter">
                            <span className="coll" onClick={() => toggleFilter('demographics')}>
                                <img src={menu} alt="Menu" />
                                <p>Demographics</p>
                            </span>
                            {filtersOpen.demographics && (
                                <div className="filter-content">
                                    <div className="filter-item">
                                        <label>- Age : {ageRange}</label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="80"
                                            value={ageRange}
                                            onChange={handleAgeChange}
                                            className="age-slider"
                                        />
                                        <section className='age-hint'>
                                            <span>1</span>
                                            <span>80</span>
                                        </section>
                                    </div>
                                    {/* Ethinicity */}
                                    <div className="filter-item">
                                        <label>- Ethinicity :</label>
                                        <div className="checkbox">
                                            <input
                                                type="radio"
                                                id="ethinicity-chinese"
                                                name="ethinicity"
                                                value="chinese"
                                                checked={selectedethinicity === 'chinese'}
                                                onChange={handleEthinicityChange}
                                            />
                                            <label htmlFor="ethinicity-chinese">Chinese</label>
                                        </div>
                                        <div className="checkbox">
                                            <input
                                                type="radio"
                                                id="ethinicity-malay"
                                                name="ethinicity"
                                                value="malay"
                                                checked={selectedethinicity === 'malay'}
                                                onChange={handleEthinicityChange}
                                            />
                                            <label htmlFor="ethinicity-malay">Malay</label>
                                        </div>
                                        <div className="checkbox">
                                            <input
                                                type="radio"
                                                id="ethinicity-indian"
                                                name="ethinicity"
                                                value="indian"
                                                checked={selectedethinicity === 'indian'}
                                                onChange={handleEthinicityChange}
                                            />
                                            <label htmlFor="ethinicity-indian">Indian</label>
                                        </div>
                                        <div className="checkbox">
                                            <input
                                                type="radio"
                                                id="ethinicity-eurasian"
                                                name="ethinicity"
                                                value="eurasian"
                                                checked={selectedethinicity === 'eurasian'}
                                                onChange={handleEthinicityChange}
                                            />
                                            <label htmlFor="ethinicity-eurasian">Eurasian</label>
                                        </div>
                                    </div>
                                    {/* Gender */}
                                    <div className="filter-item">
                                        <label>- Gender :</label>
                                        <div className="checkbox">
                                            <input
                                                type="radio"
                                                id="gender-male"
                                                name="gender"
                                                value="Male"
                                                checked={selectedGender === 'Male'}
                                                onChange={handleGenderChange}
                                            />
                                            <label htmlFor="gender-male">Male</label>
                                        </div>
                                        <div className="checkbox">
                                            <input
                                                type="radio"
                                                id="gender-female"
                                                name="gender"
                                                value="Female"
                                                checked={selectedGender === 'Female'}
                                                onChange={handleGenderChange}
                                            />
                                            <label htmlFor="gender-female">Female</label>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <span className="coll" onClick={() => toggleFilter('disease')}>
                                <img src={menu} alt="Menu" />
                                <p>By Disease</p>
                            </span>
                            {filtersOpen.disease && (
                                <div className="filter-content">
                                    <div className="filter-item">
                                        <label>- Disease :</label>
                                        <div className="checkbox">
                                            <input
                                                type="radio"
                                                id="disease-1"
                                                name="disease"
                                                value="1"
                                                onChange={() => {}}
                                            />
                                            <label htmlFor="disease-1">Colorectal Cancer</label>
                                        </div>
                                        <div className="checkbox">
                                            <input
                                                type="radio"
                                                id="disease-2"
                                                name="disease"
                                                value="2"
                                                onChange={() => {}}
                                            />
                                            <label htmlFor="disease-2">Nasopharyngeal Cancer</label>
                                        </div>
                                        <div className="checkbox">
                                            <input
                                                type="radio"
                                                id="disease-3"
                                                name="disease"
                                                value="3"
                                                onChange={() => {}}
                                            />
                                            <label htmlFor="disease-3">Breast Cancer</label>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <span className="coll" onClick={() => toggleFilter('images')}>
                                <img src={menu} alt="Menu" />
                                <p>Imaging data</p>
                            </span>
                            {filtersOpen.images && (
                                <div className="filter-content">
                                    <div className="filter-item">
                                        <label>- Data :</label>
                                        <div className="checkbox">
                                            <input
                                                type="radio"
                                                id="data-1"
                                                name="data"
                                                value="1"
                                                onChange={() => {}}
                                            />
                                            <label htmlFor="data-1">PET scan</label>
                                        </div>
                                        <div className="checkbox">
                                            <input
                                                type="radio"
                                                id="data-2"
                                                name="data"
                                                value="2"
                                                onChange={() => {}}
                                            />
                                            <label htmlFor="data-2">X-Ray</label>
                                        </div>
                                        <div className="checkbox">
                                            <input
                                                type="radio"
                                                id="data-3"
                                                name="data"
                                                value="3"
                                                onChange={() => {}}
                                            />
                                            <label htmlFor="data-3">MRI Scan</label>
                                        </div>
                                        <div className="checkbox">
                                            <input
                                                type="radio"
                                                id="data-4"
                                                name="data"
                                                value="4"
                                                onChange={() => {}}
                                            />
                                            <label htmlFor="data-4">CT Scan</label>
                                        </div>
                                        <div className="checkbox">
                                            <input
                                                type="radio"
                                                id="data-5"
                                                name="data"
                                                value="5"
                                                onChange={() => {}}
                                            />
                                            <label htmlFor="data-5">Ultrasounds</label>
                                        </div>
                                        <div className="checkbox">
                                            <input
                                                type="radio"
                                                id="data-6"
                                                name="data"
                                                value="6"
                                                onChange={() => {}}
                                            />
                                            <label htmlFor="disease-6">Other imaging datas</label>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <span className="coll" onClick={() => toggleFilter('sequencing')}>
                                <img src={menu} alt="Menu" />
                                <p>By Disease</p>
                            </span>
                            {filtersOpen.sequencing && (
                                <div className="filter-content">
                                    <div className="filter-item">
                                        <label>- Data :</label>
                                        <div className="checkbox">
                                            <input
                                                type="radio"
                                                id="sequencing-1"
                                                name="sequencing"
                                                value="1"
                                                onChange={() => {}}
                                            />
                                            <label htmlFor="sequencing-1">DNA Sequencing</label>
                                        </div>
                                        <div className="checkbox">
                                            <input
                                                type="radio"
                                                id="sequencing-2"
                                                name="sequencing"
                                                value="2"
                                                onChange={() => {}}
                                            />
                                            <label htmlFor="sequencing-2">RNA Sequencing </label>
                                        </div>
                                        <div className="checkbox">
                                            <input
                                                type="radio"
                                                id="sequencing-3"
                                                name="sequencing"
                                                value="3"
                                                onChange={() => {}}
                                            />
                                            <label htmlFor="sequencing-3">Sanger Sequencing</label>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <button className='page-btn2'>Apply</button>
                        </div>
                        
                        <div className="searching-result">
                            {/* 搜尋欄位 */}
                            <input
                                type="text"
                                placeholder="Type keywords to filter database names"
                                value={searchTerm}
                                onChange={handleInputChange}
                                className="input-style"
                            />

                            {/* 使用 Table 來顯示過濾後的列表 */}
                            <div className="table-radius">
                                <table className="searching-table">
                                    <thead>
                                        <tr>
                                            <th className="id-col">Tissue ID</th>
                                            <th className="name-col">Tissue Origin</th>
                                            <th className="type-col">Tissue Type</th>
                                            <th className="dis-col">Associated Disease</th>
                                            <th className="ava-col">Tissue Availability</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {displayedExperiments.length > 0 ? (
                                            displayedExperiments.map((experiment) => (
                                                <tr onClick={handleButtonClick} key={experiment.tissue_id}>
                                                    <td className="id-col">{experiment.tissue_id}</td>
                                                    <td className="name-col">{experiment.tissue_origin}</td>
                                                    <td className="type-col">{experiment.tissue_type}</td>
                                                    <td className="dis-col">{experiment.associated_disease}</td>
                                                    <td className="ava-col">{experiment.tissue_availability}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="empty">
                                                    No matching items found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            {/* 分頁顯示區域 */}
                            <div className="page">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="page-btn"
                                >
                                    Previous
                                </button>
                                <span className="page-info">
                                    P {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="page-btn"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Home;
