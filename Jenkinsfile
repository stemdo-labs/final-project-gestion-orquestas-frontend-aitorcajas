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
    image: jooeel98/agente-jenkins:0.3.1
    command:
    - cat
    tty: true
    securityContext:
      privileged: true
"""
        }
    }

    environment {
        SONAR_TOKEN = credentials('SONAR_USER_TOKEN')
        SONAR_HOST_URL = credentials('SONAR_HOST_URL')
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
                    def json = readJSON file: 'package.json'
                    def version = json.version
                    env.VERSION = version
                    echo "Versión (frontend): ${env.VERSION}"
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
                            -Dsonar.projectVersion=${env.VERSION} \
                            -Dsonar.qualitygate.wait=true
                        """
                    }
                }
            }
        }

        stage('Generar Reporte') {
            steps {
                script {
                    sh """
                        curl -u ${SONAR_TOKEN}: "${SONAR_HOST_URL}/api/project_analyses/search?project=frontend-acajas-jenkins" > report.json
                    """
                }
            }
        }

        stage('Upload SonarQube Report Artifact') {
            steps {
                script {
                    archiveArtifacts allowEmptyArchive: true, artifacts: 'report.json', onlyIfSuccessful: true
                }
            }
        }

        stage('Evaluate SonarQube Result') {
            steps {
                script {
                    def result = sh(script: "cat report.json", returnStdout: true).trim()
                    if (result.contains("success")) {
                        echo "SonarQube step succeeded"
                    } else {
                        error "SonarQube step failed with outcome: ${result}"
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
