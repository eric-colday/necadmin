"use client";

import { authenticate } from '@/app/lib/actions';
import React from 'react'
import { useFormState } from "react-dom";

const LoginForm = () => {
  const [state, formAction] = useFormState(authenticate, undefined);
  return (
    <form
        className="w-[300px] flex flex-col gap-[20px] "
        action={formAction}
      >
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          name="username"
          required
          className="p-6 bg-transparent border-2 border-gray-400 rounded-md outline-none text-zinc-500 text-xl font-bold"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          name="password"
          required
          className="p-6 bg-transparent border-2 border-gray-400 rounded-md outline-none text-zinc-500 text-xl font-bold"
        />

        <button className="w-74 p-5 cursor-pointer bg-sky-950  border-none rounded-md text-center text-slate-200 font-bold hover:bg-sky-900">
          Se connecter
        </button>
        {state && state} 
      </form>
  )
}

export default LoginForm
