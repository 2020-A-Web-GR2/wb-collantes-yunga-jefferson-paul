export function obtenerCarritoUsuario(req){
  let productosCarrito = req.cookies.carrito;
  if(!productosCarrito){
    productosCarrito = [];
  }
  return productosCarrito;
}
