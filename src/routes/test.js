//aquí va todo lo que tiene que ver con la API y las querys (conecta front con back)

const express = require('express');
const router = express.Router();
const conn = require('../database');

/* MOSTRAR TABLA VINILOS */
router.get('/', (req, res) => {
    
  conn.query('SELECT * FROM vinilo', (err, result) => {
      if(!err) {
        res.render('home.ejs',{
        //res.render('web.ejs',{
          vinilo: result
        });
      } else {
        console.log(err);
      }
  });
});

/*sacando el formulario a otro boton*/
/*
router.get('/', (req, res) =>{
    res.render('./agregar_vinilo.ejs')
});
*/


/* ELIMINAR FILA DE TABLA VINILO */
router.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  conn.query('DELETE FROM personas WHERE id = ?', [id]);
  res.redirect('/');
});

/* Añadir fila a la tabla vinilo */
router.post('/add',(req, res) => {
  //console.log(req.body);
  const {id, nombre, genero, autor, año, peso, descripcion, stock} = req.body;
  conn.query('INSERT into vinilo SET ? ',{
      id: id,
      nombre: nombre,
      genero: genero,
      autor: autor,
      año: año,
      peso: peso,
      descripcion: descripcion,
      stock: stock
  }, (err, result) => {
      if(!err) {
          res.redirect('/');
      } else {
          console.log(err);
      }
  });
});

/* Mostrar solamente un vinilo */
router.get('/ver/:id', (req, res) => {
  const { id } = req.params;  
  conn.query('SELECT * FROM vinilo where id = ?',[id], (err, result) => {
      if(!err) {
        res.render('vinilos.ejs',{
          data: result[0]
        });
      } else {
        console.log(err);
      }
  });
});

module.exports = router;
