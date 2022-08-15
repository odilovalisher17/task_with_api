import React, {useState, useEffect} from 'react';
import './Exam.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'

const Exam = (props) => {
    const {questionNum, selectedCatIndex, setSelectedCatIndex ,currentQuestionNum, setCurrentQuestionNum ,setIsExam, checkedKey, setCheckedKey, finalModule, setFinalModule, setQuestionNum} = props;
    const [questions, setQuestions] = useState([]);
    const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);

    useEffect(()=>{
        setIsExam(true)

        const getQuestions = async () => {
            const response = await axios.get(`https://opentdb.com/api.php?amount=${questionNum}&category=${9+Number(selectedCatIndex)}`)
            const newResponse = response.data.results;
            
            let newQuestions = newResponse.map(q => {
                return { ...q,
                keys : [...q.incorrect_answers, q.correct_answer].sort(() => 0.5 - Math.random()),
                checkedKey : -1,
            }
            })
            
            setQuestions(newQuestions)

            let answers = [];
            for(let i=0; i<newQuestions.length; i++){
                answers.push([-1, -1])
            }
            setCheckedKey(answers)
        }

        getQuestions();
    }, [props.id])

    const handleChecker = (index) => {
        if(checkedKey[currentQuestionNum-1][1] !== -1){
            return
        }
        let newCheckedKeys = [...checkedKey];
        newCheckedKeys[currentQuestionNum - 1][0] = index;
        setCheckedKey(newCheckedKeys)
    }

    const handleSubmit = () => {
        if(
            questions[currentQuestionNum-1].keys[checkedKey[currentQuestionNum-1][0]] ===
            questions[currentQuestionNum-1].correct_answer
        ){
            setTotalCorrectAnswers(t=>t+1);
            const newChecked = [...checkedKey];
            newChecked[currentQuestionNum-1][1] = 10;
            setCheckedKey(newChecked)
        }else{
            const newChecked = [...checkedKey];
            newChecked[currentQuestionNum-1][1] = -10;
            setCheckedKey(newChecked)
        }

        if(!checkedKey.map(c=> c[1]).includes(-1)){
            setFinalModule(true)
        }
    }

  if(questions.length !== 0){
    return (
        <div className='exam'>
            <div className='exam-pagination'>
                {questions.map((q, index)=>(
                    <button 
                    className = {
                        currentQuestionNum === index+1 ? 'active-btn' : 
                        checkedKey[index][1] === 10 ? 'true-answer' : 
                        checkedKey[index][1] === -10 ? 'wrong-answer' : 
                        checkedKey[index][0] !== -1 ? 'checked-answer'  : ''}
                    onClick={()=>{
                        setCurrentQuestionNum(index+1)}}>
                        {index+1}
                    </button>
                ))}
            </div>

            <div className="question-card">
                <div className="question">
                    <h5>{questions[currentQuestionNum-1].question}</h5>
                </div>

                <div className="answers">
                    {questions[currentQuestionNum-1].keys.map((m,index, array)=>(
                        <p 
                        onClick={()=>handleChecker(index)}
                        className={
                            checkedKey[currentQuestionNum - 1][1] === 10 &&
                            checkedKey[currentQuestionNum - 1][0] === index ||
                            m === questions[currentQuestionNum-1].correct_answer &&
                            checkedKey[currentQuestionNum - 1][1] !== -1 ? 'true-answer' :
                            checkedKey[currentQuestionNum - 1][1] === -10 &&
                            checkedKey[currentQuestionNum - 1][0] === index ? 'wrong-answer' :
                            checkedKey[currentQuestionNum - 1][0] === index ? 'checked-answer' : ''}>
                            {m}
                        </p>
                    ))}
                </div>

                <div className="pagination-btn">
                        <button
                        disabled={currentQuestionNum === 1}
                        onClick={()=>{setCurrentQuestionNum(s=>s-1)}}
                        className={
                            currentQuestionNum === 1 ? 'pagination-btn-disable' : 'pagination-btn-active'}>
                            PREVIOUS
                        </button>
                        
                        <button
                        disabled={
                            checkedKey[currentQuestionNum-1][0] === -1 ||
                            checkedKey[currentQuestionNum-1][1] === 10 ||
                            checkedKey[currentQuestionNum-1][1] === -10
                        }
                        onClick={()=>{handleSubmit()}}>
                            SUBMIT
                        </button>
                        
                        <button
                        disabled={currentQuestionNum === questions.length}
                        onClick={()=>{setCurrentQuestionNum(s=>s+1)}}
                        className={
                            currentQuestionNum === questions.length ? 'pagination-btn-disable' : 'pagination-btn-active'}>
                            NEXT
                        </button>
                </div>
            </div>


            <div 
            className='final-module-carpet'
            style={{"display" : finalModule ? "block" : "none"}}></div>

            <div 
            className="final-module"
            style={{"display" : finalModule ? "block" : "none"}}>
                <p className='result'>
                    Your results
                </p>

                <p className='result-num'>
                    {totalCorrectAnswers} / {questionNum}
                </p>
                <p className='result' style={{textAlign : 'center'}}>or</p>
                <p className='result-procent'>
                    {Math.floor(totalCorrectAnswers * 100/questionNum)}%
                </p>

                <div className='final-btn'>
                    <button
                    className='final-ok'
                    onClick={()=>setFinalModule(false)}>OK</button>

                    <NavLink 
                    to={'/'}
                    className='final-go-home'
                    onClick={()=>{
                        setFinalModule(false)
                        setCurrentQuestionNum(1)
                        setQuestionNum(10)
                    }}>
                        GO HOME
                    </NavLink>
                </div>
            </div>
        </div>
    );
  }else{
    return(
        <div style={{display:"flex", minHeight:"400px", justifyContent:"center", alignItems:"center"}}>
            <Spinner animation="border" />
        </div>
    )
  }
}

export default Exam;
