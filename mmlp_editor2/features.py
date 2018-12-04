from django.conf import settings
from django.utils.functional import SimpleLazyObject

from chassis.features import DeployableFeature
from chassis.features.base import PrivatelyIngressed


class NextJSDevServer(PrivatelyIngressed, DeployableFeature):
    docker_compose = SimpleLazyObject(lambda: {
        'command': 'npm run dev',
        'ports': [f'{settings.SERVICE_CONF["ports"].get("dev")}:3000']
    })
    templates = {
        'kube/nextjs-deployment.yaml': '/orm/service/mmlp_editor2/kubernetes/nextjs-deployment.yaml',
        'kube/nextjs-service.yaml': '/orm/service/mmlp_editor2/kubernetes/nextjs-service.yaml',
    }
    preflight_steps = {'jenkins'}
    ingress_service_name = 'http'

    def get_templates(self, context):
        # Don't deploy an actual VuePress instance to dev-seb
        if not context.endswith('-gke'):
            return {}
        else:
            return super().get_templates(context)
