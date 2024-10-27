import React, { useState, useEffect } from 'react';
import '../styles/style.scss';
import expand from '../assets/ic_expand.svg';
import menu from '../assets/ic_menu.svg';
import download from '../assets/ic_download.svg';
import imgdata from '../assets/ic_imgdata.svg';
import card from '../assets/ic_card.svg';
import img1 from '../assets/Esophageal Cancer.jpg'
import img2 from '../assets/Gallbladder Cancer.jpg'
import img3 from '../assets/Splenic Lymphoma.jpg'
import img4 from '../assets/Testicular Cancer.jpg'
import Footer from './Footer';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const Info = () => {
    return (
        <div className='container'>
            <Header />
            <main className='main-content-info'>
                <div className='container-info'>
                    <section className='info-section'>
                        <h1>Experiment 3
                        </h1>
                        <p>In-vitro tissue culture</p>
                    </section>
                    <section className='info-section'>
                        <h1>Description
                        </h1>
                        <p>Grows tissues outside the body  to study cell behaviour</p>
                    </section>
                    <button className='page-btn'>
                        <img src={expand} alt="" />
                        Expand
                    </button>
                    <section className='info-title'>
                        <img src={imgdata} alt="" />
                        <h1>Imaging data</h1>
                    </section>
                    <div className='img-container'>
                        <img src={img1} alt="" />
                        <img src={img2} alt="" />
                        <img src={img3} alt="" />
                        <img src={img4} alt="" />
                    </div>
                    <section className='info-title'>
                        <img src={menu} alt="" />
                        <h1>Sequencing data</h1>
                    </section>
                    <div className='info-container'>
                        <div className='info-text'>
                            <div className='info-text-left'>
                                <img src={card} alt="" />
                                RNAseq21_xxxx.varScan.snp.vcf
                            </div>
                            <button className='info-text-btn'>
                                <img src={download} alt="" />
                                Download
                            </button>
                        </div>
                        <div className='info-text'>
                            <div className='info-text-left'>
                                <img src={card} alt="" />
                                DNAseq21_xxxx.varScan.snp.vcf
                            </div>
                            <button className='info-text-btn'>
                                <img src={download} alt="" />
                                Download
                            </button>
                        </div>
                    </div>
                    

                </div>
                
            </main>
        <Footer />
        </div>
    );
};

export default Info;
