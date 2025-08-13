async function cargarDatos() {
    const response = await fetch('prueba.xlsx'); // Debes subir el archivo aquí
    const arrayBuffer = await response.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet);
}

async function buscarProducto() {
    const codigo = document.getElementById("codigoInput").value.trim();
    if (!codigo) {
        document.getElementById("resultado").innerHTML = "Ingrese un código válido.";
        return;
    }

    const productos = await cargarDatos();
    const producto = productos.find(p => String(p.Código).toLowerCase() === codigo.toLowerCase());

    if (producto) {
        document.getElementById("resultado").innerHTML = `
            <strong>Descripción:</strong> ${producto.Descripción}<br>
            <strong>Stock:</strong> ${producto.Stock}<br>
            <strong>Precio:</strong> S/ ${producto.Precio}
        `;
    } else {
        document.getElementById("resultado").innerHTML = "Producto no encontrado.";
    }
}