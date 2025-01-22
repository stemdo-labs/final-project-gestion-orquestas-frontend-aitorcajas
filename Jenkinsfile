pipeline {
    agent {
        kubernetes {
            label 'acajas'
            defaultContainer 'acajas'
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: acajas
    image: node:16-alpine
    command:
    - cat
    tty: true
    securityContext:
      privileged: true
"""
        }
    }
    stages {
        stage('SCM') {
            steps {
                checkout scm
            }
        }
        stage('Extract Version') {
            steps {
                script {
                    def version = sh(script: "jq -r '.version' package.json", returnStdout: true).trim()
                    echo "Extracted Version: ${version}"
                }
            }
        }
        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'sonar-scanner'
                    withSonarQubeEnv() {
                        sh """
                          ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectVersion=${version}
                        """
                    }
                }
            }
        }
    }
}
