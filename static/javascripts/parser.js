function print_grammar(grammar) {
    if(grammar) {
        return (<table>{
            grammar.map((line, key) => {
                let comps = line.split("\t");
                return (
                    <tbody key={key}>
                    <tr>
                        <td>
                            [{comps[0]}]
                        </td>
                        <td className="col">
                            {comps[1]}
                        </td>
                        <td className="col">
                            ==>
                        </td>
                        <td className="col">
                            {comps.slice(2)[0].split(" ").join(", ")}
                        </td>
                    </tr>
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
                <table className="title width100">
                    <tbody>
                        <tr>
                            <td style={{width:"50%"}}>
                                <h1 className="float-left margin5">Earley Parser</h1>
                            </td>
                            <td style={{width:"50%"}}>
                                <h5 className="float-right margin5">By Nafisa Ali Amir</h5>
                            </td>
                        </tr>

                    </tbody>
                </table>
                <table className="width100 float-left">
                    <tbody>
                    <tr>
                        <td className="input-form">
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <label>
                                    <p><b>Input Sentence</b></p>
                                    <p className="inline">
                                        <input type="text" value={this.state.sentence} onChange={this.handleChange.bind(this)} />
                                    </p>
                                </label>
                                <input className="button" type="submit" value="Parse" />
                            </form>
                            <br/>
                            <br/>
                            {this.state.parse===''?null:
                                <div className="output">
                                    <b>Parsed Output</b>
                                    <p>{this.state.parse}</p>
                                </div>
                            }
                        </td>
                        <td className="float-right">
                            <p><b>Grammar (PCFG)</b></p>
                            <div className="grammar">
                                {print_grammar(this.state.grammar)}
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className="footer">
                    <i>
                        Project completed in December 2018 as a part of Natural Language Processing course by Professor
                        Jason Eisner at Johns Hopkins University.
                    </i>
                    <br/>
                    <a href="https://github.com/amirnafisa/EarleyParser" style={{textAlign:"right"}}>
                    Source Code
                    </a>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Parser/>, document.querySelector("#parser"));