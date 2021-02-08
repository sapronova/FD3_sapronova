var ItemsList = React.createClass({

  displayName: 'ItemsList',
  
  getDefaultProps: function() {
    return { shop: "Undefined" }
  },
  
  render: function() {
  
    var positionsTable=[];
    this.props.positons.forEach(v => {
      var positionTable=        
        React.DOM.tr({key:v.item,className:'Answer'},
          React.DOM.td({},
               React.DOM.img({className:'Image', src: v.url, alt:'image' }),),
          React.DOM.td({className:'Text'},v.name),
          React.DOM.td({className:'Price'},v.price),
          React.DOM.td({className:'Count'},v.count, ' pcs.'),
        );
        positionsTable.push(positionTable);
    });
  
    return React.DOM.div( {className:'ItemsList'}, 
      React.DOM.div( {className:'Name'}, this.props.shop ),
      React.DOM.table( {className:'List'},
          React.DOM.tbody ({}, positionsTable ) ),
    );
  },
  
  });