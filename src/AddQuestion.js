import React, {Component} from 'react';
import props from "./App";

class AddQuestion extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: null,
            description: null
        }
    }

    render() {
        return (
            <div style={{ padding: "10px" }}>
                <input
                    type="text"
                    onChange={e => this.setState({ title: e.target.value })}
                    placeholder="How do I hack NASA"
                    style={{ width: "200px" }}
                />
                <input
                    type="text"
                    onChange={e => this.setState({ description: e.target.value })}
                    placeholder="I just learn html and want to hack NASA, can you help me?"
                    style={{ width: "200px" }}
                />
                <button onClick={() => this.props.postDataToDB(this.state.title, this.state.description )}>
                    Submit
                </button>
            </div>
        );
    }
}
export default AddQuestion;