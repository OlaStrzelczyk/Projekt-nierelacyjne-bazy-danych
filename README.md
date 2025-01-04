# Projekt-nierelacyjne-bazy-danych

## Opis
Ten projekt to API stworzone w Node.js, wykorzystujące nierelacyjną bazę danych do zarządzania danymi związanymi z zajęciami tanecznymi. API umożliwia tworzenie, odczytywanie, edycję i usuwanie danych (CRUD) oraz zapewnia bezpieczeństwo poprzez autoryzację i uwierzytelnianie.

## Funkcjonalności
- CRUD dla różnych kolekcji: Zarządzanie różnymi zasobami związanymi z zajęciami tanecznymi (np. zajęcia, szkoły tańca, instruktorzy, opinie zajęć),
- Bezpieczne trasy: Uwierzytelnianie użytkowników za pomocą tokenów,
- Struktura CommonJS: Kod pisany w standardzie require i module.exports,
- Obsługa wielu kolekcji: Organizacja danych w sposób elastyczny i skalowalny dzięki bazie NoSQL,
- Konfiguracja środowiska: Plik .env do przechowywania zmiennych środowiskowych.

## Struktura katalogów
- api/ - Logika aplikacji, kontrolery i modele,
- node_modules/ - Moduły zainstalowane przez npm,
- .env - Plik konfiguracji środowiska (np. dane dostępowe do bazy danych, klucze API),
- README.md - Dokumentacja projektu,
- app.js - Główna konfiguracja aplikacji,
- server.js - Punkt wejściowy aplikacji,
- package.json - Konfiguracja projektu i zależności.

## Technologie
- Node.js: Silnik aplikacji,
- Express.js: Framework webowy,
- MongoDB: Nierelacyjna baza danych,
- JWT: Uwierzytelnianie,
- CommonJS: Moduły oparte na require i module.exports.

## Autorzy
- Aleksandra Strzelczyk
- Aleksandra Bluszcz
