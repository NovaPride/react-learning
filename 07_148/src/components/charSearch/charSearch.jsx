import { useEffect, useState } from "react";

import Spinner from "../spinner/Spinner";
import { useMarvelService } from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/errorMessage";

import "./charSearch.scss";
import { API_KEY } from "../../constants/constants";

import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikErrorMessage,
  useField,
} from "formik";
import * as Yup from "yup";

const CharSearch = () => {
  const [char, setChar] = useState({ id: null });
  const [search, setSearch] = useState();
  const { loading, error, getCharacterByName, clearError } =
    useMarvelService(API_KEY);

  // useEffect(() => {
  //   updateChar();
  // }, [char.id]);

  const onCharLoaded = (char) => {
    setChar(char);
    console.log(char);
  };

  const updateChar = () => {
    clearError();
    getCharacterByName(search).then(onCharLoaded);
  };

  const inputChange = ({target}) => {setSearch(target.value)}

  //const errorMessage = error || char?.id === -1 ? <ErrorMessage /> : null;
  // const spinner = loading ? <Spinner /> : null;
  // const content = !(loading || error || !char) ? <View char={char} /> : null;
  // const content = !(error || !char) ? <View char={char} /> : null;

  return (
    <div className="char__search">
      <Formik
        initialValues={{
          name: "dsasd",
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(1, "Min 1 symbol!")
            .required("This field is required!"),
        })}
        onSubmit={(values) => console.log(JSON.stringify(values, null, 2))}>
        <Form className="char__form">
          <label htmlFor="name">Or find a character by name:</label>
          <div className="char__form-item">
            <input id="name" name="name" type="name" placeholder="Enter name" onChange={inputChange}/>
            <button type="submit" className="button button__main" onClick={updateChar}>
              <div className="inner">FIND</div>
            </button>
          </div>
          {/* <div className="char__form-item">
            
            <button type="submit" className="button button__secondary">
              <div className="inner">TO PAGE</div>
            </button>
          </div> */}
        </Form>
      </Formik>
    </div>
  );
};

// const MarvelTextInput = ({ label, ...props }) => {
//   const [field, meta] = useField(props);
//   return (
//     <>
//       <label htmlFor={props.name}>{label}</label>
//       <input {...props} {...field} />
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </>
//   );
// };

// const View = ({ char }) => {
//   const { id, name, description, thumbnail } = char;
//   if (id < 1) return;
//   //let imgStyle = thumbnail.includes("image_not_available") ? {objectFit: "contain"} : null;
//   return (
//     <div className="char__basics">
//       <Formik
//         initialValues={{
//           name: "Enter name"
//         }}
//         validationSchema={Yup.object({
//           name: Yup.string()
//             .min(1, "Min 1 symbol!")
//             .required("This field is required!"),
//         })}
//         onSubmit={(values) => console.log(JSON.stringify(values, null, 2))}>
//         <Form className="form">

//           <MarvelTextInput
//             label="Or find a character by name:"
//             id="name"
//             name="name"
//             type="name"

//           />

//           <button type="submit">FIND</button>
//           <button type="submit">TO PAGE</button>
//         </Form>
//       </Formik>
//     </div>
//   );
// };

export default CharSearch;
/*

const NovaTextInput = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <input {...props} {...field}/>
      {meta.touched && meta.error ? (
        <div className="error">
          {meta.error}
        </div>
      ) : null}
    </>
  )
}

const NovaCheckbox = ({children, ...props}) => {
  const [field, meta] = useField({...props, type: "checkbox"});
  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...props} {...field}/>
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">
          {meta.error}
        </div>
      ) : null}
    </>
  )
}

const NovaForm = () => {
  return (
    <Formik
      initialValues = {{
        name: '',
        email: '',
        amount: 0,
        currency: '',
        text: '',
        terms: false,
      }}
      validationSchema = {Yup.object({
        name: Yup.string().min(2, "Минимум 2 символа!").required("Обязательное поле!"),
        email: Yup.string().email("Неправильные email адрес!").required("Обязательное поле!"),
        amount: Yup.number().min(5, "Минимум 5 деняг!").required("Обязательное поле!"),
        currency: Yup.string().required("Выберите поле!"),
        text: Yup.string().min(10, "Минимум 10 символов!"),
        terms: Yup.boolean().required("Необходимо согласие!").oneOf([true], "Необходимо согласие!"),
      })}
      onSubmit = {values => console.log(JSON.stringify(values, null, 2))}
    >
      <Form className="form">
        <h2>Отправить пожертвование</h2>
        <NovaTextInput
          label="Ваше имя"
          id="name"
          name="name"
          type="text"
        />
        <NovaTextInput
          label="Ваша почта"
          id="email"
          name="email"
          type="email"
        />
        <NovaTextInput
          label="Количество"
          id="amount"
          name="amount"
          type="number"
        />
        <label htmlFor="currency">Валюта</label>
        <Field
          id="currency"
          name="currency"
          as="select">
            <ErrorMessage className="error" name="currency" component="div"/>
            <option value="">Выберите валюту</option>
            <option value="USD">USD</option>
            <option value="UAH">UAH</option>
            <option value="BYN">BYN</option>
        </Field>
        <label htmlFor="text">Ваше сообщение</label>
        <Field 
          id="text"
          name="text"
          as="textarea"/>
          <ErrorMessage className="error" name="text" component="div"/>
        <NovaCheckbox name="terms"> Соглашаетесь с политикой конфиденциальности? </NovaCheckbox>
        <button type="submit">Отправить</button>
      </Form>
    </Formik>
  )
}

export default NovaForm;
*/
