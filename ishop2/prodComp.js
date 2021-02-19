var ProdComp = React.createClass({

    displayName: 'ProdComp',
    
    propTypes: {
        item: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
        count: React.PropTypes.number.isRequired,
        cbSelected: React.PropTypes.func.isRequired,
        cbDelete: React.PropTypes.func.isRequired,
    },

    highlighted: function (EO) { 
        this.props.cbSelected (this.props.item);
    },

    delItem: function (EO) {
        this.props.cbDelete (this.props.item);
    },

    render: function() {
      return React.DOM.tr ( {className:this.props.classname, onClick:this.highlighted},
        React.DOM.td({},
            React.DOM.img({className:'Image', src:  this.props.url, alt:'image' }),),
            React.DOM.td({className:'Text'},  this.props.name),
            React.DOM.td({className:'Price'},  this.props.price),
            React.DOM.td({className:'Count'},  this.props.count, ' pcs.'),
            React.DOM.td({className:'Delete'}, 
            React.DOM.input ({type:'button', value:'Delete', onClick:this.delItem})),
    );
    },
    
    });