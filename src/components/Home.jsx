import React, { useState, useEffect } from 'react';
import '../styles/style.scss';
import Logo from '../assets/logo.svg';
import Footer from './Footer';

function Home() {
// 定義狀態來存儲搜尋關鍵字
const [searchTerm, setSearchTerm] = useState('');
  
// 定義當前頁數
const [currentPage, setCurrentPage] = useState(1);

// 定義載入的表格資料
const [experiments, setExperiments] = useState([]);

// 每頁顯示的最大列數
const rowsPerPage = 5;

// 使用 useEffect 來載入 JSON 檔案中的資料
useEffect(() => {
  // 發送請求來載入資料
  fetch('/experiments.json')
    .then((response) => response.json())
    .then((data) => {
      setExperiments(data); // 更新資料狀態
    })
    .catch((error) => console.error('Error loading JSON:', error));
}, []);

// 搜尋後過濾的資料
const filteredList = experiments.filter((experiment) =>
  experiment.name.toLowerCase().includes(searchTerm.toLowerCase())
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
  setCurrentPage(1); // 當搜尋時重置為第一頁
};

// 處理頁數變更
const handlePageChange = (newPage) => {
  if (newPage > 0 && newPage <= totalPages) {
    setCurrentPage(newPage);
  }
};

  return (
    <div className='container'>
      <header className='navbar'>
        <img src={Logo} alt="" />
      </header>
      <main className='main_content'>
        <div className='searching_area'>
          <p className='searching_title'>Experiments</p>
          <div className='searching_result'>
            {/* 搜尋欄位 */}
            <input
              type="text"
              placeholder="Type keywords to filter database names"
              value={searchTerm}
              onChange={handleInputChange}
              className='input_style'
            />

            {/* 使用 Table 來顯示過濾後的列表 */}
            <div className='table_radius'>
              <table className='searching_table'>
                <thead>
                  <tr>
                    <th className="id-col">ID</th>
                    <th className="name-col">Experiment Name</th>
                    <th className="desc-col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedExperiments.length > 0 ? (
                    displayedExperiments.map((experiment) => (
                      <tr key={experiment.id}>
                        <td className="id-col">{experiment.id}</td>
                        <td className="name-col">{experiment.name}</td>
                        <td className="desc-col">{experiment.description}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className='empty'>No matching items found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* 分頁顯示區域 */}
            <div className='page'>
                <button 
                  onClick={() => handlePageChange(currentPage - 1)} 
                  disabled={currentPage === 1}
                  className='page_btn'
                >
                  Previous
                </button>
                <span className='page_info'>
                  P {currentPage} of {totalPages}
                </span>
                <button 
                  onClick={() => handlePageChange(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                  className='page_btn'
                >
                  Next
                </button>
              </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
