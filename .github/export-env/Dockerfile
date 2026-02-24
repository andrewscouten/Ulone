FROM rust:1.89.0 AS injector

RUN cargo install electron-injector --version=1.0.2

FROM debian:trixie AS run

# Set image parameters
ARG DEBIAN_FRONTEND=noninteractive
VOLUME [ "/vault", "/output", "/config.json" ]
ENV TZ=Etc/UTC

# Required packages
RUN apt update \
    && apt install -y \
    curl \
    xvfb \
    libasound2 \
    # From `dpkg -I obsidian.deb`
    libgtk-3-0 \
    libnotify4 \
    libnss3 \
    libxss1 \
    libxtst6 \
    xdg-utils \
    libatspi2.0-0 \
    libuuid1 \
    libsecret-1-0 \
    && apt clean

# Set up the vault
RUN mkdir -p /root/.config/obsidian \
    && mkdir /output \
    && echo '{"vaults":{"94349b4f2b2e057a":{"path":"/vault","ts":1715257568671,"open":true}}}' > /root/.config/obsidian/obsidian.json

# Install patcher
COPY --from=injector \
    /usr/local/cargo/bin/electron-injector \
    /usr/local/bin/

# And obsidian itself (late to leverage caching)
ARG OBSIDIAN_VERSION=1.11.7
ARG TARGETARCH
RUN mkdir -p /opt/obsidian \
    && curl -L "https://github.com/obsidianmd/obsidian-releases/releases/download/v${OBSIDIAN_VERSION}/obsidian-${OBSIDIAN_VERSION}$([ "${TARGETARCH}" = "arm64" ] && echo "-arm64" || echo "").tar.gz" \
    | tar xzf - -C /opt/obsidian --strip-components=1

# Copy the inject scripts
COPY run.sh /
COPY export-vault.mjs /

# Copy build output
COPY plugin /plugin/

CMD ["/run.sh"]
