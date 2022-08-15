import React, {useEffect} from 'react';
import './Homepage.css';
import {NavLink} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'

const Homepage = (props) => {
    const {selectedCat,category, setSelectedCat, setQuestionNum, setSelectedCatIndex, setIsExam} = props;

    useEffect(()=>{
        setIsExam(false)
    }, [props.id])
    
  if(category.length !== 0){
    return (
        <div className='homepage'>
            <div className='homepage-div'>
                <small>Number of questions</small>
                
                <div>
                    <select name="" id="" defaultValue={'10'}
                    onChange={e=>setQuestionNum(e.target.value)}>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                    </select>
                </div>
            </div>
    
            <div className='homepage-div'>
                <small>Category</small>
                
                <div>
                    <select name="" id=""
                    onChange={e=>setSelectedCat(e.target.value)}>
                        {category.map(ctg=>(
                            <option value={ctg.name}>
                                {ctg.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
    
            <NavLink
            onClick={()=>{
                setSelectedCatIndex(category.map(c=>c.name).indexOf(selectedCat))
            }} 
            to={'/exam'}>
                START
            </NavLink>
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

export default Homepage;
