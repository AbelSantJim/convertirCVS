document.addEventListener("DOMContentLoaded", () => {
  let datosCSV = [];
  let filasPorPagina = 5;
  let paginaActual = 1;

  const inputFilas = document.getElementById("numFilas");
  const inputArchivo = document.getElementById("csvFile");
  const contenedorTabla = document.getElementById("tablaCSV");
  const contenedorPaginacion = document.getElementById("paginacion");

  // Leer archivo CSV
  inputArchivo.addEventListener("change", function (e) {
    const archivo = e.target.files[0];
    if (!archivo) return;

    const reader = new FileReader();
    reader.onload = function (e) {
  const texto = e.target.result;
  const lineas = texto.trim().split("\n").map(l => l.split(","));
  datosCSV = lineas;
  paginaActual = 1;

  const valor = parseInt(inputFilas.value);
  if (isNaN(valor) || valor <= 0) {
    alert("Ingrese un número válido mayor a 0");
    return;
  }
  filasPorPagina = valor;

  renderizarTabla();
};
    reader.readAsText(archivo);
  });

  // Cambiar número de filas por página
  inputFilas.addEventListener("change", function () {
    const valor = parseInt(this.value);
    if (isNaN(valor) || valor <= 0) {
      alert("Ingrese un número válido mayor a 0");
      return;
    }
    filasPorPagina = valor;
    paginaActual = 1;
    renderizarTabla();
  });

  function renderizarTabla() {
    contenedorTabla.innerHTML = "";
    if (datosCSV.length === 0) return;

    const inicio = (paginaActual - 1) * filasPorPagina;
    const fin = inicio + filasPorPagina;
    const filasPagina = datosCSV.slice(inicio, fin);

    const tabla = document.createElement("table");
    tabla.classList.add("tabla-estilo");

    filasPagina.forEach((fila, index) => {
      const tr = document.createElement("tr");
      fila.forEach(col => {
        const celda = document.createElement(index === 0 && inicio === 0 ? "th" : "td");
        celda.textContent = col;
        tr.appendChild(celda);
      });
      tabla.appendChild(tr);
    });

    contenedorTabla.appendChild(tabla);
    renderizarPaginacion();
  }

  function renderizarPaginacion() {
    contenedorPaginacion.innerHTML = "";
    const totalPaginas = Math.ceil(datosCSV.length / filasPorPagina);

    for (let i = 1; i <= totalPaginas; i++) {
      const boton = document.createElement("button");
      boton.textContent = i;
      boton.classList.add("boton-pagina");
      if (i === paginaActual) boton.classList.add("activo");
      boton.addEventListener("click", () => {
        paginaActual = i;
        renderizarTabla();
      });
      contenedorPaginacion.appendChild(boton);
    }
  }
});
