import { z } from "zod";

export const registrationSchema = z
  .object({
    name: z.string().min(1, { message: "Имя обязательно" }),
    gender: z.string().nonempty({ message: "Пол обязателен" }),
    email: z.string().email({ message: "Введите корректный email" }),
    password: z
      .string()
      .min(8, { message: "Пароль должен содержать минимум 8 символов" })
      .regex(/[A-ZА-Я]/, { message: "Пароль должен содержать хотя бы одну заглавную букву (латинскую или русскую)" })
      .regex(/[0-9]/, { message: "Пароль должен содержать хотя бы одну цифру" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });
