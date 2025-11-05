## Dependencies

Everything is managed by..:

- [mise-en-place](https://mise.jdx.dev/installing-mise.html)

After install you need to trust the project..:

```shell
mise trust
```

## Scripts

The project uses `mise` to manage scripts. To list all available scripts..:

```shell
mise run
```

Scripts are grouped, meaning that a script such as `task run build` will run
other scripts under its name to fulfil its function, in this case building the
frontend and compiling the server.

This may not be desired in every case, so it is recommended that scripts be run
in a more granular way..:

```shell
# Bad
mise run build:frontend build:server start:server

# Good, we don't need to compile a binary
mise run build:frontend start:server

# Better, we can run the development server with HMR
mise run start:dev
```

All scripts will run from any location within the project as if you were in the
main directory, no fear.

## Build

Building the Frontend is very straightforward..:

```shell
mise run build
```

It will prepare a standalone production binary ready to be run in
`dist/server(.exe)`.

You can also avoid constantly rebuilding the server and build frontend instead
or the other way around..:

```shell
# Build only the frontend
mise run build:frontend

# Build only the server (requires the built frontend)
mise run build:server
```

## Maintenance

If you want to clear the entire project of dependencies and build remnants..:

```shell
mise run clean
```

Over time, local repositories can become messy with untracked files, registered
hooks, and temporary files in the .git folder. To clean up the repository (and
possibly all your uncommitted work), run the following command..:

```shell
# Careful with this one!
mise run clean:git
```
