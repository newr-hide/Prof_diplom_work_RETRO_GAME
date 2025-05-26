
import globals from 'globals';
import stylisticJs from '@stylistic/eslint-plugin-js';

export default [
    {
        ignores: [
            'dist/',
            'coverage/',
            'docs/',
            '*.json'
        ],
    },
    {
        languageOptions: {
            ecmaVersion: 2023,
            sourceType: 'module',
            globals: {
                ...globals.browser, 
                describe: true,     
                it: true,           
                expect: true,       
            },
        },
        rules: {
            semi: ['error', 'always'], // обязательно ставить точку с запятой
            'no-unused-vars': 'off',  // отключить предупреждение о неиспользованных переменных
            'no-console': 'off',      // разрешить использование console.log
        },
    },
    {
        files: ['*.config.*'], 
        rules: {
            'no-underscore-dangle': ['off'],          // разрешать имена с подчёркиванием
            'import/no-extraneous-dependencies': 'off', 
        },
    },
    {
        plugins: {'@stylistic/js': stylisticJs}, 
        rules: {},
    },
];



// rules: {
//   semi: 'error',
//   'no-unused-vars': 'off'
// }