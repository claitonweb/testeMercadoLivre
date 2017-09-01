import React from 'react'
import ProductAPI from '../api'
import { Link } from 'react-router-dom'


const getParameterByName = (name) => {
   let match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}


export default class Items extends React.Component {
  itens = {
    data : {
      itens : {

      }
    }
  };
  
  componentDidMount() {
    this.itens.data = {};
    this.itens.data.itens = [];
    let search = getParameterByName('search');
    ProductAPI.all(search,
      (err, itens) => {
        if (!err) {
          this.itens = itens;
          this.forceUpdate();
        }
        
      }
    );
  }

  render () {
    
    
    let go = false;
    let itens = [];

    if (this.itens) {
      go = true;
      itens = this.itens.data.itens;
      if(itens.length <= 0 || itens.length === undefined) {
        go = false;
      }
    }
    
    if (go) {
      return (
        <div>
            {
            itens.map(p => (
               
                <div className="col-md-12 list-item-product" key={p.id}>
                  <div className="media-left media-middle">
                    <Link to={`/items/${p.id}`}>
                      <img src={p.picture} className="media-object img-product" alt="Foto do Produto"/>
                    </Link>
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">{p.price.symbol} {p.price.amount}</h4>
                    <p>{p.title}</p>
                  </div>
                </div>
              ))
            }
          
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
