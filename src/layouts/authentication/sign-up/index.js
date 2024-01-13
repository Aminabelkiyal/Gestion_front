/* eslint-disable react/no-unescaped-entities */
// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import React, { useState } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isEmail } from "validator";
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
const defaultTheme = createTheme();

const required = (value) => {
  if (!value) {
    return "Champ obligatoire!";
  }
};

const validNom = (value) => {
  if (!isAlphaWithHyphen(value)) {
    return "Nom non valide.";
  }
};

const validPrenom = (value) => {
  if (!isAlphaWithHyphen(value)) {
    return "Prenom non valide.";
  }
};

const isAlphaWithHyphen = (value) => {
  return /^[a-zA-Z-]+$/.test(value);
};
const validEmail = (value) => {
  if (!isEmail(value)) {
    return "Email non valide.";
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return "Le nom d'utilisateur doit contenir entre 3 et 20 caractères.";
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return "Le mot de passe doit contenir entre 6 et 40 caractères.";
  }
};
function Cover() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [message, setMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangeNom = (e) => {
    const nom = e.target.value;
    setNom(nom);
  };

  const onChangePrenom = (e) => {
    const prenom = e.target.value;
    setPrenom(prenom);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (
      !nom ||
      !prenom ||
      !username ||
      !email ||
      !password ||
      validNom(nom) ||
      validPrenom(prenom) ||
      required(username) ||
      validEmail(email) ||
      required(password) ||
      vusername(username) ||
      vpassword(password)
    ) {
      setMessage("Veuillez remplir correctement tous les champs.");
      return;
    }
    axios
      .post("http://localhost:8080/gestion_events/auth/signup", {
        username,
        email,
        password,
        nom,
        prenom,
        roleName: "manager",
      })
      .then((response) => {
        console.log(response);
        navigate("/authentication/sign-in");
      })
      .catch((error) => {
        console.log(error);
        setMessage("Echec d'inscription. Réessayez.");
      });
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Inscrivez-vous
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Entrer vos informations pour s'inscrire
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleRegistration}>
            <MDBox mb={2}>
              <MDInput
                name="nom"
                required
                fullWidth
                id="nom"
                label="Nom"
                autoFocus
                validations={[required, validNom]}
                onChange={onChangeNom}
                value={nom}
                error={formSubmitted && !!validNom(nom)}
                helperText={formSubmitted && validNom(nom)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                required
                fullWidth
                id="prenom"
                label="Prenom"
                name="prenom"
                value={prenom}
                validations={[required, validPrenom]}
                onChange={onChangePrenom}
                error={formSubmitted && !!validPrenom(prenom)}
                helperText={formSubmitted && validPrenom(prenom)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                required
                fullWidth
                id="username"
                label="Nom d'utilisateur"
                onChange={onChangeUsername}
                name="username"
                value={username}
                variant="outlined"
                validations={[required, vusername]}
                error={formSubmitted && !!vusername(username)}
                helperText={formSubmitted && vusername(username)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                required
                fullWidth
                id="email"
                label="Adresse email"
                name="email"
                autoComplete="email"
                onChange={onChangeEmail}
                value={email}
                variant="outlined"
                validations={[required, validEmail]}
                error={formSubmitted && !!validEmail(email)}
                helperText={formSubmitted && validEmail(email)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                value={password}
                onChange={onChangePassword}
                variant="outlined"
                validations={[required, vpassword]}
                error={formSubmitted && !!vpassword(password)}
                helperText={formSubmitted && vpassword(password)}
              />
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                type="submit"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "primary.main",
                  color: "white",
                }}
              >
                Connectez-vous
              </MDButton>
              {message && (
                <div className="form-group" style={{ margin: "5px" }}>
                  <div className="alert alert-danger" role="alert" style={{ color: "red" }}>
                    {message}
                  </div>
                </div>
              )}
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Vous avez déjà un compte ?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Connectez-vous
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
