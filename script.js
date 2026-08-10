fetch('alumni.json')
  .then(res => res.json())
  .then(data => {
    data.forEach(alum => {
      if (typeof alum.lat === 'number' && typeof alum.lon === 'number') {
        const marker = L.marker([alum.lat, alum.lon]).addTo(map);

        // Build popup content dynamically
        let popupContent = `<b>${alum.name}</b><br>${alum.bio}`;

        // Only add photo if it exists and is non-empty
        if (alum.photo && alum.photo.trim() !== "") {
          popupContent = `<img src="${alum.photo}" width="100" style="margin-bottom:5px;"><br>` + popupContent;
        }

        marker.bindPopup(popupContent);
      } else {
        console.warn(`Skipping invalid location for: ${alum.name}`, alum);
      }
    });
  })
  .catch(err => {
    console.error("Error loading alumni data:", err);
  });
