var express = require('express');
var router = express.Router();
const axios = require("axios")




router.get("/api/items", function (req, res) {
  const first = req.query.search

  axios.get("https://api.mercadolibre.com/sites/MLA/search?limit=4&q=" + first)

    .then(result => {
      
      const products = result.data.results.map(function (producto) {
        return {
            id: producto.id,
            title: producto.title,
            price: {
              currency: producto.currency_id,
              amount: String(producto.price).split('.')[0],
              decimal: String(producto.price).split('.')[1] || '0'
            },
            picture: producto.thumbnail,
            condition: producto.condition,
            free_shipping: producto.shipping.free_shipping,
            sold_quantity: producto.sold_quantity,
            location: producto.address.state_name,

          }

      })
      
      let resultado = {
        categories: result.data.filters[0].values[0].path_from_root.map(i=>i.name),
        items: products
      }
      res.json(resultado)

    })
})

router.get('/api/items/:id', function (req, res) {
  const individual = req.params.id
  let resultProduct = {};
  let resultDescription = {};
  axios.get('https://api.mercadolibre.com/items/' + individual)
    .then(result => {
      resultProduct = result;
      return axios.get('https://api.mercadolibre.com/items/' + individual + '/description')
    })
    .then(result => {
      resultDescription = result;
      const category = resultProduct.data.category_id;
      return axios.get('https://api.mercadolibre.com/categories/' + category)
    })
    .then(resultCategory => {
      const product = {

         categories: resultCategory.data.path_from_root.map(j=>j.name),
        
        item: {
          id: resultProduct.data.id,
          title: resultProduct.data.title,
          price: {
            currency: resultProduct.data.currency_id,
            amount: String(resultProduct.data.price).split('.')[0],
            decimals: String(resultProduct.data.price).split('.')[1] || '0'
          },
          picture: resultProduct.data.thumbnail,
          condition: resultProduct.data.condition,
          free_shipping: resultProduct.data.shipping.free_shipping,
          sold_quantity: resultProduct.data.sold_quantity,
          description: resultDescription.data.plain_text
        }

      }

      res.json(product)

    })
})

module.exports = router;

