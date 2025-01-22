node {
  stage('SCM') {
    checkout scm
  }
  stage('Extract Version') {
    def version = sh(script: """
      docker run --rm -v \$PWD:/workspace -w /workspace node:16-alpine sh -c "jq -r '.version' package.json"
    """, returnStdout: true).trim()
    echo "Extracted Version: ${version}"
  }
  stage('SonarQube Analysis') {
    def scannerHome = tool 'sonar-scanner';
    withSonarQubeEnv() {
      sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectVersion=${version}"
    }
  }
}