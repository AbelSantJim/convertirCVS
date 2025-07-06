# Portada
## ConvertirCVS

## Descripcion
Esta libreria incluye elementos css, html y javascript, cuyo objetivo es el de ilustrar archivos CSV e integrarlos en nuestras paginas web. Cuenta con elementos interactivos como una seleccion de documentos y un Spinner para elegir el numero de pilas de las que consistira una de las paginas de la tabla.

# Instalacion

## ¿Como incluir la libreria?
Para incluirla necesitamos descargar el repositorio a integrarlos a los archivos de nuestro proyecto y referenciar el script js con una etiqueta script y el archivo css con una etiqueta link.

## Ejemplo de instalacion 

### Archivo HTML

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Tabla desde CSV</title>
  <link href="css/tabla.css" rel="stylesheet">  
</head>
<body>
  <h2>Visualizador de CSV</h2>
  <label>Número de filas por página:</label>
  <input type="number" id="numFilas" min="1" value="5">
  <br><br>
  <input type="file" id="csvFile" accept=".csv">
  <div id="tablaCSV"></div>
  <div id="paginacion"></div>

  <script src="js/CSV.js"></script>
</body>
</html>


### archivo css

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 40px;
  background-color: #f4f6f8;
  color: #333;
}

h2 {
  text-align: center;
  color: #2c3e50;
}

label {
  font-weight: bold;
  margin-right: 10px;
}

input[type="number"],
input[type="file"] {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
  margin: 10px 0;
}

input[type="number"]:focus {
  outline: none;
  border-color: #007BFF;
}

#tablaCSV {
  margin-top: 20px;
  overflow-x: auto;
}

table.tabla-estilo {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

table.tabla-estilo th,
table.tabla-estilo td {
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
  text-align: left;
}

table.tabla-estilo tr:nth-child(even) {
  background-color: #f9f9f9;
}

table.tabla-estilo th {
  background-color: #007BFF;
  color: white;
  font-weight: bold;
}

#paginacion {
  margin-top: 20px;
  text-align: center;
}

button.boton-pagina {
  margin: 0 4px;
  padding: 8px 14px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  background-color: #e0e0e0;
  cursor: pointer;
  transition: background-color 0.3s;
}

button.boton-pagina:hover {
  background-color: #d5d5d5;
}

button.boton-pagina.activo {
  background-color: #007BFF;
  color: white;
  font-weight: bold;
}

### archivo js

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

# Capturas de pantalla 
## Imagenes del codigo
![captura 3](https://github.com/user-attachments/assets/032c6e52-dffc-4aff-80b1-2c564f020564)
![captura 1](https://github.com/user-attachments/assets/0a3e98d2-578e-41cd-8174-d42e723bc9d2)
 
## Video
El video tiene como configuracion de Oculto
https://youtu.be/iojhmkCI818



