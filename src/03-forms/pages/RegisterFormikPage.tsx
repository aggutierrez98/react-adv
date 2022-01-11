import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "../components";
import "../styles/styles.css";

export const RegisterFormikPage = () => {
  return (
    <div>
      <h1>Register Formik Page</h1>

      <Formik
        initialValues={{
          name: "",
          email: "",
          password1: "",
          password2: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(2, "Debe tener al menos 2 caracteres")
            .max(15, "Debe de tener como maximo 15 caracteres")
            .required("Requerido"),
          email: Yup.string()
            .email("El correo no tiene un formato válido")
            .required("Requerido"),
          password1: Yup.string()
            .min(6, "Debe tener al menos 6 caracteres")
            .required("Requerido"),
          password2: Yup.string()
            .required("Requerido")
            .oneOf(
              [Yup.ref("password1"), null],
              "Las contraseñas deben coincidir"
            ),
        })}
      >
        {({ handleReset }) => (
          <Form>
            <MyTextInput label="Name" name="name" placeholder="Agustin" />

            <MyTextInput
              label="Email"
              name="email"
              placeholder="exame@example.mail.com"
            />

            <MyTextInput
              label="Password"
              name="password1"
              type="password"
              placeholder="******"
            />

            <MyTextInput
              label="Confirm password"
              name="password2"
              type="password"
              placeholder="******"
            />

            <button type="submit">Submit</button>
            <button onClick={handleReset} type="submit">
              Reset
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
