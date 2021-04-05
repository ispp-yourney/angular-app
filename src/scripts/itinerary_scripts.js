var season = itinerary.recommendedSeason;

function changeSeason() {
  switch (season) {
    case 'WINTER':
      season = "Invierno";
      break;
    case 'FALL':
      season = "Otoño";
      break;
    case 'SPRING':
      season = "Primavera";
      break;
    case 'SUMMER':
      season = "Verano";
      break;
  }
}

  