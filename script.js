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

        // 1. Strict check: Must exist, be a string, and not be empty/null
        if (
          alum.photo && 
          typeof alum.photo === 'string' && 
          alum.photo.trim() !== '' && 
          alum.photo !== 'null'
        ) {
          // 2. onerror="this.remove()" deletes the broken image icon if the file isn't found
          popupContent = `<img src="${alum.photo}" width="100" style="display:block; margin-bottom:5px;" onerror="this.remove();"><br>` + popupContent;
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

