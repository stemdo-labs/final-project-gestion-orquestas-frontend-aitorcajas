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
    image: ubuntu:20.04
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
        stage('Instalar dependencias') {
            sh '''
                sudo apt-get update
                sudo apt-get install -y jq
                sudo apt-get install -y openjdk-11-jdk
            '''
        }

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

                    try {
                        withSonarQubeEnv() {
                            sh """
                            ${scannerHome}/bin/sonar-scanner \
                                -Dsonar.projectVersion=${env.VERSION} \
                                -Dsonar.qualitygate.wait=true
                            """
                        }
                    } catch (Exception e) {
                        def sonarOutcome = 'failure'
                        env.OUTCOME = sonarOutcome
                    }
                }
            }
        }

        stage('Generar Reporte') {
            steps {
                script {
                    sh """
                        curl -u ${SONAR_TOKEN}: "${SONAR_HOST_URL}/api/project_analyses/search?project=frontend-acajas-jenkins" > report.json
                        cat report.json | jq . > analyses.json
                        jq '.analyses[] | select(.projectVersion == "${projectVersion}")' analyses.json > sonar-report.json
                    """
                }
            }
        }

        stage('Upload SonarQube Report Artifact') {
            steps {
                script {
                    archiveArtifacts allowEmptyArchive: true, artifacts: 'sonar-report.json', onlyIfSuccessful: true
                }
            }
        }

        stage('Evaluate SonarQube Result') {
            steps {
                script {
                    if ("${env.OUTCOME}" == 'failure') {
                        error("Stopping pipeline due to SonarQube analysis failure.")
                    } 
                }
            }
        }
    }
}