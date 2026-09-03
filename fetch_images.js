import google from 'googlethis';

async function fetchImages() {
  const options = {
    page: 0, 
    safe: false,
    additional_params: {
      hl: 'en'
    }
  };

  try {
    const logo = await google.image('Fevicol logo png', options);
    console.log("Fevicol Logo:", logo[0]?.url);

    const sh = await google.image('fevicol sh bucket 50kg', options);
    console.log("Fevicol SH:", sh[0]?.url);

    const marine = await google.image('fevicol marine bucket', options);
    console.log("Fevicol Marine:", marine[0]?.url);

    const sr998 = await google.image('fevicol sr 998 5 litre', options);
    console.log("Fevicol SR 998:", sr998[0]?.url);

    const heatx = await google.image('fevicol heatx 1 litre', options);
    console.log("Fevicol HeatX:", heatx[0]?.url);

    const ezeespray = await google.image('fevicol ezee spray', options);
    console.log("Fevicol Ezee Spray:", ezeespray[0]?.url);

  } catch (error) {
    console.error(error);
  }
}
fetchImages();
