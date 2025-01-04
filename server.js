// import bibliotek
const http = require("http");

const app = require("./app");

// stworzę port na którym będzie nasłuchiwał serwer
const port = process.env.PORT || 4037;

// stworzę serwer
const server = http.createServer(app);
// do środka idą ustawienia tego serwera, opcje

// Odpalę serwer
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

console.log("Uruchamiam serwer...");
console.log("Lokalizacja app.js:", require.resolve("./app"));