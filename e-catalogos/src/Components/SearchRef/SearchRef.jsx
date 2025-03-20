import { useContext, useState } from "react";
import { DataContext } from "../../context/contextdata";
import Remover from '../../assets/images/remover.svg';
import "./SearchRef.css";

export const SearchRef = ({ handleFindRefModal }) => {
  const [inputValue, setInputValue] = useState('');
  const [refNotFound, setRefNotFound] = useState(false);
  const { dataProducts, setCurrentIndexProducts } = useContext(DataContext);

  const searchRef = () => {
    const foundRef = dataProducts.find(({ reference }) => reference === inputValue);

    if (foundRef) {
      // Se encontrar, define o índice do produto atual
      setCurrentIndexProducts(dataProducts.indexOf(foundRef));
      handleFindRefModal(); // Fecha o modal após a busca
      setRefNotFound(false);
    } else {
      setRefNotFound(true);
    }
  };

  return (
    <div className="find-ref-container">
      <div className="container">
        <div className="title-container">
          <h1 className="title">BUSCAR POR REF</h1>
          <img src={Remover} alt="Fechar" onClick={handleFindRefModal} />
        </div>

        <div className="content-container">
          <div className="search-box">
            <input 
              type="text" 
              value={inputValue} 
              placeholder="00.00.0000" 
              onChange={e => setInputValue(e.target.value)} 
            />
            {refNotFound && <p>Referência não encontrada</p>}

            <button type="button" onClick={searchRef}>Buscar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
