import React, {Component} from 'react';
import AddAnswer from "./AddAnswer";

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {questions:[]}
    }

    async componentWillMount() {
        //await data.
        const response = await fetch(
            `/api/questions/${this.props.questionsID}`
        );

        //assign to const json and set state when we receive data
        const questionsArray = await response.json();

        this.setState({ currentQuestion: questionsArray.find(question => question._id === this.props.match.params.id) });
        console.log(this.state.currentQuestion)
    }

    render() {
        console.log(this);

        return (
            this.state.currentQuestion ? <div>
                    <h3>{this.state.currentQuestion.title}</h3>
                    <p>{this.state.currentQuestion.description}</p>
                    <ul>
                        {this.state.currentQuestion.answers.length <= 0
                            ? "NO Answers yet"
                            : this.state.currentQuestion.answers.map(dat => (
                                <li style={{ padding: "10px" }} key={this.state.currentQuestion.message}>
                                    <span style={{ color: "gray" }}> </span> {dat.text} <br />
                                    <span style={{ color: "gray" }}> </span> {dat.ranking} <br />

                                    {dat.message}
                                    <button onClick={() => this.props.updateRating(dat.ranking, dat._id, this.state.currentQuestion._id, dat.text)}>
                                        Increase rating
                                    </button>
                                </li>
                            ))}
                    </ul>
                <AddAnswer
                    postAnswersToDB={this.props.postAnswersToDB} originalQuestionID={this.props.questionsID}
                />
                        </div>
                    : null
        );
    }
}

export default Question;