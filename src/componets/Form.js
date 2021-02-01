import React, {useState, useEffect} from 'react';
import "./Form.css"

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
  
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });
  
    Object.values(rest).forEach(val => {
      val === "" && (valid = false);
    });
  
    return valid;
  };

const Form = () => {
    const [values, setValues] = useState({
        username: "",
        email: "",
        number: "",
        language: "russian",
        accept: "",
        formErrors: {
                username: "",
                email: "",
                number: "",
                language: "",
                accept: ""
        }
    })
    const [validate, setValidate] = useState(false)


    console.log(validate)
    useEffect(() => {

        if (formValid(values)) {
            console.log(`
              --SUBMITTING--
              Username: ${values.username}
              Email: ${values.email}
              Number: ${values.number}
              accept: ${values.accept}
              language: ${values.language}
            `);
            setValidate(true)
            
          } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
            setValidate(false)
          }
        
    }, [values])
    
    const handleSubmit = e => {
        e.preventDefault();
      };
    
      const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...values.formErrors };
        
        switch (name) {
            case "username":
              formErrors.username =
              /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(value) 
              ? ""
              : "Недействительное Имя";
              break;
            case "email":
              formErrors.email = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)
                ? ""
                : "Недействительный E-mail";
              break;
            case "number":
              formErrors.number =
              /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(value) 
              ? ""
              : "Недействительный Номер";
              break;
            default:
              break;
          }
    
        setValues({ ...values, [name]: value, formErrors});
      };

    return (
        <div className="form-wrapper">
            <div className="form-title">
                <h1>Регистрация</h1>
                <span>Уже есть аккаунт? <a href="#">Войти</a></span>
            </div>
            
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-item">
                   <label htmlFor="username">
                        Имя
                   </label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Введите Ваше имя"
                        onChange={handleChange}
                    />
                    {values.formErrors.username.length > 0 && (
                <span className="errorMessage">{values.formErrors.username}</span>
              )}
                </div>
                <div className="form-item">
                   <label htmlFor="email">
                        Email
                   </label>
                    <input
                        id="email"
                        type="text"
                        name="email"
                        placeholder="Введите Ваше Email"
                        onChange={handleChange}
                    />
                    {values.formErrors.email.length > 0 && (
                <span className="errorMessage">{values.formErrors.email}</span>
              )}
                </div>
                <div className="form-item">
                   <label htmlFor="number">
                        Номер телефона
                   </label>
                    <input
                        id="number"
                        type="text"
                        name="number"
                        placeholder="Введите номер телефона"
                        onChange={handleChange}
                    />
                    {values.formErrors.number.length > 0 && (
                <span className="errorMessage">{values.formErrors.number}</span>
              )}
                </div>
                <div className="form-item">
                    <label htmlFor="language">Язык</label>
                    <select id="language" name="language" className="form-select" onChange={handleChange}>
                        <option name="language" value="russian" defaultChecked>Русский</option>
                        <option name="language" value="english">Английский</option>
                        <option name="language" value="chinese">Китайский</option>
                        <option name="language" value="spanish">Испанский</option>
                    </select>
                </div>
                <div className="form-item" style={{display: "block"}}>
                    <input type="checkbox" name="accept" id="accept" onChange={handleChange}/>
                    <span style={{marginLeft: "10px"}}>Принимаю <a href="#">условия</a> использования </span>
                </div>
                {validate &&
                <button type="submit" >Зарегистрироваться</button>}
                {!validate &&
                <button type="submit" disabled>Зарегистрироваться</button>}
            </form>
        </div>
    )
}

export default Form
