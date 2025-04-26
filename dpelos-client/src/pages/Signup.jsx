import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import dpelosn from "../assets/dpelosn.svg";
import { Image } from "../components/ui/Image";
import Input from "../components/ui/Input";
import PasswordInput from "../components/ui/PasswordInput";
import { Button } from "../components/ui/Button";

export default function Signup() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Link className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-gray-500 mb-4 gap-2" to="/">
        <ArrowLeft className="w-5" />
        Regresar a página de inicio
      </Link>

      <Image
        src={dpelosn}
        alt="Logo D'Pelos"
        className="mb-4"
        width={128}
        height={30}
        priority
      />

      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800">Crear Cuenta</h1>
          <p class="text-gray-600 mt-2">Ingresa tus datos para registrarte</p>
        </div>

        <form class="space-y-6">
          <div>
            <Input
              label="Correo Electrónico"
              type="email"
              id="email"
              name="email"
              required
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div>
            <PasswordInput />
          </div>

          <div>
            <PasswordInput label="Repetir Contraseña" />
          </div>

          <div>
            <Button className="w-full" type="subtmit">Iniciar Sesión</Button>
          </div>
        </form>

        {/* <!-- Enlace para login --> */}
        <div class="text-center mt-6">
          <p class="text-sm text-gray-600">
            ¿Ya tienes una cuenta?
            <Link
              to="/ingresar"
              class="font-medium text-gold-600 hover:text-gold-500 ml-2"
            >
              Iniciar Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
