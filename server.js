// import bibliotek
const http = require("http");

const app = require("./app");

// stworzenie portu
const port = process.env.PORT || 4037;

// stworzenie serwera
const server = http.createServer(app);

// odpalanie serwer
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

console.log("Uruchamiam serwer...");
console.log("Lokalizacja app.js:", require.resolve("./app"));
