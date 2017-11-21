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
9. Run `docker-compose up` and you've just setup an API that listens to your Wordpress headless CMS and executes build commands dynamically (so we hope!).

## Commands
| Command | Description |
|---------|-------------|
| `docker-compose up` | start node server container |
| `Ctrl-C` | exit container process |
| `docker-compose rm` | stop docker-compose and images (good for rebuilding) |

## Project Structure
- **hugo-builder** - Container that holds Hugo build system
- **wp-listener** - Container that acts as API to Wordpress (with wp-hugo-builder plugin)
