import React from 'react'

const CustomInput = (props) => {
    const {type,label,onChange,onBlur,name,val,i_id,i_class} = props;

  return (
    <div className="form-floating mt-3">
        <input type={type}
        placeholder={label}
        onChange={onChange}
        onBlur={onBlur}
        value={val}
        id={i_id}
        className={`form-control ${i_class}`}
        />
        <label htmlFor={label}>{label}</label>
    </div>
  )
}

export default CustomInput