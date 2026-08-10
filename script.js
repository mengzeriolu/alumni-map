fetch('alumni.json')
  .then(res => res.json())
  .then(data => {
    data.forEach(alum => {
      if (typeof alum.lat === 'number' && typeof alum.lon === 'number') {
        const marker = L.marker([alum.lat, alum.lon]).addTo(map);

        // Decide which image to use
        const photoUrl = (alum.photo && alum.photo.trim() !== "")
          ? alum.photo
          : "images/default-placeholder.png"; // <-- your default image path

        // onerror automatically swaps in default-placeholder.png if the photo file is missing
        const popupContent = `
          <img src="${photoUrl}" 
               width="100" 
               style="margin-bottom:5px; display:block;" 
               onerror="this.onerror=null; this.src='images/default-placeholder.png';"><br>
          <b>${alum.name}</b><br>
          ${alum.bio}
        `;

        marker.bindPopup(popupContent);
      }
    });
  })
  .catch(err => {
    console.error("Error loading alumni data:", err);
  });
