import { useState, useEffect, useContext } from 'react';
import React from 'react';
import { DataContext } from "../../context/contextdata";
import './TelaProduto.css';
import { Header } from '../Header/Header';
import { CarouselSlider } from '../Carousel/CarouselSlider'
import { Info } from '../Info/Info';
import { ProdutoRef } from '../Produto-Ref/ProdutoRef';
import { Valor } from '../Valor/Valor';
import { Pack } from '../Pack/Pack';
import { ProdutoInfo } from '../Produto-Info/ProdutoInfo';
import { SearchRef } from '../SearchRef/SearchRef'

export const TelaProduto = () => {
  const [infoModal, setInfoModal] = useState(false);
  const [findRefModal, setFindRefModal] = useState(false);
  const [imageActive, setImageActive] = useState(0);
  const { dataProducts, setDataProducts } = useContext(DataContext);

  const handleInfoModal = () => setInfoModal(!infoModal);
  const handleFindRefModal = () => setFindRefModal(!findRefModal);

  return (
    <>
      {dataProducts.length !== 0 && (
        <div className="container-tela-produto">
          <Header />
          <CarouselSlider imageActive={imageActive} setImageActive={setImageActive} />
          <Info
            handleInfoModal={handleInfoModal}
            handleFindRefModal={handleFindRefModal}
            setImageActive={setImageActive}
          />
          <div className="linha" />
          <ProdutoRef />
          <Valor />
          <Pack />
          {infoModal && <ProdutoInfo handleInfoModal={handleInfoModal} />}
          {findRefModal && <SearchRef handleFindRefModal={handleFindRefModal} />}
        </div>
      )}
    </>
  );
};