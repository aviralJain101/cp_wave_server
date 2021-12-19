import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import isEqual from 'lodash.isequal';
import { buyItem, fetchMarketItem } from '../../redux/Market/ActionCreator';
import Buy from './BuyComponent/MainComponent';
import ItemDetail from './BuyComponent/ItemDetailComponent';

const mapStateToProps = state => {
    return {
        marketItem: state.marketItem
    }
  }
  
const mapDispatchToProps = (dispatch) => ({
    fetchMarketItem: () => dispatch(fetchMarketItem()),
    buyItem: (item) => dispatch(buyItem(item))
});
  
  


class MarketRouter extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchMarketItem();
    }

    

    render() {

        const MarketPage = ({}) => {
            return(
              <Buy
                marketItem={this.props.marketItem}
                buyItem={this.props.buyItem}
              />
              );
        }
        const ItemWithIdPage = ({match}) => {
            return(
                <ItemDetail
                    item={this.props.marketItem.items.filter((item) => isEqual(item._id, match.params.itemId))[0]}
                    isLoading={this.props.marketItem.isLoading}
                    errMess={this.props.marketItem.errMess}
                    buyItem={this.props.buyItem}
                />
            );
        }


        return (
            <div>
                {console.log(this.props.match)}
                <Switch>
                    <Route exact path={this.props.match.url} component={MarketPage} />
                    <Route path={this.props.match.url+'/:itemId'} component={ItemWithIdPage} />
                </Switch>
          </div>
        );

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MarketRouter));


// export default Courses;