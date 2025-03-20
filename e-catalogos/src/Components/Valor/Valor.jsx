import { useContext } from "react";
import { ContextCompra } from "../../context/contextcompra";
import { DataContext } from "../../context/contextdata";
import Remover from "../../assets/images/remover.svg";
import Adicionar from "../../assets/images/adicionar-button.svg";
import "./Valor.css"; 

export const Valor = () => {
  const { contextCompra, setContextCompra } = useContext(ContextCompra); 
  const { dataProducts = [], setDataProducts, currentIndexProducts } = useContext(DataContext);

  const product = dataProducts?.[currentIndexProducts] || {}; 
  const { skus = [], price = 0, quantity = 0, id } = product;

  const totalPack = skus.reduce((acc, sku) => acc + (sku.min_quantity || 0), 0);
  const packPrice = totalPack * price;
  const currentPrice = quantity > 0 ? packPrice * quantity : 0;

  const formatPrice = (value) => value.toFixed(2).replace('.', ',');

  const updateQuantity = (newQuantity) => {
    if (!id) return; 
    const newData = dataProducts.map(item => (
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
    setDataProducts(newData);

    // Atualiza o total acumulado de todos os produtos
    const totalAcumulado = newData.reduce((acc, { skus = [], price = 0, quantity = 0 }) => {
      const totalPack = skus.reduce((sum, sku) => sum + (sku.min_quantity || 0), 0);
      const packPrice = totalPack * price;
      return acc + (quantity > 0 ? packPrice * quantity : 0);
    }, 0);

    if (setContextCompra) {
      setContextCompra({ totalPrice: totalAcumulado });
    }
  };

  const addProduct = () => updateQuantity(quantity + 1);
  const removeProduct = () => {
    if (quantity > 0) {
      updateQuantity(quantity - 1);
    }
  };

  return (
    <div className="containervalor">
      <div className="preco">
        <p className="desc">Atual</p>
        <p>{`R$ ${formatPrice(currentPrice)}`}</p>
      </div>

      <div className="removeadd">
        <img onClick={removeProduct} src={Remover} alt="Botão de remover" />
        <p>{quantity}</p>
        <img onClick={addProduct} src={Adicionar} alt="Botão de adicionar" />
      </div>

      <div className="preco">
        <p className="desc">Acumulado</p>
        <p>{`R$ ${formatPrice(contextCompra.totalPrice)}`}</p> 
      </div>
    </div>
  );
};
