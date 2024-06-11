import { useState } from "react";

import { useMarvelService } from "../../services/MarvelService";

import "./charSearch.scss";
import { API_KEY } from "../../constants/constants";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CharSearch = () => {
  const [char, setChar] = useState({ id: null });
  const { getCharacterByName, clearError } = useMarvelService(API_KEY);

  const updateChar = ({name}) => {
    clearError();
    getCharacterByName(name).then((data) => {setChar(data); return data}).then((data) => console.log(data));
  };

  const divUnder = char.id > 0 ? <div>
    <div className="char__form-win">There is! Visit {char.name} page?</div> 
    <a href={`/character/${char.id}`} className="button button__secondary">
      <div className="inner">TO PAGE</div>
    </a>
  </div>
  : <ErrorMessage className="char__form-error" name="name" component="div"/>;

  return (
    <div className="char__search">
      <Formik
        initialValues={{
          name: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(2, "Min 2 symbol!")
            .required("This field is required!"),
        })}
        onSubmit={(values) => updateChar(values)}>
        <Form className="char__form">
          <label htmlFor="name">Or find a character by name:</label>
            <Field
              id="name"
              name="name"
              type="name"
              placeholder="Enter name"
            />
            <button type="submit" className="button button__main">
              <div className="inner">FIND</div>
            </button>
            {divUnder}
        </Form>
      </Formik>
    </div>
  );
};


export default CharSearch;