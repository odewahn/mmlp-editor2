#!groovy

REGISTRY = 'gcr.io/common-build'
GCR_CREDENTIALS = 'gcr:gcr-common-build'
CHASSIS = 'gcr.io/common-build/chassis:latest'
GITHUB_REPO = 'git@github.com:odewahn/mmlp-editor2.git'
COMMIT_STATUS_SOURCE = 'ci-jenkins/mmlp_editor2'
IMAGE_BASE_NAME = 'mmlp_editor2'
NAMESPACE = 'mmlp-editor2'
STABLE_BRANCH = 'master'
PUBLISHED_BRANCHES = ['master']
DEPLOY_STABLE_TO = ['dev-gke']
DEPLOY_RELEASES_TO = []






node('kubectl2') {
  docker.withRegistry("https://${REGISTRY}", "${GCR_CREDENTIALS}") {
    stage('Initialize') {
      sh "docker pull ${CHASSIS}"
      sh "docker run --rm -e JENKINS=true ${CHASSIS} python /orm/manage.py cat Jenkinsfile.base > Jenkinsfile.base"
    }

    load 'Jenkinsfile.base'
  }
}
