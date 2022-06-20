const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito = [];

cargarEventListeners()

function cargarEventListeners() {
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = [];//reseteamos el arreglo
        limpiarHTML();
    })
}



//FUNCIONES

function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}


//ELIMINAR CURSOS DEL CARRITO
function eliminarCurso(e) {
    console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML();
    }
}


//Vamos a leer el contenido del html al que le dimos click y extrae la info del elemento
function leerDatosCurso(curso) {
//crear un objeto con el contenido del curso que hacemos click
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //revisa si un elemento ya existe en el carrito y deacuerdo a eso actualizamos cantidad o agregamos
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        const cursos = articulosCarrito.map(curso => {
            if(curso => curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    }else{
        //agregar productos al array articulosCarrito
    articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();
}


//MOSTRAR EL CARRITO DE COMPRAS EN EL HTML
function carritoHTML() {
    limpiarHTML();

    //recorre el carrito y genera el html
    articulosCarrito.forEach( curso=>{
        const row = document.createElement('tr');
        row.innerHTML= 
       `<td><img src="${curso.imagen}" width="100"></td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id="${curso.id}"> X </a></td>`

    //agregar el html del carrtio en el tbody
        contenedorCarrito.appendChild(row);
    });   
}


//limpiar para que no se agregue otro extra aparte del que ya esta
function limpiarHTML() {
    contenedorCarrito.innerHTML = '';
}




