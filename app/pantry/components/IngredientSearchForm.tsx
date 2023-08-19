import React from "react";
import { FormikProps } from "formik";

type Props = {
  formStyles: { [key: string]: string };
  formik: FormikProps<FormValues>;
};

type FormValues = {
  name: string;
  brand: string;
};

export default function IngredientSearchForm({ formik, formStyles }: Props) {
  return (
    <form className={formStyles.form} onSubmit={formik.handleSubmit}>
      <input type="text" placeholder="Food" {...formik.getFieldProps("name")} />
      {formik.touched.name && formik.errors.name && (
        <div className={formStyles.error}>{formik.errors.name}</div>
      )}
      <input
        type="text"
        placeholder="Brand"
        {...formik.getFieldProps("brand")}
      />
      {formik.touched.brand && formik.errors.brand && (
        <div className={formStyles.error}>{formik.errors.brand}</div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}
