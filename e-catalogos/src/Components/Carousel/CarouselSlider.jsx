import { useContext } from "react";
import { DataContext } from "../../context/contextdata";
import "./CarouselSlider.css";
import voltar from "../../assets/images/voltar-arrow.svg";
import ir from "../../assets/images/forward-arrow.svg";

export const CarouselSlider = ({ imageActive, setImageActive }) => {
  const { dataProducts, currentIndexProducts, setCurrentIndexProducts } =
    useContext(DataContext);

  // Verifica se os dados estão carregados antes de tentar mapear
  if (!Array.isArray(dataProducts) || dataProducts.length === 0) {
    return <p>Carregando produtos...</p>;
  }

  const handleChangeSlider = (direction) => {
    setCurrentIndexProducts((prevIndex) => {
      const newIndex =
        direction === "next"
          ? (prevIndex + 1) % dataProducts.length
          : (prevIndex - 1 + dataProducts.length) % dataProducts.length;
      changeDelay();
      return newIndex;
    });
  };

  const changeDelay = () => {
    setTimeout(() => {
      setImageActive(0);
    }, 180);
  };

  return (
    <div className="carousel-container">
      <div
        className="carousel"
        style={{ transform: `translateX(-${currentIndexProducts * 100}%)` }}
      >
        {dataProducts.map(
          (product, index) =>
            product.images.length > 0 && (
              <div className="product" key={product.id}>
                <img
                  className="image"
                  src={product.images[imageActive]?.path}
                  alt={product.name}
                />
              </div>
            )
        )}
      </div>

      <img
        className="return-arrow"
        src={voltar}
        onClick={() => handleChangeSlider("prev")}
        alt="Botão de voltar"
      />
      <img
        className="forward-arrow"
        src={ir}
        onClick={() => handleChangeSlider("next")}
        alt="Botão de avançar"
      />
    </div>
  );
};
