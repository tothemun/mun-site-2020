module.exports = {
  "env": {
    "browser": true,
    "es6": true,
  },
  "plugins": [
    "react",
  ],
  "globals": {
    "graphql": false,
  },
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true,
    },
  },
  "settings": {
    "import/resolver": {
      "alias": [
        ["~", "./src"],
        ["~components", "./src/components"],
        ["~pages", "./src/pages"],
        ["~images", "./src/images"],
        ["~templates", "./src/templates"],
        ["~hooks", "./src/hooks"]
      ]
    }
  }
}
