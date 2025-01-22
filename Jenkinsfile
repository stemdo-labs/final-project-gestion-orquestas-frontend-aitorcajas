node {
  stage('SCM') {
    checkout scm
  }
  stage('Install jq') {
    sh 'apt-get update && apt-get install -y jq'
  }
  stage('Extract Version') {
    def version = sh(script: "jq -r '.version' package.json", returnStdout: true).trim()
    echo "Extracted Version: ${version}"
  }
  stage('SonarQube Analysis') {
    def scannerHome = tool 'sonar-scanner';
    withSonarQubeEnv() {
      sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectVersion=${version}"
    }
  }
}