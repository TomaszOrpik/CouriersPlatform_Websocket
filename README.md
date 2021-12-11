# Websocket

### Opis

  Repozytorium obsługujące komunikację pomiędzy widgetem mapy, a bazą danych poprzez protokół ssw.

### 1. Instalacja

- Przygotowanie backendu
  Stworzyć repozytorium odpowiedzialne za backend według [instrukcji](https://github.com/TomaszOrpik/CouriersPlatform__Backend)
- Zmienne Środowiskowe
  Skopiować plik `.env.example` i zapisać jako `.env`, następnie podmienić zmienne w pliku
- Instalacja Pakietów <br/>
   Po przygotowaniu bazy danych i zmiennych instalujemy wszystkie niezbędne pakiety komendą `npm install`.

### 2. Uruchomienie

  Po poprawnej instalacji aplikację uruchamiamy komendą `npm run start:dev`

### 3. Wersja Produkcyjna

  W celu skompilowania aplikacji do wersji produkcyjnej należy uruchomić komendę `npm run build`. Wszystkie niezbędne pliki do działania będą znajdować się w folderze dist.