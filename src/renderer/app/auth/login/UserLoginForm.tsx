"use client";
import * as React from "react";
import { cn } from "@/src/renderer/lib/utils";
import { Label } from "@/src/renderer/shared/shadcn/ui/label";
import { Button } from "@/src/renderer/shared/shadcn/ui/button";
import { Input } from "@/src/renderer/shared/shadcn/ui/input";
import { useFormik, FormikProps } from "formik";
import { EyeIcon, EyeClosed } from "lucide-react";
import * as Yup from "yup";
import { ToastAction } from "@/src/renderer/shared/shadcn/ui/toast";
import { useToast } from "@/src/renderer/shared/hooks/use-toast";
import { User } from "@/src/renderer/interfaces/User.interface";
import { serviceGetAllUsers } from "@/src/renderer/services/users.service";
import { useAuthContext } from "@/src/renderer/Context/AuthContext";
import { useNavigate } from "react-router-dom";

interface SignInFormProps extends React.HTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
}

export const validationSchemaFormLogin = Yup.object({
  username: Yup.string()
    .min(3, "El nombre debe tener al menos 3 caracteres.")
    .required("El nombre es obligatorio."),
  password: Yup.string().required("Este campo es obligatorio."),
});

export type InitialValuesLoginType = {
  username: string;
  password: string;
};
export const initialValuesLogin = {
  username: "",
  password: "",
};

export const UserAuthForm: React.FC<SignInFormProps> = ({
  children,
  className,
  ...props
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [users, setUsers] = React.useState<User[]>([]);
  const { toast } = useToast();
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate()

  React.useEffect(() => {
    const usersFetch: any = async () => {
      setIsLoading(true);
      try {
        const responseUsers = await serviceGetAllUsers();
        setUsers(responseUsers);
      } catch (e) {
        console.error("Ha ocurrido un error en la petición");
        toast({
          description: "No se han podido obtener los usuarios."
        })
      } finally {
        setIsLoading(false);
      }
    };
    usersFetch();
    //eslint-disable-next-line
  }, []);

  const formik: FormikProps<InitialValuesLoginType> =
    useFormik<InitialValuesLoginType>({
      initialValues: initialValuesLogin,
      validationSchema: validationSchemaFormLogin,
      onSubmit: async (values) => {
        setIsLoading(true);
        try {
          if (
            users.some(
              (item) =>
                item.username === values.username &&
                item.password === values.password
            )
          ) {
            setAuthUser(
              users.filter((item) => item.username === values.username)[0]
            );
            localStorage.setItem(
              "user",
              JSON.stringify(
                users.filter((item) => item.username === values.username)[0]
              )
            );
            navigate("/");
          } else {
            toast({
              title: "No se ha podido iniciar sesión.",
              description: "No se ha encontrado ese usuario.",
            });
          }
        } catch (error) {
          toast({ description: "Algo salió mal. Inténtalo de nuevo." });
        } finally {
          setIsLoading(false);
        }
      },
    });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit(e);
      }}
      className={cn("grid gap-6", className)}
      {...props}
    >
      <EmailPasswordFields
        isLoading={isLoading}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        formik={formik}
      />
      <Button type="submit" disabled={isLoading || !formik.isValid} className="rounded-[100px]">
        Iniciar sesión
      </Button>
    </form>
  );
};

interface EmailPasswordFieldsProps {
  isLoading: boolean;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  formik: FormikProps<InitialValuesLoginType>;
}

const EmailPasswordFields: React.FC<EmailPasswordFieldsProps> = ({
  isLoading,
  showPassword,
  setShowPassword,
  formik,
}) => {
  return (
    <div className="grid gap-2">
      <div className="grid gap-1">
        <Label className="sr-only" htmlFor="username">
          Usuario
        </Label>
        <Input
          id="username"
          placeholder="Nombre de usuario"
          type="text"
          autoCapitalize="none"
          autoComplete="username"
          autoCorrect="off"
          disabled={isLoading}
          {...formik.getFieldProps("username")}
        />
        {formik.touched.username && formik.errors.username && (
          <Label className="text-xs ml-1 text-red-500">
            {formik.errors.username}
          </Label>
        )}
      </div>
      <div className="relative grid gap-1">
        <Label className="sr-only" htmlFor="password">
          Contraseña
        </Label>
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="password"
          autoCapitalize="none"
          autoComplete="current-password"
          autoCorrect="off"
          disabled={isLoading}
          {...formik.getFieldProps("password")}
        />
        <PasswordToggle
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      </div>
    </div>
  );
};

interface PasswordToggleProps {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordToggle: React.FC<PasswordToggleProps> = ({
  showPassword,
  setShowPassword,
}) => (
  <div
    className="absolute inset-y-0 end-4 flex items-center ps-3.5 z-10 hover:cursor-pointer"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? (
      <EyeClosed className="w-4 h-4 dark:text-gray-400" />
    ) : (
      <EyeIcon className="w-4 h-4 dark:text-gray-400" />
    )}
  </div>
);
