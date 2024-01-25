console.log("Discogs+ content script loaded.");
// Select all the list items
let listItems = document.querySelectorAll(".listitem");

// Iterate over each list item
listItems.forEach((listItem) => {
  // Extract the id of the list item
  let id = listItem.id;

  // Split the id by underscore and get the last part
  let digits = id.split("_").pop();

  let url;
  if (id.includes("_R_")) {
    url = `https://api.discogs.com/releases/${digits}`;
  } else if (id.includes("_M_")) {
    url = `https://api.discogs.com/masters/${digits}`;
  }

  // Fetch data from the URL
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Extract the year, genres, and styles from the data
      let year = data.year;
      let genres = data.genres ? data.genres.join(", ") : "N/A";
      let styles = data.styles ? data.styles.join(", ") : "N/A";

      // Create a new table
      let table = document.createElement("table");

      // Create new table rows with the year, genres, and styles
      // Only if the year is not 0
      if (year !== 0) {
        let yearRow = document.createElement("tr");
        let yearHeader = document.createElement("th");
        yearHeader.textContent = "Year:";
        yearHeader.id = "yearHeader";
        let yearData = document.createElement("td");
        yearData.textContent = year;
        yearRow.appendChild(yearHeader);
        yearRow.appendChild(yearData);
        table.appendChild(yearRow);
      }

      let genresRow = document.createElement("tr");
      let genresHeader = document.createElement("th");
      genresHeader.textContent = "Genres:";
      let genresData = document.createElement("td");
      genresData.textContent = genres;
      genresRow.appendChild(genresHeader);
      genresRow.appendChild(genresData);
      table.appendChild(genresRow);

      let stylesRow = document.createElement("tr");
      let stylesHeader = document.createElement("th");
      stylesHeader.textContent = "Styles:";
      let stylesData = document.createElement("td");
      stylesData.textContent = styles;
      stylesRow.appendChild(stylesHeader);
      stylesRow.appendChild(stylesData);
      table.appendChild(stylesRow);

      // Select the parent div of the p element
      let parentDiv = listItem.querySelector(".listitem_data");

      // Select the div with the class 'listitem_title'
      let titleDiv = parentDiv.querySelector(".listitem_title");

      // Insert the table after the titleDiv
      titleDiv.parentNode.insertBefore(table, titleDiv.nextSibling);
    })
    .catch((error) => {
      console.log(error);
    });
});
