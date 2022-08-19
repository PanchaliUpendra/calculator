import React from 'react';
import './Header.css';
function Header(props){
    const resultRef= React.useRef()
    React.useEffect(()=>{
        resultRef.current.scrollIntoView({
            behavior:"smooth"
        });
    },[props.history]);
    return(
        <div className='header'>
            <div className='header_history'>
                {props.history &&
                    
                    props.history.map((item)=><p key={item+Math.random()*44}>{item}</p>
                    )
                }
            </div>
            <div className='header_expression'>
                <p>{props.expression}</p>
            </div>
            <p ref={resultRef} className='header_result'>
                <span>=</span>{props.result}
            </p>

        </div>
    );
}
export default Header;