import React, { Component } from 'react';

export class Questionnaire extends Component {
    static displayName = Questionnaire.name;

    constructor(props) {
        super(props);
        this.state = { Questions: [], Anwsers: ["", "", "Другой", "", "холост", "1"], DropData: [], loading: true, currentStep: 0 };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
         this.populateQuestionsData();
         this.populateDropMenuData();
    }

    handleChange = event => {
        const { name, value } = event.target
        const answers = this.state.Anwsers.concat()
        answers[this.state.currentStep] = value
        this.setState({
            Anwsers: answers
        })
    }

    renderQuestionTable(Questions) {
       
        return (Questions.map(question => this.renderQuestion(question)))
    }

    renderQuestion(Question) {
        if (Question.questionType == "text")
            return (
                <div>
                    <p>{Question.questionText}</p>
                    <p><input
                        type="text"
                        value={this.state.Anwsers[this.state.currentStep]}
                        onChange={this.handleChange}
                        name={Question.id}>
                    </input></p>
                </div>)
            
        if (Question.questionType == "date")
            return (
                <div>
                    <p>{Question.questionText}</p>
                    <p><input
                        type="date"
                        value={this.state.Anwsers[this.state.currentStep]}
                        onChange={this.handleChange}
                        name={Question.id}>
                    </input> </p>
                </div>)
    
        if (Question.questionType == "radio")
            return (
                <div>
                    <p>{Question.questionText}</p>
                    <p><input type="radio" value="1"   name={Question.id} onChange={this.handleChange} checked={this.state.Anwsers[this.state.currentStep] == 1}></input>    Да</p>
                    <p><input type="radio" value="2 " name={Question.id} onChange={this.handleChange} checked={this.state.Anwsers[this.state.currentStep] == 2}></input>    Нет</p>
                </div>)

        if (Question.questionType == "drop")
            return (
                <div>
                    <p>{Question.questionText}</p>
                    <p><select value={this.state.Anwsers[this.state.currentStep]} name={Question.id} onChange={this.handleChange}>
                        
                        {
                            this.renderSelection(Question.id)
                        }
                    </select></p>
                </div>)
    }

    renderSelection(id)
    {
        return (this.state.DropData.map(data => {
            if (data.questionId == id) {
                return (<option key={data.text} value={data.text}> {data.text}</option>)
            }
        }))
    }


    _next = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep >= 4 ? 5 : currentStep + 1
        this.setState({
            currentStep: currentStep
        })
    }

    _prev = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep <= 0 ? 0 : currentStep - 1
        this.setState({
            currentStep: currentStep
        })
    }

    previousButton() {
        let currentStep = this.state.currentStep;
        if (currentStep !== 0) {
            return (
                <button
                    className="btn btn-secondary"
                    type="button" onClick={this._prev}>
                    Previous
                </button>
            )
        }
        return null;
    }

    nextButton() {
        let currentStep = this.state.currentStep;
        if (currentStep < 5) {
            return (
                <button
                    className="btn btn-primary float-right"
                    type="button" onClick={this._next}>
                    Next
                </button>
            )
        }
        return null;
    }

    subbimitButton() {
        let currentStep = this.state.currentStep;
        if (this.state.currentStep == 5) {
            return (
                <input type="submit" />
            )
        }
        return null;
    }

    handleSubmit() {

        var awns = this.state.Anwsers.concat();
        var quest = this.state.Questions.concat();
        var object = { children: awns.map((a, i) => ({ question: quest[i].id, answer: a })) };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(object)
        };
        fetch('Anwsers/Submit', requestOptions)
            .then(response => response.json())
    }
   
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderQuestionTable(this.state.Questions);

        return (
            <div>
                <h1 id="tabelLabel" >Questions</h1>
                <>
                    <p>Step {this.state.currentStep+1} </p>
                    <form name="Questionnaire" onSubmit={this.handleSubmit}>

                        {contents[this.state.currentStep]}
                        {this.previousButton()}
                        {this.nextButton()}
                        {this.subbimitButton()}
                    </form>
                </>
            </div>
        );
    }

    async populateQuestionsData() {
        const response = await fetch('Answers');
        const data = await response.json();
        this.setState({ Questions: data, loading: false });
    }

    async populateDropMenuData() {
        const response = await fetch('DropMenuDatas');
        const data = await response.json();
        this.setState({ DropData: data });
    }
}