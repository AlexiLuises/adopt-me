import { Component } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends Component {
  state = { loading: true, showModal: false };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );

    const json = await res.json();
    this.setState(
      Object.assign(
        {
          loading: false,
        },
        json.pets[0]
      )
    );

    //  THIS IS THE SAME AS THE CODE ABOVE, JUST MORE VERBOSE/CLEAR, ALSO FINE TO DO IT THIS WAY
    // this.setState({
    //    loading: false,
    //    name: json.pets[0].name,
    //    breed: json.pets[0].breed,
    //    animal: json.pets[0].animal,
    //    });
  }

  //method that swaps modal from false -> true and true -> false.
  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => (window.location = "http://bit.ly/pet-adopt");
  render() {
    if (this.state.loading) {
      return <h2>loading...</h2>;
    }

    // defines things on the page
    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${city}, ${state}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                //this.toggleModal to call method
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                {" "}
                Adopt {name}{" "}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>

          {
            showModal ? (
              <Modal>
                <div>
                  <h1>Would you like to adopt {name}?</h1>
                  <div className="buttons">
                    <button onClick={this.adopt}>Yes!</button>
                    <button onClick={this.toggleModal}>No!</button>
                  </div>
                </div>
              </Modal>
            ) : null // :null is for if showModal ? is untrue
          }
        </div>
      </div>
    );
  }
}

const DetailsWithRouter = withRouter(Details);
// had to use error boundary here to catch anything that may happen in javascript here
export default function DetailsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <DetailsWithRouter />
    </ErrorBoundary>
  );
}
