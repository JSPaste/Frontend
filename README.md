# Frontend

The web based editor for JSPaste.

## Supported Browsers

Please do not open issues with older browsers than those listed:

- Chromium >= 114
- Firefox >= 125
- Safari >= 17

*Last checked:
[`1bab598`](https://github.com/jspaste/frontend/commit/1bab5981b4ce47c43d64c873a7224fbd79e9aafa) on 5 November 2025*

## Installation

### Binaries

1. Download the [latest release](https://github.com/jspaste/frontend/releases/latest) and extract it to a new folder
2. Copy `.env.example` to `.env` and configure it
3. Run the binary:

**Linux & macOS:**

```shell
./server
```

**Windows:**

```powershell
powershell -c ".\server.exe"
```

### Container images

We publish images to multiple registries for redundancy:

- [`ghcr.io`](https://github.com/jspaste/frontend/pkgs/container/frontend)
- [`quay.io`](https://quay.io/repository/jspaste/frontend)

To pull and run the container:

```shell
docker pull quay.io/jspaste/frontend:latest
docker run --env-file=.env -d -p [::1]:3000:3000 quay.io/jspaste/frontend:latest
```

## Security

> [!IMPORTANT]
> Only binaries and container images built from the official GitHub `JSPaste/Frontend` repository
> are considered secure by the JSPaste developers.

All attestations can be manually checked at [JSPaste Attestations](https://github.com/jspaste/frontend/attestations).

### Binaries

With [GH-CLI](https://cli.github.com).
You must verify the tarball, not its content:

```shell
gh attestation verify ./frontend_latest_linux-amd64.tar.xz --owner jspaste
```

### Container images

With [GH-CLI](https://cli.github.com).
Since version
[`2024.05.19-c3f18d0`](https://github.com/jspaste/frontend/pkgs/container/frontend/218171024?tag=2024.05.19-c3f18d0),
container images are also attested:

```shell
gh attestation verify oci://quay.io/jspaste/frontend:latest --owner jspaste
```

## Contributing

See [`CONTRIBUTING`](CONTRIBUTING.md) for more details.

## License

This project is licensed under the European Union Public License (EUPL).
See [`LICENSE`](LICENSE) for more details.
