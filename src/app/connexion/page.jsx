import React from "react";
import LoginForm from "../components/dashboard/connexion/loginForm";


const page = () => {

  return (
    <div className="flex items-center flex-col gap-4 pt-48 pb-80">
      <h2 className="text-center text-4xl sm:text-5xl font-bold">
        Se connecter
      </h2>
      <h3 className="text-sm sm:text-xl">
        S'il vous plaît connectez-vous pour la suite 
      </h3>
      <LoginForm/>
    </div>
  );
};

export default page;
