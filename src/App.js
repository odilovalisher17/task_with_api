import React, {useState, useEffect} from 'react'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Homepage from './Components/Homepage/Homepage'
import Navbar from './Components/Navbar/Navbar'
import './Utility.css';
import axios from 'axios';
import Exam from './Components/Exam/Exam';

const App = (props) => {
  const [category, setCategory] = useState([]);
  const [questionNum, setQuestionNum] = useState(10);
  const [selectedCat, setSelectedCat] = useState('General Knowledge');
  const [selectedCatIndex, setSelectedCatIndex] = useState(0);
  const [currentQuestionNum, setCurrentQuestionNum] = useState(1);
  const [isExam, setIsExam] = useState(false);
  const [checkedKey, setCheckedKey] = useState([]);
  const [finalModule, setFinalModule] = useState(false);

    useEffect(()=>{
        const dataFunc = async () => {
            const data = await axios.get('https://opentdb.com/api_category.php');
            setCategory(data.data.trivia_categories);
        }
        dataFunc();
    }, [props.id])

  return (
      <BrowserRouter>
      <Navbar
      currentQuestionNum={currentQuestionNum}
      questionNum={questionNum}
      isExam={isExam}
      checkedKey={checkedKey}
      setCheckedKey={setCheckedKey}
      setFinalModule={setFinalModule} />

      <Routes>
        <Route path='/' element={
          <Homepage
          category={category}
          selectedCat={selectedCat}
          setCategory={setCategory}
          setQuestionNum={setQuestionNum}
          setSelectedCat={setSelectedCat}
          setSelectedCatIndex={setSelectedCatIndex}
          setIsExam={setIsExam} />} />

        <Route path='/exam' element={
          <Exam
          questionNum={questionNum}
          selectedCatIndex={selectedCatIndex}
          setSelectedCatIndex={setSelectedCatIndex}
          currentQuestionNum={currentQuestionNum}
          setCurrentQuestionNum={setCurrentQuestionNum}
          setIsExam={setIsExam}
          checkedKey={checkedKey}
          setCheckedKey={setCheckedKey}
          finalModule={finalModule}
          setFinalModule={setFinalModule}
          setQuestionNum={setQuestionNum} />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App