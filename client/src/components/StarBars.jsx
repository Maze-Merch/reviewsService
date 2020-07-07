import React from 'react';

class StarBars extends React.Component {
  constructor(props) {
    super(props);

    this.state = null;
  }

  render() {
    let {
      barPercents,
      filter,
      removeFilter,
      hide5Stars,
      hide4Stars,
      hide3Stars,
      hide2Stars,
      hide1Stars,
      style,
    } = this.props;
    let isAnyStarShowing = false;
    if (!hide5Stars || !hide4Stars || !hide3Stars || !hide2Stars || !hide1Stars) {
      isAnyStarShowing = true;
    }
    return (
      /* NOTE: The only reason I can use filter on both the labels
       and the the buttons is because they both have the same inner text,
       */
      <div className="sidebarStarGraph">
        <div className="sb-star-labels">
          <div className="starlabel" onClick={filter}>5 stars</div>
          <div className="starlabel" onClick={filter}>4 stars</div>
          <div className="starlabel" onClick={filter}>3 stars</div>
          <div className="starlabel" onClick={filter}>2 stars</div>
          <div className="starlabel" onClick={filter}>1 stars</div>
        </div>
        <div className="bars-outer" onClick={filter}>
          <div className="sb-star-breakdown" style={{width: barPercents[4]}}></div>
        </div>
        <div className="bars-outer" onClick={filter}>
          <div className="sb-star-breakdown" style={{width: barPercents[3]}}></div>
        </div>
        <div className="bars-outer" onClick={filter}>
          <div className="sb-star-breakdown" style={{width: barPercents[2]}}></div>
        </div>
        <div className="bars-outer" onClick={filter}>
          <div className="sb-star-breakdown" style={{width: barPercents[1]}}></div>
        </div>
        <div className="bars-outer" onClick={filter}>
          <div className="sb-star-breakdown" style={{width: barPercents[0]}}></div>
        </div>
        <div className="star-button-title" style={isAnyStarShowing ? {display: style } : { display: 'none'}}>Filters Selected:</div>
        <button className="stars5-button star-filter-buttons" type="button" onClick={filter} style={!hide5Stars ? {display: style } : { display: 'none'}}>5 stars</button>
        <button className="stars4-button star-filter-buttons" type="button" onClick={filter} style={!hide4Stars ? {display: style } : { display: 'none'}}>4 stars</button>
        <button className="stars3-button star-filter-buttons" type="button" onClick={filter} style={!hide3Stars ? {display: style } : { display: 'none'}}>3 stars</button>
        <button className="stars2-button star-filter-buttons" type="button" onClick={filter} style={!hide2Stars ? {display: style } : { display: 'none'}}>2 stars</button>
        <button className="stars1-button star-filter-buttons" type="button" onClick={filter} style={!hide1Stars ? {display: style } : { display: 'none'}}>1 stars</button>
        <button className="remove-filter-button star-filter-buttons" type="button" onClick={removeFilter} style={isAnyStarShowing ? {display: style } : { display: 'none'}}>Remove filters</button>
      </div>
    );
  }
}

export default StarBars;
