"use client";
import { useState, useRef, ChangeEvent, FormEvent, useEffect } from "react";
import { useGlobalState } from "@/app/providers";
import { getIngredientToAdd } from "@/app/services/api//getIngredientToAdd";
import { postNewPantryItem } from "@/app/services/api/postNewPantryItem";
import IngredientCard from "./IngredientCard";
import { Spin } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import IngredientSearchForm from "./IngredientSearchForm";

type Props = {
  formStyles: { [key: string]: string };
};

export default function AddIngredientForm({ formStyles }: Props) {
  const { setState } = useGlobalState();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [ingredientsFromEdamam, setIngredientsFromEdamam] = useState<
    EdamamIngredient[]
  >([]);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [notFoundStatus, setNotFoundStatus] = useState(false);

  useEffect(() => {
    // return called on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      brand: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const ingredients = await getIngredientToAdd(values.name, values.brand);
        if (ingredients && ingredients.length > 0) {
          setIngredientsFromEdamam(ingredients);
        } else {
          setNotFoundStatus(true);
          timeoutRef.current = setTimeout(() => {
            setNotFoundStatus(false);
          }, 5000);
        }
        formik.resetForm();
        setSubmitting(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setStatus(error.message);
        } else {
          setStatus("An unexpected error occurred.");
        }
        setSubmitting(false);
      }
    },
  });
  const handleCreatePantryItem = async (
    ingredientFromEdamam: EdamamIngredient
  ) => {
    try {
      const addedItem = await postNewPantryItem(ingredientFromEdamam);
      setState((state: GlobalState) => {
        return { ...state, pantry: [...state.pantry, addedItem] };
      });
      setIngredientsFromEdamam([]);
      setErrorMsg(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <h1>Search for food items:</h1>
      <div className={formStyles.searchBar}>
        {formik.isSubmitting ? (
          <h1 className={formStyles.loading}> Loading... {<Spin />}</h1>
        ) : (
          <IngredientSearchForm formik={formik} formStyles={formStyles} />
        )}
        {notFoundStatus && (
          <p className={formStyles.notAvailable}>Ingredient not available.</p>
        )}
        {formik.status && (
          <div className={formStyles.errorGlobal}>{errorMsg}</div>
        )}
        {ingredientsFromEdamam.length > 0 &&
          !notFoundStatus &&
          !formik.isSubmitting && (
            <button onClick={() => setIngredientsFromEdamam([])}>
              Clear Search Results
            </button>
          )}
      </div>
      <div className={formStyles.ingredients}>
        {ingredientsFromEdamam.length > 0 &&
          ingredientsFromEdamam.map((ingredient, idx) => (
            <IngredientCard
              key={idx}
              ingredient={ingredient}
              onCreatePantryItem={handleCreatePantryItem}
            />
          ))}
      </div>
    </div>
  );
}
