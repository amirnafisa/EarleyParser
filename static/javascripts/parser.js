

class Parser extends React.Component {
    _isMounted = true;
    constructor(props) {
        super(props);
        this.state = {parse:'', sentence:''}
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
    }

    async getParse () {
        var sentence = encodeURIComponent(this.state.sentence.trim());
        this._isMounted && this.setState( {
            parse: (await (await fetch("/parse?sentence="+sentence)).json())['parse']
        });
    }

    handleChange(event) {
        this.setState({sentence :event.target.value});
    }

    handleSubmit(event) {
        this._isMounted && this.getParse();
        event.preventDefault();
    }

    render() {
        return(
            <div>
                <h1>Earley Parser</h1>
                <h5>By Nafisa Ali Amir</h5>

                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>
                        Input Sentence:
                        <input type="text" value={this.state.sentence} onChange={this.handleChange.bind(this)} />
                    </label>
                    <input type="submit" value="Parse" />
                </form>

                <p>Parsed Output:
                    {" "+this.state.parse}</p>
            </div>
        );
    }
}

ReactDOM.render(<Parser/>, document.querySelector("#parser"));