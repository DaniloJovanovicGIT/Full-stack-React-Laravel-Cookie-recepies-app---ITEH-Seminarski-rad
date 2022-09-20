import React, {useState} from "react";

function InputField(props) {
  const [inputType] = useState(props.type)
  const [placehold] = useState(props.placeholder)
  const [inputValue] = useState(props.value)

  
  return (
    <>
     
      <input type={inputType} value={inputValue} name="input-form" onChange={props.onChange} className="inputclass" placeholder={placehold}/>
    </>
  );
}
export default InputField;