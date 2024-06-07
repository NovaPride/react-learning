import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";


const MyTextInput = ({label, ...props}) => {
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

const MyCheckbox = ({children, ...props}) => {
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

const MyForm = () => {
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
        <MyTextInput
          label="Ваше имя"
          id="name"
          name="name"
          type="text"
        />
        <MyTextInput
          label="Ваша почта"
          id="email"
          name="email"
          type="email"
        />
        <MyTextInput
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
        <MyCheckbox name="terms"> Соглашаетесь с политикой конфиденциальности? </MyCheckbox>
        <button type="submit">Отправить</button>
      </Form>
    </Formik>
  )
}

export default MyForm;

/*
import { useFormik } from "formik";
import * as Yup from "yup";


const Form = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      amount: 0,
      currency: '',
      text: '',
      terms: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().min(2, "Минимум 2 символа!").required("Обязательное поле!"),
      email: Yup.string().email("Неправильные email адрес!").required("Обязательное поле!"),
      amount: Yup.number().min(5, "Минимум 5 деняг!").required("Обязательное поле!"),
      currency: Yup.string().required("Выберите поле!"),
      text: Yup.string().min(10, "Минимум 10 символов!"),
      terms: Yup.boolean().required("Необходимо согласие!").oneOf([true], "Необходимо согласие!"),
    }),
    onSubmit: values => console.log(JSON.stringify(values, null, 2))
  })

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <h2>Отправить пожертвование</h2>
      <label htmlFor="name">Ваше имя</label>
      <input
        id="name"
        name="name"
        type="text"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}/>
      {formik.errors.name && formik.touched.name ? <div>{formik.errors.name}</div> : null}
      <label htmlFor="email">Ваша почта</label>
      <input
        id="email"
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}/>
      {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div> : null}
      <label htmlFor="amount">Количество</label>
      <input
        id="amount"
        name="amount"
        type="number"
        value={formik.values.amount}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}/>
        {formik.errors.amount && formik.touched.amount ? <div>{formik.errors.amount}</div> : null}
      <label htmlFor="currency">Валюта</label>
      <select
        id="currency"
        name="currency"
        value={formik.values.currency}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}>
          {formik.errors.currency && formik.touched.currency ? <div>{formik.errors.currency}</div> : null}
          <option value="">Выберите валюту</option>
          <option value="USD">USD</option>
          <option value="UAH">UAH</option>
          <option value="BYN">BYN</option>
      </select>
      <label htmlFor="text">Ваше сообщение</label>
      <textarea 
        id="text"
        name="text"
        value={formik.values.text}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}/>
        {formik.errors.text && formik.touched.text ? <div>{formik.errors.text}</div> : null}
      <label className="checkbox">
        <input 
          name="terms" 
          type="checkbox" 
          value={formik.values.terms}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}/>
        Соглашаетесь с политикой конфиденциальности?
      </label>
      {formik.errors.terms && formik.touched.terms ? <div>{formik.errors.terms}</div> : null}
      <button type="submit">Отправить</button>
    </form>
  )
}

export default Form;
*/