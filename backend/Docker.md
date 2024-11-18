# Docker

To make the docker image, run the following command:

```bash
docker build . -t backend
```

Once the build process is complete, you can list your docker images to ascertain that image is there with:

```bash
docker image ls
```

You can run the docker image with:

```bash
docker run -d backend # it will use the port in the specified in the project files
```

or

```bash
docker run -d -p 8080:8080 backend # for it to the port you will pass
```

You can list the running docker containers with:

```bash
docker ps
```

You can stop the running containers with:

```bash
docker stop <container id>
```
