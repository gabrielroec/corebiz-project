/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { z } from "zod";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import styles from "./NewsletterForm.module.scss";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../Atoms/Button/Button";
import FormField from "../../Molecules/FormField/FormField";
const NewsletterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState({ name: "", email: "" });

  const schema = z.object({
    name: z.string().min(2, "O nome precisa ter pelo menos 2 letras."),
    email: z.string().email("Digite um e-mail válido."),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      schema.parse({ name, email });
      setError({ name: "", email: "" });

      const response = await axios.post("https://corebiz-test-server.onrender.com/api/v1/newsletter", { name, email });

      if (response.status === 200) {
        toast.success("Cadastro realizado com sucesso!");
        setName("");
        setEmail("");
      }
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        const fieldErrors = err.flatten().fieldErrors;
        setError({
          name: fieldErrors.name?.[0] || "",
          email: fieldErrors.email?.[0] || "",
        });
      }
    }
  };

  return (
    <div className={styles.newsForm}>
      <p>Participe de nossas news com promoções e novidades!</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <FormField
          placeholder="Digite seu nome"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={error.name}
        />
        <FormField
          placeholder="Digite seu e-mail"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error.email}
        />
        <Button type="submit">Eu quero!</Button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default NewsletterForm;
