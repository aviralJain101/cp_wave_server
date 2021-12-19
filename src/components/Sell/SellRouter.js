import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import isEqual from 'lodash.isequal';
import { postItem, fetchSellItem } from '../../redux/Sell/ActionCreator';
import Sell from './SellComponent/MainComponent';
import ItemDetail from './SellComponent/ItemDetailComponent';

const mapStateToProps = state => {
    return {
        sellItem: state.sellItem
    }
  }
  
const mapDispatchToProps = (dispatch) => ({
    fetchSellItem: () => dispatch(fetchSellItem()),
    postItem: (item) => dispatch(postItem(item))
});
  
  


class SellRouter extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchSellItem();
    }

    

    render() {

        const SellPage = ({}) => {
            return(
              <Sell
                sellItem={this.props.sellItem}
                postItem={this.props.postItem}
              />
              );
        }
        const ItemWithIdPage = ({match}) => {
            {console.log(match.params.itemId)}
            return(
                <ItemDetail
                    item={this.props.sellItem.items.filter((item) => isEqual(item._id, match.params.itemId))[0]}
                    isLoading={this.props.sellItem.isLoading}
                    errMess={this.props.sellItem.errMess}
                />
            );
        }


        return (
            <div>
                {console.log(this.props.match)}
                <Switch>
                    <Route exact path={this.props.match.url} component={SellPage} />
                    <Route path={this.props.match.url+'/:itemId'} component={ItemWithIdPage} />
                </Switch>
          </div>
        );

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SellRouter));


// export default Courses;