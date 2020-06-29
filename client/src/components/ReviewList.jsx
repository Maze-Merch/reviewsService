import React from 'react';
import Review from './Review.jsx';
import Sort from './Sort';
import AddReview from './AddReview.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showing: 2,
      reviewList: [],
      showAdd: false,
    }
    this.moreReviews = this.moreReviews.bind(this);
    this.showModal = this.showModal.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  moreReviews() {
    let oldShowing = this.state.showing;
    if (this.props.reviewData[oldShowing - 1]) {
      oldShowing += 2;
    }
    this.setState({
      showing: oldShowing,
    });
    let newReviewList = this.props.reviewData.slice(0, this.state.showing)
    this.setState({
      reviewList: newReviewList,
    })
  }

  onClick(e) {
    this.showModal();
  }

  onClose() {
    console.log('onClose')
    this.closeModal();
  }

  showModal() {
    this.setState({
      showAdd: true,
    });
  }

  closeModal() {
    console.log('closeModal')
    this.setState({
      showAdd: false,
    })
  }

  render() {
    let { reviewData } = this.props;
    let { showing } = this.state;
    let visibleStyle = (this.state.showing > this.props.reviewData.length ? {display: 'none'} : {display: 'inline-block'})
    return (
      <div className="container">
        <Sort
          reviewData={reviewData}
          sortByNew={this.props.sortByNew}
        />
        <div className="table table-striped">
          {this.props.reviewData.map(function(product, i) {
            if (i < showing) {
              return <Review
              key={i} 
              name={product.reviewer_name}
              rating={product.rating}
              summary={product.summary}
              body={product.body}
              date={product.date}
              helpfulness={product.helpfulness}
              recommend={product.recommend}
              reviewData={reviewData}
            />
            }
          })}
        </div>
        <button className="more-reviews-button" style={visibleStyle} onClick={this.moreReviews}>View More</button>
        <AddReview show={this.state.showAdd} />
      </div>
    );
  }
}

export default ReviewList;
