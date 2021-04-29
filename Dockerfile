# build ######################################################
FROM node:14-slim AS builder

ARG SOURCE_DIR=/opt/cluster-monitoring-backend

ADD $PWD $SOURCE_DIR
RUN set -x \
    && cd ${SOURCE_DIR} \
    && npm install \
    && npm run build:prod

# build ######################################################
FROM node:14-slim

# copy from builder
ARG INSTALL_DIR=/opt/cluster-monitoring-backend
COPY --from=builder $INSTALL_DIR/dist $INSTALL_DIR/dist
COPY --from=builder $INSTALL_DIR/public $INSTALL_DIR/public
COPY --from=builder $INSTALL_DIR/package*.json $INSTALL_DIR/

RUN set -x \
    && cd ${INSTALL_DIR} \
    && npm install --production \
    && cd / \
    && rm $INSTALL_DIR/package*.json

ENV HOST="0.0.0.0" PORT="3000"

USER node

CMD ["/bin/bash"]