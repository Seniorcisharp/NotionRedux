import bcrypt from "bcryptjs";

if (await bcrypt.compare(formData.password, user.password)) {
  alert("Успешный вход!");
  navigate("/dashboard");
} else {
  setErrorMessage("Неверные данные. Попробуйте снова.");
}
