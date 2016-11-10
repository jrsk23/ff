import React from 'react';
import { Link,  withRouter} from 'react-router';
import {demo} from '../../actions/session_actions';
import SessionFormContainer from '../session_form/session_form_container';
import Modal from 'react-modal';
import {authModalStyle} from '../../util/modal_styles';

document.addEventListener('DOMContentLoaded', () => {
  Modal.setAppElement(document.body);
});

class Splash extends React.Component{

  constructor(props){
    super(props);
    this.state = {authModal: false, formType:''};
    this.demo = this.demo.bind(this);
    this.state.movie = {}

  }

  componentWillReceiveProps(nextProps){
 if(nextProps.currentUser && nextProps.currentUser.id){
   this.props.router.push('/app');
   }
 }

 componentWillMount(){
   let random = (Math.floor(Math.random() *50) + 1);
   this.props.fetchMovie(random)
 }

 componentDidUpdate() {
   this.redirectIfLoggedIn();

 }



 redirectIfLoggedIn() {
   if (this.props.loggedIn){
     this.props.router.replace("/main");
   }
 }


  openModal(type){
    this.props;
    this.setState({authModal: true, formType: type});
  }

  closeModal(){
    this.setState({authModal: false});
  }

  toggleForm(){
    if(this.state.formType === 'signup'){
      this.setState({formType: 'login'});
    }else{
      this.setState({formType: 'signup'});
    }
  }

  demo(){
    this.props.demo()
  }

  render () {

    if(this.props.movie){
    return (<div className='splash-div'>
    <Link to="/" className="header-bar">
        <h1 className= 'logo'>FAKEFLIX</h1>
    </Link>
    <iframe className='splash-player' id='splash-player'src={`https://www.youtube.com/embed/${this.props.movie.url}?autoplay=1&&modestbranding=1&loop=1&showinfo=0&iv_load_policy=3}`} frameBorder="0" allowFullScreen/>

      <div className='login-signup'>
        <button onClick={this.openModal.bind(this, 'login')}>Login!</button>
        <button onClick={this.openModal.bind(this, 'signup')}>Sign up!</button>
      </div>
        <div className ='over-demo'>
          <h2>Tons of Trailers</h2>
          <p>Only a few clicks away.</p>
        </div>
      <button className='splash-demo' onClick= {this.demo}>Demo Login</button>
        <Modal isOpen={this.state.authModal}
           onRequestClose={this.closeModal.bind(this)}
           style={authModalStyle}>

         <SessionFormContainer formType={this.state.formType}
            closeModal={this.closeModal.bind(this)}
            toggleForm={this.toggleForm.bind(this)}
          />
        </Modal>

  </div>)
}else{

  return(<div>NO!</div>)
}}
}

Splash.contextTypes = {
  store: React.PropTypes.object
}

export default withRouter(Splash);
