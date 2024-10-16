import { Router } from 'express';
import { readdirSync } from 'fs';

const PATCH_ROUTES = `${__dirname}`;

const router = Router();

const clearFileName = (fileName: string) => fileName.split('.').shift();

readdirSync(PATCH_ROUTES).forEach(async (file) => { // Cambia .map a .forEach
    const fileNameClear = clearFileName(file);
    if (fileNameClear !== 'index') {
        const { default: routerFile } = await import(`./${fileNameClear}`);
        if (routerFile) { // Verifica si routerFile está definido
            console.log('Se está cargando el archivo: ', fileNameClear);
            router.use(`/${fileNameClear}`, routerFile);
        } else {
            console.warn(`El archivo ${fileNameClear} no exporta un router válido.`);
        }
    }
});

export default router;
