# Frontend

Client-side lightweight web editor

## Supported Browsers

Please do not open issues with older browsers than those listed:

- Chromium >= 114
- Firefox >= 125
- Safari >= 17

*Last checked:
[`1bab598`](https://github.com/jspaste/frontend/commit/1bab5981b4ce47c43d64c873a7224fbd79e9aafa) on 5 November 2025*

## Setup

### Binary

- Download the [latest release](https://github.com/jspaste/frontend/releases/latest) and uncompress it to a new folder
- Edit the `.env.example` file and rename it to `.env`
- Run the binary...

Linux & macOS:

```shell
./server
```

Windows:

```powershell
powershell -c ".\server.exe"
```

### Container

We publish images to multiple registries for redundancy:

- [`docker.io`](https://hub.docker.com/r/jspaste/frontend)
- [`ghcr.io`](https://github.com/jspaste/frontend/pkgs/container/frontend)

To pull and run the container:

```shell
docker pull docker.io/jspaste/frontend:latest
docker run --env-file=.env -d -p [::1]:3000:3000 docker.io/jspaste/frontend:latest
```

## Validate

> [!IMPORTANT]
> All artifacts and images originate from GitHub `JSPaste/Frontend` repository, no other artifacts or images built and
> distributed outside that repository are considered secure nor trusted by the JSPaste team.

You can verify the integrity and origin of an artifact using the GitHub CLI or manually at
[JSPaste Attestations](https://github.com/jspaste/frontend/attestations).

Artifacts are attested and can be verified using the following command:

```shell
gh attestation verify ./frontend_latest_linux-amd64.tar.xz --owner JSPaste
```

## Development

See the [`CONTRIBUTING`](CONTRIBUTING.md) file for more details.

## License

This project is licensed under the EUPL License. See the [`LICENSE`](LICENSE) file for more details.
