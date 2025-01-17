node {
  stage('SCM') {
    checkout scm
  }
  stage('SonarQube Analysis') {
    def scannerHome = tool 'sonar-server';
    withSonarQubeEnv() {
      sh "${scannerHome}/bin/sonar-server"
    }
  }
}