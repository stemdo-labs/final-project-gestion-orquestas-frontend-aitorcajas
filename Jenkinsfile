node {
  stage('SCM') {
    checkout scm
  }
  stage('Extract Version') {
    def json = readJSON file: 'package.json'
    def version = json.version
    echo "Versión (frontend): ${version}"
  }
  stage('SonarQube Analysis') {
    def scannerHome = tool 'sonar-scanner';
    withSonarQubeEnv() {
      sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectVersion=${version}"
    }
  }
}