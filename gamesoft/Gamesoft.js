contador=3
const clientesMap= new Map()
clientesMap.set("juan pablo perez rodriguez 123456789", {
    id:"juan pablo perez rodriguez 123456789",
    numIdentificacion: "123456789",
    nombres: "juan pablo",
    apellidos: "perez rodriguez",
    telefono: "5678910",
    correo:"juan@hotmail.com",
    fechaNacimiento:"25/08/1990",
    nacionalidad:"colombiano",
    puntos:0

  });
  clientesMap.set("maria camila perez rodriguez 123456789", {
    id:"maria camila perez rodriguez 123456789",
    numIdentificacion: "123456789",
    nombres: "maria camila",
    apellidos: "perez rodriguez",
    telefono: "56789104",
    correo:"maria@hotmail.com",
    fechaNacimiento:"01/10/2005",
    nacionalidad:"colombiano",
    puntos:0

  });
  clientesMap.set("juan carlos perez rodriguez 123456789", {
    id:"juan carlos perez rodriguez 123456789",
    numIdentificacion: "123456789",
    nombres: "juan carlos",
    apellidos: "perez rodriguez",
    telefono: "5678910",
    correo:"juancarlos@hotmail.com",
    fechaNacimiento:"7/12/2002",
    nacionalidad:"colombiano",
    puntos:0

  });
  function agregaraclientesMap(){
    const nombres=document.getElementById("nombresInput").value
    const apellidos=document.getElementById("apellidosInput").value
    const numIdentificacion=document.getElementById("documentoInput").value
    const telefono=document.getElementById("telefonoInput").value
    const correo=document.getElementById("correoInput").value
    const fechaNacimiento=document.getElementById("fechaNacimientoInput").value
    const nacionalidad=document.getElementById("nacionalidadInput").value
    const id=nombres+" "+apellidos+" "+numIdentificacion

    clientesMap.set(id,{
        id:id,
        numIdentificacion:numIdentificacion,
        nombres:nombres,
        apellidos:apellidos,
        telefono:telefono,
        correo:correo,
        fechaNacimiento:fechaNacimiento,
        nacionalidad:nacionalidad,
        puntos:0
    })
    insertarHtml(clientesMap.get(id))
    eliminar()
    editar()
  }
function insertarHtml(datos){
     
    //ME TRAIGO AL CUERPO DE LA TABLA DONDE SE INSERTA LOS NUEVOS DATOS
    let tbody1=document.getElementById("tbody1")

    let tr1=document.createElement("tr")
    tr1.setAttribute("id",datos.id)

    let tdDocumento=document.createElement("td")
    tdDocumento.textContent=datos.numIdentificacion

    let tdNombres=document.createElement("td")
    tdNombres.textContent=datos.nombres

    let tdApellidos=document.createElement("td")
    tdApellidos.textContent=datos.apellidos

    let tdTelefono=document.createElement("td")
    tdTelefono.textContent=datos.telefono

    let tdCorreo=document.createElement("td")
    tdCorreo.textContent=datos.correo

    let tdFechaNacimiento=document.createElement("td")
    tdFechaNacimiento.textContent=datos.fechaNacimiento
    
    let tdNacionalidad=document.createElement("td")
    tdNacionalidad.textContent=datos.nacionalidad

    let tdPuntos=document.createElement("td")
    tdPuntos.textContent=datos.puntos

    let tdbotonComprar=document.createElement("td")
    let botonComprar=document.createElement("button")
    botonComprar.setAttribute("id","botonComprarTiquete")
    botonComprar.setAttribute("class","btn btn-success")
    botonComprar.textContent="Comprar"
    botonComprar.setAttribute("value",datos.id)

    tdbotonComprar.appendChild(botonComprar)

    let tdbotonEliminar=document.createElement("td")
    // tdbotonEliminar.setAttribute("style","width:120px")
    let botonEliminar=document.createElement("button")
    botonEliminar.setAttribute("id","botonEliminarCliente")
    botonEliminar.setAttribute("value",datos.id)
    botonEliminar.setAttribute("class","btn btn-primary")
    botonEliminar.textContent="Borrar"
    
    tdbotonEliminar.appendChild(botonEliminar)

    let tdbotonEditar=document.createElement("td")
    let botonEditar=document.createElement("button")
    botonEditar.setAttribute("id","botonEditarCliente")
    botonEditar.setAttribute("class","btn btn-success")
    botonEditar.setAttribute("data-bs-toggle","modal")
    botonEditar.setAttribute("data-bs-target","#ModalAgregarClientes")
    botonEditar.setAttribute("value",datos.id)
    /* botonEditar.setAttribute("onclick",`editar()`) */
    botonEditar.textContent="Editar"

    tdbotonEditar.appendChild(botonEditar)

    tr1.appendChild(tdbotonComprar)
    tr1.appendChild(tdDocumento)
    tr1.appendChild(tdNombres)
    tr1.appendChild(tdApellidos)
    tr1.appendChild(tdTelefono)
    tr1.appendChild(tdCorreo)
    tr1.appendChild(tdFechaNacimiento)
    tr1.appendChild(tdNacionalidad)
    tr1.appendChild(tdPuntos)
    tr1.appendChild(tdbotonEliminar)
    tr1.appendChild(tdbotonEditar)
    tbody1.appendChild(tr1)
    
}

function mostrarTablaClientes(){
    for(const[clave,datos] of clientesMap){
      /* console.log(datos) */
        insertarHtml(datos)
    }
    eliminar();
    editar();
}
mostrarTablaClientes();

function eliminar(){
  botonesEliminarCliente = document.querySelectorAll('button#botonEliminarCliente')
  /* console.log(botonesEliminarCliente) */
  botonesEliminarCliente.forEach(element => {
    element.addEventListener("click", function () { 
      console.log("este es un elemento: "+ element.value);//EL VALUE DE CADA BOTON ES EL MISMO VALOR DEL ID
      let cliente = document.getElementById(element.value);//AQUI LE ESTOY PASANDO EL ID EN ELEMENT.VALUE
      clientesMap.delete(element.value)//AQUI LE ESTOY PASANDO LA KEY QUE ES EL MISMO ID
      cliente.parentNode.removeChild(cliente)
    });
  });
}

botonBusquedaCliente.addEventListener('click', function(event){
  event.preventDefault(); 
  /* console.log("se dio click en el boton") */
  let listaQuitar=[];let listaMostrar=[];contador=0;
  const cajaBusquedaCliente =document.getElementById("buscarClienteInput").value
  console.log(cajaBusquedaCliente)
  if(cajaBusquedaCliente === ""){
    clientesMap.forEach(element => {
    listaMostrar.push(element.id);
  });
  }else {
    clientesMap.forEach(element => {
      //console.log(element.titulo);
      if(element.id.toUpperCase().includes(cajaBusquedaCliente.toUpperCase()) == true) {
        listaMostrar.push(element.id);
        contador+=1;
      }else{
        listaQuitar.push(element.id);
      }
    });
  }

  if(listaQuitar.length > 0){
    mostarVista(listaMostrar);
    quitarVista(listaQuitar);
}else{
  // console.log("entro a mostrar");
    mostarVista(listaMostrar);
}
});

function quitarVista(listaIDClientesQuitar){
  for(let i = 0; i < listaIDClientesQuitar.length; i++) {
    let filaCliente = document.getElementById(listaIDClientesQuitar[i]);//LE ESTOY PASANDO EL ID PORQUE TENGO ES UNA LISTA DE IDS
    filaCliente.setAttribute("class", "visually-hidden");
  }
}

function mostarVista(listaIDClienteMostrar){
  for(let i = 0; i < listaIDClienteMostrar.length; i++) {
    let filaCliente = document.getElementById(listaIDClienteMostrar[i]);
    filaCliente.setAttribute("class", "visually");
  }
}

function limpiarCajas(){
  document.getElementById("nombresInput").value =  "";
  document.getElementById("apellidosInput").value="";
  document.getElementById("documentoInput").value= "";
  document.getElementById("telefonoInput").value= "";
  document.getElementById("correoInput").value= "";
  document.getElementById("fechaNacimientoInput").value= "";
  document.getElementById("nacionalidadInput").value= "";
  let botonEditarFinal=document.getElementById("botonEditarFinal")
  botonEditarFinal.setAttribute("class","btn btn-primary visually-hidden") 
  let botonAgregar=document.getElementById("botonAgregar")
  botonAgregar.setAttribute("class","btn btn-primary visually")

}
var idClienteEditar
function editar(){
  console.log("entró al boton")

  botonesEditarCliente = document.querySelectorAll('button#botonEditarCliente')
  console.log(botonesEditarCliente)

  botonesEditarCliente.forEach(element => {
    element.addEventListener("click", function () { 
      
      idClienteEditar=element.value
      let botonEditarFinal=document.getElementById("botonEditarFinal")
      botonEditarFinal.setAttribute("class","btn btn-primary visually") 
      let botonAgregar=document.getElementById("botonAgregar")
      botonAgregar.setAttribute("class","visually-hidden")

      let cliente = clientesMap.get(element.value);

      document.getElementById("nombresInput").value =cliente.nombres;
      document.getElementById("apellidosInput").value=cliente.apellidos;
      document.getElementById("documentoInput").value=cliente.numIdentificacion;
      document.getElementById("telefonoInput").value=cliente.telefono;
      document.getElementById("correoInput").value=cliente.correo;
      document.getElementById("fechaNacimientoInput").value=cliente.fechaNacimiento;
      document.getElementById("nacionalidadInput").value=cliente.nacionalidad;


    });
  });
}

function editarCliente(){
  clientesMap.delete(idClienteEditar)
  let cliente = document.getElementById(idClienteEditar)
  cliente.parentNode.removeChild(cliente)
  agregaraclientesMap()
  
}


/// FIN DE SECCION CLIENTES

//INICIO SECCION DE PRODUCTOS

contador=4
const productosMap= new Map()
productosMap.set(1, {
    id:1,
    productoNombre: "Mario Bros",
    precioJuego: 123456,
    tematicaJuego: "Aventura",
    puntos:1000
    

  });
  productosMap.set(2, {
    id:2,
    productoNombre: "The Legend of Zelda",
    precioJuego: 123456,
    tematicaJuego: "Ficcion",
    puntos:1000
    

  });
  productosMap.set(3, {
    id:3,
    productoNombre: "Super Mario Galaxy",
    precioJuego: 123456,
    tematicaJuego: "Accion",
    puntos:1000
    

  });
  productosMap.set(4, {
    id:4,
    productoNombre: "Grand Theft Auto V",
    precioJuego: 123456,
    tematicaJuego: "Accion",
    puntos:1000
    

  });

function agregaraProductosMap(){
    contador +=1
    const productoNombre=document.getElementById("productoNombreInput").value
    const precioJuego=document.getElementById("productoValorInput").value
    const tematicaJuego=document.getElementById("productotematicaJuegoInput").value
    const puntos=document.getElementById("productoPuntosFidelizacion").value
   
    productosMap.set(contador,{
        id:contador,
        productoNombre:productoNombre,
        precioJuego:precioJuego,
        tematicaJuego:tematicaJuego,
        puntos:puntos,
    })

    insertarHtmlProductos(productosMap.get(contador))
    insertarHtmlCards(productosMap.get(contador))
    eliminaraProducto()
    comprar()
  }
  function insertarHtmlProductos(datos){
     
    //ME TRAIGO AL CUERPO DE LA TABLA DONDE SE INSERTA LOS NUEVOS DATOS
    let tbody2=document.getElementById("tbody2")

    let tr1=document.createElement("tr")
    tr1.setAttribute("id",datos.id)

    let tdID=document.createElement("td")
    tdID.textContent=datos.id

    let tdproductoNombre=document.createElement("td")
    tdproductoNombre.textContent=datos.productoNombre

    let tdprecioJuego=document.createElement("td")
    tdprecioJuego.textContent=datos.precioJuego

    let tdtematicaJuego=document.createElement("td")
    tdtematicaJuego.textContent=datos.tematicaJuego

    let tdpuntos=document.createElement("td")
    tdpuntos.textContent=datos.puntos

    let tdbotonEliminar=document.createElement("td")
    tdbotonEliminar.setAttribute("style","width:120px")
    let botonEliminar=document.createElement("button")
    botonEliminar.setAttribute("id","botonEliminarProducto")
    botonEliminar.setAttribute("value",datos.id)
    botonEliminar.setAttribute("class","btn btn-primary")
    botonEliminar.textContent="Borrar"
    
    tdbotonEliminar.appendChild(botonEliminar)

    
    tr1.appendChild(tdID)
    tr1.appendChild(tdproductoNombre)
    tr1.appendChild(tdprecioJuego)
    tr1.appendChild(tdtematicaJuego)
    tr1.appendChild(tdpuntos)
    tr1.appendChild(tdbotonEliminar)
    tbody2.appendChild(tr1)
    
}

function mostrarTablaProductos(){
  for(const[clave,datos] of productosMap){
    // console.log(datos)
    insertarHtmlProductos(datos)
  }
  eliminaraProducto()
}
mostrarTablaProductos();

function eliminaraProducto(){
  let botonesEliminarProducto = document.querySelectorAll('button#botonEliminarProducto')
  /* console.log(botonesEliminarProducto) */
  botonesEliminarProducto.forEach(element => {
    element.addEventListener("click", function () { 
      console.log("este es un elemento: "+ element.value);//EL VALUE DE CADA BOTON ES EL MISMO VALOR DEL ID

      let producto = document.getElementById(element.value);// ME TRAIGO A LA FILA DE LA TABLA QUE TIENE ESE ID AQUI LE ESTOY PASANDO EL ID ELEMENT.VALUE

      let productoMapa=productosMap.get(parseInt(element.value))//ESTO SE HIZO PARA PODER ELIMINAR LA CARD
      let cardProducto=document.getElementById(productoMapa.productoNombre)//ESTO SE HIZO PARA PODER ELIMINAR LA CARD COMO EL ID DE LAS CARD ES EL NOMBRE TENGO QUE ACCEDER A LA PROPIEDAD NOMBRE

      producto.parentNode.removeChild(producto)
      cardProducto.parentNode.removeChild(cardProducto)

      productosMap.delete(element.value)//AQUI LE ESTOY PASANDO LA KEY QUE ES EL MISMO ID
      
    });
  });
}
function limpiarCajas2(){
  document.getElementById("productoNombreInput").value= "";
  document.getElementById("productoValorInput").value= "";
  document.getElementById("productotematicaJuegoInput").value= "";
  document.getElementById("productoPuntosFidelizacion").value= "";
}

//MOSTRAR INFO DE LOS ARTICULOS EN LAS CARD

let listaImagenes=[
  "https://d3ekgiz2arlak6.cloudfront.net/wp-content/uploads/2023/04/09163930/Personajes-viojuegos-1024x493.jpg",
  "https://www.antevenio.com/wp-content/uploads/2019/06/Videojuegos-con-m%C3%A1s-audiencia.-Fortnite.jpg",
  "https://cdn.shopify.com/s/files/1/0265/2769/4934/products/view.php_250x250@2x.jpg?v=1599144012",
  "https://myplayertwo.files.wordpress.com/2015/05/817734-mariogal.jpg"
]



function insertarHtmlCards(datos){

  let numero=Math.floor(Math.random()*listaImagenes.length)

  let contenedorCards=document.getElementById("contenedorCards")

  let col=document.createElement("div")
  col.setAttribute("class","col")//PARA HACER EL CARRITO DE COMPRAS LE DAMOS UNA CLASE A LOS ITEMS
  col.setAttribute("id",datos.productoNombre)

  let card=document.createElement("div")
  card.setAttribute("class","card text-center border border-info border-2")

  let img=document.createElement("img")
  img.setAttribute("class","card-img-top")
  img.setAttribute("style","height:175px")
  img.setAttribute("src",listaImagenes[numero])

  let cardBody=document.createElement("div")
  cardBody.setAttribute("class","card-body")

  let h5=document.createElement("div")
  h5.setAttribute("class","card-title")
  h5.textContent=datos.productoNombre

  let precioJuegoP=document.createElement("p")
  precioJuegoP.setAttribute("class","card-text")
  precioJuegoP.textContent="El valor del juego es: "+datos.precioJuego

  let tematicaJuegoP=document.createElement("p")
  tematicaJuegoP.setAttribute("class","card-text")
  tematicaJuegoP.textContent="La temática del juego es: "+datos.tematicaJuego

  let puntosTiquete=document.createElement("p")
  puntosTiquete.setAttribute("class","card-text")
  puntosTiquete.textContent="Los puntos de fidelización son: "+datos.puntos

  let botonComprarProducto=document.createElement("button")
  botonComprarProducto.setAttribute("class","btn btn-primary visually-hidden")
  botonComprarProducto.setAttribute("id","botonComprarProducto")
  botonComprarProducto.setAttribute("value",datos.id)
  botonComprarProducto.setAttribute("data-bs-toggle","modal")
  botonComprarProducto.setAttribute("data-bs-target","#ModalCompras")
  botonComprarProducto.textContent="Comprar"

  cardBody.appendChild(h5)
  cardBody.appendChild(precioJuegoP)
  cardBody.appendChild(tematicaJuegoP)
  cardBody.appendChild(puntosTiquete)
  cardBody.appendChild(botonComprarProducto)

  card.appendChild(img)
  card.appendChild(cardBody)

  col.appendChild(card)

  contenedorCards.appendChild(col)

}
function mostrarCardsProductos(){
  for(const[clave,datos] of productosMap){
    /* console.log(datos) */
    insertarHtmlCards(datos)
  }
  
}
mostrarCardsProductos();

///FIN DE SECCION PRODUCTOS

//INICIO DE SECCION COMPRAS

contador1=1
const comprasMap= new Map()
comprasMap.set(contador1, {
    id:contador1,
    nombres:"juan pablo",
    apellidos:"perez rodriguez",
    numIdentificacion: "123456789",
    productoNombre:"Mario Bros",
    precioJuego:5000,
    tematicaJuego:"Aventura",
    puntos:1000,
    valorIva:800,
    impuestoEspecial:200,
    valorTotal:6000

    

  });
function comprar(){
  botonesComprar=document.querySelectorAll('button#botonComprarTiquete')

  botonesComprar.forEach(element=>{
    element.addEventListener("click",function(){
      contador1+=1
      let cliente=clientesMap.get(element.value)
      comprasMap.set(contador1,{
        id:contador1,
        numIdentificacion:cliente.numIdentificacion,
        nombres:cliente.nombres,
        apellidos:cliente.apellidos
      })

      botonesComprarTiquete=document.querySelectorAll("button#botonComprarProducto")
      botonesComprarTiquete.forEach(element=>{
        element.setAttribute("class","btn btn-primary visually")
      })

      botonesEliminarProducto = document.querySelectorAll('button#botonEliminarProducto')
      botonesEliminarProducto.forEach(element=>{
        element.setAttribute("class","visually-hidden")
      })

    })
  })
}
comprar()


function comprarProducto(){
  botonesComprarTiquete=document.querySelectorAll("button#botonComprarProducto")

  botonesComprarTiquete.forEach(element=>{
    element.addEventListener("click",function(){

      let producto=productosMap.get(parseInt(element.value))
      let compra=comprasMap.get(parseInt(contador1))
      
        compra.productoNombre=producto.productoNombre;
        compra.precioJuego=producto.precioJuego;
        compra.tematicaJuego=producto.tematicaJuego;
        compra.puntos=producto.puntos;
        compra.valorIva=(producto.precioJuego)*0.16
        compra.impuestoEspecial=(producto.precioJuego)*0.04
        compra.valorTotal=(producto.precioJuego)+((producto.precioJuego)*0.16)+((producto.precioJuego)*0.04)
      
      // console.log("Entró a comprar producto")
      // console.log(comprasMap)
      insertarHtmlFactura(comprasMap.get(parseInt(contador1)))
    })
  })
}
comprarProducto()

function insertarHtmlFactura(datos){

  let contenedor=document.getElementById("formulario3")

  let documentoRecibo=document.createElement("div")
  documentoRecibo.setAttribute("class","col-md-12")
  documentoRecibo.setAttribute("id","documentoRecibo")
  documentoRecibo.textContent="Número de documento: "+datos.numIdentificacion

  let nombresRecibo=document.createElement("div")
  nombresRecibo.setAttribute("class","col-12")
  nombresRecibo.setAttribute("id","nombresRecibo")
  nombresRecibo.textContent="Nombres: "+datos.nombres

  let apellidosRecibo=document.createElement("div")
  apellidosRecibo.setAttribute("class","col-12")
  apellidosRecibo.setAttribute("id","apellidosRecibo")
  apellidosRecibo.textContent="Apellidos: "+datos.apellidos

  let nombreProductoRecibo=document.createElement("div")
  nombreProductoRecibo.setAttribute("class","col-12 ")
  nombreProductoRecibo.setAttribute("id","nombreProductoRecibo")
  nombreProductoRecibo.textContent="producto: "+datos.productoNombre

  let precioJuegoRecibo=document.createElement("div")
  precioJuegoRecibo.setAttribute("class","col-4")
  precioJuegoRecibo.setAttribute("id","precioJuegoRecibo")
  precioJuegoRecibo.textContent="El valor del juego es: "+datos.precioJuego

  let tematicaJuegoRecibo=document.createElement("div")
  tematicaJuegoRecibo.setAttribute("class","col-4")
  tematicaJuegoRecibo.setAttribute("id","tematicaJuegoRecibo")
  tematicaJuegoRecibo.textContent="Tematica del juego: "+datos.tematicaJuego

  let puntosRecibo=document.createElement("div")
  puntosRecibo.setAttribute("class","col-12")
  puntosRecibo.setAttribute("id","puntosRecibo")
  puntosRecibo.textContent="Puntos del juego: "+datos.puntos

  let valorIva=document.createElement("div")
  valorIva.setAttribute("class","col-6")
  valorIva.setAttribute("id","valorIva")
  valorIva.textContent="El valor del iva es: "+datos.valorIva

  let impuestoEspecial=document.createElement("div")
  impuestoEspecial.setAttribute("class","col-6")
  impuestoEspecial.setAttribute("id","impuestoEspecial")
  impuestoEspecial.textContent="El valor del impuesto especial es: "+datos.impuestoEspecial

  let valorTotal=document.createElement("div")
  valorTotal.setAttribute("class","col-12")
  valorTotal.setAttribute("id","valorTotal")
  valorTotal.textContent="El valor total del juego es: "+datos.valorTotal

  let contenedorbotonConfirmarVenta=document.createElement("div")
  contenedorbotonConfirmarVenta.setAttribute("class","col-6 text-center")
  contenedorbotonConfirmarVenta.setAttribute("id","contenedorbotonConfirmarVenta")
  let botonConfirmarVenta=document.createElement("button")
  botonConfirmarVenta.textContent="Confirmar"
  botonConfirmarVenta.setAttribute("class","btn btn-primary")
  botonConfirmarVenta.setAttribute("id","botonConfirmarVenta")
  botonConfirmarVenta.setAttribute("value",datos.id)
  botonConfirmarVenta.setAttribute("onclick","confirmacion()")
  botonConfirmarVenta.setAttribute("data-bs-dismiss","modal")
  contenedorbotonConfirmarVenta.appendChild(botonConfirmarVenta)

  let contenedorbotonCancelar=document.createElement("div")
  contenedorbotonCancelar.setAttribute("class","col-6 text-center")
  contenedorbotonCancelar.setAttribute("id","contenedorbotonCancelar")
  let botonCancelar=document.createElement("button")
  botonCancelar.textContent="Cancelar"
  botonCancelar.setAttribute("class","btn btn-primary")
  botonCancelar.setAttribute("onclick","cancelacion()")
  botonCancelar.setAttribute("id","botonCancelarVenta")
  botonCancelar.setAttribute("data-bs-dismiss","modal")
  contenedorbotonCancelar.appendChild(botonCancelar)


  
  contenedor.appendChild(documentoRecibo)
  contenedor.appendChild(nombresRecibo)
  contenedor.appendChild(apellidosRecibo)
  contenedor.appendChild(nombreProductoRecibo)
  contenedor.appendChild(precioJuegoRecibo)
  contenedor.appendChild(tematicaJuegoRecibo)
  contenedor.appendChild(puntosRecibo)
  contenedor.appendChild(valorIva)
  contenedor.appendChild(impuestoEspecial)
  contenedor.appendChild(valorTotal)
  contenedor.appendChild(contenedorbotonConfirmarVenta)
  contenedor.appendChild(contenedorbotonCancelar)

}

function confirmacion(){
    let botonConfirmar=document.getElementById("botonConfirmarVenta")
    console.log(botonConfirmar)
  // botonConfirmar.addEventListener("click",function(){
    let idCompra=botonConfirmar.value
    let infoCompra=comprasMap.get(parseInt(idCompra))
    let puntosCompra=infoCompra.puntos
    let nombres=infoCompra.nombres
    let apellidos=infoCompra.apellidos
    let documento=infoCompra.numIdentificacion
    let idCliente=nombres+" "+apellidos+" "+documento

    console.log("Este es el id del cliente"+idCliente)
    let infoCliente=clientesMap.get(idCliente)
    console.log(infoCliente)
    infoCliente.puntos+=puntosCompra
    console.log(infoCliente)
    insertarHtml(clientesMap.get(idCliente))
    mostrarFidelizacion(clientesMap.get(idCliente))

    let cliente = document.getElementById(idCliente)
    cliente.parentNode.removeChild(cliente)

    let clienteFidelizacion=document.getElementById("fidelizacion"+idCliente)
    clienteFidelizacion.parentNode.removeChild(clienteFidelizacion)


    let documentoRecibo=document.getElementById("documentoRecibo")
    documentoRecibo.parentNode.removeChild(documentoRecibo)
  
    let nombresRecibo=document.getElementById("nombresRecibo")
    nombresRecibo.parentNode.removeChild(nombresRecibo)
  
    let apellidosRecibo=document.getElementById("apellidosRecibo")
    apellidosRecibo.parentNode.removeChild(apellidosRecibo)
  
    let nombreProductoRecibo=document.getElementById("nombreProductoRecibo")
    nombreProductoRecibo.parentNode.removeChild(nombreProductoRecibo)
  
    let precioJuegoRecibo =document.getElementById("precioJuegoRecibo")
    precioJuegoRecibo.parentNode.removeChild(precioJuegoRecibo)
  
    let tematicaJuegoRecibo=document.getElementById("tematicaJuegoRecibo")
    tematicaJuegoRecibo.parentNode.removeChild(tematicaJuegoRecibo)
  
    let puntosRecibo=document.getElementById("puntosRecibo")
    puntosRecibo.parentNode.removeChild(puntosRecibo)

    let valorIva=document.getElementById("valorIva")
    valorIva.parentNode.removeChild(valorIva)

    let impuestoEspecial=document.getElementById("impuestoEspecial")
    impuestoEspecial.parentNode.removeChild(impuestoEspecial)

    let valorTotal=document.getElementById("valorTotal")
    valorTotal.parentNode.removeChild(valorTotal)

    let contenedorbotonConfirmarVenta=document.getElementById("contenedorbotonConfirmarVenta")
    contenedorbotonConfirmarVenta.parentNode.removeChild(contenedorbotonConfirmarVenta)

    let contenedorbotonCancelar=document.getElementById("contenedorbotonCancelar")
    contenedorbotonCancelar.parentNode.removeChild(contenedorbotonCancelar)






  // })
}

function cancelacion(){
  comprasMap.delete(contador1)
  contador1-=1
  
  let documentoRecibo=document.getElementById("documentoRecibo")
  documentoRecibo.parentNode.removeChild(documentoRecibo)

  let nombresRecibo=document.getElementById("nombresRecibo")
  nombresRecibo.parentNode.removeChild(nombresRecibo)

  let apellidosRecibo=document.getElementById("apellidosRecibo")
  apellidosRecibo.parentNode.removeChild(apellidosRecibo)

  let nombreProductoRecibo=document.getElementById("nombreProductoRecibo")
  nombreProductoRecibo.parentNode.removeChild(nombreProductoRecibo)

  let precioJuegoRecibo =document.getElementById("precioJuegoRecibo")
  precioJuegoRecibo.parentNode.removeChild(precioJuegoRecibo)

  let tematicaJuegoRecibo=document.getElementById("tematicaJuegoRecibo")
  tematicaJuegoRecibo.parentNode.removeChild(tematicaJuegoRecibo)


  let puntosRecibo=document.getElementById("puntosRecibo")
  puntosRecibo.parentNode.removeChild(puntosRecibo)

  let valorIva=document.getElementById("valorIva")
  valorIva.parentNode.removeChild(valorIva)

  let impuestoEspecial=document.getElementById("impuestoEspecial")
  impuestoEspecial.parentNode.removeChild(impuestoEspecial)

  let valorTotal=document.getElementById("valorTotal")
  valorTotal.parentNode.removeChild(valorTotal)

  let contenedorbotonConfirmarVenta=document.getElementById("contenedorbotonConfirmarVenta")
  contenedorbotonConfirmarVenta.parentNode.removeChild(contenedorbotonConfirmarVenta)

  let contenedorbotonCancelar=document.getElementById("contenedorbotonCancelar")
  contenedorbotonCancelar.parentNode.removeChild(contenedorbotonCancelar)

  console.log(comprasMap)

}

///FIN DE LA SECCION DE COMPRAS

//INICIO DE LA SECCION DEL NAV

function botonNavClientes(){
  let tablaClientes=document.getElementById("tablaClientes")
    tablaClientes.classList.toggle("visually-hidden")
    // tablaClientes.setAttribute("class","table table-sm th-sm table-dark visually") 


  let tablaProductos=document.getElementById("tablaProductos")
  tablaProductos.setAttribute("class","table table-striped fondo py-1 visually-hidden")

  let tablaFidelizacion=document.getElementById("tablaFidelizacion")
    tablaFidelizacion.setAttribute("class","table table-sm th-sm table-dark visually-hidden")
}

function botonNavProductos(){
  let tablaProductos=document.getElementById("tablaProductos")
    tablaProductos.classList.toggle("visually-hidden")
    /* tablaProductos.setAttribute("class","table table-striped fondo visually py-1") */

  let tablaClientes=document.getElementById("tablaClientes")
    tablaClientes.setAttribute("class","table table-sm th-sm table-dark visually-hidden")

    let tablaFidelizacion=document.getElementById("tablaFidelizacion")
    tablaFidelizacion.setAttribute("class","table table-sm th-sm table-dark visually-hidden")

}

///SECCION BUSCAR JUEGO

botonBusqueda.addEventListener('click', function(event){
    event.preventDefault();
    let listaQuitar = [];let listaMostrar=[];contador=0;

    const cajaBusqueda =document.getElementById("textoBusqueda").value


    if(cajaBusqueda === ""){
        productosMap.forEach(element => {
            listaMostrar.push(element.productoNombre);
    })}
    else {
        productosMap.forEach(element => {
       
      if(element.productoNombre.toUpperCase().includes(cajaBusqueda.toUpperCase()) == true) {
        listaMostrar.push(element.productoNombre);
        contador+=1;
      }else{
        listaQuitar.push(element.productoNombre);
      }
    });
  }
  
  if(listaQuitar.length > 0){
    mostarVistaJuego(listaMostrar);
    quitarVistaJuego(listaQuitar);
}else{
  // console.log("entro a mostrar");
    mostarVistaJuego(listaMostrar);
}
})

function quitarVistaJuego(listaQuitar){
    
    for(let i = 0; i < listaQuitar.length; i++) {
      let cardJuego = document.getElementById(listaQuitar[i]);//LE ESTOY PASANDO EL ID PORQUE TENGO ES UNA LISTA DE IDS
      console.log(cardJuego)
      cardJuego.setAttribute("class", "visually-hidden");
    }
  }
  
  function mostarVistaJuego(listaMostrar){
    for(let i = 0; i < listaMostrar.length; i++) {
      let cardJuego = document.getElementById(listaMostrar[i]);
      cardJuego.setAttribute("class", "visually");
    }
  }

//FIDELIZACION CLIENTES

function mostrarFidelizacion(datos){
    let tbody3=document.getElementById("tbody3")

    let tr1=document.createElement("tr")
    tr1.setAttribute("id","fidelizacion"+datos.id)

    let tdDocumento=document.createElement("td")
    tdDocumento.textContent=datos.numIdentificacion

    let tdNombres=document.createElement("td")
    tdNombres.textContent=datos.nombres

    let tdApellidos=document.createElement("td")
    tdApellidos.textContent=datos.apellidos

    let tdPuntos=document.createElement("td")
    tdPuntos.textContent=datos.puntos

    
    tr1.appendChild(tdDocumento)
    tr1.appendChild(tdNombres)
    tr1.appendChild(tdApellidos)
    tr1.appendChild(tdPuntos)
    tbody3.appendChild(tr1)

}
function fidelizacion(){
    for(const[clave,datos] of clientesMap){
        /* console.log(datos) */
          mostrarFidelizacion(datos)
      }        
      console.log(clientesMap)

}
fidelizacion()

function botonNavFidelizacion(){

    

    let tablaFidelizacion=document.getElementById("tablaFidelizacion")
    tablaFidelizacion.setAttribute("class","table table-sm th-sm table-dark visually")

    let tablaProductos=document.getElementById("tablaProductos")
    tablaProductos.setAttribute("class","table table-striped fondo py-1 visually-hidden")
    
    let tablaClientes=document.getElementById("tablaClientes")
    tablaClientes.setAttribute("class","table table-sm th-sm table-dark visually-hidden") 
    
}

