import React, { Component } from 'react';
import { Link } from "react-router-dom";
import AddQuestion from "./AddQuestion";

class QuestionsList extends Component {

    render() {
        return (
            <div>
                <h3>List of questions</h3>
                {this.props.questions.map(el => (
                   <Link key={el._id} to={"/question/"+el._id}><p>Title: {el.title},<br></br>
                        Description: {el.description},<br></br>
                       </p></Link>
                ))}

                <AddQuestion
                    postDataToDB={this.props.postDataToDB} form={this.props.form}/>
            </div>

        );

    }
}
export default QuestionsList;