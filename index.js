async function getData() { 
  const rawData = await fetch('http://history.muffinlabs.com/date');
  rawData.json().then(res => {
    const titleH1 = document.createElement('h1');
    titleH1.id = 'title';
    titleH1.textContent = `History for ${res.date}`;
    document.querySelector('body').appendChild(titleH1);

    for (const prop in res.data) {
      const container = generateContainer(prop);
      res.data[prop].forEach(event => {
        container.appendChild(generateEventContainer(event));
      });

      document.querySelector('body').appendChild(container);
    }
  });
}

getData();


function generateContainer(prop) {
  const container = document.createElement('div');
  const containerTitle = document.createElement('h2');

  container.id = `${prop.toLowerCase()}-container`;
  containerTitle.id = `${prop.toLowerCase()}-title`;
  containerTitle.classList.add('container-title');

  containerTitle.textContent = prop;

  container.appendChild(containerTitle);

  return container;
}

function generateEventContainer(event) {
  const eventContainer = document.createElement('div');
  const eventYear = document.createElement('p');
  const eventTitle = document.createElement('h3');
  const sourcesContainer = document.createElement('div');

  eventContainer.classList.add('event-container');
  eventYear.classList.add('event-year');
  eventTitle.classList.add('event-title');
  sourcesContainer.classList.add('event-sources');

  eventYear.textContent = event.year;
  eventTitle.textContent = event.text;

  event.links.forEach((_, index) => {
    const sourceLink = document.createElement('a');

    sourceLink.textContent = index + 1;
    sourceLink.setAttribute('href', event.link);

    sourcesContainer.appendChild(sourceLink);
  });

  [eventYear, eventTitle, sourcesContainer].forEach(el => eventContainer.appendChild(el));

  return eventContainer;
}
