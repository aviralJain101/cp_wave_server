import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import isEqual from 'lodash.isequal';
import { fetchPurchasedItem } from '../../redux/Purchased/ActionCreator';
import Purchased from './PurchasedComponent/MainComponent';
import ItemDetail from './PurchasedComponent/ItemDetailComponent';

const mapStateToProps = state => {
    return {
        purchasedItem: state.purchasedItem
    }
  }
  
const mapDispatchToProps = (dispatch) => ({
    fetchPurchasedItem: () => dispatch(fetchPurchasedItem()),
});
  
  


class PurchasedRouter extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchPurchasedItem();
    }

    

    render() {

        const PurchasedPage = ({}) => {
            return(
              <Purchased
                purchasedItem={this.props.purchasedItem}
              />
              );
        }
        const ItemWithIdPage = ({match}) => {
            return(
                <ItemDetail
                    item={this.props.purchasedItem.items.filter((item) => isEqual(item._id, match.params.itemId))[0]}
                    isLoading={this.props.purchasedItem.isLoading}
                    errMess={this.props.purchasedItem.errMess}
                />
            );
        }


        return (
            <div>
                {console.log(this.props.match)}
                <Switch>
                    <Route exact path={this.props.match.url} component={PurchasedPage} />
                    <Route path={this.props.match.url+'/:itemId'} component={ItemWithIdPage} />
                </Switch>
          </div>
        );

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PurchasedRouter));
