import  {UsuarioLog} from "../types/interfaces"
import { defineStore } from 'pinia';

export const usarAuthStore = defineStore('auth', {
  state: () => ({
    usuario_Logueado: JSON.parse(localStorage.getItem('usuario_Logueado') as string) || null,
    token_id: localStorage.getItem('token_id') || null,
  }),
  actions: {
    establecerUsuario(usuario: UsuarioLog) {
      this.usuario_Logueado = usuario;
      this.token_id = usuario.id.toString();
      localStorage.setItem('token_id', usuario.id.toString());
      localStorage.setItem('usuario_Logueado', JSON.stringify(usuario));
    },

    cerrarSesion() {
      this.usuario_Logueado = null;
      this.token_id = null;
      localStorage.removeItem('token_id');
      localStorage.removeItem('usuario_Logueado');
    }
  }
});
