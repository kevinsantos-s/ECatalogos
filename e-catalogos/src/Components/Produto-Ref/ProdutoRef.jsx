import { useContext } from "react";
import { DataContext } from "../../context/contextdata";
import "./ProdutoRef.css"; 

export const ProdutoRef = () => {
  const { dataProducts, currentIndexProducts } = useContext(DataContext);

  if (!Array.isArray(dataProducts) || dataProducts.length === 0 || !dataProducts[currentIndexProducts]) {
    return <p>Carregando produto...</p>;
  }

  const { name, price, reference } = dataProducts[currentIndexProducts]; 
  const firstName = name.split(' ')[0];
  const formattedPrice = price.toFixed(2).replace(',', '.');

  return (
    <div className="produtoref-container">
      <div className="ref">
        <p className="name">{firstName}</p>
        <p className="codigo"><span> REF: </span> {reference}</p>
        <p className="preco"><span> R$ </span> {formattedPrice}</p>
      </div>
    </div>
  );
};
