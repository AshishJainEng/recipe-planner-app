import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    plugins: [
        sveltekit({
            compilerOptions: {
                runes: ({ filename }) =>
                    filename.split(/[/\\]/).includes('node_modules') ? undefined : true
            },
            adapter: adapter({
                fallback: 'index.html',
                strict: false
            })
        }),
        viteStaticCopy({
            targets: [
                {
                    src: 'node_modules/ashish-recipe-ui-kit/dist/ashish-recipe-ui-kit/*',
                    dest: 'ui-kit/ashish-recipe-ui-kit',
                    rename: { stripBase: true }
                },
                {
                    src: 'node_modules/ashish-recipe-ui-kit/dist/esm/*',
                    dest: 'ui-kit/ashish-recipe-ui-kit',
                    rename: { stripBase: true }
                }
            ],
        })
    ]
});