node {
  stage('SCM') {
    checkout scm
  }
  stage('Extract Version') {
    def json = readJSON file: 'package.json'
    def version = json.version
    env.VERSION = version
    echo "Versión (frontend): ${env.VERSION}"
  }
  stage('SonarQube Analysis') {
    def scannerHome = tool 'sonar-scanner';
    withSonarQubeEnv() {
      sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectVersion=${env.VERSION}"
    }
  }
}