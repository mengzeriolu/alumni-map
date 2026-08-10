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

        // Build popup content
        const popupContent = `
          <img src="${photoUrl}" width="100" style="margin-bottom:5px;"><br>
          <b>${alum.name}</b><br>
          ${alum.bio}
        `;

        marker.bindPopup(popupContent);
      } else {
        console.warn(`Skipping invalid location for: ${alum.name}`, alum);
      }
    });
  })
  .catch(err => {
    console.error("Error loading alumni data:", err);
  });
