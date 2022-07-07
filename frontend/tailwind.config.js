module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: ["cupcake", "dark", "cmyk"],
    },
    plugins: [require("daisyui")],
}
