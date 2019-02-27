import React, {Component} from 'react';

class StockForm extends Component {
  static defaultProps = {
    onSubmit() {}
  }

  constructor(props) {
    super(props);
    this.state = {
      stock: ''
    };
  }
  
  render() {
    const {stock} = this.state;
    const {onSubmit, errorMessage} = this.props;
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(stock);
        this.setState({stock: ''});
      }}>
        {errorMessage ?
            <div className="alert alert-danger">{errorMessage}</div> :
            undefined}
        <textarea
          className="form-control"
          row="3"
          value={stock}
          onChange={(e) => this.setState({stock: e.target.value})}
        >
        </textarea>
        <button
          type="submit"
          className="btn btn-success pull-right"
          style={{marginTop: '10px'}}
        >
          Add my stock!
        </button>
      </form>
    );
  }
}

export default StockForm;
