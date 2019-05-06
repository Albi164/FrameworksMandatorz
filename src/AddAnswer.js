import React, {Component} from 'react';
import props from "./App";
class PostAnswer extends Component {
    constructor(props){
        super(props)
        this.state = {
            text: null,
            rating: null
        }
    }
    render() {
        console.log(this)
        return (
            <div style={{ padding: "10px" }}>
                <input
                    type="text"
                    onChange={e => this.setState({ text: e.target.value })}
                    placeholder="This is how you start"
                    style={{ width: "200px" }}
                />
                <button onClick={() => this.props.postAnswersToDB(this.state.text, this.props.originalQuestionID)}>
                    Submit answer
                </button>

            </div>
        );
    }
}

export default PostAnswer;