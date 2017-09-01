import React from 'react'

const submitForm = (e) => {
  e.preventDefault();
  document.getElementById("formSearch").submit();
}

const Header = () => (
  <header>
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <a className="navbar-brand" href="">
            <img alt="Brand" className="brand" src="/logo-pt__large.png"/>
          </a>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

            <div className="col-md-8">
              <form className="navbar-form navbar-left" id="formSearch" action="/items">
                <div className="form-group">
                  <div className="input-group">
                    <input type="text" className="form-control search" name="search"/>
                    <span className="input-group-addon">
                        <a href onClick={submitForm}>
                          <span className="glyphicon glyphicon-search"></span>
                        </a>
                    </span>
                  </div>
                </div>
              </form>
            </div>
        </div>
      </div>
    </nav>

  </header>
)

export default Header
