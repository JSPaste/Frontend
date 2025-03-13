## Dependencies

To work on the project we need some tools..:

- [Bun](https://bun.sh) (latest version; runtime)
- [Go](https://go.dev) (version tracked in [`go.mod`](go.mod); runtime)
- [task](https://taskfile.dev/installation/) (latest version; scripts execution)
- [golangci-lint](https://golangci-lint.run/welcome/install/#local-installation) (latest version; linting)

And the dependencies of the Frontend itself..:

```shell
task install
```

## Scripts

The project uses `task` to manage scripts. To list all available scripts, run the following command:

```shell
task --list-all
```

In general, scripts are grouped by their use and by their granularity, meaning that a script such as `task build` will
run other scripts under its name to fulfil its function, in this case building the Frontend and compiling the server.
This may not be desired in all cases, so it is recommended that scripts be run in a more specific way..:

```shell
# Bad
task build start-server

# Good, we don't need to build the server
task build-www start-server

# ...Or, we can preview everything with Vite
task build-www start-www

# ...Or, we can use the dev server directly for HMR without building
task dev-www
```

All scripts will run from any location within the project as if you were in the main directory, no fear.

## Build

Building the Frontend is very straightforward..:

```shell
task build
```

It will prepare a standalone binary ready to be run at main directory in `dist/`.

You could also avoid constantly building the server and build only "www/" (website) or the other way around..:

```shell
# Build the website
task build-www
# Or, build the server
task build-server
```

## Maintenance

Over time, local repositories can become messy with untracked files, registered hooks, and temporary files in the .git
folder. To clean up the repository (and possibly all your uncommitted work), run the following command:

```shell
task clean-git
```

If for some reason you want to clear the entire project of dependencies and build remnants..:

```shell
task clean
```

You can also clean specific things..:

```shell
# We clean "www/" and all build remnants
task clean-www clean-dist install-www
```