document.addEventListener("DOMContentLoaded", () => {
  const productosDiv = document.querySelector(".catalogo");
  const pageList = document.querySelector(".page-list");
  const itemsPerPage = 16; // Cantidad de productos por página
  let currentPage = 1; // Página actual

  // Función para mostrar productos en la página actual
  function showProductsOnPage(page, productos) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const productsToShow = productos.slice(startIndex, endIndex);

    // Limpiar contenido anterior
    productosDiv.innerHTML = "";

    // Crear y agregar los productos a la página
    productsToShow.forEach((producto) => {
      const productoDiv = document.createElement("div");
      productoDiv.classList.add("producto");

      const imagen = document.createElement("img");
      imagen.src = producto.Imagenes;
      imagen.alt = producto.SKU;

      const nombre = document.createElement("p");
      nombre.classList.add("nombre");
      nombre.textContent = producto.Nombre;

      const sku = document.createElement("p");
      sku.classList.add("sku");
      sku.textContent = producto.SKU;

      productoDiv.appendChild(imagen);
      productoDiv.appendChild(nombre);
      productoDiv.appendChild(sku);
      productosDiv.appendChild(productoDiv);
    });
  }

  // Función para crear los botones de paginación
  function createPaginationButtons(totalPages) {
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("li");
      pageButton.textContent = i;
      pageButton.addEventListener("click", () => {
        currentPage = i;
        showProductsOnPage(currentPage, productos);
        updatePaginationButtons();
      });
      pageList.appendChild(pageButton);
    }
  }

  // Función para actualizar la apariencia de los botones de paginación
  function updatePaginationButtons() {
    const pageButtons = pageList.querySelectorAll("li");
    pageButtons.forEach((button, index) => {
      if (index === currentPage - 1) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }

  // Obtener datos de productos y calcular el número de páginas
  fetch("http://localhost:3000/buscar")
    .then((response) => response.json())
    .then((productos) => {
      const totalPages = Math.ceil(productos.length / itemsPerPage);
      createPaginationButtons(totalPages);
      showProductsOnPage(currentPage, productos);
      updatePaginationButtons();
    })
    .catch((error) => {
      console.error("Error al obtener datos de productos:", error);
    });
});
