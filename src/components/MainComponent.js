import React, { Component } from 'react';
import Home from './HomeComponent';
import About from './AboutComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Favorites from './FavoriteComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Courses from './Courses/CoursesComponent';
import AddUsers from './AddUsers/AddUserComponent';
import Dashboard from './Dashboard/DashboardComponent';
import Chat from './ChatComponent/MainChatComponent';
import CourseDetail from './Courses/CourseDetails/CourseDetailComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, postFeedback, fetchDishes, fetchComments, fetchPromos, fetchLeaders, signupUser, loginUser, logoutUser, fetchFavorites, postFavorite, deleteFavorite, fetchSearches, fetchFriends } from '../redux/ActionCreators';
import { fetchCourseTags } from '../redux/CourseTags/ActionCreator';
import { fetchBoughtCourse, postBoughtCourse } from '../redux/Course/BoughtCourse/ActionCreator';
import { fetchCreatedCourse, postCreatedCourse } from '../redux/Course/CreatedCourse/ActionCreator';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import jwt_decode from 'jwt-decode';
import { io } from "socket.io-client";
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders,
      favorites: state.favorites,
      auth: state.auth,
      searches: state.searches,
      friends: state.friends,
      courseTags: state.courseTags,
      boughtCourse: state.boughtCourse,
      createdCourse: state.createdCourse
    }
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, comment) => dispatch(postComment(dishId, rating, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => dispatch(fetchLeaders()),
  postFeedback: (feedback) => dispatch(postFeedback(feedback)),
  signupUser: (creds) => dispatch(signupUser(creds)),
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  fetchFavorites: () => dispatch(fetchFavorites()),
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId)),
  fetchSearches: (searchTerm) => dispatch(fetchSearches(searchTerm)),
  fetchFriends: () => dispatch(fetchFriends()),
  fetchCourseTags: (courseData) => dispatch(fetchCourseTags(courseData)),
  fetchBoughtCourse: () => dispatch(fetchBoughtCourse()),
  postBoughtCourse: (courseData) => dispatch(postBoughtCourse(courseData)),
  fetchCreatedCourse: () => dispatch(fetchCreatedCourse()),
  postCreatedCourse: (courseData) => dispatch(postCreatedCourse(courseData)),
});

class Main extends Component {

  componentDidMount() {
    const storedToken = localStorage.getItem("token");
    if (storedToken){
      let decodedData =jwt_decode(storedToken);
      let expirationDate = decodedData.exp;
        var current_time = Date.now() / 1000;
        if(expirationDate < current_time)
        {
          // alert("exired");
            this.props.logoutUser();
        }
    }
    // var socket = io('https://localhost:3443/', {transports: ['websocket', 'polling', 'flashsocket'],rejectUnauthorized: false});

    // // const socket = io('https://localhost:3443/');
    // socket.on("connect", () => {
    //   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    // });
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    this.props.fetchFavorites();
    this.props.fetchFriends();
    this.props.fetchCourseTags();
    if(this.props.auth.isAuthenticated) {
      this.props.fetchCreatedCourse();
    }
  }
  

  render() {
    const HomePage = () => {
      return(
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          leaderLoading={this.props.leaders.isLoading}
          leaderErrMess={this.props.leaders.errMess}
        />
      );
    }

    const CoursePage = () => {
      return(
        this.props.auth.isAuthenticated
        ?
        <Courses
          courseTags = {this.props.courseTags} 
          postCreatedCourse={this.props.postCreatedCourse}
          createdCourse={this.props.createdCourse}
        />
        :
        <div>
          {this.props.history.push("/home")}
        </div>
        );
    }

    const AddUsersPage = () => {
      return(
        <AddUsers 
          searches={this.props.searches}
        />
      );
    }

    const DashboardPage = () => {
      return(
        <Dashboard 
          searches={this.props.searches}
          auth={this.props.auth}
        />
      );
    }

    const ChatUserPage = () => {
      return (
        <Chat 
          // fetchFriends={this.props.fetchFriends}
          friends={this.props.friends}
        />
      );
    }

    const DishWithId = ({match}) => {
      return(
        <CourseDetail />
      );
    }

    const CourseWithId = ({match}) => {
      return(
        this.props.auth.isAuthenticated
        ?
        <CourseDetail dish={this.props.dishes.dishes.filter((dish) => dish._id === match.params.dishId)[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dish === match.params.dishId)}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
          // favorite={this.props.favorites.favorites.dishes.some((dish) => dish._id === match.params.dishId)}
          postFavorite={this.props.postFavorite}
          />
        :
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish._id === match.params.dishId)[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dish === match.params.dishId)}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
          favorite={false}
          postFavorite={this.props.postFavorite}
          />
      );
    }

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.auth.isAuthenticated
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/home',
              state: { from: props.location }
            }} />
      )} />
    );
    

    return (
      <div>
        <Header auth={this.props.auth} 
          loginUser={this.props.loginUser} 
          logoutUser={this.props.logoutUser} 
          signupUser={this.props.signupUser}
          fetchSearches={this.props.fetchSearches}
          />   
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
              <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
              <Route path="/menu/:dishId" component={DishWithId} />
              <PrivateRoute exact path="/favorites" component={() => <Favorites favorites={this.props.favorites} deleteFavorite={this.props.deleteFavorite} />} />
              <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
              <Route exact path="/courses" component={ CoursePage } />
              <Route path="/courses/:courseId" component={CourseWithId} />
              <Route exact path="/addusers" component={AddUsersPage} />
              <Route exact path="/chat" component={ChatUserPage} />
              <Route path="/:User" component={DashboardPage} />

              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
