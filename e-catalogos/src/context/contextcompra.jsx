import { createContext, useState, useEffect, useContext } from "react";
import { DataContext } from "./contextdata";

export const ContextCompra = createContext();

export const ContextCompraProvider = ({ children }) => {
  // Estado que armazena os dados da compra, iniciando com totalPrice = 0.00
  const [contextCompra, setContextCompra] = useState({ totalPrice: 0.00 });
  const { dataProducts = [] } = useContext(DataContext);

  useEffect(() => {
    if (!Array.isArray(dataProducts) || dataProducts.length === 0) return;

    // Calcula o preço total da compra
    const totalPrice = dataProducts.reduce((acc, { skus = [], price = 0, quantity = 0 }) => {
      // Calcula o total de pacotes disponíveis somando a quantidade mínima de cada SKU
      const totalPack = skus.reduce((sum, sku) => sum + (sku.min_quantity || 0), 0);

      const packPrice = totalPack * price;

      // soma no acumulador
      return acc + (quantity > 0 ? packPrice * quantity : 0);
    }, 0);

    setContextCompra({ totalPrice });
  }, [dataProducts]); // Executa esse cálculo sempre que dataProducts mudar
  return (
    <ContextCompra.Provider value={{ contextCompra, setContextCompra }}>
      {children}
    </ContextCompra.Provider>
  );
};
