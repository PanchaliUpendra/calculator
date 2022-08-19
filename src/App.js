import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Keyboard from './components/Keyboard/Keyboard';

const usedKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
  104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109,
];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["-", "+", "*", "/"];

function App() {
  const[isdark,setdark]=React.useState(false);
  const [expression,setexpression]=React.useState("");
  const [result,setresult]=React.useState("0");
  const [history,sethistory]=React.useState([]);

  const handleKeyPress=(keyCode,key)=>{
    if(!keyCode) return;
    if(!usedKeyCodes.includes(keyCode)) return;

    if(numbers.includes(key)){
      if(key==="0"){
        if(expression.length===0) return;
      }
      calculateResult(expression + key);
      setexpression(expression+key)
    }
    else if(operators.includes(key)){
      if(!expression) return;
      const lastChar=expression.slice(-1)
      if(operators.includes(lastChar)) return
      if(lastChar==='.') return;
      setexpression(expression+key);
    }
    else if(key==='.'){
      if(!expression) return;
      const lastChar=expression.slice(-1);
      if(!numbers.includes(lastChar)) return;
      setexpression(expression+key);
    }
    else if(keyCode===8){
      if (!expression) return;
      calculateResult(expression.slice(0, -1));
      setexpression(expression.slice(0, -1));
      
    }
    else if(keyCode===13){
      if(!expression) return;
      calculateResult(expression);

      let tempHistory = [...history];
      if (tempHistory.length > 20) tempHistory = tempHistory.splice(0, 1);
      tempHistory.push(expression);
      sethistory(tempHistory);
    }
  };
  const calculateResult =(exp)=>{
    if (!exp) {
      setresult("");
      return;
    }
    const lastChar = exp.slice(-1);
    if (!numbers.includes(lastChar)) exp = exp.slice(0, -1);

    const answer = eval(exp).toFixed(2) + "";
    setresult(answer);
  };

  return (
    <div className='app'
    tabIndex='0'
    onKeyDown={(event)=>handleKeyPress(event.keyCode,event.key)}
    >

      <div className={isdark?'app_cal_act':'app_cal'}>

        {/*//////////////////////////////////////////////////////////////////////////navbar starts here*/}
        <div className='app_cal_nav'>
          <div className='app_cal_nav_tog' 
          onClick={()=>setdark(!isdark)}>
            <div className={isdark===false?'app_cal_nav_tog_btn':'app_cal_nav_tog_btn_act'}>
            </div>
          </div>
        </div>
        {/*//////////////////////////////////////////////////////////////////////////navbar ends here*/}
        <Header expression={expression} result={result} history={history}/>
        <Keyboard isdark={isdark} handleKeyPress={handleKeyPress}/>


      </div>
      
    </div>
  );
}

export default App;
