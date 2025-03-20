import { useContext } from "react";
import { DataContext } from "../../context/contextdata";
import "./Info.css";
import Carrinho from "../../assets/images/carrinho.svg";
import InfoIcon from "../../assets/images/info.svg";
import Pesquisa from "../../assets/images/pesquisa.svg";

export const Info = ({ handleInfoModal, handleFindRefModal, setImageActive }) => {
  const { dataProducts, currentIndexProducts } = useContext(DataContext);

  if (!Array.isArray(dataProducts) || dataProducts.length === 0) {
    return <p>Carregando produtos...</p>;
  }
  const currentProduct = dataProducts[currentIndexProducts];

  //Garante que o produto atual existe antes de tentar acessar suas imagens
  if (!currentProduct || !currentProduct.images) {
    return <p>Produto não encontrado...</p>;
  }

  return (
    <div className="info-container">
      <img onClick={handleInfoModal} src={InfoIcon} alt="Imagem de info" />
      <img onClick={handleFindRefModal} src={Pesquisa} alt="Imagem de lupa" />

      <div className="image-slider">
        {dataProducts[currentIndexProducts].images.map((item, index) => {
          return (
            <div className="image-container" key={index} onClick={() => setImageActive(index)}>
              <img src={item.path} alt="Imagem do produto" />
            </div>
          );
        })}
      </div>

      <img src={Carrinho} alt="Imagem de carrinho de compras" />
    </div>
  );
};
