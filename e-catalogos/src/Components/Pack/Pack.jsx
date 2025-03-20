import { DataContext } from "../../context/contextdata";
import { useContext } from "react";
import Igual from '../../assets/images/igual.svg';
import "./Pack.css";

export const Pack = () => {
  const { dataProducts, currentIndexProducts } = useContext(DataContext);

  if (!Array.isArray(dataProducts) || dataProducts.length === 0) {
    return <p>Carregando produtos...</p>;
  }
 
  // Se for undefined ou falso, retornará array vazio, caso contrário receberá o valor
  const product = dataProducts[currentIndexProducts] || {};
  const skus = product.skus || [];

  // Criando um objeto com as quantidades mínimas de cada tamanho
  const sizes = {
    P: skus.find(sku => sku.size === "P")?.min_quantity || 0,
    M: skus.find(sku => sku.size === "M")?.min_quantity || 0,
    G: skus.find(sku => sku.size === "G")?.min_quantity || 0,
    GG: skus.find(sku => sku.size === "GG")?.min_quantity || 0,
  };

  // Somando todas as quantidades mínimas para obter o total do pack
  const totalPack = sizes.P + sizes.M + sizes.G + sizes.GG;

  return (
    <div className="pack-container">
      <div className="pack"> {sizes.P} <span className="dimensao"> P </span> </div>
      <div className="pack"> {sizes.M} <span className="dimensao"> M </span> </div>
      <div className="pack"> {sizes.G} <span className="dimensao"> G </span> </div>
      <div className="pack"> {sizes.GG} <span className="dimensao"> GG </span> </div>

      <img src={Igual} alt="Sinal de igual" />

      <div className="pack"> {totalPack} <span className="packtotal"> PACK </span> </div>
    </div>
  );
};
