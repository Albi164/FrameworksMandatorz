import React, {Component} from 'react';
import {Link} from "react-router-dom";
import AddAnswer from "./AddAnswer";
import props from "./App";

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {questions:[]}
    }

    async componentWillMount() {
        //await data.
        const response = await fetch(
            `https://mandatoryassigment.herokuapp.com/questions2`
        );

        //assign to const json and set state when we receive data
        const questionsArray = await response.json();

        this.setState({ currentQuestion: questionsArray.find(question => question._id === this.props.match.params.id) });
        console.log(this.state.currentQuestion)
    }

    render() {
        console.log(this)
        // const {title, description} = this.state.currentQuestion
        //  this.state.questions.forEach((elm) => {
        //     list.push(<li key={elm.id}>
        //         <Link key={elm.id} to={`/questions/with/${elm.topic}`}>{elm.topic}</Link>
        //     </li>)
        // });
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