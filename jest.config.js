const {defaults} = require('jest-config');

module.exports ={
    roots: ["<rootDir>"],
    modulePaths: ["<rootDir>"],
    moduleNameMapper: {
        "\\.css$": "identity-obj-proxy",
    },
    moduleDirectories: ["node_modules", "src"],
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'js', 'jsx'],
};
