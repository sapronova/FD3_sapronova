var FilterComp=React.createClass({
    displayName: 'FilterComp', 
    propTypes: {
        words: React.PropTypes.arrayOf(React.PropTypes.string).isRequired, 
      },
    
    getInitialState: function() {
        return {
          enteredtext:'',
          alphaorder:false,
          initwordssorted:this.props.words.map(v=>v).sort(),  
        };
      },

    enteredtextChanged: function(EO) { 
        this.setState({enteredtext: EO.target.value});
      },

    checkboxChanged: function(EO) {  
        this.setState({alphaorder: EO.target.checked});
      },

    clearOptions: function(EO) {  
        this.setState({alphaorder: false});
        this.setState({enteredtext:''});
      },

    render: function() {
       var stringofWords=[];
        this.state.alphaorder ? this.state.initwordssorted.forEach((v,i) => {   //поиск внутри копии отсортированного массива слов
            if (v.indexOf(this.state.enteredtext)!=-1) {
                var eachword=React.DOM.option({key:i},v);
                stringofWords.push(eachword);
            }
           })
        :this.props.words.forEach((v,i) => {        //поиск внутри неотсортированного массива слов
        if (v.indexOf(this.state.enteredtext)!=-1) {
            var eachword=React.DOM.option({key:i},v);
            stringofWords.push(eachword);
        }
       });  

        return React.DOM.div( {className:'FilterComp'}, 
            React.DOM.input({type: 'checkbox',  onChange: this.checkboxChanged, checked: this.state.alphaorder}),
            React.DOM.input({type: 'text', className: 'textInp', onChange: this.enteredtextChanged,  value: this.state.enteredtext}),
            React.DOM.input({type:'button', className: 'ResetButton', value:'сброс', onClick: this.clearOptions}),
            React.DOM.div({className: 'SelectList'},
            React.DOM.select({className: 'SelectField', size: '5'},  stringofWords) 
        )
        );
      },
});