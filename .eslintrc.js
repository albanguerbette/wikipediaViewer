module.exports = {
    "env": {
        "browser": true,
				"node": true,
				"jquery": true
    },
		"globals": {
			"Mustache": true
		},
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
