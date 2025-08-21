// src/composables/usarAutenticacion.ts
import { ref,  watch } from 'vue';
import { useRouter } from 'vue-router';
import { usarAuthStore } from '../stores/autentificacionStore';
import { inicia_sesion_operacionesLinea, iniciarSesion,} from '../services/autentificacion';
import Notif from '../utils/notificaciones';
import { UsuarioLog} from "../types/interfaces"
import { initializeTrabajador, Trabajador } from '../interfaces/trabajador.interface';


export function usarAutenticacion() {
  const authStore = usarAuthStore();
  const usuario = ref(authStore.usuario_Logueado);
  const router = useRouter();  // Asegúrate de llamar a useRouter aquí
  
  const UsuarioLogueado = ref<UsuarioLog>({
    id: 0,
    usuario: '',
    nombreusuario: '',
    fotoperfil: '',
    correo: '',
    celular: '',
    idrol: '',
    oficina_id: '',
    oficina_nombre: ''
  })
  const TrabajadorLogueado = ref<Trabajador>(initializeTrabajador())


  const login = async ( username: string, contrasena: string ) => {
    try {
      const response = await iniciarSesion(username, contrasena);
      console.log("****************************");
      console.log(response.data);
      console.log("****************************");
      if (response.success) {
        TrabajadorLogueado.value = response.data;
        UsuarioLogueado.value.id = TrabajadorLogueado.value?.id;
        UsuarioLogueado.value.usuario = TrabajadorLogueado.value?.usuario.toString();
        UsuarioLogueado.value.nombreusuario = response.data?.nombre + ' ' + response.data?.apellidopat;
        UsuarioLogueado.value.fotoperfil = TrabajadorLogueado.value?.fotourl;
        UsuarioLogueado.value.correo = TrabajadorLogueado.value?.email;
        UsuarioLogueado.value.celular = TrabajadorLogueado.value?.celular;
        UsuarioLogueado.value.idrol = TrabajadorLogueado.value?.rol_id.toString();
        UsuarioLogueado.value.oficina_id = TrabajadorLogueado.value?.oficina_id.toString();
        UsuarioLogueado.value.oficina_nombre = TrabajadorLogueado.value?.oficina_nombre.toString();

        console.log("----------------------------");
        console.log(UsuarioLogueado.value);
        console.log("----------------------------");

        authStore.establecerUsuario(UsuarioLogueado.value);
        Notif.Success(response.message);
        router.push({ name: 'office_admin' }); 

      } else {
        Notif.Error(response.message);
      }
    } catch (error) {
      console.error('Error al iniciar sesión', error);
    }
  };

  

  const logout = () => {
    authStore.cerrarSesion();
    router.push('/'); // Redirigir a la página de login
  };




  // Observa los cambios en el trabajador para redirigir si no está autenticado
  watch(
    () => authStore.usuario_Logueado,
    (nuevoUser) => {
      if (!nuevoUser) {
        router.push({ name: 'Inicio' });
      }
    }
  );


  return { usuario, login , logout };
}
