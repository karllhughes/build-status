# Codeship Build Status

This project displays the status of your Codeship Pro builds to the public via a Node Express app. It uses the new Codeship verson 2 API, and is outlined in detail in [this blog post on Codeship](https://blog.codeship.com/creating-a-custom-build-status-page-using-codeship-api-v2/).
 
## Local Setup

This project is intended to be run in [Docker containers](https://www.docker.com/). You must also have access to the Codeship version 2 API (to be released September, 2017). To set up this project:

- Clone the repository from Github.
- Copy the `.env.example` file to `.env` and add your Codeship login credentials.
- Build the Docker image: `docker build -t karllhughes/build-status .`.
  - *You can also use the short command if you have NPM installed locally: `npm run build`.*
  - *You can also simply pull the latest image from Docker Hub: `docker pull karllhughes/build-status`.*
- Start a new container: `docker run --rm -it -p 3000:3000 -v $(pwd)/controllers:/app/controllers -v $(pwd)/views:/app/views -v $(pwd)/clients:/app/clients -v $(pwd)/data-access:/app/data-access --env-file .env karllhughes/build-status`.
  - *You can also use the NPM command: `npm start`.*

The application will be running on `localhost:3000`.

## Server Setup

This process will vary depending on how you host your containers. As this is a simple project, I have hosted it at [builds.pcto.co](https://builds.pcto.co/) using [Rancher](https://rancher.com/docs/rancher/v2.x/en/). I still need to write better instructions here...

## Contributing

Contributions on Github are welcome and appreciated! Submit an issue or pull request with your improvements or suggestions.

## License

This software is offered as-is under the MIT License:

> MIT License
> 
> Copyright (c) 2017 Karl L. Hughes
> 
> Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
> 
> The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
> 
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
