import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [dataProducts, setDataProducts] = useState([]);

   // Estado para armazenar o índice do produto atual que está sendo visualizado
  const [currentIndexProducts, setCurrentIndexProducts] = useState(0);

  // Verificando se os produtos foram carregados corretamente
  console.log("Produtos carregados:", dataProducts);
  console.log("Índice atual:", currentIndexProducts);
  console.log("Produto atual:", dataProducts?.[currentIndexProducts]);

  useEffect(() => {
    fetch("/data.json") 
      .then(response => response.json())
      .then(data => {
        setDataProducts(data.products); 
      })
      .catch(error => console.error("Erro ao carregar os produtos:", error));
  }, []); // O useEffect roda apenas uma vez ao montar o componente

  return (
     // Provedor do contexto que disponibiliza os produtos e o índice do produto atual para os componentes filhos
    <DataContext.Provider value={{ dataProducts, setDataProducts, currentIndexProducts, setCurrentIndexProducts }}>
      {children}
    </DataContext.Provider>
  );
};
