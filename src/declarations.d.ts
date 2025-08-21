declare module "*.json" {
    const value: any;
    export default value;
  }

declare module 'file-saver' {
  export function saveAs(data: Blob, filename: string): void;
}  


declare module 'aos';
declare module 'qrcode';
declare module 'yup';


declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}


interface ImportMetaEnv {
  readonly BASE_URL: string; // El valor de base que definiste en vite.config.ts
  // Agrega otras variables de entorno si las necesitas
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
