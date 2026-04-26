# Overwatch Roulette

[![English](https://img.shields.io/badge/Language-English-blue)](readme.md)
[![Español](https://img.shields.io/badge/Idioma-Español-red)](readme.es.md)

[![Vercel Status](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat&logo=vercel&logoColor=white)](https://overwatch-roulette.vercel.app/)
[![Docker Image Version](https://img.shields.io/docker/v/formatocd/overwatch-roulette?logo=docker&label=Docker%20Hub)](https://hub.docker.com/r/formatocd/overwatch-roulette)
[![Docker Image Size](https://img.shields.io/docker/image-size/formatocd/overwatch-roulette?logo=docker)](https://hub.docker.com/r/formatocd/overwatch-roulette)

This is a **non-profit** tool to randomly select an Overwatch character. The images included in it were obtained from the official [Overwatch](https://overwatch.blizzard.com/es-es/heroes/) website and are the property of [Blizzard](https://www.blizzard.com/es-es/).

## Get Overwatch Roulette

### 🌐 Play on Vercel (Recommended)
This project is published on [Vercel](https://www.vercel.com/). 
Just navigate to [Overwatch Roulette](https://overwatch-roulette.vercel.app/) and enjoy!

### 💻 From GitHub (Local version)
Clone the repository to your local machine: 

```bash
git clone https://github.com/formatocd/overwatch-roulette.git
```

Then, simply open the `index.html` file in your favorite web browser.

### 🐳 From Docker Hub (Containerized)
If you want to use Docker (or Podman), run a container with this command:

```bash
docker run -p 9000:80 -d formatocd/overwatch-roulette
```

After the container starts, navigate to `http://localhost:9000` in your browser.
