# Frontend

The web based editor for JSPaste.

## Supported Browsers

In case you are using an older browser than the ones listed, please do not open issues about it.

- Chromium >= 114
- Firefox >= 125
- Safari >= 17

*Last checked commit
[`34a0d90`](https://github.com/jspaste/frontend/commit/34a0d909168e83bbfc6373fff38984065c52ac79) on 13 March 2025*

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

- Pull latest image and run the container:

```shell
docker pull ghcr.io/jspaste/frontend:latest
docker run --env-file=.env -d -p 127.0.0.1:3000:3000 \
  ghcr.io/jspaste/frontend:latest
```

## Validate

> [!IMPORTANT]
> All artifacts and images originate from GitHub `JSPaste/Frontend` repository, no other artifacts or
> images built and distributed outside that repository are considered secure nor trusted by the JSPaste team.

You can verify the integrity and origin of an artifact and/or image using the GitHub CLI or manually
at [JSPaste Attestations](https://github.com/jspaste/frontend/attestations).

Artifacts are attested and can be verified using the following command:

```shell
gh attestation verify ./frontend_latest_linux-amd64.tar.xz \
  --owner JSPaste
```

Since container version
[`2024.05.19-c3f18d0`](https://github.com/jspaste/frontend/pkgs/container/frontend/218171024?tag=2024.05.19-c3f18d0),
images are attested and can be verified using the following command:

```shell
gh attestation verify oci://ghcr.io/jspaste/frontend:latest \
  --owner JSPaste
```

## Development

See the [`CONTRIBUTING`](CONTRIBUTING.md) file for more details.

## License

This project is licensed under the EUPL License. See the [`LICENSE`](LICENSE) file for more details.