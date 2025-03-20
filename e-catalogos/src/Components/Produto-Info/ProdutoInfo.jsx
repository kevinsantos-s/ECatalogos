import { useContext } from "react";
import { DataContext } from "../../context/contextdata";
import "./ProdutoInfo.css";
import closeButton from "../../assets/images/close-button.svg";

export const ProdutoInfo = ({ handleInfoModal }) => {
  const { dataProducts, currentIndexProducts } = useContext(DataContext);

  if (!dataProducts[currentIndexProducts]) {
    return <p>Carregando produto...</p>;
  }

  // irá procurar por esses nomes no JSON
  const { name, reference, brand, category, gender, colors } = dataProducts[currentIndexProducts];

  return (
    <div className="produtoinfo-container">
      <div className="container">
        <div className="title-container">
          <h1 className="title">Informações</h1>
          <img src={closeButton} alt="Fechar" onClick={handleInfoModal} />
        </div>

        <div className="content-container">
          <p className="colors">Cores</p>
          <div className="color-content">
            {colors && colors.map((color, index) => (
              <div key={index} style={{ backgroundColor: `#${color.cod_hex}` }}>
                {color.color_name}
              </div>
            ))}
          </div>

          <p className="info">Nome do produto: <span>{name}</span></p>
          <p className="info">Referência: <span>{reference}</span></p><p className="info">Marca: <span>{brand}</span></p>
          <p className="info">Categoria: <span>{category}</span></p>
          <p className="info">Gênero: <span>{gender}</span></p>
        </div>
      </div>
    </div>
  );
};
