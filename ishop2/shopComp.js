var ShopComp = React.createClass({
    displayName: 'ShopComp',
    
    getDefaultProps: function() {
      return { shop: "Undefined" }
    },
    
    propTypes: {
        positions: React.PropTypes.array.isRequired,
    },

    getInitialState: function () {
        return {
            isHighlightened: null,
            selectedItem:null,
            myProds: this.props.positions.map(v=>v),
        };
    },

    itemSelected: function(item) {
        this.setState({selectedItem: item});
        this.setState({isHighlightened: 'Highlightened'});
        this.state.isHighlightened==='Highlightened'&&item===this.state.selectedItem?this.setState({isHighlightened: null}):this.setState({isHighlightened: 'Highlightened'});
    },

    itemDelete: function(index) { 
        var confirmation = confirm('You have clicked the delete-button, are you sure of your decision?');
        if (confirmation) { 
            this.state.myProds.splice(index,1);
        };
    },

    render: function() {
        var prodList=this.state.myProds.map ((v, i) =>
            React.createElement (ProdComp, {key:v.item, item:v.item, name:v.name, count:v.count, 
                price:v.price, url:v.url, 
                cbSelected: this.itemSelected, 
                classname:(v.item===this.state.selectedItem)?this.state.isHighlightened:null,
                cbDelete: this.itemDelete, 
                index: i,
            }
            ) 
        );
    
        return React.DOM.div({className: 'ItemsList'},
        React.DOM.div({className: 'Name'}, this.props.shop),
        React.DOM.table({className: 'ItemsList'},
            React.DOM.thead(null,
                React.DOM.tr({className: 'ListHeader'},
                    React.DOM.th(null, 'Image'),
                    React.DOM.th({className: 'Text'}, 'Name'), 
                    React.DOM.th({className: 'Price'}, 'Price'),
                    React.DOM.th({className: 'Count'}, 'Count'),
                    React.DOM.th({className: 'Delete'}, 'Delete'),
                )
            ),
                React.DOM.tbody({className: 'List'}, prodList)
        ),

    );
 
    },
});