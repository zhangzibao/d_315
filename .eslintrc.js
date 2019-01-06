module.exports = {
    "parser": "vue-eslint-parser",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "parser": "typescript-eslint-parser",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "root": true,
    "env": {
        "node": true
    },
    "extends": [
        "plugin:vue/essential",
        "@vue/typescript"
    ],
    "rules": {
        // enable additional rules
        "indent": ["error", 4],
        "linebreak-style": "off",
        "quotes": "off",
        "semi": "off",

        // override default options for rules from base configurations
        "comma-dangle": ["error", "never"],
        "no-cond-assign": ["error", "always"],

        // disable rules from base configurations
        "no-console": 2,
        "jsx-no-bind": "off"
    }
};