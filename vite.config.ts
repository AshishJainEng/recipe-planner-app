import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit()],
    optimizeDeps: {
        include: ['ashish-recipe-ui-kit']
    }
});