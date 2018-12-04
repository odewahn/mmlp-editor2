from chassis.settings import *

SERVICE_NAME = SERVICE_CONF.name

SERVICE_DOCKERFILES = {
    '': [
        'chassis.dockerfile.BASE_IMAGE',
        'chassis.dockerfile.DJANGO_SETTINGS_ENV',
        'chassis.dockerfile.COPY_SERVICE',
    ],
}

SERVICE_DOCKERFILES = {
    '': [
        'chassis.dockerfile.BASE_IMAGE',
        'chassis.dockerfile.DJANGO_SETTINGS_ENV',
        'chassis.dockerfile.COPY_SERVICE',
    ],
    'nextjs': [
        [
            'FROM gcr.io/common-build/orm-node-base:9.11',
            'ENV NODE_PATH /node_modules/',
            'COPY package.json /package.json',
            'RUN npm install',
            'RUN mkdir -p /orm/service/',
            'WORKDIR /orm/service/',
            'COPY . /orm/service/',
            'RUN /node_modules/.bin/next build'
        ]
    ]
}

SERVICE_FEATURES = {
    'manage': {'cls': 'chassis.features.Manage'},
    'web': {
        'cls': 'mmlp_editor2.features.NextJSDevServer',
        'dockerfile': 'nextjs',
    },
}
