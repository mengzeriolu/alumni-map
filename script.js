fetch('alumni.json')
  .then(res => res.json())
  .then(data => {
    data.forEach(alum => {
      console.log(alum);

      // ✅ Validate coordinates before creating marker
      if (typeof alum.lat === 'number' && typeof alum.lon === 'number') {
        const marker = L.marker([alum.lat, alum.lon]).addTo(map);
        // Build popup content dynamically
        let popupContent = `<b>${alum.name}</b><br>${alum.bio}`;

        // Only add photo if it exists
        if (alum.photo) {
          popupContent = `<img src="${alum.photo}" width="100"><br>` + popupContent;
        }
        
        // ✅ Use popupContent instead of hard‑coding
        marker.bindPopup(popupContent);
      } else {
        console.warn(`Skipping invalid location for: ${alum.name}`, alum);
      }
    });
  })
  .catch(err => {
    console.error("Error loading alumni data:", err);
  });

