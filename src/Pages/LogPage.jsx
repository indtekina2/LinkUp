import React from 'react'

function LogPage({type}) {
    let btnClass;
    if (type == "login"){
        btnClass = type;
    }else if (type == "signup") {
        btnClass = type
    } else {
        console.error("Provided prop for LogPage is wrong");
        btnClass = "login"
    }
  return (
    <>
    <h2>Log in</h2>
    </>
  )
}

export default LogPage