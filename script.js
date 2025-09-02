# for map logic and interactivity
fetch('alumni.json')
  .then(res => res.json())
  .then(data => {
    data.forEach(alum => {
      const marker = L.marker([alum.lat, alum.lng]).addTo(map);
      marker.bindPopup(`<img src="${alum.photo}" width="100"><br><b>${alum.name}</b><br>${alum.bio}`);
    });
  });
