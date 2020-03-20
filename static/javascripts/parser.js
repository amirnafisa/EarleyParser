function print_grammar(grammar) {
    if(grammar) {
        return (<table>{
            grammar.map((line, key) => {
                let comps = line.split("\t");
                return (
                    <tbody key={key}>
                        <td>
                            {comps[0]}
                        </td>
                        <td className="col">
                            {comps[1]}
                        </td>
                        <td className="col">
                            {comps.slice(2).join(", ")}
                        </td>
                    </tbody>
                );
            })}</table>);
    }
}

class Parser extends React.Component {
    _isMounted = true;
    constructor(props) {
        super(props);
        this.state = {parse:'', sentence:'', grammar:''}
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        this._isMounted &&  this.getParse();
    }

    async getParse () {
        const sentence = encodeURIComponent(this.state.sentence.trim());
        this._isMounted && this.setState( (await (await fetch("/parse?sentence=" + sentence)).json()));
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
                <div className="common title">
                    <h1 className="inline">Earley Parser</h1>
                    <h5 className="inline">By Nafisa Ali Amir</h5>
                </div>
                <div className="common form">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <label>
                            Input Sentence:
                            <input type="text" value={this.state.sentence} onChange={this.handleChange.bind(this)} />
                        </label>
                        <input className="button" type="submit" value="Parse" />
                    </form>
                    <br/>
                    Parsed Output:
                    {this.state.parse}
                </div>
                <div className="common grammar">
                   <h2>Grammar (PCFG)</h2>
                    {print_grammar(this.state.grammar)}
                </div>



            </div>
        );
    }
}

ReactDOM.render(<Parser/>, document.querySelector("#parser"));