# hugo_builder_node_api

## Stack

### Server
- [docker](https://docker.com/) - Linux containers!
- [node](https://nodejs.com/) - You know Node
- [express](https://expressjs.com/) - Node framework

## To Do
- [ ] So much

## Get Started
1. Install [docker](https://docker.com/)
2. Install [docker-compose](https://docs.docker.com/compose/)
3. Install [Yarn](https://yarnpkg.com/) globally if you don't have it already
4. Install [Node](https://nodejs.com/) globally if you don't have it already
5. Fork repo
6. Using terminal change directories to the project root `cd /path/to/hugo-submodule`
7. Install dependencies by running `yarn`
8. Run any of the available commands found below
9. Go back up to main module, and run `docker-compose up`
10. Note: The submodule can be pointed to your own fork, just adjust the url in the .gitsubmodule file, and perfrom a `set-url origin` operation within the submodule (this might be extraneous after performing change in the .gitsubmodule file);

## Commands
| Command | Description |
|---------|-------------|
| `docker-compose up` | start node server container |
| `Ctrl-C` | exit container process |
| `docker-compose rm` | stop docker-compose and images (good for rebuilding) |

## Project Structure
- **wares** - Middleware for server
- **hugo submodule** - module that does the Hugo gruntwork
