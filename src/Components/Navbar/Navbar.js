import React from 'react';
import './Navbar.css'

const Navbar = (props) => {
  const {currentQuestionNum, questionNum, isExam, checkedKey, setCheckedKey, setFinalModule} = props;

  const handleFinish = () => {
    const newChek = [...checkedKey];
    for(let i=0; i<newChek.length; i++){
        newChek[i][1] = -10;
    }
    setCheckedKey(newChek);
    setFinalModule(true);
  }

  return (
    <div className='navbar'>
        <div className="container">
          <div className='logo'>
            <h3>Final Exam</h3>
          </div>

          {isExam &&
          <div>
            <h3>{currentQuestionNum}/{questionNum}</h3>
          </div>}
          
          {isExam && 
          <button
          onClick={()=>handleFinish()}>
            Finish
          </button>}
        </div>
    </div>
  );
}

export default Navbar;
