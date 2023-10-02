let prods = ["todos"];

let filter = {
  priceMax: 32,
  priceMin: 32,
  cat: "arbol",
};

let prodsFilteres = () => {
  let respuesta = prods;

  //precio
  respuesta = respuesta.filter(({ precio }) => precio > filter.priceMax);

  //categoria
  respuesta = respuesta.filter(({ categoria }) => categoria > filter.categoria);

  return respuesta
};


