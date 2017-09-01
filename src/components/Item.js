import React from 'react'
import ProductAPI from '../api'

export default class Item extends React.Component {
  item = {};
  
  componentWillMount(props) {
    let id = this.props.match.params.id;
    ProductAPI.get(id,
      (err, item) => {
        if (!err) {
          this.item = item;
          this.forceUpdate();
        }
      }
    );    
  }

  render () {
    let product  = this.item.data;
    let go = true;
    
    if (product === undefined) {
        go = false;
    }

    if (go) {
      return (
        <div>
            <div className="col-md-12 list-item-product">
                <div className="col-md-9 list-item-product-img text-center">
                    <img src={product.item.picture.url} alt="Foto do Produto" />
                </div>
                <div className="col-md-3">
                    <div className="item-condition">{product.item.condition} &nbsp; - &nbsp; {product.item.sold_quantity} vendidos</div>
                    <h1 className="title">
                        {product.item.title}
                    </h1>
                    <h4 className="amount">
                      {product.item.price.symbol} {product.item.price.amount}
                    </h4>

                    <a href className="btn btn-primary btn-block"> Comprar </a>

                </div>
                <div className="col-md-12">
                    <div className="page-header">
                        <h1>Descrição do Produto</h1>
                    </div>
                    <p>
                        {product.description}
                    </p>
                </div>
            </div>
        </div>
      )
    }
    
    if (!go) {
      return (
        <div className="col-md-12">
        </div>
      )
    }
    
  } 
}
