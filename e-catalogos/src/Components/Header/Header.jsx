import { useContext } from "react";
import { DataContext } from "../../context/contextdata";
import "./Header.css"; 
import voltar from "../../assets/images/voltar-arrow.svg"; 
import whiteForwardArrow from "../../assets/images/white-button-forward.svg"; 
import whiteReturnArrow from "../../assets/images/white-button-return.svg"; 

export const Header = () => {
    const { dataProducts, currentIndexProducts, setCurrentIndexProducts } = useContext(DataContext);
      
    if (!Array.isArray(dataProducts) || dataProducts.length === 0) {
        return <p>Carregando produtos...</p>; 
    }

    // Pegando todas as categorias corretamente
    const listOfAllCategories = dataProducts.map(({ category }) => category).filter(Boolean);
    const categoryList = [...new Set(listOfAllCategories)]; // Remove duplicatas

    // Pegando a categoria do produto atual
    const actualCategory = dataProducts[currentIndexProducts]?.category || "Sem categoria";

    // Contando produtos dentro da categoria atual
    const productsInCategory = dataProducts.filter(({ category }) => category === actualCategory).length;

    // Pegando o índice da categoria atual dentro da lista de categorias
    let currentIndexCategory = categoryList.indexOf(actualCategory);

    // Mudando a categoria ao clicar nas setas
    const changeCategory = (direction) => {
      let nextIndexCategory = (currentIndexCategory + direction + categoryList.length) % categoryList.length;
      const firstProductOfCategory = dataProducts.find(({ category }) => category === categoryList[nextIndexCategory]);
      const indexProduct = dataProducts.indexOf(firstProductOfCategory);
      setCurrentIndexProducts(indexProduct);
    };
      
    return (
      <header className="header-container">
        <img src={voltar} alt="Botão para voltar" /> 

        <div className="product-section-container">
          <img src={whiteReturnArrow} onClick={() => changeCategory(-1)} alt="Seta Voltar" /> 
          
          <div>
            <p className="product-section">{`(${productsInCategory}) ${actualCategory}`}</p>
          </div>
          
          <img src={whiteForwardArrow} onClick={() => changeCategory(1)} alt="Seta Ir" /> 
        </div>

        <span className="botaoF">F</span>
      </header>
    );
};
