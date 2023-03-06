module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend:{
        backgroundImage:{
          'logo': "url('./src/assets/images/logo.png')"
        },
        colors:{
          buscagold: "#b09884",
          form: "#57534e",
          buscabrown: "#292727",
          third: "#7c2d12",
          titles: "#132906"
        },
        fontFamily:{
          sans: ['Poppins'],
          serif:['Marcellus SC']
        },
        fontSize: {
          chiki: "2px"
        }
      },
    },
    plugins: [
      require('@tailwindcss/aspect-ratio'),
      require('@tailwindcss/forms'),
    ],
  }
  