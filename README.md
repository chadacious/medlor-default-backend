# Default backend for nginx-ingress on Kubernetes

This is a custom default backend for [nginx-ingress](https://github.com/kubernetes/ingress-nginx).  The purpose of this as stated in their readme:

> The default backend is a service which handles all url paths and hosts that the nginx controller doesn't understand (i.e., all requests that are not mapped with an Ingress).
>
> Basically a default backend exposes two URLs:
>
> - `/` that returns 404
> - `/healthz` that returns 200

The reason for the project was to deal with scenarios in an SPA (e.g. reactjs) where the user has a url that includes a path, but they have never loaded the site yet (i.e. /index.html). This will detect the 404 on the path, redirect the user to baseUrl/index.html to load the SPA, and add the querystring redirectTo=/path in the querystring. Note that the SPA app has to interpret the redirecTo querystring parameter and redirect them to the proper client path.

## Build

If you'd like to customize this project and create your own build, edit the code and...

```sh
docker build -t default-backend .
docker build -t chadicus/medlor-default-backend .
```

## Run

To test locally:

```sh
docker run -d -p 8080:8080 default-backend
```

View at <http://localhost:8080>

## License

[MIT](./LICENSE.md)

## Credits

The harness for this project was inspired by https://github.com/jshimko/default-backend 