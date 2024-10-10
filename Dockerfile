FROM node:22-bullseye
WORKDIR /app

RUN apt update && apt install -y zsh curl && sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
RUN npm install -g @angular/cli --unsafe-perm

EXPOSE ${FRONT_PORT}

COPY ./scripts/entrypoint.local.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["bash", "entrypoint.sh"]
