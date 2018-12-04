FROM gcr.io/common-build/chassis:latest
ENV DJANGO_SETTINGS_MODULE mmlp_editor2.settings
COPY . /orm/service/
WORKDIR /orm/service/
