export function fillProvinces(game, handleClick) {
  for (const country of game.countries) {
    const color = country.color;

    for (const province of country.provinces) {
      if (!province) {
        continue;
      }

      const element = document.querySelector(`#${province.mapRef}`);

      if (!element) {
        continue;
      }

      const isLoaded = !!element.getAttribute("aow-province-loaded");

      if (!isLoaded && handleClick) {
        element.addEventListener("click", handleClick);
      }

      element.setAttribute("aow-province-loaded", true);
      element.style.fill = color;
    }
  }
}

export function getAllProvinceElements() {
  return [
    ...document.querySelectorAll("path"),
    ...document.querySelectorAll("polygon"),
  ];
}
