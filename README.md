# Zielony Koszyk - sklep internetowy

### Praca inżynierska na kierunku Informatyka na Wydziale Informatyki Wyższej Szkoły Informatyki i Zarządzania w Rzeszowie.

Witamy w **Zielony Koszyk**! To aplikacja umożliwiająca zakup świeżych warzyw online bez wychodzenia z domu.

## Funkcjonalności

- **Przegląd produktów**: Przeglądaj szeroki asortyment świeżych warzyw.
- **Koszyk**: Dodawaj produkty do koszyka i zarządzaj nimi przed zakupem.
- **Bezpieczne płatności**: Dokonuj płatności online za pomocą zaufanych metod.
- **Rejestracja i logowanie**: Twórz konto, aby śledzić swoje zamówienia i historię zakupów.
- **Powiadomienia**: Otrzymuj aktualizacje o nowych produktach i promocjach.

## Technologie

- **Frontend**: HTML, CSS, JavaScript, React.js
- **Backend**: Node.js, Express.js
- **Baza danych**: MongoDB
- **Płatności**: Integracja z PayPal/Stripe

## Wymagania

- **Node.js**: <= v16.14.0
- **npm**: <= 8.0.0
- **Docker**
- **Docker Compose**

## Instalacja

1. Sklonuj repozytorium: `git@github.com:amokrzycki/zielony-koszyk-frontend.git`
2. Przejdź do katalogu: `cd zielony-koszyk-frontend`
3. Zainstaluj zależności: `npm install`
4. Uruchom aplikację: `npm run start`
4. Sklonuj repozytorium z backendem: `git@github.com:amokrzycki/zielony-koszyk-backend.git`
5. Przejdź do katalogu: `cd zielony-koszyk-backend`
6. Zainstaluj zależności: `npm install`
7. Uruchom i zbuduj obraz dockera: `sudo docker-compose up --build`
8. Backend będzie dostępny pod adresem: `http://localhost:3000`
9. Gotowe!